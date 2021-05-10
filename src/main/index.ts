import { app, BrowserWindow, session } from 'electron';
import * as path from 'path';
import * as url from 'url';
import os from 'os';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
  } else {
    mainWindow.loadURL(
      url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
      })
    );
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    createWindow()
  }
})

app.whenReady().then(() => {
  if (mainWindow) {
    mainWindow?.webContents.on('did-frame-finish-load', async () => {
      installExtension([REACT_DEVELOPER_TOOLS]).then((name) => {
        console.log(`Installed: ${name}`)
        mainWindow?.webContents.openDevTools()
      }).catch((e) => {
        console.error(e)
      })
    })
  }
})