cordova.define("dreambox-record", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               recordStartHasDialog:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "RecordPlugin", "recordStartHasDialog", [arg]);
                             },
               recordStart:function(arg,succeedCallback,errorCallback){
                                                exec(succeedCallback,errorCallback, "RecordPlugin", "recordStart", [arg]);
                                           },
                recordStop:function(arg,succeedCallback,errorCallback){
                     exec(succeedCallback,errorCallback, "RecordPlugin", "recordStop", [arg]);
                },
               recordLimit:function(arg,succeedCallback,errorCallback){
                                   exec(succeedCallback,errorCallback, "RecordPlugin", "recordLimit", [arg]);
                              },
                recordPlay:function(arg,succeedCallback,errorCallback){
                                                  exec(succeedCallback,errorCallback, "RecordPlugin", "recordPlay", [arg]);
                                             },
                recordPlayStop:function(arg,succeedCallback,errorCallback){
                     exec(succeedCallback,errorCallback, "RecordPlugin", "recordPlayStop", [arg]);
                },
               recordUpload:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "RecordPlugin", "recordUpload", [arg]);
               },
              recordDeleteLoccal:function(arg,succeedCallback,errorCallback){
                   exec(succeedCallback,errorCallback, "RecordPlugin", "recordDeleteLoccal", [arg]);
              }
            };

    module.exports = req;

});
