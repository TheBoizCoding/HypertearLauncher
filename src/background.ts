'use strict'

import { app, protocol, BrowserWindow, screen} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import Options from './types/options'
const isDevelopment = process.env.NODE_ENV !== 'production'

const MIN_WINDOW_SIZE_X = Math.round(1920 / 3);
const MIN_WINDOW_SIZE_Y = Math.round(1080 / 3);

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

//TODO: Replace with proper Typings
let options:Options = {
  sizeX: undefined,
  sizeY: undefined,
  posX: undefined,
  posY: undefined
};

async function createWindow() {
  //load window size, if no set in option use defaults
  var sizeX = options.sizeX || 1050;
  var sizeY = options.sizeY || 600;

  //make sure that the values are not to small
  sizeX < MIN_WINDOW_SIZE_X ? MIN_WINDOW_SIZE_X : sizeX;
  sizeY < MIN_WINDOW_SIZE_Y ? MIN_WINDOW_SIZE_Y : sizeY;

  //get the screen position for the window and the screen to use
  var posX:number;
  var posY:number;

  if(options.posX == NaN || options.posY == NaN) {
    const primaryDisplay = screen.getPrimaryDisplay();
    const {width, height} = primaryDisplay.workAreaSize;
    posX = (width / 2) - (sizeX / 2);
    posY = (height / 2) - (sizeY / 2);
  } else {
    posX = options.posX as number;
    posY = options.posY as number;
  }

  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    paintWhenInitiallyHidden: true,
    width: sizeX,
    height: sizeY,
    x: posX,
    y: posY,
    minWidth: MIN_WINDOW_SIZE_X,
    minHeight: MIN_WINDOW_SIZE_Y,
    autoHideMenuBar: true,
    frame: false,
    acceptFirstMouse: true,
    roundedCorners: false,
    title: 'Launcher',
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  win.once('ready-to-show', () => {win.show()})

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (process.env.SHOW_DEVTOOLS) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e: any) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
