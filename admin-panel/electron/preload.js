import { contextBridge } from 'electron';

// Expose a safe API surface; extend as needed.
contextBridge.exposeInMainWorld('electron', {
    platform: process.platform,
});
