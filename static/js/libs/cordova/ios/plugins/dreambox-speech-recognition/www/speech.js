cordova.define("dreambox-speech-recognition", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"speech":function(successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "PhoneticRecognitionPlugin", "openPhoneticRecognition", []);	
 	}
 }
 
 module.exports = req;

});
