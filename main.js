// Modules to control application life and create native browser window
const {app,session, BrowserView,BrowserWindow} = require('electron')
const path = require('path')





app.allowRendererProcessReuse=true;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag:true
    }
  })

  // let view = new BrowserView({
  //   webPreferences : {
  //     enableRemoteModule:true
  //   }
  // })
  // mainWindow.addBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 400, height: 400 })
  // view.webContents.loadURL('https://webleash.symphonic.dev/auth/login')  


  // let view2 = new BrowserView({
  //   webPreferences : {
  //     enableRemoteModule:true
  //   }
  // })
  // mainWindow.addBrowserView(view2)
  // view2.setBounds({ x: 450, y: 0, width: 400, height: 400 })
  // view2.webContents.loadURL('https://webleash.symphonic.dev/auth/login')

  

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'SuperDuperAgent';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });



  // and load the index.html of the app.
  mainWindow.loadFile('index2.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
