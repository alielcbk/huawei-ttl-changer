@echo off
title Huawei TTL & IMEI Degistirici Baslatici
cd /d "%~dp0"

echo ======================================================
echo     Huawei Modem TTL ve IMEI Degistirici GUI
echo ======================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Hata: Node.js bilgisayarinizda kurulu degil!
    echo Lütfen https://nodejs.org/ adresinden kurup tekrar deneyin.
    pause
    exit /b
)

:: Check if node_modules exists, install dependencies if not
if not exist node_modules (
    echo Bağımlılıklar eksik. Yükleniyor, lütfen bekleyin...
    call npm install
)

echo Sunucu baslatiliyor...
echo Tarayiciniz otomatik olarak acilacaktir...
echo.

call npm start

pause
