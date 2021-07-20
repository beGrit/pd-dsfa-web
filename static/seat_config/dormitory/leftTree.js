var leftTreeConfig = (function () {
  var treeInfo = {
    title: "按房间",
    apiTree: {
      url: "/dorm/building/tree",
      callback: function (data) {
        return data
      }
    },
    level: 2,
    leftProps: {
      children: 'children',
      label: '_name',
      id: "_id",
      type: "type_value"
    },
    
    //横向水平展示
    inlineForm: [
      {
        label: "校区",
        level: 1,
        value: ""
      },
      {
        label: "楼宇",
        level: 2,
        value: ""
      },
      {
        label: "楼层",
        level: 3,
        value: ""
      }
    ]
  }
  
  var config = {
    name: "宿管左侧树形组件配置",
    //房态查询
    roomStatus: {},
    
    //散客入住
    guests: {
      title: [
        {
          title: "按房间",
          id: "guests",
          query: {
            opt: "guests"
          }
        },
        {
          title: "按团体",
          id: "resetGroup",
          query: {
            opt: "resetGroup",
            predis: "1"
          }
        }
      ],
    },
    
    //团体入住
    group: {
      title: "团体列表",
      accordion: true,    //每次只能展开一个面板
      apiGroupList: {
        //性别规则
        sexRule: {
          male: 0,
          female: 1
        },
        url: "/dorm/room/reserve/list/team",
        query: function () {
          return {
            reserveId: dsf.url.queryString("reserveId")
          }
        },
        callback: function (data) {
          return data;
        }
      }
    },
    
    //预分配房源
    allocation: {},
    
    //团体重置
    resetGroup: {
      title: [
        {
          title: "按房间",
          id: "guests",
          query: {
            opt: "guests"
          }
        },
        {
          title: "按团体",
          id: "resetGroup",
          query: {
            opt: "resetGroup",
            predis: "1"
          }
        }
      ],
      accordion: true,    //每次只能展开一个面板
      apiGroupList: {
        //性别规则
        sexRule: {
          male: 0,
          female: 1
        },
        url: "/dorm/room/reserve/list/team",
        query: function () {
          return {
            reserveId: dsf.url.queryString("reserveId")
          }
        },
        callback: function (data) {
          var result = [];
          
          //去掉人员为空, 或者所有人员都已经入住的团体
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (!_.isArray(item.person) || item.person.length === 0) continue;
            
            var useAbled = false;
            for (var j = 0; j < item.person.length; j++) {
              var one = item.person[j];
              if (one.occupy !== 1) {
                useAbled = true;
                break;
              }
            }
            
            if (useAbled) result.push(item);
          }
          
          return result
        }
      }
    }
  }
  
  for (var i in config) {
    var attr = config[i];
    if (typeof attr === "object") {
      Object.getOwnPropertyNames(treeInfo).forEach(function (name) {
        attr[name] = attr[name] ? attr[name] : treeInfo[name];
      })
    }
  }
  
  return config
})()