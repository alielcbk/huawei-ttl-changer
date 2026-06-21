# 📡 Huawei Modem Easy TTL & IMEI Changer (Control Panel)

[![Download ZIP](https://img.shields.io/badge/%E2%A4%87%20Download-Download%20ZIP-success?style=for-the-badge&logo=github)](https://github.com/alielcbk/huawei-ttl-changer/archive/refs/heads/main.zip)

A web-based local desktop application designed to easily fix TTL values, update IMEI settings (for repair purposes), and unlock SIM locks on Huawei modems.

---

### 🖥️ Interface Screenshot
![Huawei Modem Control Panel](public/app_screenshot.png)

---

## ✨ Features

*   🌐 **Bilingual Support (TR / EN):** Dynamically switch between Turkish and English using the toggle button in the top-right corner.
*   🚀 **TTL Fixing:**
    *   **Value: 64** $\rightarrow$ *For Social Media & Non-Shareable Packages*: Fix the modem's TTL to 64 so that computer traffic appears to come directly from the modem, utilizing your social media or non-shareable packages.
    *   **Value: 63** $\rightarrow$ *For Hotspot-Only Packages*: Fix the modem's TTL to 63 so that sharing traffic consumes specifically from your hotspot-designated data packages.
*   🔧 **IMEI Changer:** Safely update/restore the device's original IMEI for repair purposes with built-in 15-digit validation.
*   🔓 **SIM Unlock:** Send modem unlock commands to remove network restrictions with a single click.
*   🔄 **Modem Reboot:** Safely reboot the modem to apply changes.
*   📟 **Live ADB Logs:** Monitor all active backend ADB commands and outputs in real-time from the built-in terminal console.
*   🎨 **Premium UI/UX:** Modern dark glassmorphism theme with neon accents, responsive layout, and smooth micro-animations.

---

## 🛠️ Setup & Run

### Requirements
*   [Node.js](https://nodejs.org/) (Version 16 or higher is recommended)

### How to Run
1. Double-click the `baslat.bat` file in the project folder.
2. The script will automatically install the required dependencies (Express & Open), start the local backend server, and open your default web browser at `http://localhost:3000`.

---

## 📂 Project Structure

```text
├── bin/
│   ├── adb.exe             # ADB executable
│   ├── AdbWinApi.dll       # ADB dependency library
│   └── AdbWinUsbApi.dll    # USB driver library
├── public/
│   ├── index.html          # Dynamic multilingual UI front-page
│   ├── style.css           # Premium Glassmorphism CSS design stylesheet
│   ├── app.js              # Frontend translation, validation, and API controllers
│   └── app_screenshot.png  # Application interface screenshot
├── .gitignore              # Files to be ignored by Git (e.g. node_modules)
├── baslat.bat              # One-click automatic installer and startup script
├── package.json            # Project dependencies configuration
└── server.js               # Node.js Express backend server executing ADB shell commands
```

---

## ⚠️ Legal Warning

The IMEI change process should only be used to restore the original, corrupted, or lost IMEI number of the device (for repair purposes). Altering device identification details illegally may constitute a crime. All legal responsibility belongs to the user.
