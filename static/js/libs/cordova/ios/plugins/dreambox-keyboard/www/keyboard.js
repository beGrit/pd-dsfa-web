cordova.define("dreambox-keyboard", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"show":function(){
 	     exec(null,null, "KeyBoardPlugin", "KeyBoardShow", []);	
 	},
 	"hide":function(){
 	     exec(null,null, "KeyBoardPlugin", "KeyBoardHide", []);	
 	}
 }
 
 module.exports = req;

});
