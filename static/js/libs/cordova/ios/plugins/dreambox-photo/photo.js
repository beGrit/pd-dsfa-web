cordova.define("dreambox-photo", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
            
               choice:function(succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "MPhoto", "choice", []);
               },
               uploadImage:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "MPhoto", "uploadImage", [arg]);
                             },
            };

    module.exports = req;

});
