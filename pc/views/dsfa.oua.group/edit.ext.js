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
      /*
       * rows：数据对象
       * k：去重标识
       *	  'tableName.id'
       * m：映射对象
       *	  [['username', 'name']] 或者 function -> return {}
       */
      selectorPut(rows, k, m) {
        var tableName = k.split('.')[0];
        if (dsf.isUnDef(this.$viewData[tableName])) {
          this.$set(this.$viewData, tableName, [])
        }
        var gridData = this.$viewData[tableName],
          ids = _.map(gridData, k);
        rows.forEach(function (r) {
          if (ids.indexOf(r._id) < 0) {
            var obj = {};
            // 字段映射
            if (_.isArray(m)) {
              m.forEach(function (nr) {
                obj[tableName + '.' + nr[0]] = r[nr[1]];
              })
              // 函数映射
            } else if (_.isFunction(m)) {
              obj = m(r);
            } else {
              throw Error('“m”参数错误：' + m);
            }
            if (_.isObject(obj)) {
              gridData.push(obj);
            }

          }
        });
      },
      // 角色选择
      roleSelector(data) {
        this.selectorPut(data.args, "dsfa_oua_group_role.dsfa_oua_role_id", function (r) {
          return {
            "dsfa_oua_group_role.dsfa_oua_role_id": r._id,
            "dsfa_oua_group_role.name": r._name,
            "dsfa_oua_group_role.status": r.status_text,
          }
        });
      },

      accountSelect(data) {
        this.selectorPut(data.args, "dsfa_oua_group_account.dsfa_oua_account_id", function (r) {
          return {
            "dsfa_oua_group_account.dsfa_oua_account_id": r._id,
            "dsfa_oua_group_account.loginname": r['dsfa_oua_group_zhlbsjy.loginname'],
            "dsfa_oua_group_account.ds_update_user_name": dsf.cookies.get('user_name'),
          }
        });
      },

    }
  }
});