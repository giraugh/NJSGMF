/*
This is the inputs library, it relies on your inputs being defined in obj/Inputs.js

to get an input value use Input.getInput(<INPUTNAME>) or Input.getInputPressed(<INPUTNAME>) where <INPUTNAME> is the input defined in obj/Inputs.js.

*/

window.InputCodes = {
   "space": 32,
   "left": 37,
   "up": 38,
   "right": 39,
   "down": 40,
   "shift": 16,
   "tab": 9,
   "enter": 13,
   "backspace": 8,
   "tab": 9,
   "tilde": 192,
   "alt": 18,
   "control": 17,
   "delete": 46,
   "home": 36,
   "end": 35,
   "comma": 188,
   "period": 190
}

window.Input = {}
Input.translate = function(input) {
   if (input+"" === input)
      input = input.toLowerCase();
   if (input == "space")
      input = InputCodes.space;
   if (input == "left")
      input = InputCodes.left;
   if (input == "up")
      input = InputCodes.up;
   if (input == "right")
      input = InputCodes.right;
   if (input == "down")
      input = InputCodes.down;
   if (input == "shift")
      input = InputCodes.shift;
   if (input == "tab")
      input = InputCodes.tab;
   if (input == "enter" || input == "return")
      input = InputCodes.enter;
   if (input == "backspace")
      input = InputCodes.backspace;
   if (input == "tab")
      input = InputCodes.tab;
   if (input == "tilde")
      input = InputCodes.tilde;
   if (input == "alt")
      input = InputCodes.alt;
   if (input == "control")
      input = InputCodes.control;
   if (input == "delete")
      input = InputCodes.delete;
   if (input == "home")
      input = InputCodes.home;
   if (input == "end")
      input = InputCodes.end;
   if (input == "comma" || input == ",")
      input = InputCodes.comma;
   if (input == "period" || input == ".")
      input = InputCodes.period;

   return input;
}

Input.getMouse = function(x) {
   if (x==0 || x=="left")
      return document.mouse.left;
   if (x==1 || x=="right")
      return document.mouse.right;
   if (x==2 || x=="middle")
      return document.mouse.middle;
   if (x==3 || x=="x")
      return (document.mouse.x - get_left()) / game_scale[0];
   if (x==4 || x=="y")
      return (document.mouse.y - get_top()) / game_scale[1];
}

Input.getKey = function(key) {
   key = Input.translate(key);
   return JSGMF.getKey(key);
}

Input.getAnInput = function(input) {
   let ares = false;
   if (input == "mleft" || input == "mousel" || input == "lmb")
      ares = (!ares) ? Input.getMouse(0) : ares;
   if (input == "mright" || input == "mouser" || input == "rmb")
      ares = (!ares) ? Input.getMouse(1) : ares;
   if (input.indexOf("gp.") != -1)
      ares = (!ares) ? Input.gpButtonPressed(input.replace("gp.","").replace(/([^.]+)\.[0-9]/,"$1"),input.replace(/gp\.[^.]+\.([0-9])/),"$1") : ares;
   if (JSGMF.getKey(Input.translate(input)))
      ares = true;
   return ares;
}

Input.getAnInputPressed = function(input) {
   let ares = false;
   if (input == "mleft" || input == "mousel" || input == "lmb")
      ares = (!ares) ? Input.getMouse(0) == 2 : ares;
   if (input == "mright" || input == "mouser" || input == "rmb")
      ares = (!ares) ? Input.getMouse(1) == 2 : ares;
   if (input.indexOf("gp.") != -1)
      ares = (!ares) ? Input.gpButtonPressed(input.replace("gp.","").replace(/([^.]+)\.[0-9]/,"$1"),input.replace(/gp\.[^.]+\.([0-9])/),"$1") : ares;
   if (JSGMF.getKeyPressed(Input.translate(input)))
      ares = true;
   return ares;
}

Input.getInput = function(input) {
   let keys = inputs[input];
   for (let i = keys.length;i--;) {
      if (this.getAnInput(keys[i])) {return true;}
   }
   return false;
}

Input.getInputPressed = function(input) {
   let keys = inputs[input];
   for (let i = keys.length;i--;) {
      if (this.getAnInputPressed(keys[i])) {return true;}
   }
   return false;
}

Input.getOptions = function(input) {
   return inputs[input];
}

Input.getOptionCount = function(input) {
   let res = false;
   let keys = inputs[input];
   return keys.length;
}

Input.addAlternativeKey = function(input, key) {
   let keys = inputs[input];
   return keys.push(key);
}

Input.suppress = function() {
   if (JSGMF.suppressed == undefined)
      JSGMF.initSuppressed();
   var args = Array.prototype.slice.call(arguments);
   for (let i = args.length;i--;) {
      console.log(args[i]);
      JSGMF.suppress(Input.translate(args[i]));
   }
}

Input.deClick = function(x) {
      if (x=="left")
         x = 0;
      if (x=="right")
         x = 1;
      if (x=="middle")
         x = 2;
      if (x == 1)
         document.mouse.left = 0;
      if (x == 2)
         document.mouse.right = 0;
}

Input.getImperium = function() {
   return game.gamepads;
}

Input.setImperium = function() {
   game.gamepads = Imperium();
   game.gamepads.init();
}

Input.gpGetButtons = function() {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.codes;
}

Input.gpCount = function() {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getGamepadCount();
}

Input.gpButton = function(button, gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getButton(button, gpid);
}

Input.gpButtonPressed = function(button, gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getButtonPressed(button, gpid);
}

Input.gpButtonValue = function(button, gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getButtonValue(button, gpid);
}

Input.gpAxis = function(axis, gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getAxis(axis, gpid);
}

Input.gpAxisX = function(axis, gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getAxisX(axis, gpid);
}

Input.gpAxisY = function(axis, gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getAxisY(axis, gpid);
}

Input.gpAxisPolar = function(axis,gpid) {
   if (!this.getImperium()) this.setImperium();
   return game.gamepads.getAxisPolar(axis, gpid);
}
