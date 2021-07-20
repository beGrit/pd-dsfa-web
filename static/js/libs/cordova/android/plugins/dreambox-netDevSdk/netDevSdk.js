cordova.define("dreambox-netDevSdk", function(require, exports, module) {

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
                    exec(success, error, "netDevSdkPlugins", "execute", [param.method,param.param]);
                },
                playLive:function(jsonParam,success,error){
                    req.execute({method:"playLive",param:jsonParam},success,error)
                }
            };

    module.exports = req;

});
