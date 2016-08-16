# Linking Game Objects...
require './obj'

# Linking Game Scripts...
require './scr'

console.log "Starting execution..."
setDefinitions() #From Definitions.js
maintainCanvasFullscreen() #From Definitions.js

#Create Sprite Loader
window.SL = SpriteController()
SL.init spriteData #Data from obj/Sprites.js

JSGMF.createCanvas()
JSGMF.init()
