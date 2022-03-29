/*
const electron = require('electron');
const { app, BrowserWindow, screen } = electron;
const path = require('path');

const fs = require("fs");

let build = -1;

let isMaximized = false;

let mainWindow;

let options;

let gameInstance;

function createWindow () {
  var sizeX = 1050;
  var sizeY = 600;
  sizeX = options.sizeX;
  sizeY = options.sizeY;
  if(sizeX < 500) {
    sizeX = 500;
  }
  if(sizeY < 500) {
    sizeY = 500;
  }

  var posX = 200;
  var posY = 200;

  if(options.posX == "NaN" || options.posY == "NaN") {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize;
    posX = (width / 2) - (sizeX / 2);
    posY = (height / 2) - (sizeY / 2);
  }
  else{
    posX = options.posX;
    posY = options.posY;
  }
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: sizeX,
    height: sizeY,
    x: posX,
    y: posY,
    minHeight: 500,
    minWidth: 500,
    autoHideMenuBar:true,
    frame: false,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.once('ready-to-show', () => {mainWindow.show()})

  mainWindow.on('unmaximize', () => {
    isMaximized = false;
  })

  mainWindow.on('maximize', () => {
    isMaximized = true;
  })

  mainWindow.on('close', () => {
    const {width, height} = mainWindow.getBounds();
    const pos = mainWindow.getPosition();
    console.log("Saving Window size with values: " + width + "x" + height)
    console.log("Saving Window position with values: x: " + pos[0], " y: " + pos[1])
    const version = build;
    var fileContents = JSON.stringify({ 
      build: version,
      sizeX: width,
      sizeY: height,
      posX: pos[0],
      posY: pos[1]
    });
    fs.writeFileSync('./options.json', fileContents);
  })

  mainWindow.loadFile('main.html')
}

// app.disableHardwareAcceleration()

app.whenReady().then(() => {
  options = JSON.parse(fs.readFileSync("./options.json"));
  build = options.build;
  console.log("Starting HyperTear Launcher build " + build)
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const {ipcMain} = electron;
ipcMain.on('close', (evt, arg) => {
  mainWindow.close();
});

ipcMain.on('maximize', (evt, arg) => {
  var window = BrowserWindow.getFocusedWindow();
  if (!isMaximized) {
      window.maximize();
      isMaximized = true;
  }
  else {
      window.unmaximize();
      isMaximized = false;
  }
});

ipcMain.on('minimize', (evt, arg) => {
  BrowserWindow.getFocusedWindow().minimize()
});

ipcMain.on('play', (evt, arg) => {

})

ipcMain.on('reset', (evt, arg) => {
  const primaryDisplay = screen.getPrimaryDisplay()
  var { width, height } = primaryDisplay.workAreaSize;
  width = (width / 2) - 525;
  height = (height / 2) - 300;
  mainWindow.setPosition(width, height);
  mainWindow.setSize(1050, 600);
})
*/