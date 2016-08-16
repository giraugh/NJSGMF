module.exports = function() {
  var BrowserWindow, app, createWindow, ref, win;
  ref = require('electron'), app = ref.app, BrowserWindow = ref.BrowserWindow;
  win = null;
  createWindow = function() {
    win = new BrowserWindow({
      width: props.windowWidth,
      height: props.windowHeight,
      frame: props.windowFrame,
      resizable: props.windowResize,
      fullscreen: props.windowFullscreen,
      thickFrame: props.windowFrameThick
    });
    win.loadURL("file://" + __dirname + "/index.html");
    if (props.openDevToolsStart) {
      win.webContents.openDevTools();
    }
    return win.on('closed', function() {
      return win = null;
    });
  };
  app.on('ready', createWindow);
  app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      return app.quit();
    }
  });
  return app.on('activate', function() {
    if (win == null) {
      return createWindow();
    }
  });
};
