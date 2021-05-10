import { app, BrowserWindow } from 'electron';

export const createMainWindow: () => BrowserWindow = () => {
  let window: BrowserWindow | null = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:4000`);
  } else {
    window.loadURL(
      url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
      })
    );
  }
  
  window.on('closed', () => {
    window = null;
  });

  return window
}