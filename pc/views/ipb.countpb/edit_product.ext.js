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
      console.log("data::" + this.data);
      this.$http.get("/countPb/detail", {})
        .then(res => {
          data['ipb_countpb.age_fortyfive_to_sixtyfive'].defaultValue = res.data.data.age_fortyfive_to_sixtyfive,
            data['ipb_countpb.age_over_sixtyfive'].defaultValue = res.data.data.age_over_sixtyfive,
            data['ipb_countpb.age_twentyfive_to_fortyfive'].defaultValue = res.data.data.age_twentyfive_to_fortyfive,
            data['ipb_countpb.age_under_twentyfive'].defaultValue = res.data.data.age_under_twentyfive,
            data['ipb_countpb.dev_obj_num'].defaultValue = res.data.data.dev_obj_num,
            data['ipb_countpb.five_to_ten'].defaultValue = res.data.data.five_to_ten,
            data['ipb_countpb.high_school'].defaultValue = res.data.data.high_school,
            data['ipb_countpb.ipb_countpb_id'] = res.data.data.ipb_countpb_id,
            data['ipb_countpb.junior_college'].defaultValue = res.data.data.junior_college,
            data['ipb_countpb.men'].defaultValue = res.data.data.men,
            data['ipb_countpb.over_fifteen'].defaultValue = res.data.data.over_fifteen,
            data['ipb_countpb.over_fifty'].defaultValue = res.data.data.over_fifty,
            data['ipb_countpb.over_master'].defaultValue = res.data.data.over_master,
            data['ipb_countpb.party_activists'].defaultValue = res.data.data.party_activists,
            data['ipb_countpb.party_group_num'].defaultValue = res.data.data.party_group_num,
            data['ipb_countpb.party_num'].defaultValue = res.data.data.party_num,
            data['ipb_countpb.pre_party_num'].defaultValue = res.data.data.pre_party_num,
            data['ipb_countpb.special_school'].defaultValue = res.data.data.special_school,
            data['ipb_countpb.ten_to_fifteen'].defaultValue = res.data.data.ten_to_fifteen,
            data['ipb_countpb.under_five'].defaultValue = res.data.data.under_five,
            data['ipb_countpb.under_junior'].defaultValue = res.data.data.under_junior,
            data['ipb_countpb.undergraduate_college'].defaultValue = res.data.data.undergraduate_college,
            data['ipb_countpb.women'].defaultValue = res.data.data.women
          next();
        })
      console.log("data::" + this.data);

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

    }
  }
});