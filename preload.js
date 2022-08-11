const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    ping: () => ipcRenderer.invoke('ping'),
    restart: () => ipcRenderer.invoke('restart_app'),
    appVersion : () => ipcRenderer.invoke('app_version'),
    onUpdateAvailable: (handler) => ipcRenderer.on('update_available', handler),    
    onUpdateDownloaded: (handler) => ipcRenderer.on('update_downloaded', handler),    
});