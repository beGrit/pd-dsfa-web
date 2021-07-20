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
    mounted: function () {
      var _this = this;
      ['status', 'level'].forEach(function (n) {
        _this.$watch(function () {
          return _this.$viewData['dsfa_oua_role.' + n]
        }, function (v) {
          _this.subRefresh(v || {}, n);
        }, {
          immediate: true
        });
      })
    },
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
      // 角色信息
      roleInfo() {
        var fromData = this.$viewData,
          status = fromData['dsfa_oua_role.status'] || {};
        return {
          name: fromData['dsfa_oua_role.name'],
          level: _.map(fromData['dsfa_oua_role.level'], 'text')
            .join(','),
          status: status.text
        }
      },
      // 刷新子表字段
      subRefresh(e, n) {
        var _this = this;
        ['dsfa_oua_role_privilege', 'dsfa_oua_role_menu', 'dsfa_oua_user_role'].forEach(function (tableName) {
          var name = tableName + '.role' + (n || e.target.$attrs['ctrl-id']);
          _.forEach(_this.$viewData[tableName], function (v) {
            v[name] = e.args || e.text || _.map(e, 'text')
              .join(',');
          });
        })
      },
      /*
       * rows：数据对象
       * k：去重标识
       *	  'tableName.id'
       * m：映射对象
       *	  [['username', 'name']] 或者 function -> return {}
       */
      selectorPut(rows, k, m) {
        var tableName = k.split('.')[0],
          gridData = this.$viewData[tableName],
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
      // 功能权限选择
      privilegeSelector(data) {
        var roleInfo = this.roleInfo();
        this.selectorPut(data.args, 'dsfa_oua_role_privilege.dsfa_oua_privilege_id', function (r) {
          return {
            "dsfa_oua_role_privilege.rolename": roleInfo.name,
            "dsfa_oua_role_privilege.rolelevel": roleInfo.level,
            "dsfa_oua_role_privilege.rolestatus": roleInfo.status,

            'dsfa_oua_role_privilege.dsfa_oua_privilege_id': r._id,
            'dsfa_oua_role_privilege.privilegename': r._name,
            'dsfa_oua_role_privilege.privilegestatus': r.status_text,
            'dsfa_oua_role_privilege.privilegelevel': r.level_text
          }
        })
      },
      // 菜单权限选择
      menuSelector(data) {
        var roleInfo = this.roleInfo();
        this.selectorPut(data.args, 'dsfa_oua_role_menu.dsfa_menu_id', function (r) {
          return {
            "dsfa_oua_role_menu.rolename": roleInfo.name,
            "dsfa_oua_role_menu.rolelevel": roleInfo.level,
            "dsfa_oua_role_menu.rolestatus": roleInfo.status,

            'dsfa_oua_role_menu.dsfa_menu_id': r._id,
            'dsfa_oua_role_menu.menuname': r._name,
            'dsfa_oua_role_menu.menustatus': r.status_text,
            'dsfa_oua_role_menu.menulevel': r.level_text
          }
        })
      },
      // 页面权限选择
      pageSelector(data) {
        this.selectorPut(data.args, 'dsfa_oua_role_page.dsfa_rm_id',
          [
            ['dsfa_rm_id', '_id'],
            ['name', '_name'],
            ['path', 'path']
          ]
        )
      },
      // 用户选择
      userSelector(data) {
        var roleInfo = this.roleInfo();
        this.selectorPut(data.args, "dsfa_oua_user_role.dsfa_oua_user_id", function (r) {
          return {
            "dsfa_oua_user_role.rolename": roleInfo.name,
            "dsfa_oua_user_role.rolelevel": roleInfo.level,
            "dsfa_oua_user_role.rolestatus": roleInfo.status,

            "dsfa_oua_user_role.dsfa_oua_user_id": r._id,
            "dsfa_oua_user_role.username": r._name,
            "dsfa_oua_user_role.userstatus": "有效",
            "dsfa_oua_user_role.userrank": r.Atts.rank_text,
            "dsfa_oua_user_role.dept": {
              "text": r.UnitName,
              "value": r.UnitID
            }
          }
        });

      },

    }
  }
});
