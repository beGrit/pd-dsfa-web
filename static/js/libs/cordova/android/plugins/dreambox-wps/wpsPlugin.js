cordova.define("dreambox-wps", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                downAndOpen:function(arg,success,error) {
                    exec(success, error, "WPSPlugin", "downAndOpen", [arg]);
                },

                upload:function(arg,success,error) {
                    exec(success, error, "WPSPlugin", "upload", [arg]);
                },
                openFile:function(arg,success,error){
                    exec(success, error, "WPSPlugin", "openFile", [arg]);
                }
            };
    module.exports = req;

});
