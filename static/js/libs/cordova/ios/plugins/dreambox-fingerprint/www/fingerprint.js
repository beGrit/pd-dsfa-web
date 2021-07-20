cordova.define("dreambox-fingerprint", function(require, exports, module) {
 var exec = require('cordova/exec');

 var req ={
 	OPEN:"1",
 	CLOSE:"0",
 	"isSupportFingerprint":function(callback,errorback){//是否支持指纹解锁
 	     exec(callback,errorback, "FingerprintUNlockPlugin", "isSupportFingerprint", []);	
 	},
 	"fingerprintUNlock":function(param,callback,errorback){//开启或关闭指纹识别
 		 exec(callback,errorback, "FingerprintUNlockPlugin", "fingerprintUNlock", [{isOpen:param.IS_OPEN}]);	
 	}
 }
 
 module.exports = req;

});
