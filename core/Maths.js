//Maths Definitions and classes (like vectors and trig window.s)

//Generic
window.sign = function(x) {
  return x == 0 ? 0 : x < 0 ? -1 : 1;
}

window.lerp = function(a,b,t) {
  return a+((b-a)*t);
}

/*Uses window.instead of class to allow for chaining, i.e:
Vector = function(1,1).add(Vector(3,2)).subtract(Vector(3,3)).toString() //is "[1,0]"
*/
window.Vector = function(arr) {
  var ve = {};
  ve.v = [];
  arr = Array.prototype.slice.call(arguments);
  for (i in arr) {
    ve.v[i] = arr[i];
  }

  ve.add = function(v2) {
    for (var i=0;i<v2.v.length;i++) {
      this.v[i] += +v2.v[i] || 0;
    }
    return this;
  }

  ve.subtract = function(v2) {
    for (var i=0;i<v2.v.length;i++) {
      this.v[i] -= +v2.v[i];
    }
    return this;
  }

  ve.toString = function() {
    return "["+this.v.toString()+"]";
  }

  ve.x = function(x) {
    this.v[0] = x || this.v[0];
    return this.v[0];
  }

  ve.y = function(y) {
    this.v[1] = y || this.v[1];
    return this.v[1];
  }

  ve.z = function(z) {
    this.v[2] = z || this.v[2];
    return this.v[2];
  }

  ve.addX = function(x) {
     this.v[0] += x;
     return this.v[0];
  }

  ve.addY = function(y) {
     this.v[1] += y;
     return this.v[1];
  }

  ve.lerp = function(b, t) {
     this.v = this.v.lerp(b.v, t)
     return this
 }

  return ve;
}

window.List = function() {
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

window.Shape = function(x, y, width, height) {
  ret = {}
  ret.position = Vector(x, y);
  ret.scale = Vector(width, height);

  ret.x = function(x) {return this.position.x(x);}
  ret.y = function(y) {return this.position.y(y);}
  ret.width = function(x) {return this.scale.x(x);}
  ret.height = function(y) {return this.scale.y(y);}
  ret.addX = function(x){this.position.addX(x);}
  ret.addY = function(y){this.position.addY(y);}
  ret.addWidth = function(x){this.scale.addX(x);}
  ret.addHeight = function(y){this.scale.addY(y);}
  ret.right = function(){return this.position.x()+this.scale.x();}
  ret.bottom = function(){return this.position.y()+this.scale.y();}
  ret.left = function(){return this.position.x()}
  ret.top = function(){return this.position.y()}
  ret.add = function(x){
     this.addX(x.x());
     this.addY(x.y());
     this.addWidth(x.width());
     this.addHeight(x.height());
  }
  ret.take = function(x){
    this.addX(-x.x());
    this.addY(-x.y());
    this.addWidth(-x.width());
    this.addHeight(-x.height());
  }
  ret.overlaps = function(shape) {
    var x1l = this.x();var x1r = x1l+this.width();
    var y1t = this.y();var y1b = y1t+this.height();
    var x2l = shape.x();var x2r = x2l+shape.width();
    var y2t = shape.y();var y2b = y2t+shape.height();
    return !(x1l >= x2r || x1r <= x2l || y1b <= y2t || y1t >= y2b);
  }
  ret.toString = function() {
     return ""+this.x()+","+this.y()+" : "+this.width()+"x"+this.height();
  }
  ret.draw = function(ctx,style) {
     ctx.fillStyle = style || ctx.fillStyle
     ctx.fillRect(this.x(),this.y(),this.width(),this.height())
 }
 return ret;
}

//Arrays
Array.prototype.toShape = function() {
   return Shape(this[0],this[1],this[2],this[3]);
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

Array.prototype.lerp = function(z, x) {
   for (let q = 0;q<this.length;q++) {
      this[q] = lerp(this[q], z[q], x);
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

window.shuffle = function(array) {
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
