cordova.define("dreambox-cache", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
     clear:function(successCallback,errorCallback){
          exec(successCallback,errorCallback, "CachePlugin", "clear", []);
     },
       clearWebviewData:function(successCallback,errorCallback){
            exec(successCallback,errorCallback, "CachePlugin", "clearWebviewData", []);
       }
 }
 
 module.exports = req;

});
