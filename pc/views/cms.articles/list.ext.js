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
      //取消置顶
      cancelTopFun: function (row) {
        var id = row.data['_id'];
        this.changeIsTop(id, "0")
      },
      //置顶
      topFun: function (row) {
        var id = row.data['_id'];
        this.changeIsTop(id, "1")
      },
      //修改发布状态
      changeIsTop(id, type) {
        //默认发布url
        var url = "cms/articles/top";
        //取消发布
        if (type == "0") {
          url = "cms/articles/cancelTop";
        }
        var _this = this;
        _this.loading = true
        url += "?id=" + id;
        _this.$http.post(url)
          .done(function (res) {
            if (res.success) {
              if (type == "0") {
                dsf.layer.message("取消置顶成功!");
              } else {
                dsf.layer.message("置顶成功!");
              }
              _this.reloadData();
            } else {
              dsf.layer.message(res.message, false);
            }
          })
          .error(function () {
            //错误
            dsf.layer.message('请求异常', false);
          })
          .always(function () {
            //肯定会执行
            _this.loading = false;
          })
      },
      editFun: function (row) {
        var _this = this;
        var id = row.data["_id"];
        var type = row.data["cms_articles.type"].value;
        var path = "";
        var width = "";
        var height = "";
        //图文
        if (type == "0") {
          path = "cms/articles/imgtxtedit";
          width = "90%";
          height = "80vh";
        } else if (type == "1") {
          //多图
          path = "cms/articles/imagesedit";
          width = "90%";
          height = "80vh";
        } else if (type == "2") {
          //视频
          path = "cms/articles/videoedit";
          width = "90%";
          height = "600px";
        } else if (type == "3") {
          //外链
          path = "cms/articles/externallinkedit";
          width = "90%";
          height = "600px";
        }
        path += "?id=" + id;
        _this.$openDialog({
          title: '编辑',
          width: width,
          height: height,
          params: {
            path: path
          },
          btns: []
        })
      }
    }
  }
});