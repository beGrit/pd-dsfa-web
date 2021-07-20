cordova.define("dreambox-sharedPreferences", function(require, exports, module) {

       var  exec = require('cordova/exec');
       var req ={
          save:function(param,successCallback,errorCallback){
               exec(successCallback,errorCallback, "SharedPreferencesPlugin", "save", [param]);
          },
         get:function(successCallback,errorCallback){
              exec(successCallback,errorCallback, "SharedPreferencesPlugin", "get", []);
         },
       clear:function(successCallback,errorCallback){
            exec(successCallback,errorCallback, "SharedPreferencesPlugin", "clear", []);
       },
    }
       
       module.exports = req;

});

