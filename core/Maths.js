//Maths Definitions and classes (like vectors and trig functions)

//Generic
function sign(x) {
  return x == 0 ? 0 : x < 0 ? -1 : 1;
}

function lerp(a,b,t) {
  return a+((b-a)*t);
}

/*Uses Function instead of class to allow for chaining, i.e:
Vector(1,1).add(Vector(3,2)).subtract(Vector(3,3)).toString() //is "[1,0]"
*/
function Vector(arr) {
  var v = {};
  v.v = [];
  arr = Array.prototype.slice.call(arguments);
  for (i in arr) {
    v.v[i] = arr[i];
  }

  v.add = function(v2) {
    for (var i in v2.v) {
      this.v[i] += +v2.v[i];
    }
    return this;
  }

  v.subtract = function(v2) {
    for (var i in v2.v) {
      this.v[i] -= +v2.v[i];
    }
    return this;
  }

  v.toString = function() {
    return "["+this.v.toString()+"]";
  }

  v.x = function(x) {
    this.v[0] = x || this.v[0];
    return this.v[0];
  }

  v.y = function(y) {
    this.v[1] = y || this.v[1];
    return this.v[1];
  }

  v.z = function(z) {
    this.v[2] = z || this.v[2];
    return this.v[2];
  }

  v.addX = function(x) {
     this.v[0] += x;
     return this.v[0];
  }

  v.addY = function(y) {
     this.v[1] += y;
     return this.v[1];
  }

  v.lerp = function(b, t) {
     this.v.lerp(b.v, t)
     return this
 }

  return v;
}

function List() {
   let ret = {};
   ret.arr = Array.prototype.slice.call(arguments)||[];
   ret.get = function(x){return this.arr[x];}
   ret.set = function(i,x){return this.arr[i] = x;}
   ret.top = function(){return this.arr[0];}
   ret.bottom = function(){return this.arr[this.arr.length-1];}
   ret.add = function(x){this.arr.push(x);return this.arr;}
   ret.pop = function(x){return this.arr.splice(0, 1);}
   return ret;
}

class Shape {
  constructor (x,y,width,height) {
    this.position = Vector(x,y);
    this.scale = Vector(width,height);
  }

  x(x) {return this.position.x(x);}
  y(y) {return this.position.y(y);}
  width(x) {return this.scale.x(x);}
  height(y) {return this.scale.y(y);}
  addX(x){this.position.addX(x);}
  addY(y){this.position.addY(y);}
  addWidth(x){this.scale.addX(x);}
  addHeight(y){this.scale.addY(y);}
  right(){return this.position.x()+this.scale.x();}
  bottom(){return this.position.y()+this.scale.y();}
  left(){return this.position.x()}
  top(){return this.position.y()}
  add(x){
     this.addX(x.x());
     this.addY(x.y());
     this.addWidth(x.width());
     this.addHeight(x.height());
  }
  take(x){
    this.addX(-x.x());
    this.addY(-x.y());
    this.addWidth(-x.width());
    this.addHeight(-x.height());
  }
  overlaps(shape) {
    var x1l = this.x();var x1r = x1l+this.width();
    var y1t = this.y();var y1b = y1t+this.height();
    var x2l = shape.x();var x2r = x2l+shape.width();
    var y2t = shape.y();var y2b = y2t+shape.height();
    return !(x1l >= x2r || x1r <= x2l || y1b <= y2t || y1t >= y2b);
  }
  toString() {
     return ""+this.x()+","+this.y()+" : "+this.width()+"x"+this.height();
  }
  draw(ctx,style) {
     ctx.fillStyle = style || ctx.fillStyle
     ctx.fillRect(this.x(),this.y(),this.width(),this.height())
 }
}

//Arrays
Array.prototype.toShape = function() {
   return new Shape(this[0],this[1],this[2],this[3]);
}

Array.prototype.random = function() {
   return this[Math.floor(Math.random()*this.length)];
}

Array.prototype.remove = function() {
   this.reverse();
   this.pop();
   this.reverse();
}

Array.prototype.insert = function(x) {
   this.reverse();
   this.push(x);
   this.reverse();
}

Array.prototype.lerp = function(b,t) {
   for (let i = 0;i<this.length;i++) {
      this[i] = lerp(this[i], b[i], t);
   }
   return this;
}

Array.prototype.round = function(b,t) {
   for (let i = 0;i<this.length;i++) {
      this[i] = Math.round(this[i]);
   }
   return this;
}

Array.prototype.arrToCol = function() {
   let num1 = this[0].toString(16);
   let num2 = this[1].toString(16);
   let num3 = this[2].toString(16);
   if (num1.length == 1){num1 = "0"+num1;}
   if (num2.length == 1){num2 = "0"+num2;}
   if (num3.length == 1){num3 = "0"+num3;}
   return "#" + num1 + num2 + num3;
}

Array.prototype.shuffle = function() {
   var m = this.length, t, i;
   while (m) {
      i = Math.floor(Math.random() * m--);
      t = this[m]
      this[m] = this[i]
      this[i] = t
   }
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


//Colours
String.prototype.colToArr = function(){
   //Returns array of Colours
   let c1 = parseInt(this[1] + this[2], 16);
   let c2 = parseInt(this[3] + this[4], 16);
   let c3 = parseInt(this[5] + this[6], 16);
   return [c1, c2, c3];
}
