window.setDefinitions = function() {
  window.game_title = function() {
    return "New Game";
  };
  window.game_background = function() {
    return '#FFFFFF';
  };
  window.game_wbackground = function() {
    return '#FFFFF';
  };
  window.game_width = function() {
    return props.windowWidth;
  };
  window.game_height = function() {
    return props.windowHeight;
  };
  window.game_padding = function() {
    return 0;
  };
  window.game_font = function() {
    return "Lucida-Sans-Console";
  };
  window.game_scale = [1, 1];
  window.get_left = function() {
    return document.getElementById("canvas").getBoundingClientRect().left;
  };
  return window.get_top = function() {
    return document.getElementById("canvas").getBoundingClientRect().top;
  };
};

window.maintainCanvasFullscreen = function() {
  var game_height, game_width;
  game_width = function() {
    return props.windowWidth;
  };
  game_height = function() {
    return props.windowHeight;
  };
  return window.requestAnimationFrame(maintainCanvasFullscreen);
};
