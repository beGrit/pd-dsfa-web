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
    activated: function () {},
    deactivated: function () {},
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
    //表单保存成功后钩子函数,result为保存后服务器返回的新数据
    saveAfter: function (next, result, options) {
      next();
    },
    //表单保存后(无论成功或者失败)钩子函数,result为null表示保存失败否则为保存后服务器返回的新数据
    saveComplete: function (result) {

    },
    //=======二次开发额外增加的钩子函数 end   ===============
    methods: {

      selectUser: function (res) {
        var $table = res.target;
        var data = res.args;
        _.forEach(data, function (d) {
          $table.pushRow({
            'adj_meeting_user.username': d['nc_ncusers_xyselectsjy.name'],
            'adj_meeting_user.dsfa_oua_user_id': d['nc_ncusers_xyselectsjy.dsfa_oua_user_id'],
            'adj_meeting_user.phone': d['nc_ncusers_xyselectsjy.phone'],
            'adj_meeting_user.user_dept': d['nc_ncusers_xyselectsjy.deptname'],
            // 'adj_meeting_user.sign_time': d[''],
            // 'adj_meeting_user.sign_way': {
            //   value: d[''],
            //   text: d['']
            // },
            // 'adj_meeting_user.sign_state': {
            //   value: d['nc_ncusers_xyselectsjy.state_value'],
            //   text: d['nc_ncusers_xyselectsjy.state_text']
            // },
          })
        });
      }

    }
  }
});