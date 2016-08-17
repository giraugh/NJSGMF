
/*
   GUI Library written for JSGMF in coffeescript,
   * requires JSGMF Maths, Colours & Inputs library *

   Example (coffeescript)
      a = gui()
      a.rect 100, 100
      a.shape guiShapes.round_rect
      a.background "Red"
      a.mouseEnter ()->if not @transformed then @background "Green"
      a.mouseExit ()->if not @transformed then @background "Red"
      a.onClick ()->
         @become "Yellow", 100
         @transformed = true
      a.fadeIn(100)

   Example (javascript)
      let a = gui();
      a.rect(100, 100);
      a.shape(guiShapes.round_rect);
      a.background("Red");
      a.mouseEnter(function() {
        if (!this.transformed)
          this.background("Green");
      });
      a.mouseExit(function() {
        if (!this.transformed)
          this.background("Red");
      });
      a.click(function() {
        this.transformed = true;
        this.become("Yellow", 200);
      });
      a.fadeIn(100);
 */

window.guiWorld = [];

window.guiShapes = {
  rect: "Rectangle",
  rectangle: "Rectangle",
  round_rect: "Rounded Rectangle",
  rounded_rect: "Rounded Rectangle",
  roundedRect: "Rounded Rectangle",
  roundedRectangle: "Rounded Rectangle"
};

window.gui = function() {
  var ret;
  ret = {
    _label: "gui element",
    _position: Vector(0, 0),
    _scale: Vector(100, 100),
    _shape: guiShapes.rect,
    _radius: 5,
    _background: '#000',
    _alpha: 1.0,
    _fill: true,
    _operations: [],
    _font: "40px Lucida Sans Console",
    _fontBaseline: "middle",
    _fontAlign: "center",
    _font_colour: "Black",
    _mouseState: {
      isHovering: false
    },
    _onClick: function() {
      return this;
    },
    _onMouseEnter: function() {
      return this;
    },
    _onMouseExit: function() {
      return this;
    },
    _onLoop: function() {
      return this;
    },
    font_colour: function(font_colour) {
      if (font_colour == null) {
        font_colour = this._font_colour;
      }
      this._font_colour = font_colour;
      return this;
    },
    set: function(name, data) {
      this["_" + name] = data;
      return this;
    },
    get: function(name) {
      return this["_" + name];
    },
    font: function(font) {
      if (font == null) {
        font = this._font;
      }
      this._font = font;
      return this;
    },
    font_align: function(align) {
      if (align == null) {
        align = this._fontAlign;
      }
      this._fontAlign = align;
      return this;
    },
    font_baseLine: function(baseLine) {
      if (baseLine == null) {
        baseLine = this._fontBaseLine;
      }
      this._fontBaseLine = baseLine;
      return this;
    },
    label: function(label) {
      if (label == null) {
        label = this._label;
      }
      this._label = label;
      return this;
    },
    alpha: function(alpha) {
      if (alpha == null) {
        alpha = 1.0;
      }
      this._alpha = alpha;
      return this;
    },
    shape: function(shape, radius) {
      if (shape == null) {
        shape = guiShapes.rect;
      }
      if (radius == null) {
        radius = 5;
      }
      this._shape = shape;
      this._radius = radius;
      return this;
    },
    fill: function(fill) {
      if (fill == null) {
        fill = true;
      }
      this._fill = fill;
      return this;
    },
    background: function(background) {
      if (background == null) {
        background = "#000";
      }
      this._background = background;
      return this;
    },
    click: function(fun) {
      this._onClick = fun;
      return this;
    },
    loop: function(fun) {
      this._onLoop = fun;
      return this;
    },
    mouseEnter: function(fun) {
      this._onMouseEnter = fun;
      return this;
    },
    mouseExit: function(fun) {
      this._onMouseExit = fun;
      return this;
    },
    position: function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this._position = Vector(x, y);
      return this;
    },
    scale: function(mag) {
      if (mag == null) {
        mag = 1;
      }
      this._scale.add(Vector(this._scale.x() * mag, this._scale.y() * mag));
      return this;
    },
    size: function(x, y) {
      if (x == null) {
        x = this._scale.x();
      }
      if (y == null) {
        y = this._scale.y();
      }
      this._scale = Vector(x, y);
      return this;
    },
    rect: function(x, y, width, height) {
      if (x == null) {
        x = this._position.x();
      }
      if (y == null) {
        y = this._position.y();
      }
      if (width == null) {
        width = this._scale.x();
      }
      if (height == null) {
        height = this._scale.y();
      }
      this._position = Vector(x, y);
      this._scale = Vector(width, height);
      return this;
    },
    operate: function(string, time, target, start) {
      if (string == null) {
        string = "alpha";
      }
      if (time == null) {
        time = 100;
      }
      if (target == null) {
        target = 1;
      }
      if (start == null) {
        start = this["_" + string];
      }
      this._operations.push({
        name: string,
        start: start,
        target: target,
        time: time,
        current: 0
      });
      return this;
    },
    fadeIn: function(time) {
      this.operate("alpha", time, 1, 0);
      return this;
    },
    fadeOut: function(time) {
      this.operate("alpha", time, 0, 1);
      return this;
    },
    become: function(colour, time) {
      if (colour == null) {
        colour = this._background;
      }
      if (time == null) {
        time = 100;
      }
      return this.operate("background", time, colour);
    },
    doClick: function() {
      this._onClick();
      return this;
    },
    doLoop: function() {
      this._onLoop();
      return this;
    },
    doUpdate: function() {
      this._update();
      return this;
    },
    doMouseEnter: function() {
      this._onMouseEnter();
      return this;
    },
    doMouseExit: function() {
      this._onMouseExit();
      return this;
    },
    toShape: function() {
      return Shape(this._position.x(), this._position.y(), this._scale.x(), this._scale.y());
    },
    update: function() {
      var i, isHovering, mouse, op, ref, shape, updateOperations;
      mouse = {
        click: Input.getMouse("left"),
        x: Input.getMouse("x"),
        y: Input.getMouse("y"),
        shape: function() {
          return Shape(this.x, this.y, 1, 1);
        }
      };
      shape = Shape(this._position.x(), this._position.y(), this._scale.x(), this._scale.y());
      isHovering = shape.overlaps(mouse.shape());
      if (!this._mouseState.isHovering && isHovering) {
        this.doMouseEnter();
      }
      if (this._mouseState.isHovering && !isHovering) {
        this.doMouseExit();
      }
      this._mouseState.isHovering = isHovering;
      if (mouse.click === 2 && isHovering) {
        this.doClick();
      }
      updateOperations = (function(_this) {
        return function(op, id) {
          if (op == null) {
            return false;
          }
          if (op.current === op.time + 1) {
            _this._operations.splice(id, 1);
            return false;
          }
          if (typeof _this["_" + op.name] !== "string") {
            _this["_" + op.name] = lerp(op.start, op.target, op.current / op.time);
          }
          if (typeof _this["_" + op.name] === "string") {
            _this["_" + op.name] = colourToHex(_this["_" + op.name]).colToArr().lerp(colourToHex(op.target).colToArr(), op.current / op.time).round().arrToCol();
          }
          return op.current++;
        };
      })(this);
      for (op = i = 0, ref = this._operations.length; 0 <= ref ? i < ref : i > ref; op = 0 <= ref ? ++i : --i) {
        updateOperations(this._operations[op], op);
      }
      return this.doLoop();
    },
    draw: function(ctx) {
      var height, width, x, y;
      ctx.fillStyle = this._background;
      ctx.globalAlpha = this._alpha;
      x = this._position.x();
      y = this._position.y();
      width = this._scale.x();
      height = this._scale.y();
      switch (this._shape) {
        case "Rectangle":
          if (this._fill) {
            ctx.fillRect(x, y, width, height);
          } else {
            ctx.strokeRect(x, y, width, height);
          }
          break;
        case "Rounded Rectangle":
          ctx.beginPath();
          ctx.moveTo(x + this._radius, y);
          ctx.lineTo(x + width - this._radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + this._radius);
          ctx.lineTo(x + width, y + height - this._radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - this._radius, y + height);
          ctx.lineTo(x + this._radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - this._radius);
          ctx.lineTo(x, y + this._radius);
          ctx.quadraticCurveTo(x, y, x + this._radius, y);
          ctx.closePath();
          if (this._fill) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
      }
      ctx.font = this._font;
      ctx.textAlign = this._fontAlign;
      ctx.textBaseline = this._fontBaseline;
      ctx.fillStyle = "" + this._font_colour;
      ctx.fillText(this._label, this._position.x() + (this._scale.x() / 2), this._position.y() + (this._scale.y() / 2));
      return ctx.globalAlpha = 1;
    }
  };
  guiWorld.push(ret);
  return ret;
};

window.update_gui = function() {
  var element, i, len, results;
  results = [];
  for (i = 0, len = guiWorld.length; i < len; i++) {
    element = guiWorld[i];
    results.push(element.update());
  }
  return results;
};

window.draw_gui = function(ctx) {
  var element, i, len, results;
  results = [];
  for (i = 0, len = guiWorld.length; i < len; i++) {
    element = guiWorld[i];
    results.push(element.draw(ctx));
  }
  return results;
};
