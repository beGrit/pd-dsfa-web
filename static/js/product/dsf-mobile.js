/*! Build time : Mon Jul 19 2021 18:19:59 GMT+0800 (GMT+08:00) */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dsf-mobile"],{"162d":function(e,t,n){"use strict";n("4160"),n("b0c0");var i=[];function a(e){i.forEach((function(t){e.component(t.name,t),window.$components["mobile"]||(window.$components["mobile"]={}),window.$components["mobile"][t.name]=t}))}t["a"]=a},3173:function(e,t,n){},"61a6":function(e,t,n){},6333:function(e,t,n){"use strict";n("3173")},c3f0:function(e,t,n){"use strict";n.r(t);var i=n("1da1"),a=(n("b8bb"),n("8a13")),o=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("96cf"),n("b0c0"),n("c740"),n("ac1f"),n("5319"),n("d3b7"),n("3ca3"),n("ddb0"),n("a745"),n("61a6"),n("4ce4"),n("365c"),n("162d")),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mobile-app",attrs:{id:"app"}},[n("Home")],1)},s=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"mobile-loading",rawName:"v-mobile-loading",value:e.loading,expression:"loading"}],staticClass:"mobile-view",class:{demo:e.isDemo}},[[n("div",{staticClass:"mobile-view-head"}),n("div",{staticClass:"mobile-view-content"},[n("transition",{attrs:{name:e.transitionName}},[e.isShowNavsBar?n("keep-alive",{attrs:{include:e.cachePages,exclude:e.noCachePages,max:e.max}},[n("router-view",{staticClass:"full-view has-nav-bar"})],1):n("keep-alive",{attrs:{include:e.cachePages,exclude:e.noCachePages,max:e.max}},[n("router-view",{staticClass:"full-view no-nav-bar"})],1)],1),n("div",{staticClass:"mobile-view-foot"},[n("div",{key:"nav-bar",staticClass:"mobile-view-nav-bar"},[n("DsfMobileButtonNav",{attrs:{buttons:e.navs}})],1)])],1)]],2)},u=[],l={name:"Home",props:{hasFooter:{type:Boolean,default:!1}},provide:function(){return{$isMobile:!0,$app:this}},data:function(){return{loading:!1,transitionName:"",navBarTitle:"",max:10}},computed:{isDemo:function(){return this.$root.isDemo},isShowNavsBar:function(){if(this.navs.length<=1)return!1;var e=this.$route,t=this.isInNavBar(e);return t},navs:function(){return this.$root.navs},inited:function(){return this.$root.inited},cachePages:function(){return this.$store.state.keepAlive.include},noCachePages:function(){return this.$store.state.keepAlive.exclude}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{isInNavBar:function(e){var t=_.findIndex(this.navs,(function(t){var n=dsf.url.anchorToRoutePath(t.href);return dsf.url.isIframeLoader(n)&&dsf.url.isIframeLoader(e)?n.toLowerCase()==e.fullPath.toLowerCase():n==e.path}));return t>=0}},watch:{$route:{handler:function(e,t){if(this.isInNavBar(e)&&this.isInNavBar(t))this.transitionName="slide-normal";else if(t&&"/"!=t.path){if(null!==e&&void 0!==e&&e.meta.loginPage)return void(this.transitionName="slide-right");if(null!==t&&void 0!==t&&t.meta.loginPage)return dsf.transition.clearAll(this.$store),void(this.transitionName="slide-left");this.transitionName=window.$$state.pageDirection}else this.transitionName="slide-normal"},immediate:!0}}},f=l,d=n("2877"),m=Object(d["a"])(f,c,u,!1,null,null,null),h=m.exports,p={components:{Home:h},mixins:[],data:function(){return{themes:dsf.config.setting_public_default_theme}},beforeCreate:function(){},created:function(){document.body.classList.add(this.themes)},mounted:function(){},methods:{}},v=p,b=Object(d["a"])(v,r,s,!1,null,null,null),g=b.exports,w=n("4360"),$=n("2909"),x=(n("99af"),n("8c4f")),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("van-empty",{staticStyle:{"background-color":"#fff"},scopedSlots:e._u([{key:"image",fn:function(){return[n("van-image",{attrs:{src:e.errorImg,width:"100%",height:"auto"}})]},proxy:!0}])},[[n("van-button",{attrs:{type:"default",icon:"arrow-left"},on:{click:e.back}},[e._v("返回")]),n("van-button",{staticStyle:{"margin-left":"5px"},attrs:{type:"default",icon:"home-o"},on:{click:e.loginOut}},[e._v("退出登录")])]],2)},C=[],P={name:"Error",data:function(){return{errorImg:dsf.url.getWebPath("$/img/".concat(dsf.config.runType,"/404.png"))}},methods:{back:function(){this.$router.back()},loginOut:function(){var e=this;dsf.layer.confirm("您确定要退出吗?").then((function(){e.$webAPI.loginOut().then((function(e){e.success})).catch((function(e){})).finally((function(){dsf.cookies.remove("authorization_token"),dsf.cookies.remove("user_name"),dsf.cookies.remove("user_id"),dsf.cookies.remove("isLogin"),dsf.storage.session.clear(),location.replace(dsf.url.getMobileLogin())}))})).catch((function(){}))}},beforeRouteUpdate:function(e,t,n){this.show=!("/"==e.path),n()}},y=P,N=(n("6333"),Object(d["a"])(y,k,C,!1,null,"ae422f2a",null)),I=N.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("DsfMobilePlatformLogin",{attrs:{tabs:[{code:"username",name:"账号登录"}]}})},D=[],O={name:"Login",data:function(){return{}},methods:{}},R=O,E=Object(d["a"])(R,L,D,!1,null,null,null),S=E.exports;Vue.use(x["a"]);var A=[].concat(Object($["a"])($platformRouter.mobile),[{path:"/mobile/login",meta:{title:"登录",needLogin:!1,loginPage:!0},component:S},{path:"*",component:I}]),B=new x["a"]({mode:"hash",base:"",routes:A});dsf.init.initRouter(B,"mobile"),dsf.transition.initRouteTransition(B);var M=B,j=n("12cb"),V=n("323e"),T=n.n(V),H=n("9401");Vue.use(o["a"]),Vue.use(a["a"]),Vue.config.productionTip=!1,T.a.configure({easing:"ease-in",minimum:.1,showSpinner:!1});var J="appDemo"==(window.frameElement||window).name;dsf.global.$isMobile=!0,dsf.init.initPlatform(Vue),dsf.init.globalMixin(Vue,{beforeRouteEnter:function(e,t,n){n((function(n){dsf.transition.addCache(n.$store,e,t,n)}))},beforeRouteLeave:function(e,t,n){if(e&&t&&this.$root.navs){var i=_.findIndex(this.$root.navs,(function(e){return e.href==t?e.path:""}));dsf.transition.clearCache(this.$store,e,t,i>=0)}n()}});var z=dsf.url.getMobileLogin();M.beforeEach((function(e,t,n){function i(){if((e.meta.needLogin||"/"==e.fullPath)&&!dsf.getToken())return location.replace(z),void n(!1);n()}T.a.start(),i()})),M.afterEach((function(e){if(document.title=e.meta.title||dsf.config.setting_public_logo_title||"",J)try{window.parent&&window.parent.$mobileSetting&&window.parent.$mobileSetting.routeChange(e)}catch(t){dsf.error(t)}T.a.done()})),new Vue({mixins:[dsf.$systemGlobalSetting(H["a"])],store:w["a"],router:M,i18n:j["a"],data:function(){return{isDemo:J,inited:!1,navs:[],preloads:[],cachePages:[],noCachePages:[]}},methods:{getAppId:function(){var e=dsf.url.parse(window.location.href),t=e.searchQuery["appid"]||"";return t||(t=dsf.storage.session.get("appid")),t},initApp:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=e||t.getAppId(),!e){n.next=16;break}return n.next=4,t.$webAPI.appInit(e);case 4:if(i=n.sent,!i||!i.data){n.next=14;break}return a=JSON.parse(i.data.data["dsfa_rm.content"]||"{}"),t.navs=a.navs,t.preloads=a.preloads,n.next=11,dsf.init.preloads(t.preloads||[],t.$router,"mobile");case 11:t.inited=!0,n.next=15;break;case 14:t.inited=!0;case 15:dsf.storage.session.set("appid",e);case 16:case"end":return n.stop()}}),n)})))()}},beforeCreate:function(){dsf.flexible(),dsf.resizeDetector()},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.isDemo&&n.e("touch-emulator").then(n.t.bind(null,"f0e6",7)),e.initApp();case 2:case"end":return t.stop()}}),t)})))()},render:function(e){return e(g)}}).$mount("#app")}}]);
//# sourceMappingURL=dsf-mobile.js.map