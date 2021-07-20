cordova.define("dreambox-welcomePage", function(require, exports, module) {
               
var  exec = require('cordova/exec');

 var req ={
 	hideen:function(){
 	     exec(null,null,"WelcomePagePlugin", "hideen",[]);
 	}
 };
 
 module.exports = req;

});



