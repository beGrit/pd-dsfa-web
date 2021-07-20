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
        validateRules: {
          equal(value, form) {
            if (form["dsfa_oua_user.passwd"] !== value) {
              return {
                message: '两次密码输入不一致，请输入相同密码'
              }
            }
          }
        }
      }
    },
    computed: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    deactivated: function () {},
    //=======二次开发额外增加的钩子函数 start ===============
    //用于页面初始化数据查询完成，已经获取了表单组件的默认值及下拉框等枚举类组件的数据(此处勿要对$viewData进行赋值操作,需要初始化表单值直接操作data参数)
    inited: function (data, next) {
      next();
    },
    //用于页面数据读取完成，仅对页面类型为表单时有效(此处勿要对$viewData进行赋值操作,需要初始化表单值直接操作data参数)
    dataLoaded: function (data, next) {
      next();
    },
    //页面全部加载完成，且组件都已经挂载
    ready: function () {

    },
    //表单提交保存验证前触发，此处可以对ignoreValidate属性进行配置设置为true可以忽略表单验证
    validateBefore: function (next, options) {
      next();
    },
    //表单提交保存验证后触发
    validateAfter: function (next, options) {
      next();
    },
    //表单保存前钩子函数
    saveBefore: function (next, options) {
      next();
    },
    //表单保存数据提交给服务器前对提交数据副本的处理
    postDataBefore: function (next, data, options) {
      next();
    },
    //表单保存数据提交给服务器成功后对服务器返回的结果数据处理
    postDataAfter: function (next, requestResult, options) {
      next();
    },
    //表单保存成功后钩子函数,result为保存后服务器返回的数据
    saveAfter: function (next, result, options) {
      next();
    },
    //表单保存后(无论成功或者失败)钩子函数,result为null表示保存失败否则为保存后服务器返回的新数据
    saveComplete: function (result) {},
    //=======二次开发额外增加的钩子函数 end   ===============
    methods: {
      savePasswd: function () {
        if (this.$errors && this.$errors.length > 0) {
          return;
        }
        if (!this.$viewData["dsfa_oua_user.passwd"] || !this.$viewData["dsfa_oua_user.repasswd"]) {
          dsf.layer.message("密码不能为空", false);
          return;
        }
        var param = {
          newPassWord: dsf.md5(dsf.md5(this.$viewData["dsfa_oua_user.passwd"])),
          verifyPassWord: dsf.md5(dsf.md5(this.$viewData["dsfa_oua_user.repasswd"]))
        }
        this.$http
          .post(":/dsfa/teas/mobile/oua/user/updatePassword", param)
          .then((res) => {
            if (res.data.success && res.data.data) {
              dsf.layer.message("修改成功", true);
              this.$http
                .post("CommonLogin/loginOut")
                .then((res) => {
                  dsf.storage.session.clear();
                  if (!window.$isMobile) {
                    location.replace(dsf.config.setting_teas_pc_login_page_wb);
                  } else {
                    if (res.data.data.outUrl) {
                      window.location.replace(res.data.data.outUrl);
                    } else {
                      location.replace(dsf.config.setting_public_pc_login_page);
                    }
                  }
                })
                .catch((res) => {
                  // dsf.layer.message("退出失败!", false);
                });
            } else {
              dsf.layer.message(res.data.data.Message || "服务器异常", false);
            }
          })
          .catch((res) => {
            dsf.layer.message("服务器异常", false);
          });
      }
    }
  }
});