cordova.define("dreambox-scanner", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"open":function(successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "BarcodePlugin", "openBarcode", []);	
 	}
 }
 
 module.exports = req;

});
