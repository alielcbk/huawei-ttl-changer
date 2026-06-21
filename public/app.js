// DOM Elements
const ipSelect = document.getElementById('ip-select');
const customIpGroup = document.getElementById('custom-ip-group');
const customIpInput = document.getElementById('custom-ip-input');
const btnConnect = document.getElementById('btn-connect');
const btnDisconnect = document.getElementById('btn-disconnect');
const statusBadge = document.getElementById('status-badge');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');

const btnRefreshStatus = document.getElementById('btn-refresh-status');
const valConnectedIp = document.getElementById('val-connected-ip');
const valTtl = document.getElementById('val-ttl');
const valNat = document.getElementById('val-nat');

const ttlInput = document.getElementById('ttl-input');
const btnFixTtl = document.getElementById('btn-fix-ttl');
const btnUnlock = document.getElementById('btn-unlock');
const btnReboot = document.getElementById('btn-reboot');

const imeiInput = document.getElementById('imei-input');
const imeiValidationMsg = document.getElementById('imei-validation-msg');
const btnChangeImei = document.getElementById('btn-change-imei');

const btnKillServer = document.getElementById('btn-kill-server');
const btnClearConsole = document.getElementById('btn-clear-console');
const consoleOutput = document.getElementById('console-output');

// Language Select Elements
const btnLangTr = document.getElementById('lang-tr');
const btnLangEn = document.getElementById('lang-en');

// TTL Info Toggle Elements
const btnToggleTtlInfo = document.getElementById('btn-toggle-ttl-info');
const ttlInfoContent = document.getElementById('ttl-info-content');
const ttlInfoIcon = document.getElementById('ttl-info-icon');

// App State
let appState = {
    connected: false,
    connectedIp: '',
    isLoading: false,
    lang: 'tr' // default language
};

// UI Translations Dictionary
const uiTranslations = {
  tr: {
    // HTML elements
    'lbl-page-title': 'Huawei Modem Kolay TTL & Ayar Değiştirici',
    'lbl-app-title': 'Huawei Modem Kontrol Paneli',
    'lbl-app-subtitle': 'Kolay TTL Sabitleyici & IMEI Değiştirici',
    'lbl-conn-title': 'Bağlantı Ayarları',
    'lbl-ip-select': 'Modem IP Adresi Seçin',
    'lbl-opt-default': '192.168.8.1 (Varsayılan B618)',
    'lbl-opt-custom': 'Özel IP Adresi Gir...',
    'lbl-custom-ip': 'Özel IP Adresi',
    'lbl-btn-connect': 'Bağlan',
    'lbl-btn-disconnect': 'Bağlantıyı Kes',
    'lbl-status-title': 'Modem Durumu',
    'lbl-status-ip': 'IP Adresi',
    'lbl-status-ttl': 'TTL Değeri',
    'lbl-status-nat': 'NAT (SPE) Durumu',
    'lbl-actions-title': 'Hızlı İşlemler',
    'lbl-ttl-fix-title': 'TTL Sabitle',
    'lbl-ttl-fix-desc': 'Modem paket geçiş limitini (TTL) sabitleyerek kısıtlamaları aşın.',
    'lbl-btn-fix-ttl': 'TTL Sabitle',
    'lbl-ttl-info-header': 'TTL Nedir ve Hangi Değeri Seçmeliyim?',
    'lbl-ttl-info-p1': '<strong>TTL (Time To Live) Mantığı:</strong> Paketlerin internetteki yaşam süresidir. Cihazlardan geçerken değeri 1 düşer. Bilgisayar/telefonların varsayılan değeri 64\'tür, modemden geçerken 63 olur. Operatör 63 gördüğünde bunun hotspot (paylaşım) olduğunu anlar.',
    'lbl-ttl-info-li1': '<strong>Sosyal Medya ve Paylaşılamayan Paketler için (Seçilmesi Gereken: 64):</strong> Trafiğin doğrudan modemden geliyormuş gibi algılanması ve sosyal medya paketlerinizden ya da paylaşılamayan normal kotalarınızdan düşmesi için modemi <strong>64</strong> olarak sabitleyin.',
    'lbl-ttl-info-li2': '<strong>Sadece Hotspot Olan Paketleri Kullanmak için (Seçilmesi Gereken: 63):</strong> Bilgisayardaki trafiğin sadece hotspot (paylaşım) tanımlı paketlerinizden düşmesini sağlamak için modemi <strong>63</strong> olarak sabitleyin.',
    'lbl-unlock-title': 'Kilit Açma (Unlock)',
    'lbl-unlock-desc': 'Sim kilidini ve şebeke kısıtlamalarını kaldırma komutunu gönderir.',
    'lbl-btn-unlock': 'Kilidi Aç',
    'lbl-reboot-title': 'Yeniden Başlat',
    'lbl-reboot-desc': 'Ayarların geçerli olması için modemi güvenli şekilde yeniden başlatır.',
    'lbl-btn-reboot': 'Modemi Yeniden Başlat',
    'lbl-imei-title': 'IMEI Değiştir',
    'lbl-imei-desc': 'Modemin IMEI numarasını değiştirin. (Lütfen 15 haneli geçerli bir IMEI girin.)',
    'lbl-btn-change-imei': 'IMEI Güncelle',
    'lbl-legal-warning': '<i class="fa-solid fa-triangle-exclamation"></i> <strong>YASAL UYARI:</strong> IMEI değiştirme işlemi yalnızca cihazın bozulan veya kaybolan orijinal IMEI numarasını geri yüklemek (tamir amaçlı) için kullanılmalıdır. Cihazların kimlik bilgilerini yasal olmayan yollarla değiştirmek suç teşkil edebilir. Bu işlemin tüm yasal sorumluluğu tamamen kullanıcıya aittir.',
    'lbl-console-title': 'ADB İşlem Logları',
    'lbl-btn-kill-server': 'Server Durdur',
    'lbl-btn-clear-console': 'Temizle',
    'lbl-initial-log': '[Sistem] Uygulama hazır. İşlem yapmak için lütfen önce modeme bağlanın.',
    
    // JS Dynamic Texts
    'status-connected': 'Bağlı',
    'status-connecting': 'Bağlanıyor...',
    'status-disconnected': 'Bağlı Değil',
    'nat-active': 'Aktif (1)',
    'nat-passive': 'Pasif (0)',
    'log-connecting': '{ip} adresine bağlanılıyor...',
    'log-conn-success': 'Bağlantı Başarılı!',
    'log-conn-failed': 'Bağlantı Başarısız. Lütfen LAN kablonuzu veya modem IP adresinizi kontrol edin.',
    'log-conn-error': 'Bağlantı hatası: {error}',
    'log-disconnecting': 'Bağlantı kesiliyor (ADB sunucusu kapatılıyor)...',
    'log-disconnected': 'Bağlantı kesildi.',
    'log-status-updated': 'Modem durumu güncellendi. (Mevcut TTL: {ttl}, NAT: {nat})',
    'log-status-failed': 'Durum güncellenemedi: {error}',
    'err-status-query': 'Durum sorgulama hatası: {error}',
    'log-fixing-ttl': 'TTL değeri {ttl} olarak ayarlanıyor, lütfen bekleyin...',
    'log-fix-ttl-success': 'TTL Başarıyla Sabitlendi!\nKonsol Çıktısı:\n{output}',
    'log-fix-ttl-failed': 'TTL sabitleme başarısız: {error}\nÇıktı:\n{output}',
    'log-sending-unlock': 'Kilit açma komutu gönderiliyor...',
    'log-unlock-success': 'Kilit Açma Komutu Başarıyla Gönderildi!\nKonsol Çıktısı:\n{output}',
    'log-unlock-failed': 'Kilit açma başarısız: {error}\nÇıktı:\n{output}',
    'log-sending-reboot': 'Yeniden başlatma komutu gönderiliyor...',
    'log-reboot-success': 'Modem yeniden başlatılıyor. Cihazınız kapandıktan sonra tekrar bağlanmak için modemin açılmasını bekleyin.\nÇıktı:\n{output}',
    'log-reboot-failed': 'Yeniden başlatma başarısız: {error}\nÇıktı:\n{output}',
    'log-updating-imei': 'IMEI {imei} olarak güncelleniyor...',
    'log-imei-success': 'IMEI başarıyla değiştirildi! Değişikliklerin geçerli olması için lütfen MODEMİ YENİDEN BAŞLATIN.\nÇıktı:\n{output}',
    'log-imei-failed': 'IMEI değiştirme başarısız: {error}\nÇıktı:\n{output}',
    'log-stopping-adb': 'ADB Sunucusu durduruluyor...',
    'log-stop-adb-success': 'ADB Sunucusu başarıyla durduruldu.',
    'log-clear': 'Konsol temizlendi.',
    'confirm-unlock': 'Modem kilidini (Unlock) açmak istediğinize emin misiniz?',
    'confirm-reboot': 'Modemi yeniden başlatmak istediğinize emin misiniz? (Modem bağlantısı kesilecektir)',
    'confirm-imei': '{imei} IMEI numarasını modeme yazmak istediğinize emin misiniz?',
    'val-valid': '✓ Geçerli Format',
    'val-digits': '{len}/15 hane',
    'err-invalid-ttl': 'Hata: Lütfen 1-255 arasında geçerli bir TTL değeri girin.',
    'err-invalid-imei': 'Hata: IMEI 15 haneli bir sayı olmalıdır.',
    'err-invalid-ip': 'Hata: Lütfen geçerli bir IP adresi girin.'
  },
  en: {
    // HTML elements
    'lbl-page-title': 'Huawei Modem Easy TTL & Settings Changer',
    'lbl-app-title': 'Huawei Modem Control Panel',
    'lbl-app-subtitle': 'Easy TTL Fixer & IMEI Changer',
    'lbl-conn-title': 'Connection Settings',
    'lbl-ip-select': 'Select Modem IP Address',
    'lbl-opt-default': '192.168.8.1 (Default B618)',
    'lbl-opt-custom': 'Enter Custom IP Address...',
    'lbl-custom-ip': 'Custom IP Address',
    'lbl-btn-connect': 'Connect',
    'lbl-btn-disconnect': 'Disconnect',
    'lbl-status-title': 'Modem Status',
    'lbl-status-ip': 'IP Address',
    'lbl-status-ttl': 'TTL Value',
    'lbl-status-nat': 'NAT (SPE) Status',
    'lbl-actions-title': 'Quick Actions',
    'lbl-ttl-fix-title': 'Fix TTL',
    'lbl-ttl-fix-desc': 'Bypass sharing restrictions by fixing the modem\'s TTL value.',
    'lbl-btn-fix-ttl': 'Fix TTL',
    'lbl-ttl-info-header': 'What is TTL and Which Value Should I Choose?',
    'lbl-ttl-info-p1': '<strong>TTL (Time To Live) Logic:</strong> Lifespan of data packets in the network. The value drops by 1 as it passes through each device. PC/phones use a default TTL of 64, which becomes 63 when passing through the modem. The operator identifies 63 as hotspot sharing.',
    'lbl-ttl-info-li1': '<strong>For Social Media and Non-Shareable Packages (Choose: 64):</strong> Fix the modem\'s TTL to <strong>64</strong> so that computer traffic appears to come directly from the modem, utilizing your social media or non-shareable packages.',
    'lbl-ttl-info-li2': '<strong>To Consume Hotspot-Only Packages (Choose: 63):</strong> Fix the modem\'s TTL to <strong>63</strong> so that sharing traffic consumes specifically from your hotspot-designated data packages.',
    'lbl-unlock-title': 'Unlock Modem',
    'lbl-unlock-desc': 'Sends the command to remove SIM lock and network restrictions.',
    'lbl-btn-unlock': 'Unlock',
    'lbl-reboot-title': 'Reboot Modem',
    'lbl-reboot-desc': 'Safely reboots the modem to apply changes.',
    'lbl-btn-reboot': 'Reboot Modem',
    'lbl-imei-title': 'Change IMEI',
    'lbl-imei-desc': 'Change the modem\'s IMEI number. (Please enter a valid 15-digit IMEI.)',
    'lbl-btn-change-imei': 'Update IMEI',
    'lbl-legal-warning': '<i class="fa-solid fa-triangle-exclamation"></i> <strong>LEGAL WARNING:</strong> The IMEI change process should only be used to restore the original, corrupted, or lost IMEI number of the device (for repair purposes). Altering device identification details illegally may constitute a crime. All legal responsibility belongs to the user.',
    'lbl-console-title': 'ADB Process Logs',
    'lbl-btn-kill-server': 'Stop Server',
    'lbl-btn-clear-console': 'Clear',
    'lbl-initial-log': '[System] Application ready. Please connect to the modem first.',
    
    // JS Dynamic Texts
    'status-connected': 'Connected',
    'status-connecting': 'Connecting...',
    'status-disconnected': 'Disconnected',
    'nat-active': 'Active (1)',
    'nat-passive': 'Passive (0)',
    'log-connecting': 'Connecting to {ip}...',
    'log-conn-success': 'Connection Successful!',
    'log-conn-failed': 'Connection Failed. Please check your LAN cable or modem IP address.',
    'log-conn-error': 'Connection error: {error}',
    'log-disconnecting': 'Disconnecting (Stopping ADB server)...',
    'log-disconnected': 'Disconnected.',
    'log-status-updated': 'Modem status updated. (Current TTL: {ttl}, NAT: {nat})',
    'log-status-failed': 'Status update failed: {error}',
    'err-status-query': 'Status query error: {error}',
    'log-fixing-ttl': 'Fixing TTL to {ttl}, please wait...',
    'log-fix-ttl-success': 'TTL Fixed Successfully!\nConsole Output:\n{output}',
    'log-fix-ttl-failed': 'Fixing TTL failed: {error}\nOutput:\n{output}',
    'log-sending-unlock': 'Sending unlock command...',
    'log-unlock-success': 'Unlock Command Sent Successfully!\nConsole Output:\n{output}',
    'log-unlock-failed': 'Unlock failed: {error}\nOutput:\n{output}',
    'log-sending-reboot': 'Sending reboot command...',
    'log-reboot-success': 'Modem is rebooting. After it shuts down, wait for it to power back on before connecting again.\nOutput:\n{output}',
    'log-reboot-failed': 'Reboot failed: {error}\nOutput:\n{output}',
    'log-updating-imei': 'Updating IMEI to {imei}...',
    'log-imei-success': 'IMEI changed successfully! Please REBOOT THE MODEM to apply changes.\nOutput:\n{output}',
    'log-imei-failed': 'IMEI change failed: {error}\nOutput:\n{output}',
    'log-stopping-adb': 'Stopping ADB Server...',
    'log-stop-adb-success': 'ADB Server stopped successfully.',
    'log-clear': 'Console cleared.',
    'confirm-unlock': 'Are you sure you want to unlock the modem?',
    'confirm-reboot': 'Are you sure you want to reboot the modem? (Modem connection will be lost)',
    'confirm-imei': 'Are you sure you want to write IMEI {imei} to the modem?',
    'val-valid': '✓ Valid Format',
    'val-digits': '{len}/15 digits',
    'err-invalid-ttl': 'Error: Please enter a valid TTL value between 1 and 255.',
    'err-invalid-imei': 'Error: IMEI must be a 15-digit number.',
    'err-invalid-ip': 'Error: Please enter a valid IP address.'
  }
};

// Translate Helper Function
function t(key, replacements = {}) {
    let text = uiTranslations[appState.lang][key] || key;
    for (const [placeholder, val] of Object.entries(replacements)) {
        text = text.replace(`{${placeholder}}`, val);
    }
    return text;
}

// Translate Entire Page
function translatePage() {
    const lang = appState.lang;
    const dict = uiTranslations[lang];
    
    // Page Title
    const pageTitleEl = document.getElementById('lbl-page-title');
    if (pageTitleEl) pageTitleEl.textContent = dict['lbl-page-title'];
    
    // Standard elements
    for (const [id, text] of Object.entries(dict)) {
        const el = document.getElementById(id);
        if (el) {
            if (text.includes('<') && text.includes('>')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    }
    
    // Placeholders
    customIpInput.placeholder = lang === 'tr' ? 'Örn: 192.168.0.1' : 'e.g. 192.168.0.1';
    imeiInput.placeholder = lang === 'tr' ? 'Örn: 358294050123456' : 'e.g. 358294050123456';
    
    // Refresh connection badge display text
    updateUIState();
}

// Console Logging Helpers
function logSystem(msg) {
    appendLog(msg, 'system-msg');
}

function logCmd(msg) {
    appendLog(msg, 'cmd-msg');
}

function logError(msg) {
    appendLog(msg, 'error-msg');
}

function appendLog(msg, type = '') {
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}] `;
    line.textContent = timeStr + msg;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Enable/Disable Action Elements based on Connection State
function updateUIState() {
    btnDisconnect.disabled = !appState.connected || appState.isLoading;
    btnConnect.disabled = appState.connected || appState.isLoading;
    
    btnRefreshStatus.disabled = !appState.connected || appState.isLoading;
    btnFixTtl.disabled = !appState.connected || appState.isLoading;
    btnUnlock.disabled = !appState.connected || appState.isLoading;
    btnReboot.disabled = !appState.connected || appState.isLoading;
    
    imeiInput.disabled = !appState.connected || appState.isLoading;
    validateImei(); // updates button state
    
    if (appState.connected) {
        statusDot.className = 'status-dot connected';
        statusText.textContent = `${t('status-connected')} (${appState.connectedIp})`;
        valConnectedIp.textContent = appState.connectedIp;
    } else {
        if (appState.isLoading) {
            statusDot.className = 'status-dot connecting';
            statusText.textContent = t('status-connecting');
        } else {
            statusDot.className = 'status-dot disconnected';
            statusText.textContent = t('status-disconnected');
            valConnectedIp.textContent = '-';
            valTtl.textContent = '-';
            valNat.textContent = '-';
        }
    }
}

// IP Select Event Handler
ipSelect.addEventListener('change', () => {
    if (ipSelect.value === 'custom') {
        customIpGroup.classList.remove('hidden');
    } else {
        customIpGroup.classList.add('hidden');
    }
});

function getTargetIp() {
    if (ipSelect.value === 'custom') {
        return customIpInput.value.trim();
    }
    return ipSelect.value;
}

// Connect Handler
btnConnect.addEventListener('click', async () => {
    const ip = getTargetIp();
    if (!ip) {
        logError(t('err-invalid-ip'));
        return;
    }

    appState.isLoading = true;
    updateUIState();
    logSystem(t('log-connecting', { ip }));

    try {
        const response = await fetch('/api/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip })
        });
        const data = await response.json();

        if (data.success) {
            appState.connected = true;
            appState.connectedIp = ip;
            logSystem(`${t('log-conn-success')}\nADB:\n${data.output}`);
            await getStatus();
        } else {
            appState.connected = false;
            logError(`${t('log-conn-failed')}\nADB:\n${data.output}`);
        }
    } catch (err) {
        logError(t('log-conn-error', { error: err.message }));
    } finally {
        appState.isLoading = false;
        updateUIState();
    }
});

// Disconnect Handler
btnDisconnect.addEventListener('click', async () => {
    appState.isLoading = true;
    updateUIState();
    logSystem(t('log-disconnecting'));

    try {
        const response = await fetch('/api/kill-server', { method: 'POST' });
        const data = await response.json();
        
        appState.connected = false;
        appState.connectedIp = '';
        logSystem(t('log-disconnected'));
        if (data.output) {
            logCmd(`ADB: ${data.output}`);
        }
    } catch (err) {
        logError(`Hata/Error: ${err.message}`);
    } finally {
        appState.isLoading = false;
        updateUIState();
    }
});

// Get Status Function
async function getStatus() {
    if (!appState.connected) return;
    
    const refreshIcon = btnRefreshStatus.querySelector('i');
    refreshIcon.classList.add('rotate-spinner');
    
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        if (data.success && data.connected) {
            valTtl.textContent = data.ttl || 'Bilinmiyor';
            const natText = data.nat === '1' ? t('nat-active') : (data.nat === '0' ? t('nat-passive') : data.nat);
            valNat.textContent = natText;
            logSystem(t('log-status-updated', { ttl: data.ttl || 'Bilinmiyor', nat: natText }));
        } else {
            logError(t('log-status-failed', { error: data.output || data.error }));
            if (!data.connected) {
                appState.connected = false;
                appState.connectedIp = '';
                updateUIState();
            }
        }
    } catch (err) {
        logError(t('err-status-query', { error: err.message }));
    } finally {
        refreshIcon.classList.remove('rotate-spinner');
    }
}

btnRefreshStatus.addEventListener('click', getStatus);

// Fix TTL Handler
btnFixTtl.addEventListener('click', async () => {
    const ttl = ttlInput.value.trim();
    if (!ttl || ttl < 1 || ttl > 255) {
        logError(t('err-invalid-ttl'));
        return;
    }

    appState.isLoading = true;
    updateUIState();
    logSystem(t('log-fixing-ttl', { ttl }));

    try {
        const response = await fetch('/api/fix-ttl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ttl })
        });
        const data = await response.json();

        if (data.success) {
            logSystem(t('log-fix-ttl-success', { output: data.output }));
            await getStatus();
        } else {
            logError(t('log-fix-ttl-failed', { error: data.error, output: data.output }));
        }
    } catch (err) {
        logError(`Hata/Error: ${err.message}`);
    } finally {
        appState.isLoading = false;
        updateUIState();
    }
});

// Unlock Modem Handler
btnUnlock.addEventListener('click', async () => {
    if (!confirm(t('confirm-unlock'))) {
        return;
    }

    appState.isLoading = true;
    updateUIState();
    logSystem(t('log-sending-unlock'));

    try {
        const response = await fetch('/api/unlock', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            logSystem(t('log-unlock-success', { output: data.output }));
        } else {
            logError(t('log-unlock-failed', { error: data.error, output: data.output }));
        }
    } catch (err) {
        logError(`Hata/Error: ${err.message}`);
    } finally {
        appState.isLoading = false;
        updateUIState();
    }
});

// Reboot Modem Handler
btnReboot.addEventListener('click', async () => {
    if (!confirm(t('confirm-reboot'))) {
        return;
    }

    appState.isLoading = true;
    updateUIState();
    logSystem(t('log-sending-reboot'));

    try {
        const response = await fetch('/api/reboot', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            logSystem(t('log-reboot-success', { output: data.output }));
            appState.connected = false;
            appState.connectedIp = '';
        } else {
            logError(t('log-reboot-failed', { error: data.error, output: data.output }));
        }
    } catch (err) {
        logError(`Hata/Error: ${err.message}`);
    } finally {
        appState.isLoading = false;
        updateUIState();
    }
});

// IMEI Live Validation
function validateImei() {
    const imei = imeiInput.value.trim();
    
    if (!appState.connected) {
        imeiValidationMsg.textContent = '';
        btnChangeImei.disabled = true;
        return;
    }

    if (imei === '') {
        imeiValidationMsg.textContent = '';
        btnChangeImei.disabled = true;
        return;
    }

    if (/^\d{15}$/.test(imei)) {
        imeiValidationMsg.textContent = t('val-valid');
        imeiValidationMsg.className = 'validation-status success';
        btnChangeImei.disabled = appState.isLoading;
    } else {
        imeiValidationMsg.textContent = t('val-digits', { len: imei.length });
        imeiValidationMsg.className = 'validation-status error';
        btnChangeImei.disabled = true;
    }
}

imeiInput.addEventListener('input', validateImei);

// Change IMEI Handler
btnChangeImei.addEventListener('click', async () => {
    const imei = imeiInput.value.trim();
    if (!/^\d{15}$/.test(imei)) {
        logError(t('err-invalid-imei'));
        return;
    }

    if (!confirm(t('confirm-imei', { imei }))) {
        return;
    }

    appState.isLoading = true;
    updateUIState();
    logSystem(t('log-updating-imei', { imei }));

    try {
        const response = await fetch('/api/change-imei', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imei })
        });
        const data = await response.json();

        if (data.success) {
            logSystem(t('log-imei-success', { output: data.output }));
        } else {
            logError(t('log-imei-failed', { error: data.error, output: data.output }));
        }
    } catch (err) {
        logError(`Hata/Error: ${err.message}`);
    } finally {
        appState.isLoading = false;
        updateUIState();
    }
});

// Kill ADB Server (Independent Button)
btnKillServer.addEventListener('click', async () => {
    logSystem(t('log-stopping-adb'));
    try {
        const response = await fetch('/api/kill-server', { method: 'POST' });
        const data = await response.json();
        appState.connected = false;
        appState.connectedIp = '';
        logSystem(t('log-stop-adb-success'));
        updateUIState();
    } catch (err) {
        logError(`Hata/Error: ${err.message}`);
    }
});

// Clear Console
btnClearConsole.addEventListener('click', () => {
    consoleOutput.innerHTML = '';
    logSystem(t('log-clear'));
});

// Language Switch Event Listeners
btnLangTr.addEventListener('click', () => {
    if (appState.lang === 'tr') return;
    appState.lang = 'tr';
    btnLangTr.classList.add('active');
    btnLangEn.classList.remove('active');
    translatePage();
    logSystem('Dil Türkçe olarak değiştirildi.');
});

btnLangEn.addEventListener('click', () => {
    if (appState.lang === 'en') return;
    appState.lang = 'en';
    btnLangEn.classList.add('active');
    btnLangTr.classList.remove('active');
    translatePage();
    logSystem('Language changed to English.');
});

// TTL Collapsible Event Listener
btnToggleTtlInfo.addEventListener('click', () => {
    const isHidden = ttlInfoContent.classList.contains('hidden');
    if (isHidden) {
        ttlInfoContent.classList.remove('hidden');
        ttlInfoIcon.classList.add('active');
    } else {
        ttlInfoContent.classList.add('hidden');
        ttlInfoIcon.classList.remove('active');
    }
});

// Initialize Page and UI
translatePage();
updateUIState();
