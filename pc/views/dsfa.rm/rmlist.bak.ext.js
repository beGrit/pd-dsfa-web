dsf.define(function () {
  return {
    //this.nameSpace获取当前页面命名空间
    //this.pageName获取当前页面的名称
    //this.$viewData中存储表单的数据
    //this.$viewInitData中存储了页面初始化接口获取的数据源、默认值、权限等信息
    //this.queryString获取当前页面的查询字符参数
    //this.frames获取页面中viewPart组件内嵌的内页组件
    //this.$parentView获取被frame嵌套的父页面组件
    data: function () {
      return {}
    },
    created: function () {},
    mounted: function () {},
    //=======二次开发额外增加的钩子函数 start ===============
    //用于页面初始化数据查询完成，已经获取了表单组件的默认值及下拉框等枚举类组件的数据
    inited: function (data, next) {
      next();
    },
    //用于页面数据读取完成，仅对页面类型为表单时有效
    dataLoaded: function (data, next) {
      next();
    },
    //页面全部加载完成，且元素都已经挂载
    ready: function () {

    },
    //表单保存前钩子函数
    saveBefore: function (next) {
      next();
    },
    //表单保存成功后钩子函数,result为保存后服务器返回的新数据
    saveAfter: function (next, result) {
      next();
    },
    //表单保存后(无论成功或者失败)钩子函数,result为null表示保存失败否则为保存后服务器返回的新数据
    saveComplete: function (result) {

    },
    //=======二次开发额外增加的钩子函数 end   ===============
    methods: {
      weihu: function (evt) {
        var data = evt.data;
        if (data) {
          switch (data['dsfa_rm.type'].value) {
            //目录
            case "0":
              var url = this.$frame.nameSpace.split(".")
                .join("/") + '/' + this.$frame.pageName + "?pid=" + data._id + '&ppath=' + data['dsfa_rm.path'];
              this.$frame.$emit("update:path", url)
              break;
              //页面
            case "1":
              var path = data["dsfa_rm.path"];
              var arr = path.split("/");
              var b = arr.shift();
              var pname = arr.pop();
              var m = arr.join(".");
              this.$openWindow("./designer.html#/pc/page?B=" + b + "&M=" + m + "&pname=" + pname + "&title=" + data["dsfa_rm.name"]);
              break;
            case "2":
              this.$openWindow('./page.html#/pc/dsfa/rm.ctl/edit?id=' + data["_id"])
              break;
              //元数据
            case "3":
              this.$openWindow('./page.html#/pc/dsfa/mm/mmlist?path=' + data["dsfa_rm.ID"] + "&name=" + data["dsfa_rm.name"] + "&code=" + data["dsfa_rm.code"] + "&full_code=" + data["dsfa_rm.ID"])
              break;
              //工作流
            case "4":
              this.$openWindow('./designer.html#/flow?id=' + data["_id"])
              break;
              //数据字典
            case "5":
              this.$openWindow('./page.html#/pc/dsfa/rm.dict/dictedit?id=' + data["_id"])
              break;
            case "7":
              var path = data["dsfa_rm.path"];
              var arr = path.split("/");
              var b = arr.shift();
              var pname = arr.pop();
              var m = arr.join(".");
              this.$openWindow("./designer.html#/pc/page?B=" + b + "&M=" + m + "&pname=" + pname + "&title=" + data["dsfa_rm.name"] + "&tpl=1");
              break;
            case "8":
              this.$openWindow("./page.html#/pc/dsfa/dbsource/edit?id=" + data["_id"]);
              break;
            case "12":
              this.$openWindow('./page.html#/pc/dsfa/rm/bc/edit?id=' + data["_id"])
              break;
            case "13":
              var path = data["dsfa_rm.path"];
              var arr = path.split("/");
              var b = arr.shift();
              var pname = arr.pop();
              var m = arr.join(".");
              this.$openWindow("./designer.html#/mobile/page?B=" + b + "&M=" + m + "&pname=" + pname + "&title=" + data["dsfa_rm.name"]);
              break;
          }
        }
      },
      //打开配置完成的页面
      openview: function (evt) {
        var data = evt.data;
        if (data) {
          var path = data["dsfa_rm.path"];
          var arr = path.split("/");
          var b = arr.shift();
          var pname = arr.pop();
          var m = arr.join("/");
          this.$openWindow("./page.html#/pc/" + b + "/" + m + "/" + pname);
        }
      },
      test: function (evt) {

      }
    }
  }
});
