cordova.define("dreambox-arcsoftface", function(require, exports, module) {
var exec = require('cordova/exec');


var ArcSoftFace = {
    activeEngine: function(arg0,success,error) {//在线激活SDK
        exec(success, error, "ArcSoftFace", "activeEngine", [arg0]);
    },
    init: function(arg0,success,error) {//sdk 初始化 ， 并且人脸特征数据以及人脸特征数据对应的注册图初始化
        exec(success, error, "ArcSoftFace", "init", [arg0]);
    },
    goRegisterAndRecognize: function(arg0,success,error) {//去认证页
        exec(success,error, "ArcSoftFace", "goRegisterAndRecognize", [arg0]);
     },
    closeRegisterAndRecognize: function(success,error) {//关闭认证页
        exec(success,error, "ArcSoftFace", "closeRegisterAndRecognize", []);
     },

};

module.exports = ArcSoftFace;

});