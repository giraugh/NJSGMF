window.update_windows = function() {
   if (Input.getInputPressed("quit")) {
      console.log("QUITTING APP")
      remote.app.quit();
   }
}
