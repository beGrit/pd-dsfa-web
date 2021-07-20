cordova.define("dreambox-toast", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"show":function(msg){
 	     exec(function(){}, function(){}, "ZJToastPlugin", "showToast", [{title:msg}]);	
 	}
 }
 
 module.exports = req;

});
