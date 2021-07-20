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
      refresh() {
        var _this = this;
        var oldData = this.$refs['meta'].value.slice(0);
        _this.loading = true;
        this.$http.get('/dbsource/columnInfo', {
            rmId: this.$route.query['id'],
            sql: this.$refs['content'].value,
            sqlParam: this.$refs['exinfo'].value
          })
          .done(function (res) {
            if (res.success) {
              _this.$refs.meta.clearRows();
              var dataAll = res.data;
              console.log(dataAll);
              var pageDataInfo = _this.$refs['exinfo'].value;
              //   console.log(pageDataInfo);
              let value = _.map(dataAll, function (v, i) {
                var obj = {
                  'dsfa_dbsource_meta.colname': v.colname,
                  'dsfa_dbsource_meta.name': v.name,
                  'dsfa_dbsource_meta.type': v.type
                };
                for (var od = 0; od < oldData.length; od++) {
                  console.log('替换别名');
                  if (obj.colname == oldData[od]['dsfa_dbsource_meta.colname']) {
                    //替换别名
                    console.log('替换' + obj.colname + '的别名');
                    obj.name = oldData[od]['dsfa_dbsource_meta.name'];
                  }
                }
                return obj;
              });
              _this.$set(_this.$viewData, "dsfa_dbsource_meta", value)
            } else {
              dsf.layer.message('获取数据失败', false)
            };
          })
          .error(function () {
            dsf.layer.message('获取数据失败', false)
          })
          .finally(function () {
            _this.loading = false;
          });
      }
    }
  }
});
