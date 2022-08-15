const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const {autoUpdater} = require('electron-updater');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  ipcMain.handle('app_version', (e) => app.getVersion());

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});


//check for updates and notify the renderer process
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

//download the update and notify the renderer process
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

//restart the app and install the update 
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});