// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
// some config of this soft....
const config = require('./config/main')
const global = require('./config/global')
const path = require('path')
// init remote modal
require('@electron/remote/main').initialize()


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // allow webpage call inner function
    webPreferences: {
      webSecurity:false,
      nodeIntegration:true,
      allowRunningInsecureContent:true,
      contextIsolation:false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.on('close',(e)=>{
    app.quit()
  })



  //allow webpage call main process function.
  require('@electron/remote/main').enable(mainWindow.webContents)

  // error url example
  // mainWindow.loadURL('http://51coolpfgflay.cc')
  mainWindow.loadFile('./view/system/fail.html')
  // true url example
  // global.loadURL(mainWindow,'https://www.qq.com')


  // Open the DevTools.
  if(config.isDev){
  mainWindow.webContents.openDevTools()
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
