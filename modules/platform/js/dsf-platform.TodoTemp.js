/*!
 * Name: @dsf/cli-platform
 * Version: 0.2.46-alpha.11
 * Description: 平台基础包
 * BuildTime: 2021/7/14 下午4:42:57
 */
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[3],{987:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flow-send-list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData},on:{"row-click":t.goDetail}},[a("el-table-column",{attrs:{prop:"objectname",label:"文件标题",width:"180"}}),a("el-table-column",{attrs:{prop:"nodename",label:"文件类型",width:"180"}}),a("el-table-column",{attrs:{prop:"sendusername",label:"发件人"}}),a("el-table-column",{attrs:{prop:"reachtime",label:"发件时间"}})],1)],1)},l=[];s._withStripped=!0;var n={name:"FlowTemp",data:function(){return{tableData:[]}},created:function(){this.initTable()},mounted:function(){},methods:{initTable:function(){var t=this,e={iCurPage:0,iPageNum:5};this.$http.get("wfr/getTodoList",e).then((function(e){e.data.success&&e.data.data?t.tableData=e.data.data:dsf.layer.message(e.data.Message||"请求异常",!1)})).catch((function(t){dsf.layer.message("请求异常",!1)}))},goDetail:function(t){var e=this;this.$http.get("wfp/getPageUrl",{sID:t.objectid,sPID:t.pid,sCurLinkID:t.linkid,sWFID:t.wfid,sNodeID:t.nodeid}).then((function(t){t.data.success&&t.data.data?e.$openWindow(dsf.url.getWebPath("~/page.html"+t.data.data)):dsf.layer.message(t.data.Message||"请求异常",!1)})).catch((function(t){dsf.layer.message("请求异常",!1)}))}}},i=n,o=a(0),d=Object(o["a"])(i,s,l,!1,null,"c679d78a",null);d.options.__file="pc/bhc/flow/todoTemp.vue";e["default"]=d.exports}}]);
//# sourceMappingURL=dsf-platform.TodoTemp.js.map