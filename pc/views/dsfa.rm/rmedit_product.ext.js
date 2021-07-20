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
      return {
        path: "",
        mobileKey: "mobile-",
        validateRules: {
          code: function (v) {
            if (this.isMobilePage && v.startsWith(this.mobileKey)) {
              return {
                "message": "系统已经自动添加mobile-,请勿重复添加！"
              }
            }
          }
        }
      }
    },
    created: function () {},
    mounted: function () {},
    computed: {
      isMobilePage: function () {
        var type = this.$viewData['dsfa_rm.type'];
        if (type && type.value == '13') {
          return true;
        }
        return false;
      }
    },
    //=======二次开发额外增加的钩子函数 start ===============
    //用于页面初始化数据查询完成，已经获取了表单组件的默认值及下拉框等枚举类组件的数据
    inited: function (data, next) {
      next();
    },
    //用于页面数据读取完成，仅对页面类型为表单时有效
    dataLoaded: function (data, next) {
      if (!data['_id']) {
        this.path = data['dsfa_rm.path'] = this.queryString.ppath || "";
        data['dsfa_rm.ID'] = data['dsfa_rm.path'].replace(/\//g, '.');
      } else {
        var arr = data['dsfa_rm.path'].split("/")
        this.path = arr.slice(0, arr.length - 1)
          .join("/");
      }
      var level = this.path.split("/");
      if (level.length < 2) {
        //页面必须在至少二级目录下才能创建
        dsf.array.removeWith(this.$enum['dsfa_rm.type'], function (el) {
          return el.value == "1" || el.value == '7' || el.value == '13' || el.value == '14'
        })
      }
      //如果是移动端页面加载时强行去掉mobile-前缀
      this.removeMobileKey(data);
      next();
    },
    //页面全部加载完成，且元素都已经挂载
    ready: function () {

    },
    //表单保存前钩子函数
    saveBefore: function (next) {
      next();
    },
    //表单保存数据提交给服务器前对提交数据副本的处理
    postDataBefore: function (next, data, options) {
      this.attachMobileKey(data);
      next();
    },
    //表单保存数据提交给服务器成功后对服务器返回的结果数据处理
    postDataAfter: function (next, request, options) {
      this.removeMobileKey(request.data);
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
      attachMobileKey: function (data) {
        if (data["dsfa_rm.type"] && data["dsfa_rm.type"].value == '13') {
          var code = data['dsfa_rm.code'];
          if (!code.startsWith(this.mobileKey)) {
            code = this.mobileKey + code;
          }
          data['dsfa_rm.code'] = code;
        }
      },
      removeMobileKey: function (data) {
        if (data["dsfa_rm.type"] && data["dsfa_rm.type"].value == '13') {
          var code = data['dsfa_rm.code'];
          if (code.startsWith(this.mobileKey)) {
            code = code.substr(this.mobileKey.length)
          }
          data['dsfa_rm.code'] = code;
        }
      },
      setMobilePageState: function () {
        var arr = this.path.split("/");
        var code = this.$viewData['dsfa_rm.code'];
        if (this.isMobilePage) {
          if (code.startsWith(this.mobileKey)) {
            code = code.substr(this.mobileKey.length);
          }
          code = this.mobileKey + code;
        }
        arr.push(code);
        var result = _.filter(arr, function (s) {
          return !!s;
        });
        this.$viewData["dsfa_rm.path"] = result.join("/");
        this.$viewData["dsfa_rm.ID"] = result.join(".");
      },
      setPathAndFullCode: function (evt) {
        this.setMobilePageState()
      }
    }
  }
});