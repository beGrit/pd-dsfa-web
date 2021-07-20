cordova.define("dreambox-badgenumber", function(require, exports, module) {

var  exec = require('cordova/exec');

 var req ={
 	setIconBadgeNumber:function(param,successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "ZJIconBadgeNumberPlugin", "setIconBadgeNumber", [param]);
 	}
 }
 
 module.exports = req;

});
