cordova.define("dreambox-bluetoothkey", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
    init:function(arg,succeedCallback,errorCallback){
        exec(succeedCallback,errorCallback, "BluetoothKey", "init", [arg]);
        
    },
    open:function(arg,succeedCallback,errorCallback){
        exec(succeedCallback,errorCallback, "BluetoothKey", "open", [arg]);
        
    },
        
    };

    module.exports = req;

});
