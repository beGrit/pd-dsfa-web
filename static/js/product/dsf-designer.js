/*! Build time : Mon Jul 19 2021 18:19:59 GMT+0800 (GMT+08:00) */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dsf-designer"],{b418:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("fb6a"),n("ac1f"),n("5319"),n("a745");var i=n("4360"),o=(n("4ce4"),n("365c"),n("7c3f")),r=n("162d"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},u=[],s={name:"DesignerApp",data:function(){return{}},beforeCreate:function(){},created:function(){},mounted:function(){}},c=s,l=n("2877"),d=Object(l["a"])(c,a,u,!1,null,null,null),f=d.exports,m=n("2909"),p=(n("99af"),n("8c4f")),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isReload?e._e():n("dsf-designer",e._b({attrs:{model:"design"}},"dsf-designer",this.$attrs,!1))},g=[],h=(n("b0c0"),{name:"Designer",inheritAttrs:!1,data:function(){return{isReload:!1}},beforeCreate:function(){},created:function(){},mounted:function(){},beforeRouteEnter:function(e,t,n){t.name==e.name?n((function(e){e.isReload=!0,e.$nextTick((function(){e.isReload=!1}))})):n((function(e){e.isReload=!1}))},beforeRouteUpdate:function(e,t,n){var i=this;this.isReload=!0,this.$nextTick((function(){i.isReload=!1})),n()}}),R=h,v=Object(l["a"])(R,b,g,!1,null,null,null),$=v.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isReload?e._e():n("dsf-designer",e._b({attrs:{model:"design"}},"dsf-designer",this.$attrs,!1))},y=[],_={name:"MobileDesigner",inheritAttrs:!1,data:function(){return{isReload:!1}},beforeCreate:function(){},created:function(){},mounted:function(){},beforeRouteEnter:function(e,t,n){t.name==e.name?n((function(e){e.isReload=!0,e.$nextTick((function(){e.isReload=!1}))})):n((function(e){e.isReload=!1}))},beforeRouteUpdate:function(e,t,n){var i=this;this.isReload=!0,this.$nextTick((function(){i.isReload=!1})),n()}},q=_,x=Object(l["a"])(q,w,y,!1,null,null,null),V=x.exports;Vue.use(p["a"]);var E=[].concat(Object(m["a"])($platformRouter.designer),[{path:"/pc/page",name:"Designer",component:$,meta:{title:"页面设计器"},props:function(e){return{business:e.query.B,module:e.query.M,pageName:e.query.pname,pageTitle:e.query.title,mobile:!1,tpl:1==e.query.tpl}}},{path:"/mobile/page",name:"MobileDesigner",component:V,meta:{title:"页面设计器"},props:function(e){return{business:e.query.B,module:e.query.M,pageName:e.query.pname,mobile:!0,tpl:1==e.query.tpl}}}]),k=new p["a"]({mode:"hash",base:"",routes:E});dsf.init.initRouter(k,"pc");var D=k,T=n("12cb"),j=n("9401");Vue.config.productionTip=!1,dsf.init.initPlatform(Vue),dsf.init.globalMixin(Vue),Vue.use(o["a"]),Vue.use(r["a"]);var M=new Vue;Object.defineProperties(Vue.prototype,{$bus:{get:function(){return M}}}),D.beforeResolve((function(e,t,n){document.title=e.meta.title||dsf.config.setting_public_logo_title||"",n()})),new Vue({mixins:[dsf.$systemGlobalSetting(j["a"])],router:D,store:i["a"],i18n:T["a"],data:function(){return{}},created:function(){var e=this;dsf.resizeDetector(),"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style&&window.addEventListener("hashchange",(function(){var t=window.location.hash.slice(1);e.$router.path!==t&&e.$router.replace(t)}),!1)},render:function(e){return e(f)}}).$mount("#app")}}]);
//# sourceMappingURL=dsf-designer.js.map