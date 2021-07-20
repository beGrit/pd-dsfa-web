cordova.define("dreambox-openwebpage", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                openWebPage:function(arg,success,error) {
                    exec(success, error, "OpenWebActivityPlugin", "execute", ["openWebPage",arg]);
                }
            };
    module.exports = req;

});
