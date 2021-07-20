cordova.define("dreambox-dsui", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
    execute:function(arg,success,error) {
        var $this = this;
        var param = {
            method:"",
            param:{}
        }
        $.extend(param,arg);
        if(!param.method){
            alert("请指定方法名!");
            return;
        }
        $this[param.method](param.param,success,error);
    },
 	"showTopPop":function(param,successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "LPAlertMessagePlugin", "getAlertMessage", [param]);
 	}
 }
 
 module.exports = req;

});
