cordova.define("dreambox-jpush", function(require, exports, module) {


var  exec = require('cordova/exec');
 var req ={
 	setJPushUserInfo:function(args){
 	     exec(null,null, "JPushPlugin", "setJPushUserInfo", [args]);
 	},
 	loginOut:function(args){
 	     exec(null,null, "JPushPlugin", "loginOut", [args]);
 	}
 }
 
 module.exports = req;

});
