/*


IIIIIIIIII                                                                                     iiii
I::::::::I                                                                                    i::::i
I::::::::I                                                                                     iiii
II::::::II
  I::::I     mmmmmmm    mmmmmmm   ppppp   ppppppppp       eeeeeeeeeeee    rrrrr   rrrrrrrrr  iiiiiii uuuuuu    uuuuuu     mmmmmmm    mmmmmmm
  I::::I   mm:::::::m  m:::::::mm p::::ppp:::::::::p    ee::::::::::::ee  r::::rrr:::::::::r i:::::i u::::u    u::::u   mm:::::::m  m:::::::mm
  I::::I  m::::::::::mm::::::::::mp:::::::::::::::::p  e::::::eeeee:::::eer:::::::::::::::::r i::::i u::::u    u::::u  m::::::::::mm::::::::::m
  I::::I  m::::::::::::::::::::::mpp::::::ppppp::::::pe::::::e     e:::::err::::::rrrrr::::::ri::::i u::::u    u::::u  m::::::::::::::::::::::m
  I::::I  m:::::mmm::::::mmm:::::m p:::::p     p:::::pe:::::::eeeee::::::e r:::::r     r:::::ri::::i u::::u    u::::u  m:::::mmm::::::mmm:::::m
  I::::I  m::::m   m::::m   m::::m p:::::p     p:::::pe:::::::::::::::::e  r:::::r     rrrrrrri::::i u::::u    u::::u  m::::m   m::::m   m::::m
  I::::I  m::::m   m::::m   m::::m p:::::p     p:::::pe::::::eeeeeeeeeee   r:::::r            i::::i u::::u    u::::u  m::::m   m::::m   m::::m
  I::::I  m::::m   m::::m   m::::m p:::::p    p::::::pe:::::::e            r:::::r            i::::i u:::::uuuu:::::u  m::::m   m::::m   m::::m
II::::::IIm::::m   m::::m   m::::m p:::::ppppp:::::::pe::::::::e           r:::::r           i::::::iu:::::::::::::::uum::::m   m::::m   m::::m
I::::::::Im::::m   m::::m   m::::m p::::::::::::::::p  e::::::::eeeeeeee   r:::::r           i::::::i u:::::::::::::::um::::m   m::::m   m::::m
I::::::::Im::::m   m::::m   m::::m p::::::::::::::pp    ee:::::::::::::e   r:::::r           i::::::i  uu::::::::uu:::um::::m   m::::m   m::::m
IIIIIIIIIImmmmmm   mmmmmm   mmmmmm p::::::pppppppp        eeeeeeeeeeeeee   rrrrrrr           iiiiiiii    uuuuuuuu  uuuummmmmm   mmmmmm   mmmmmm
                                   p:::::p
                                   p:::::p
                                   p:::::p
                                   ppppppp


                                                         - Gamepad Libary as part of JSGMF  -
                                                               Ewan Breakey - ewanb.me
*/
function Imperium(){
   var r = {}
   r.init = function() {
      this.codes = {
         "A":       0,
         "B":       1,
         "X":       2,
         "Y":       3,
         "LB":      4,
         "RB":      5,
         "LT":      6,
         "RT":      7,
         "SELECT":  8,
         "START":   9,
         "LS":      10,
         "RS":      11,
         "D-UP":    12,
         "D-DOWN":  13,
         "D-LEFT":  14,
         "D-RIGHT": 15,
      }
   }

   r.translateButton = function(x) {
      x = x || 0; //Default to A
      if (x+"" === x) x = x.toUpperCase(); //Make strings uppercase

      //get num value of strings
      let i = 0; //Iterator to keep things simple

      if (x == "A") //x on ps
         x = i;
      i++
      if (x == "B") //o on ps
         x = i;
      i++
      if (x == "X") //□ on ps
         x = i;
      i++
      if (x == "Y") //Δ on ps
         x = i;
      i++
      if (x == "LB") //L1 on ps
         x = i;
      i++
      if (x == "RB") //R1 on ps
         x = i;
      i++
      if (x == "LT") //l2 on ps
         x = i;
      i++
      if (x == "RT") //R2 on ps
         x = i;
      i++
      if (x == "SELECT") //Back on ps
         x = i;
      i++
      if (x == "START") //Select on ps
         x = i;
      i++
      if (x == "LS")  //L3 on ps
         x = i;
      i++
      if (x == "RS") //R3 on ps
         x = i;
      i++
      if (x == "D-UP" || x == "UP")
         x = i;
      i++
      if (x == "D-DOWN" || x == "DOWN")
         x = i;
      i++
      if (x == "D-LEFT" || x == "LEFT")
         x = i;
      i++
      if (x == "D-RIGHT" || x == "RIGHT")
         x = i;
      i++
      return x;
   }

   r.translateAxis = function(x) {
      x = x || 0; //Default to A
      if (x+"" === x) x = x.toUpperCase(); //Make strings uppercase

      //get num value of strings
      let i = 0; //Iterator to keep things simple

      if (x == "LEFT" || x == "FIRST" || x == "L") //x on ps
         x = i;
      i++
      if (x == "RIGHT" || x == "SECOND" || x == "R") //x on ps
         x = i;
      i++

      return x;
   }

   r.getGamepadCount = function() {
      let list = navigator.getGamepads();
      let count = 0;
      for (let i = list.length;i--;)
         count += !!list[i];
      return count;
   }

   r.getButton = function(x,gp) {
      x = this.translateButton(x); //we translate input strings to integers (for accessing array)
      gp = +gp || 0; //Gamepad ID, defaults to 0 if not specified
      let pad = navigator.getGamepads()[gp];
      if (!pad) return null;
      return pad.buttons[x];
   }

   r.getButtonPressed = function(x,gp) {
      let res = this.getButton(x,gp);
      if (!res) return null;
      return res.pressed;
   }

   r.getButtonValue = function(x,gp) {
      let res = this.getButton(x,gp);
      if (!res) return null;
      return res.value;
   }

   r.getAxis = function(x,gp) {
      x = this.translateAxis(x);
      gp = +gp || 0;
      let pad = navigator.getGamepads()[gp];
      if (!pad) return null;
      return [pad.axes[gp*2],pad.axes[(gp*2)+1]];
   }

   r.getAxisX = function(x,gp) {
      let res = this.getAxis(x,gp);
      if (!res) return null;
      return res[0];
   }

   r.getAxisY = function(x,gp) {
      return this.getAxis(x,gp);
      if (!res) return null;
      return res[1];
   }

   r.getAxisPolar = function(axis,gp) {
      let res = this.getAxis(axis,gp);
      if (!res) return null;

      return res;
   }

}
