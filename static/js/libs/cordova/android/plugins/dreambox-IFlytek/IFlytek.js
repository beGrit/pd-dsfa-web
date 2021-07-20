cordova.define("dreambox-IFlytek", function(require, exports, module) {
var exec = require('cordova/exec');


var IFlytek = {
    wakeStart: function(success,error) {//开始唤醒
        exec(success, error, "IFlytek", "wakeStart", []);
    },

    wakeStop: function(success,error) {//结束唤醒
        exec(success, error, "IFlytek", "wakeStop", []);
    },

    startTts: function(arg0,success,error) {//开始文字转语音
        exec(success, error, "IFlytek", "startTts", [arg0]);
    },

    stopTts: function(arg0,success,error) {//结束文字转语音
        exec(success, error, "IFlytek", "stopTts", [arg0]);
    },
};

module.exports = IFlytek;

});