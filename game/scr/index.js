var key;

console.log('Linking Script Definitions...');

reqall(__dirname + "\\");

if (props.autoGenEvents) {
  console.log('Dynamically Creating Game Event Functions');
  window.updateFunctions = [];
  window.drawFunctions = [];
  window.initFunctions = [];
  for (key in window) {
    if (typeof window[key] === "function") {
      if (key.toLowerCase().replace('update_', "") !== key.toLowerCase()) {
        updateFunctions.push(window[key]);
      }
    }
  }
  for (key in window) {
    if (typeof window[key] === "function") {
      if (key.toLowerCase().replace('draw_', "") !== key.toLowerCase()) {
        drawFunctions.push(window[key]);
      }
    }
  }
  for (key in window) {
    if (typeof window[key] === "function") {
      if (key.toLowerCase().replace('init_', "") !== key.toLowerCase()) {
        initFunctions.push(window[key]);
      }
    }
  }
  window.game_update = function() {
    var func, i, len, results;
    results = [];
    for (i = 0, len = updateFunctions.length; i < len; i++) {
      func = updateFunctions[i];
      results.push(func());
    }
    return results;
  };
  window.game_draw = function(ctx) {
    var func, i, len, results;
    game_update();
    results = [];
    for (i = 0, len = drawFunctions.length; i < len; i++) {
      func = drawFunctions[i];
      results.push(func(ctx));
    }
    return results;
  };
  window.game_init = function() {
    var func, i, len, results;
    results = [];
    for (i = 0, len = initFunctions.length; i < len; i++) {
      func = initFunctions[i];
      results.push(func());
    }
    return results;
  };
}
