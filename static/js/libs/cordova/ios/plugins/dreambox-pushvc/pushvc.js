cordova.define("dreambox-pushvc", function(require, exports, module) {

var  exec = require('cordova/exec');

 var req ={
 	pushNewHtmlVC:function(param,successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "ShowNewHtmlVCPlugin", "pushNewHtmlVC", [param]);
 	},
   closeHtmlVC:function(successCallback,errorCallback){
        exec(successCallback,errorCallback, "ShowNewHtmlVCPlugin", "closeHtmlVC", []);
   },
 }
 
 module.exports = req;

});
