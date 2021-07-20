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
        abstract: '',
        cover: {},
        detailtime: '',
        id: '',
        place: '',
        title: '',
        eventClass: "",
        dataList: {}
      }
    },
    computed: {},
    created: function () {
      // this.abstract = this.$route.query.abstract;
      // this.cover = JSON.parse(this.$route.query.cover)[0];
      // this.detailtime = this.$route.query.detailtime;
      // this.id = this.$route.query.id;
      // this.place = this.$route.query.place;
      // this.title = this.$route.query.title;
    },
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
      if (!this.$route.query || this.$route.query && !this.$route.query.type) {
        // this.$router.replace('/mobile/ipb/page/mobile-index')
      }
      if (this.$route.query.type == "classroomSign") {
        this.eventClass = 'changeNavList'
      } else if (this.$route.query.type == "liveSign") {
        this.eventClass = "liveNav"
      } else {
        this.eventClass = ''
        // this.eventClass="liveNav"
        // this.eventClass = 'changeNavList'
      }
      if (this.$route.query && this.$route.query.id) {
        let url = "/idj/meeting/vote/list";
        let that = this;
        this.$http.get(url, {
            id: this.$route.query.id
          })
          .then(function (data) {
            that.dataList = data.data.data[0];
            console.log(that.dataList, 'data数据', that.$viewData)
          })
      }

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
      itemClick: function (item) {
        if (item._id === 'KPpcDAG3') {
          this.scanCode();
          return false;
        }
        if (item._id === 'XeLUmmFa') {
          item.url = this.$replace(item.url, this);
          if (!this.dataList || (this.dataList && !this.dataList.vote_basic_id)) {
            dsf.layer.message('暂无投票')
            return false;
          }
          window.location.href = window.location.origin + '/vote/basic/gotoVote?voteId=' + this.dataList.vote_basic_id + '&type=mobile';
          return false;
        }
        return true;
      },
      scanCode() {
        let _this = this;
        // dsf.driver.camera.scan()
        dsf.driver.camera.scan()
          .then(function (res) {
            window.location.href = res;
          })
          .catch(function (err) {
            alert(err)
          })


        // this.$wx.scanQRCode({
        //   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        //   scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        //   success: function (res) {
        //     var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        //     setTimeout(() => {

        //       window.location.href = res.resultStr;
        //     }, 1000)

        //   },
        //   fail: function (err) {
        //     alert(JSON.stringify(err), 2)
        //   },
        //   complete: function (val) {}
        // })


      }
    }
  }
});