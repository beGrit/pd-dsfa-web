cordova.define("dreambox-imagePicker", function(require, exports, module) {

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
                    exec(success, error, "ImagePicker", "execute", [param.method,param.param]);
                },
                choicePictures:function(param,success,error){
                    req.execute({method:"choicePictures",param:param},success,error)
                },
                choiceVideos:function(param,success,error){
                    req.execute({method:"choiceVideos",param:param},success,error)
                },
                choiceVideosAndUpload:function(param,success,error){
                    req.execute({method:"choiceVideosAndUpload",param:param},success,error)
                },
                upload:function(param,success,error){
                    req.execute({method:"upload",param:param},success,error)
                }
            };

    module.exports = req;

});
