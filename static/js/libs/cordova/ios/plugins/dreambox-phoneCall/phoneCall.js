cordova.define("dreambox-phoneCall", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               call:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "PhoneCall", "call", [arg]);
                             },
            };

    module.exports = req;

});
