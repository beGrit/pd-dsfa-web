cordova.define("dreambox-version", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"getCurrentVersion":function(successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "VersionPlugin", "getCurrentVersion", []);
 	},
   "getIsIphoneX":function(successCallback,errorCallback){
        exec(successCallback,errorCallback, "VersionPlugin", "getIsIphoneX", []);
   }
 }
 
 module.exports = req;

});
