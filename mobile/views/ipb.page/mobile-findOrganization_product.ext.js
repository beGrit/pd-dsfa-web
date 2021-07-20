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
        inputValue: []
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
      this.focusMove(0);
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
      // 根据邀请码加入组织
      joinOrg: function (code) {
        var that = this;
        var param = {
          code: code
        };
        this.$http.post("/dsfa/register/joinUnit", param)
          .then(function (data) {
            if (data.data && data.data.state === 20000) {
              dsf.layer.message("加入成功");
              setTimeout(function () {
                that.$router.replace("/mobile/ipb/page/mobile-index");
              }, 2000);
            } else {
              dsf.layer.message(data.data.message);
            }
          })
      },
      // 焦点移到
      focusMove: function (position) {
        if (position == undefined || position == null) return false;
        var name = `invitation-code-${position}`;
        document.getElementsByName(name)[0].focus();
      },
      // 监听输入框
      onInput: function (position, next, e) {
        var value = e.target.value;
        var len = value.length;
        if (len > 1) {
          e.target.value = value.substr(1);
          this.focusMove(next);
        } else if (len > 0) {
          this.focusMove(next);
        }
        this.inputValue[position] = e.target.value || null;
        this.checkCode(this.inputValue.join(""));
      },
      // 校验邀请码
      checkCode(code) {
        var reg = /^\d{4}$/;
        if (reg.test(code)) {
          // dsf.layer.message('加入成功');
          this.joinOrg(code);
        }
      },
      // 微信扫码
      scanCode: function () {
        try {
          let _this = this;
          this.$wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              setTimeout(() => {
                alert(JSON.stringify(res), 3);
              }, 1000)
              dsf.layer.toast("扫码成功");
            },
            fail: function (res) {
              // alert(JSON.stringify(res),2)
            },
            complete: function (val) {
              // alert(val, 2)
            }
          })
        } catch (err) {
          alert(err, 2)
        }
      }
    }
  }
});