'use strict'

import { app, protocol, BrowserWindow, screen} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import Options from './types/options'
import fs from 'fs';
const isDevelopment = process.env.NODE_ENV !== 'production'

const DEFAULT_WINDOW_SIZE_X = 1000;
const DEFAULT_WINDOW_SIZE_Y = 600;
const MIN_WINDOW_SIZE_X = Math.round(1920 / 3);
const MIN_WINDOW_SIZE_Y = Math.round(1080 / 3);

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

//load settings
const files = fs.readdirSync('./');
let foundOptionsFile = false;
for(const file of files){
  if(file === 'options.json'){
    foundOptionsFile = true;
    break;
  }
}

let options:Options;

if(foundOptionsFile){
  options = JSON.parse(fs.readFileSync('./options.json').toString());
}else{
  options = {
    build: -1,
    sizeX: undefined,
    sizeY: undefined,
    posX: undefined,
    posY: undefined,
    hardwareAcceleration: true
  };
}

async function createWindow() {
  //load window size, if no set in option use defaults
  const sizeX = options.sizeX || DEFAULT_WINDOW_SIZE_X;
  const sizeY = options.sizeY || DEFAULT_WINDOW_SIZE_Y;

  //make sure that the values are not to small
  sizeX < MIN_WINDOW_SIZE_X ? MIN_WINDOW_SIZE_X : sizeX;
  sizeY < MIN_WINDOW_SIZE_Y ? MIN_WINDOW_SIZE_Y : sizeY;

  //get the screen position for the window and the screen to use
  let posX:number;
  let posY:number;

  if(isNaN(options.posX as number) || isNaN(options.posY as number) ) {
    const primaryDisplay = screen.getPrimaryDisplay();
    const {width, height} = primaryDisplay.workAreaSize;
    posX = (width / 2) - (sizeX / 2);
    posY = (height / 2) - (sizeY / 2);
  } else {
    posX = options.posX as number;
    posY = options.posY as number;
  }

  //write options into options object
  options.sizeX = sizeX;
  options.sizeY = sizeY;
  options.posX = posX;
  options.posY = posY;

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
    frame: true,
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

  //show the window when its fully rendered
  win.once('ready-to-show', () => {win.show()})

  //save window settings on closing
  win.on('close', () => {
    const {width, height} = win.getBounds();
    const pos = win.getPosition();

    options.sizeX = width;
    options.sizeY = height;
    options.posX = pos[0];
    options.posY = pos[1];

    const fileContent = JSON.stringify(options);
    fs.writeFileSync('./options.json', fileContent);
  })

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

//disable Hardware acceleration if its defined in the options
if(!options.hardwareAcceleration){
  app.disableHardwareAcceleration()
  console.log('disabled Hardware Acceleration')
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
      console.log('[DEV] Trying to Install VUE3 Detools Extension')
      await installExtension(VUEJS3_DEVTOOLS)
      // eslint-disable-next-line
    } catch (e:any) {
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
