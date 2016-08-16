require('./obj');

require('./scr');

console.log("Starting execution...");

setDefinitions();

maintainCanvasFullscreen();

window.SL = SpriteController();

SL.init(spriteData);

JSGMF.createCanvas();

JSGMF.init();
