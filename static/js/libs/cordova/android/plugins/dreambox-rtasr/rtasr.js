cordova.define("dreambox-rtasr", function(require, exports, module) {
var exec = require('cordova/exec');


var Rtasr = {
    rtasrStart: function(success,error) {//开始转写
        exec(success, error, "Rtasr", "rtasrStart", []);
    },

    rtasrClose: function(success,error) {//结束转写
        exec(success, error, "Rtasr", "rtasrClose", []);
    }
};

module.exports = Rtasr;

});