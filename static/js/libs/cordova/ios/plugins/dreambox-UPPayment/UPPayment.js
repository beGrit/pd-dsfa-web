cordova.define("dreambox-UPPayment", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               UPPayment:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "UPPaymentPlugin", "UPPayment", [arg]);
                             },
              
            };

    module.exports = req;

});
