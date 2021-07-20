
cordova.define("dreambox-imagePicker", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                               
               choicePictures:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "ImagePicker", "choicePictures", [arg]);
               },
               choiceVideos:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "ImagePicker", "choiceVideos", [arg]);
               },
               choiceVideosAndUpload:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "ImagePicker", "choiceVideosAndUpload", [arg]);
               },
               upload:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "ImagePicker", "upload", [arg]);
               }
            };

    module.exports = req;

});
