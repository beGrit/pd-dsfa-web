dsf.define(function () {
  return {
    //this.nameSpace获取当前页面命名空间
    //this.pageName获取当前页面的名称
    //this.$viewData中存储表单的数据
    //this.$viewInitData中存储了页面初始化接口获取的数据源、默认值、权限等信息
    //this.queryString获取当前页面的查询字符参数
    //this.frames获取页面中viewPart组件内嵌的内页组件
    //this.$parentView获取被frame嵌套的父页面组件
    props: {
      // 是否隐藏顶部返回
      hideBack: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: '/teas/mobile/class/getClassAll'
      },
      // 0 主体班次； 1 对外培训班次
      flag: {
        type: Number,
        default: 0
      },
      itemClick: {
        type: Function,
        default: null
      }
    },
    data: function () {
      return {
        loading: false,
        finished: false,
        pageNumber: 0,
        keyWord: '',
        list: []
      }
    },
    computed: {},
    created: function () {
      this.onLoad();
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
      _itemClick(item) {
        if (this.itemClick) {
          this.itemClick(item)
        } else {
          this.$router.push({
            path: '/mobile/teas/teasmessageapp/mobile-classteacherWeekTimetable',
            query: {
              classId: item.classid
            }
          })
        }
      },
      // 搜索框查询列表
      onSearch() {
        this.pageNumber = 0 // 重新从第一页开始搜
        this.onLoad(); // 请求列表
      },
      onLoad() {
        var _this = this;
        _this.loading = true;
        _this.$http.get(_this.url, {
            queryType: 1,
            pageNumber: _this.pageNumber + 1,
            pageSize: 20,
            keyWord: _this.keyWord,
            flag: _this.flag
          })
          .done(function (res) {
            if (res.success) {
              var data = res.data;
              var lastPage = data.lastPage;
              var pageNumber = data.pageNumber;
              var list = data.list;

              // 如果当前查询的是第一页，则对list重新赋值，否则往后追加
              _this.pageNumber === 0 ? _this.list = list : _this.list.push.apply(_this.list, list);
              _this.pageNumber = pageNumber;
              if (lastPage) {
                _this.finished = true;
              }
            } else {
              dsf.layer.message(res.message, fasle);
            }
          })
          .error(function (err) {
            console.error(err);
            dsf.layer.message(err.message || err, fasle);
          })
          .finally(function () {
            _this.loading = false;
          });
      }
    }
  }
});