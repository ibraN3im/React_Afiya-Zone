import { app, BrowserWindow } from 'electron';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
    const iconPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'icon.png');
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: iconPath,
        webPreferences: {
            // Use module URL to compute correct path regardless of CWD
            preload: path.join(path.dirname(fileURLToPath(import.meta.url)), 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:5173/');
        win.webContents.openDevTools();
    } else {
        // If packaged, the dist is at admin-panel/dist relative to this file
        win.loadFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
