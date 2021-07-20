cordova.define("dreambox-blvs", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
            
               pushLiveVc:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "BlvsPlugin", "pushLiveVc", [arg]);
               },
            };

    module.exports = req;

});
