cordova.define("dreambox-upload", function(require, exports, module) {

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
                    exec(success, error, "UploadPlugin", "execute", [param.method,param.param]);
                },
                upload:function(param,success,error){
                    req.execute({method:"upload",param:param},success,error)
                }
            };

    module.exports = req;

});
