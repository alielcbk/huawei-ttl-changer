const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const open = require('open');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path to the ADB executable (supports packaged execution with pkg)
const isPackaged = typeof process.pkg !== 'undefined';
const adbPath = isPackaged
  ? path.join(path.dirname(process.execPath), 'bin', 'adb.exe')
  : path.join(__dirname, 'bin', 'adb.exe');

// Helper function to run adb commands
function runAdb(args, timeoutMs = 0) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(adbPath)) {
      return reject({ error: new Error('adb.exe bulunamadı. Lütfen bin klasörünü kontrol edin.'), output: '' });
    }
    
    const child = spawn(adbPath, args);
    let stdout = '';
    let stderr = '';
    let timer;
    
    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        try { child.kill(); } catch(e) {}
        reject({ error: new Error('İşlem zaman aşımına uğradı (Timeout).'), output: stdout + stderr + '\n[Zaman Aşımı]' });
      }, timeoutMs);
    }
    
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    
    child.on('error', (err) => {
      if (timer) clearTimeout(timer);
      reject({ error: err, output: stdout + stderr });
    });
    
    child.on('exit', (code) => {
      if (timer) clearTimeout(timer);
      const output = (stdout + stderr).trim();
      if (code === 0 || code === null) {
        resolve(output);
      } else {
        reject({ error: new Error(`ADB Hata Kodu: ${code}`), output });
      }
    });
  });
}

// 1. Connect to modem
app.post('/api/connect', async (req, res) => {
  const { ip } = req.body;
  if (!ip) {
    return res.status(400).json({ success: false, error: 'IP adresi belirtilmedi.' });
  }

  try {
    // Kill existing server first
    try { await runAdb(['kill-server'], 5000); } catch (e) {}

    // Use a timeout of 10 seconds for the connect command to prevent indefinite hangs
    const output = await runAdb(['connect', `${ip}:5555`], 10000);
    const success = output.includes('connected to');
    res.json({ success, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'Bağlantı hatası', output: err.output || '' });
  }
});

// 2. Get TTL & NAT/SPE status
app.get('/api/status', async (req, res) => {
  try {
    let ttl = 'Bilinmiyor';
    let nat = 'Bilinmiyor';
    let logOutput = '';

    // Check if connected first
    const devices = await runAdb(['devices']);
    logOutput += `Cihazlar:\n${devices}\n\n`;

    if (!devices.includes(':5555')) {
      return res.json({ success: false, connected: false, ttl, nat, output: logOutput + 'Modem bağlı değil. Lütfen önce bağlanın.' });
    }

    // Try reading TTL
    try {
      ttl = await runAdb(['shell', 'cat /system/etc/fix_ttl']);
    } catch (e) {
      logOutput += `TTL okunamadı: ${e.output || e.error?.message}\n`;
    }

    // Try reading NAT
    try {
      nat = await runAdb(['shell', 'cat /system/etc/disable_spe']);
    } catch (e) {
      logOutput += `NAT okunamadı: ${e.output || e.error?.message}\n`;
    }

    res.json({
      success: true,
      connected: true,
      ttl: ttl.trim(),
      nat: nat.trim(),
      output: logOutput + 'Durum başarıyla güncellendi.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'Durum sorgulama hatası', output: err.output });
  }
});

// 3. Fix TTL and NAT
app.post('/api/fix-ttl', async (req, res) => {
  const { ttl } = req.body;
  const ttlVal = ttl || '63';

  try {
    let output = '';
    
    output += 'Sistem bölümü yeniden bağlanıyor (read-write)...\n';
    output += await runAdb(['shell', 'mount -o remount,rw /system']) + '\n';
    
    output += 'NAT ayarı aktif ediliyor...\n';
    output += await runAdb(['shell', 'echo 1 > /system/etc/disable_spe']) + '\n';
    
    output += `TTL değeri ${ttlVal} olarak ayarlanıyor...\n`;
    output += await runAdb(['shell', `echo ${ttlVal} > /system/etc/fix_ttl`]) + '\n';
    
    output += 'Sistem bölümü güvenli moda alınıyor (read-only)...\n';
    output += await runAdb(['shell', 'mount -o remount,ro /system']) + '\n';

    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'TTL sabitleme hatası', output: err.output });
  }
});

// 4. Change IMEI
app.post('/api/change-imei', async (req, res) => {
  const { imei } = req.body;
  if (!imei || !/^\d{15}$/.test(imei)) {
    return res.status(400).json({ success: false, error: 'Geçersiz IMEI. IMEI 15 haneli bir sayı olmalıdır.' });
  }

  try {
    const output = await runAdb(['shell', `atc AT^PHYNUM=IMEI,${imei}`]);
    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'IMEI değiştirme hatası', output: err.output });
  }
});

// 5. Unlock Modem
app.post('/api/unlock', async (req, res) => {
  try {
    const output = await runAdb(['shell', 'atc AT^NVWREX=8268,0,12,1,0,0,0,2,0,0,0,A,0,0,0']);
    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'Modem kilit açma hatası', output: err.output });
  }
});

// 6. Reset/Reboot Modem
app.post('/api/reboot', async (req, res) => {
  try {
    const output = await runAdb(['shell', "echo -en 'AT^RESET\\r' > /dev/appvcom1"]);
    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'Yeniden başlatma hatası', output: err.output });
  }
});

// 7. Kill ADB Server
app.post('/api/kill-server', async (req, res) => {
  try {
    const output = await runAdb(['kill-server']);
    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.error?.message || 'ADB sunucusu sonlandırılamadı', output: err.output });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Sunucu http://localhost:${PORT} portunda çalışıyor.`);
  
  try {
    await open(`http://localhost:${PORT}`);
  } catch (e) {
    console.log(`Tarayıcı otomatik açılamadı. Lütfen manuel olarak http://localhost:${PORT} adresine gidin.`);
  }
});
