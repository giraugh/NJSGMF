
#define game settings
window.setDefinitions = () ->
  window.game_title = () -> "New Game" #SETS GAME NAME
  window.game_background = () -> '#FFFFFF' #SETS CANVAS BACKGROUND
  window.game_wbackground = () -> '#FFFFF' #SETS BODY BACKGROUND
  window.game_width = () -> props.windowWidth #SET CANVAS WIDTH
  window.game_height = () -> props.windowHeight #SETS CANVAS HEIGHT
  window.game_padding = () -> 0 #SET BODY MARGIN
  window.game_font = () -> "Lucida-Sans-Console"
  window.game_scale = [1, 1]
  window.get_left = () -> document.getElementById("canvas").getBoundingClientRect().left
  window.get_top = () -> document.getElementById("canvas").getBoundingClientRect().top

#Keep canvas at fullscreen (because game is designed to be put in an iframe)
window.maintainCanvasFullscreen = () ->
   game_width = ()->props.windowWidth
   game_height = ()->props.windowHeight
   window.requestAnimationFrame maintainCanvasFullscreen
