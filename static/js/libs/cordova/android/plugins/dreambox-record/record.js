cordova.define("dreambox-record", function(require, exports, module) {

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
                    exec(success, error, "RecordPlugin", "execute", [param.method,param.param]);
                },
                recordStartHasDialog:function(param,success,error){
                    req.execute({method:"recordStartHasDialog",param:param},success,error)
                },
                recordStart:function(param,success,error){
                    req.execute({method:"recordStart",param:param},success,error)
                },
                recordStop:function(param,success,error){
                    req.execute({method:"recordStop",param:param},success,error)
                },
                recordLimit:function(param,success,error){
                    req.execute({method:"recordLimit",param:param},success,error)
                },
                recordPlay:function(param,success,error){
                    req.execute({method:"recordPlay",param:param},success,error)
                },
                recordPlayStop:function(param,success,error){
                    req.execute({method:"recordPlayStop",param:param},success,error)
                },
                recordUpload:function(param,success,error){
                    req.execute({method:"recordUpload",param:param},success,error)
                },
                  recordDeleteLoccal:function(param,success,error){
                      req.execute({method:"recordDeleteLoccal",param:param},success,error)
                  },
                  videoRecordStart:function(param,success,error){
                      req.execute({method:"videoRecordStart",param:param},success,error)
                  },
                  videoRecordStop:function(param,success,error){
                      req.execute({method:"videoRecordStop",param:param},success,error)
                  },
                  takePhoto:function(param,success,error){
                      req.execute({method:"takePhoto",param:param},success,error)
                  }
            };

    module.exports = req;

});
