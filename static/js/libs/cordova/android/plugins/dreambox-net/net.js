cordova.define("dreambox-net", function(require, exports, module) {

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
                    exec(success, error, "NetPlugins", "execute", [param.method,param.param]);
                },
                getMobileNetType:function(param,success,error){
                    req.execute({method:"getMobileNetType",param:param},success,error)
                }
            };

    module.exports = req;

});
