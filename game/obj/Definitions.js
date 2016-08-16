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
    return 2000;
  };
  window.game_height = function() {
    return 1000;
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
  var scale, scale_x, scale_y;
  scale_x = innerWidth / game_width();
  scale_y = innerHeight / game_height();
  scale = Math.min(Math.min(scale_x, scale_y), 1);
  window.game_scale = [scale, scale];
  return window.requestAnimationFrame(maintainCanvasFullscreen);
};
