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
      this.getAuthInfo();
      next();
    },
    //页面全部加载完成，且组件都已经挂载
    ready: function () {
      $("div[ctrl-id='units']")
        .hide();
      $("div[ctrl-id='users']")
        .hide();
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

      radioChange(item) {
        let type = item.args.value;
        if (type == 3) {
          $("div[ctrl-id='units']")
            .show();
          $("div[ctrl-id='users']")
            .show();
        } else {
          $("div[ctrl-id='units']")
            .hide();
          $("div[ctrl-id='users']")
            .hide();
        }
      },

      getAuthInfo: function () {
        let businessId = this.queryString["businessId"];
        if (businessId) {
          this.dsf.http.get("/nc/auth/info?businessId=" + businessId)
            .done(res => {
              let authInfo = res.data;
              if (authInfo) {
                let scope = {
                  text: authInfo.scopeText,
                  value: authInfo.scopeValue,
                }
                this.$set(this.$viewData, 'nc_autho_info.scope', scope);
                if (authInfo.scopeValue == 3) {
                  $("div[ctrl-id='units']")
                    .show();
                  $("div[ctrl-id='users']")
                    .show();
                  let units = [];
                  if (authInfo.unitsText) {
                    _.forEach(authInfo.unitsText, function (u, i) {
                      let unit = {
                        text: u,
                        value: authInfo.unitsValue[i],
                      }
                      units.push(unit);
                    });
                    this.$set(this.$viewData, 'nc_autho_info.units', units);
                  }

                  if (authInfo.usersText) {
                    let users = [];
                    _.forEach(authInfo.usersText, function (u, i) {
                      let user = {
                        text: u,
                        value: authInfo.usersValue[i],
                      }
                      users.push(user);
                    });
                    this.$set(this.$viewData, 'nc_autho_info.users', users);
                  }
                }
              }
            })
            .error(err => {})
            .always((res) => {})
        }
      },

      saveAuthInfo: function () {
        let authText = [];
        let authValue = [];
        let userAuthText = [];
        let userAuthValue = [];
        if (this.$refs['scope'].value.value == 3) {
          if (this.$refs['units'] && this.$refs['units'].value) {
            let units = this.$refs['units'].value;
            _.forEach(units, function (unit) {
              authText.push(unit.text);
              authValue.push(unit.value);
            });
          }
          if (this.$refs['users'] && this.$refs['users'].value) {
            let users = this.$refs['users'].value;
            _.forEach(users, function (user) {
              userAuthText.push(user.text);
              userAuthValue.push(user.value);
            });
          }
        }
        let param = {
          businessId: this.queryString["businessId"],
          typeText: this.queryString["typeText"],
          typeValue: this.queryString["typeValue"],
          authText: authText.join(",") + "&" + userAuthText.join(","),
          authValue: authValue.join(",") + "&" + userAuthValue.join(","),
          scopeText: this.$refs['scope'].value.text,
          scopeValue: this.$refs['scope'].value.value
        };
        let headers = {
          'Content-Type': 'application/json'
        };
        this.dsf.http.post("/nc/auth/save", JSON.stringify(param), {
            headers
          })
          .done(res => {
            this.dsf.layer.message(res.message, res.success);
          })
          .error(err => {
            this.dsf.layer.message('授权失败', false);
          })
          .always((res) => {})


      }

    }
  }
});