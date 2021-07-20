cordova.define("dreambox-zip", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"unzip":function(param,successCallback,errorCallback){
 		 var defaultParam = {
 		 	targetPath:"",//本地zip包地址
 		 	toPath:""//解压文件方的地址
 		 };
 		 $.extend(defaultParam,param);
 	     exec(successCallback,errorCallback, "SSZipArchivePlugin", "unZip", [defaultParam]);	
 	},
 	"downFileUnZip":function(param,successCallback,errorCallback){
 		 var defaultParam = {
 		 	filePath:"",//本地zip包地址
 		 	toPath:""//解压文件方的地址
 		 };
 		 $.extend(defaultParam,param);
 	     exec(successCallback,errorCallback, "SSZipArchivePlugin", "downFileUnZip", [defaultParam]);	
 	}
 }
 
 module.exports = req;

});
