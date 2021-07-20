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

      if (!this.queryString.id) {
        //用户新增，默认绑定用户部门
        this.addUnit(this.queryString.deptid, this.queryString.deptname, true);
      }

    },
    //表单保存前钩子函数
    saveBefore: function (next) {
      if (!this.validateMainUnit()) {
        dsf.layer.message("有且只能有一个主部门", false);
        next(false);
        return;
      }
      this.pushUnitWithUserInfo();
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
      addUnit(id, name, isMain) {
        if (dsf.isUnDef(this.$viewData.dsfa_oua_user_userdept)) {
          this.$set(this.$viewData, 'dsfa_oua_user_userdept', []);
        }
        this.$viewData.dsfa_oua_user_userdept.push({
          "dsfa_oua_user_userdept.dsfa_oua_unit_id": id,
          "dsfa_oua_user_userdept.deptname": name,
          "dsfa_oua_user_userdept.ismain": {
            text: isMain ? '是' : '否',
            value: isMain ? '1' : '0'
          }
        });
      },
      validateMainUnit() {
        //验证部门数据是否存在两个主部门，或者没有主部门
        var mainDeptCount = 0;
        for (i = 0; i < this.$viewData.dsfa_oua_user_userdept.length; i++) {
          let isMain = this.$viewData.dsfa_oua_user_userdept[i]['dsfa_oua_user_userdept.ismain']['value'];
          if (isMain == '1') {
            ++mainDeptCount;
          }
        }
        return mainDeptCount == 1;
      },
      pushUnitWithUserInfo() {
        //填充部门用户信息
        for (i = 0; i < this.$viewData.dsfa_oua_user_userdept.length; i++) {
          this.$viewData.dsfa_oua_user_userdept[i]['dsfa_oua_user_userdept.username'] = this.$viewData['dsfa_oua_user.name'];
        }
      },
      handleRole(data) {
        console.log(data);
      },
      handleUnit(data) {
        //选中的机构
        var $this = this;
        var unitList = data.args;
        unitList = _.filter(unitList, function (unit) {
          //过滤已选部门机构
          for (i = 0; i < $this.$viewData.dsfa_oua_user_userdept.length; i++) {
            if ($this.$viewData.dsfa_oua_user_userdept[i]['dsfa_oua_user_userdept.dsfa_oua_unit_id'] == unit._id) {
              return false;
            }
          }
          return true;
        })
        _.each(unitList, function (unit) {
          $this.addUnit(unit._id, unit._name);
        })
      },

      //--中曾
      // 刷新子表字段
      subRefresh(e) {
        var _this = this,
          prefixField = 'user', // 字段前缀
          namespace = this.nameSpace.replace(/\./g, '_'); // 表明命名空间
        ['role', 'menu'].forEach(function (subName) {
          var tableName = namespace + '_' + subName,
            name = tableName + '.' + prefixField + (e['ctrl-id'] || e.target.$attrs['ctrl-id']);
          _.forEach(_this.$viewData[tableName], function (v) {
            v[name] = e.args || e.text || _.map(e, 'text')
              .join(',');
          });
        })
      },
      userInfo() {
        var fromData = this.$viewData;
        return {
          name: fromData['dsfa_oua_user.name'],
          deptid: dsf.express.eval('@[url("deptid")]'),
          dept: dsf.express.eval('@[url("deptname")]'),
        }
      },
      selectorPut(rows, k, m) {
        if (dsf.isUnDef(this.$viewData[tableName])) {
          this.$set(this.$viewData, tableName, [])
        }
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
      // 角色选择
      roleSelector(data) {
        var userInfo = this.userInfo();
        this.selectorPut(data.args, "dsfa_oua_user_role.dsfa_oua_role_id", function (r) {
          return {
            "dsfa_oua_user_role.username": userInfo.name,
            "dsfa_oua_user_role.dept": {
              text: userInfo.dept,
              value: userInfo.deptid
            },

            "dsfa_oua_user_role.dsfa_oua_role_id": r._id,
            "dsfa_oua_user_role.rolename": r._name,
            "dsfa_oua_user_role.rolelevel": r.level_text,
            "dsfa_oua_user_role.rolestatus": r.status_text,
          }
        });

      },
      // 角色选择
      menuSelector(data) {
        var userInfo = this.userInfo();
        this.selectorPut(data.args, "dsfa_oua_user_menu.dsfa_menu_id", function (r) {
          return {
            "dsfa_oua_user_menu.username": userInfo.name,

            "dsfa_oua_user_menu.dsfa_menu_id": r._id,
            "dsfa_oua_user_menu.menuname": r._name,
            "dsfa_oua_user_menu.menulevel": r.level_text,
            "dsfa_oua_user_menu.menustatus": r.status_text,
            "dsfa_oua_user_menu.source": "手选",
          }
        });

      },
      //--中曾


    }
  }
});
