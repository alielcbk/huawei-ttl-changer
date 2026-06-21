# 📡 Huawei Modem TTL & IMEI Changer

A local web interface to configure TTL values, update IMEI, and unlock SIM on Huawei modems via ADB.

[![Download ZIP](https://img.shields.io/badge/%E2%A4%87%20Download-Download%20ZIP-success?style=for-the-badge&logo=github)](https://github.com/alielcbk/huawei-ttl-changer/archive/refs/heads/main.zip)

## 🖥️ Interface

![Interface Screenshot](public/app_screenshot.png)

## ✨ Features

* 🌐 **Bilingual UI:** Turkish and English support.
* 🚀 **TTL Configuration:**
  * **64**: For Social Media & Non-Shareable Packages.
  * **63**: For Hotspot-Only Packages.
* 🔧 **IMEI Changer:** Update or restore IMEI with 15-digit validation.
* 🔓 **SIM Unlock:** Send modem unlock commands.
* 🔄 **Modem Reboot:** Reboot the modem to apply changes.
* 📟 **Live ADB Logs:** View backend ADB commands and outputs in real-time.

## 🚀 Usage

### 📦 Method 1: Standalone Executable (Recommended)
No dependencies required.

1. Download the release.
2. Navigate to the `dist/` directory.
3. Run `huawei-ttl-changer.exe`.
4. The interface will open in your default browser at `http://localhost:3000`.

*Note: The `bin/` folder must remain in the same directory as the executable.*

### 💻 Method 2: From Source
Requires Node.js 16 or higher.

1. Clone or download the repository.
2. Run `baslat.bat`.
3. The script will install dependencies, start the backend, and open `http://localhost:3000`.

## 📂 Directory Structure

```text
├── bin/               # ADB binary and DLLs
├── public/            # Frontend assets (HTML, CSS, JS, Images)
├── dist/              # Compiled standalone executable
├── .gitignore         
├── baslat.bat         # Startup script for source mode
├── package.json       
└── server.js          # Express backend for ADB execution
```

## ⚠️ Legal Warning

The IMEI change function is strictly for restoring the original, corrupted, or lost IMEI number of the device for repair purposes. Altering device identification details illegally may constitute a crime. All legal responsibility belongs to the user.
