/*
This is the spritecontroller class
the engine creates one of these at runtime, it is called "SL".

Sprites are defined in obj/Sprites.js and you can access them like this:
   sprite = SL.Sprite(<SPRITENAME>);

to draw:
   sprite.draw(x,y,ctx);
or if manually:
   image = sprite.get();
or
   image = SL.get(<SPRITENAME>);

Note: You can use 'n' in place of natural size,
but only locally as it doesnt work with loading delays

*/

class SpriteController {
  constructor () {
    this.Sprites = undefined;
    this.initialized = false;

    //Called in Main.js (Initialises Sprite Controller)
    this.init = function(x) {
      this.initialized = true;
      this.Sprites = x;
      this.len = Object.keys(this.Sprites).length;
      window.setTimeout(function() {SL.fixN()},6);
      window.setTimeout(function() {SL.fixN()},300);
    }

    this.fixN = function() {
      //set up natural
      for (var s in this.Sprites) {
          let spr = this.Sprites[s];
          let wi = spr.width;
          let he = spr.height;
          let fw = spr.frameSize[0];
          let fh = spr.frameSize[1];
          let src = spr.src;
          let img = new Image();
          img.src = src;
          let nw = img.naturalWidth;
          let nh = img.naturalHeight;

          if (wi == "n") {spr.width = nw;}
          if (he == "n") {spr.height = nh;}
          if (fw == "n") {spr.frameSize[0] = nw;}
          if (fh == "n") {spr.frameSize[1] = nh;}
      }
   }

    //Returns Sprite used like SL.Sprite(<SpriteName>)
    this.Sprite = function(x) {
      let obj = this.Sprites[x];

      //Add Sprite Functions
      obj.get = function() {
         let img = new Image();
         img.src = this.src;
         return img;
      }

      obj.toShape = function(x,y) {
         if (typeof Shape != "undefined") {
            let width = this.width*this.scale[0];
            let height = this.height*this.scale[1];
            let dx = (x || 0) - (this.center||[0,0])[0];
            let dy = (y || 0) - (this.center||[0,0])[1];
            let shape =  new Shape(dx,dy,width,height);
            shape.add((this.shapeOffset || [0,0,0,0]).toShape());
            return shape;
         }
      }

      obj.getDrawArgs = function(x,y) {
         let args = {
            'sx': this.frameOffset[0],
            'sy': this.frameOffset[1],
            'sWidth': this.frameSize[0],
            'sHeight': this.frameSize[1],
            'scale': this.scale,
            'dWidth': this.width*this.scale[0],
            'dHeight': this.height*this.scale[1],
            'height': this.height,
            'width': this.width,
            'dx': (x || 0) - (this.center||[0,0])[0],
            'dy': (y || 0) - (this.center||[0,0])[1]
         }
         return args;
      }

      obj.draw = function(x,y,ctx,alpha) {
         let img = new Image();
         alpha = (alpha == 0) ? -1 : alpha;
         alpha = alpha || 1;
         alpha = (alpha == -1) ? 0 : alpha;
         img.src = this.src;

         let args = this.getDrawArgs(x,y);
         ctx.globalAlpha = alpha;
         ctx.drawImage(img, args.sx, args.sy, args.sWidth, args.sHeight, args.dx, args.dy, args.dWidth, args.dHeight);
         ctx.globalAlpha = 1.0;
      }

      return obj;
    }

    //This is a shortcut, used like SL.drawSprite("spriteName",xPos,yPos,2dCanvasContext)
    this.drawSprite = function(sprite,x,y,ctx) {
      let spr = this.Sprite(sprite);
      spr.draw(x,y,ctx);
    }

    //This is a shortcut, used like SL.get(<SpriteName>)
    this.get = function(x) {
      let spr = this.Sprites[x];
      let a = new Image();
      a.src = spr.src;
      return a;
   }

    //Used to add sprite after initialization
    this.addSprite = function(name,src,width,height) {
      this.Sprites[name] = {};
      this.Sprites[name].src = src;
      this.Sprites[name].width = width;
      this.Sprites[name].height = height;
      return this.Sprites[name];
    }
  }
}
