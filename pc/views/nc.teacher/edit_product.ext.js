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
      this.hasSaveData = data;
      this.initTab();
      next();
    },
    //页面全部加载完成，且元素都已经挂载
    ready: function () {

      $('.el-tabs__nav')
        .on('click', '.el-tabs__item', function () {
          var tabText = $(this)
            .text()
            .trim();
          if (tabText !== '基本信息') {
            $("div[ctrl-id='teacherSaveBtn']")
              .hide();
          } else {
            $("div[ctrl-id='teacherSaveBtn']")
              .show();
          }
        })

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
      this.hasSaveData = result;
      this.initTab(); //保存完成后调用下确保tab刷新

      //如果是课程维护界面打开的，需要回调课程回显方法
      if (this.$dialog && this.$dialog.openerVm && this.$dialog.openerVm.nameSpace == "nc.courses.info") {
        this.$dialog.openerVm.backTeacherAdd(result);
        this.$dialog.close();
      }

      next();
    },
    //表单保存后(无论成功或者失败)钩子函数,result为null表示保存失败否则为保存后服务器返回的新数据
    saveComplete: function (result) {

    },
    //=======二次开发额外增加的钩子函数 end   ===============
    methods: {

      selectUser: function (res) {
        var data = res.args;

        if (!(this.$refs['name'].value && this.$refs['name'].value.trim()
            .length > 0)) {
          this.$set(this.$viewData, 'nc_teacher.name', data['nc_teacher_data_selectUserData.name']);
        }
        if (!(this.$refs['phone'].value && this.$refs['phone'].value.trim()
            .length > 0)) {
          this.$set(this.$viewData, 'nc_teacher.phone', data['nc_teacher_data_selectUserData.phone']);
        }
        if (!(this.$refs['dsfa_oua_user_id'].value && this.$refs['dsfa_oua_user_id'].value.trim()
            .length > 0)) {
          this.$set(this.$viewData, 'nc_teacher.dsfa_oua_user_id', data['_id']);
        }
        let sex = {
          text: data['nc_teacher_data_selectUserData.sex_text'],
          value: data['nc_teacher_data_selectUserData.sex_value']
        }
        this.$set(this.$viewData, 'nc_teacher.gender', sex);
        let dept = {
          text: data['nc_teacher_data_selectUserData.unit_name'],
          value: data['nc_teacher_data_selectUserData.dsfa_oua_unit_id']
        }
        this.$set(this.$viewData, 'nc_teacher.dept', dept);
      },

      initTab() {
        $('.el-tabs__nav .el-tabs__item')
          .hide()
          .eq(0)
          .show();
        var data = this.hasSaveData;
        if (data && data['_id']) {
          var tabItems = $('.el-tabs__nav .el-tabs__item');
          $('.el-tabs__nav .el-tabs__item')
            .show();
          _.each(tabItems, item => {
            $(item)
              .show();
          })
        }
      }

    }
  }
});