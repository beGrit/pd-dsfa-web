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
      //刷新页面
      reloadPage: function () {
        this.reloadData();
      },

      //课程批量启用
      batchStateUp: function () {
        this.batchHandle('/nc/course/info/list/state/batch/up')
      },
      //课程批量停用
      batchStateDown: function () {
        this.batchHandle('/nc/course/info/list/state/batch/down')
      },
      //课程批量发布
      batchPublishUp: function () {
        this.batchHandle('/nc/course/info/list/publish/batch/up')
      },
      //课程批量取消发布
      batchPublishDown: function () {
        this.batchHandle('/nc/course/info/list/publish/batch/down')
      },
      batchHandle(url) {
        let data = this.$refs['courseinfolist'].multipleSelection;
        let ids = [];
        if (data && data.length > 0) {
          _.forEach(data, function (item) {
            ids.push(item['_id'])
          });
          let headers = {
            'Content-Type': 'application/json'
          };
          this.dsf.http.post(url, JSON.stringify(ids), {
              headers
            })
            .done(res => {
              if (res.success) {
                var timer = setTimeout(() => {
                  this.reloadData();
                  clearTimeout(timer);
                }, 1000)
              }
              this.dsf.layer.message(res.message, res.success);
            })
            .error(err => {
              this.dsf.layer.message('操作失败', false)
            })
            .always((res) => {})
        } else {
          this.dsf.layer.message('请选择至少一条数据', false)
        }
      }

    }
  }
});