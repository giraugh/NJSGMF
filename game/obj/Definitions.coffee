
#define game settings
window.setDefinitions = () ->
  window.game_title = () -> "New Game" #SETS GAME NAME
  window.game_background = () -> '#FFFFFF' #SETS CANVAS BACKGROUND
  window.game_wbackground = () -> '#FFFFF' #SETS BODY BACKGROUND
  window.game_width = () -> 2000 #SET CANVAS WIDTH
  window.game_height = () -> 1000 #SETS CANVAS HEIGHT
  window.game_padding = () -> 0 #SET BODY MARGIN
  window.game_font = () -> "Lucida-Sans-Console"
  window.game_scale = [1, 1]
  window.get_left = () -> document.getElementById("canvas").getBoundingClientRect().left
  window.get_top = () -> document.getElementById("canvas").getBoundingClientRect().top

#Keep canvas at fullscreen (because game is designed to be put in an iframe)
window.maintainCanvasFullscreen = () ->
   scale_x = innerWidth / game_width()
   scale_y = innerHeight / game_height()
   scale = Math.min (Math.min scale_x, scale_y), 1
   window.game_scale = [scale, scale]
   window.requestAnimationFrame maintainCanvasFullscreen
