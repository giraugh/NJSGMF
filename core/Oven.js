Oven = function(){
   ret = {}
   ret.setCookie = function(key,value) {
      document.cookie = key+"="+(value+"")+";";
   }

   ret.unsetCookie = function(key) {
      document.cookie.replace(RegExp(key+"\s?=\s?(.*?)\;"),"");
   }

   ret.getCookie = function(key) {
      return (RegExp(key+"\s?=\s?([^;,\s]*)").exec(document.cookie) || [undefined])[1];
   }
   return ret;
}
