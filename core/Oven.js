class Oven {
   static setCookie(key,value) {
      document.cookie = key+"="+(value+"")+";";
   }

   static unsetCookie(key) {
      document.cookie.replace(RegExp(key+"\s?=\s?(.*?)\;"),"");
   }

   static getCookie(key) {
      return (RegExp(key+"\s?=\s?([^;,\s]*)").exec(document.cookie) || [undefined])[1];
   }

}
