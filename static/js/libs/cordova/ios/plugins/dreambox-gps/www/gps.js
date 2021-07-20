cordova.define("dreambox-gps", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"getLocation":function(successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "LocationPlugin", "getLocation", []);	
 	}
 }
 
 module.exports = req;

});
