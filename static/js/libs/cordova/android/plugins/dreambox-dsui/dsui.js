cordova.define("dreambox-dsui", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    var param = {
                        method:arg.method || "",
                        param:arg.param || {}
                    };
                    // $.extend(param,arg);
                    if(!param.method){
                        alert("请指定方法名!");
                        return;
                    }
                    exec(success, error, "DSUI", "execute", [param.method,param.param]);
                }
            };

    module.exports = req;

});
