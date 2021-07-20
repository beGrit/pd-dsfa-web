cordova.define("dreambox-iaction", function(require, exports, module) {

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
                    exec(success, error, "IActionPlugins", "execute", [param.method,param.param]);
                },
                downloadPhoto:function(jsonParam,success,error){//下载图片到相册
                    req.execute({method:"downloadPhoto",param:jsonParam},success,error)
                },
                downloadFile:function(jsonParam,success,error){//下载文件到本地
                    req.execute({method:"downloadFile",param:jsonParam},success,error)
                },
                callPhone:function(jsonParam,success,error){//打电话
                    req.execute({method:"callPhone",param:jsonParam},success,error)
                },
                openApp:function(jsonParam,success,error){//打开app
                    req.execute({method:"openApp",param:jsonParam},success,error)
                },
                openHuaweiWhiteboard:function(jsonParam,success,error){//打开华为白板
                    req.execute({method:"openHuaweiWhiteboard",param:jsonParam},success,error)
                }
            };

    module.exports = req;

});
