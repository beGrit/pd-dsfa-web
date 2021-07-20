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
          //父节点选择校验
          parentValidate: function (v) {
            if (this.selectParent && (v == null || $.isEmptyObject(v[0].value))) {
              return {
                message: '父节点不能为空'
              }
            }
            return null;
          }
        }
      }
    },
    computed: {
      //是否手动选择父节点
      selectParent: function () {
        if (this.queryString.type && this.queryString.type == "parent") {
          return true;
        }
        return false;
      }
    },
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
      //如果是手动选择父节点，手动填充pid,修改启用状态
      if (this.selectParent) {
        var flmlTree = this.$viewData['nc_flml.treeinfo'];
        flmlTree.pid = this.$viewData['nc_flml.parent'][0].value;
        this.$set(this.$viewData, 'nc_flml.treeinfo', flmlTree);
        this.$set(this.$viewData, "nc_flml.state", {
          "text": "启用",
          "value": "1"
        })
      }
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

      //如果是课程维护界面打开的，需要回调课程回显方法
      if (this.$dialog && this.$dialog.openerVm && this.$dialog.openerVm.nameSpace == "nc.courses.info") {
        this.$dialog.openerVm.backFlmlAdd(result);
        this.$dialog.close();
      }

      //树保存需要刷新目录树
      if (this.$dialog && this.$dialog.openerVm && this.$dialog.openerVm.$parentView && this.$dialog.openerVm.$parentView.nameSpace == "nc.flml") {
        this.$dialog.openerVm.$parentView.reloadData();
      }



      next();
    },
    //表单保存后(无论成功或者失败)钩子函数,result为null表示保存失败否则为保存后服务器返回的新数据
    saveComplete: function (result) {},
    //=======二次开发额外增加的钩子函数 end   ===============
    methods: {

    }
  }
});