cordova.define("dreambox-openApp", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               openApp:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "OpenOtherAppPlugin", "openApp", [arg]);
                             },
              
            };

    module.exports = req;

});
