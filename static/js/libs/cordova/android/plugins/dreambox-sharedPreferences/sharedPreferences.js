cordova.define("dreambox-sharedPreferences", function(require, exports, module) {

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
                    exec(success, error, "SharedPreferencesPlugin", "execute", [param.method,param.param]);
                },
                save:function(jsonParam,success,error){
                    req.execute({method:"save",param:jsonParam},success,error)
                },
                get:function(key,success,error){
                    req.execute({method:"get",param:{"key":key}},success,error)
                },
                remove:function(key,success,error){
                    req.execute({method:"remove",param:{"key":key}},success,error)
                },
                clear:function(success,error){
                     req.execute({method:"clear"},success,error)
                }
            };

    module.exports = req;

});
