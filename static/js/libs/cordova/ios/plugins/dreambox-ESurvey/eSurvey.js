cordova.define("dreambox-ESurvey", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               writeName:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "ESurvey", "writeName", [arg]);
               }
            };

    module.exports = req;

});
