cordova.define("dreambox-weixinpay", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
    beginPay:function(arg,succeedCallback,errorCallback){
        exec(succeedCallback,errorCallback, "WeiXinPay", "beginPay", [arg]);
        
    },
        
    };

    module.exports = req;

});
