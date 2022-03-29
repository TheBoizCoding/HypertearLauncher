/*
mainWindow.on('unmaximize', () => {
  isMaximized = false;
})

mainWindow.on('maximize', () => {
  isMaximized = true;
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