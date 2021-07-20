var getRightLayoutConfig = function () {
  //房态查询接口的url
  var apiRoomStatusUrl = function () {
    var predis = dsf.url.parse(location.href).hashQuery.predis;
    return predis === "1"? "/dorm/room/list/reserve": "/dorm/room/list"
  }
  
  //房间类型
  var roomTypes = [
    {
      name: "单人间",
      val: 0,
      code: "single"
    },
    {
      name: "标准间",
      val: 1,
      code: "standard"
    },
    {
      name: "套房",
      val: 2,
      code: "suite"
    },
    {
      name: "多人间",
      val: 3,
      code: "mul"
    }
  ];
  
  //所有房间状态
  var allRoomStateList = [
    {
      txt: "正常房",
      val: 1,
      color: "#3BBE75",
      bgColor: "#DAFFE3",
      code: "normal"
    },
    {
      txt: "已满房",
      val: 2,
      color: "#ADADAD",
      bgColor: "#F0F0F0",
      code: "full"
    },
    {
      txt: "未满房",
      val: 3,
      color: "#A192D4",
      bgColor: "#EBE5FF",
      code: "some"
    },
    {
      txt: "不可排",
      val: 0,
      color: "#D89696",
      bgColor: "#F6EBEB",
      code: "disabled"
    },
    {
      txt: "已分配",
      val: 4,
      color: "#7CAABF",
      bgColor: "#E1F5FE",
      code: "allocated"
    },
    {
      txt: "过期房",
      val: 5,
      color: "#D7C35B",
      bgColor: "#FAF5DA",
      code: "timeout"
    }
  ];
  
  //根据系统是否开启预分配字段，渲染展示的房间状态
  var computeStateList = function () {
    var isReserve = +dsf.config.setting_sgcp_reserve;    //是否开启了预分配
    if (!isReserve){
      allRoomStateList.splice(4, 1)
    }
    return allRoomStateList
  }
  
  //房间入住信息
  var apiRoomOccupyInfo = {
    url: "/dorm/room/occupy/status",
    callback: function (data) {
      var dict = {
        0: "已预约",
        1: "已入住",
        2: "未安排"
      };
      return data.map(function (item) {
        item.person.map(function (a) {
          a.typeStr = dict[a.type]
          return a
        })
        return item
      })
    }
  }
  
  var baseInfo = {
    title: "房间列表",
    //房间状态展示 <ul><li>
    //roomStateList: computeStateList(),
    roomStateList: allRoomStateList,
    
    //房间是否显示checkbox
    roomCheckbox: true,
    
    //房态情况查询接口
    apiRoomStatus: {
      url: apiRoomStatusUrl(),
      //query 返回一个额外的查询参数对象, 与原本查询参数 mix
      query: function () {
        return {
          sDate: decodeURIComponent(dsf.url.queryString("sDate")),
          eDate: decodeURIComponent(dsf.url.queryString("eDate")),
          reserveId: dsf.url.queryString("reserveId")
        }
      },
      childrenAlias: "roomDtos",  //children 关键字别名
      roomNumAlias: "name",   //房间号别名
      roomIdAlias: "roomId",  //房间id别名
      callback: function (data) {
        return data
      }
    },
    
    //房态情况详情点击
    roomStatusDetailClick: function (item) {
      //var url = dsf.express.replace(dsf.config.setting_sgcp_person_detail_url, item);
      this.$openWindow('./page.html#/pc/dorm/room/reserve/person/edit?id=' + item.personId)
    },
  
    //房间入住信息
    apiRoomOccupyInfo: apiRoomOccupyInfo,
    
    //使用Url的哪一个字段进行默认查询
    defaultQueryByUrl: {
      startTime: "sDate",
      endTime: "eDate"
    },
  }
  
  var config = {
    name: "宿管右侧布局配置",
    //房态查询
    roomStatus: {
      roomCheckbox: false,  //房间是否有选择框
      queryTimeCouldChooseHistory: true,    //时间查询是否可以查询历史数据
      apiOneMonthRoomInfo: {
        url: "/dorm/room/list/status",
        callback: function (data) {
          var beds = data.beds;
          var rooms = data.rooms;
          var arr = [];
          for (var i in rooms){
            var room = rooms[i];
            var time = i.replace(/-/, "\n")
            var obj = {
              text: time
            };
            if (!room || room.length === 0){
              obj.bgColor = baseInfo.roomStateList[0].bgColor
            }
            if (room.length>0 && room.length<beds){
              obj.bgColor = baseInfo.roomStateList[2].bgColor
            }
            else{
              obj.bgColor = baseInfo.roomStateList[1].bgColor
            }
            arr.push(obj)
          }
          return arr
        }
      }
    },
    
    //闪客入住
    guests: {
      roomCheckbox: false,
      
      //房间入住信息
      apiRoomOccupyInfo: apiRoomOccupyInfo,
      //入住
      apiCheckIn: {
        url: "/dorm/room/occupy/guest/checkin",
      },
      //退房
      apiCheckOut: {
        url: "/dorm/room/occupy/guest/checkout",
      },
      //续房
      apiRenewal: {
        url: "/dorm/room/occupy/renewal"
      },
      //预约
      apiReserve: {
        url: "/dorm/room/reserve/guest/store"
      },
      //取消预约
      apiCancelReserve: {
        url: "/cancel/cancelReserve"
      },
      //换房
      apiChangeRoom: {
        url: "/dorm/room/occupy/guest/change"
      }
    },
    
    //团体入住
    group: {
      //选择框
      selectList: [
        {
          placeholder: "选择分区",
        },
        {
          placeholder: "选择楼层",
        },
        {
          placeholder: "请选择",
        }
      ],
      
      //是否可以入住 返回对象不能入住，无返回项则可以入住
      dropAble: function (person, room) {
        if (room.sexValue) {
          if (+person.sexValue !== +room.sexValue) {
            return {
              message: "此房间只能入住" + room.sexText + "性"
            }
          }
        }
      },
      
      apiBuildingList: {
        url: "/dorm/building/list/sub"
      },
      apiTeamCheckin: {
        url: "/dorm/room/occupy/team/checkin"
      },
      apiTeamCheckOut: {
        url: "/dorm/room/occupy/team/checkout"
      },
      apiRestoreSelectRoom: {
        url: "/dorm/room/reset"
      },
      apiAutoCheckIn: {
        url: "/dorm/room/occupy/auto/checkin"
      },
      apiReserveCancel: {
        url: "/dorm/room/reserve/cancel"
      },
      
      //自动排房的房间类型
      roomTypesByAuto: roomTypes,
      
      //自动排房的规则
      rulesByAuto: [
        {
          name: "男女不能混住",
          val: 'PERSON_SEX_NOT_MIXED',
          default: "checked",
          disabled: true,
        },
        {
          name: "先排女",
          val: 'PERSON_PRIORITY_FEMALE',
          atomicity: "sex"    //原子性
        },
        {
          name: "先排男",
          val: 'PERSON_PRIORITY_MALE',
          atomicity: "sex",   //原子性
        }
      ],
    },
    
    //团体重置
    resetGroup: {
      //房间没有选择框
      roomCheckbox: false,
      
      //人员重置
      apiResetPerson: {
        url: "/dorm/room/resetPerson"
      },
      
      //选择框
      selectList: [
        {
          placeholder: "选择分区",
        },
        {
          placeholder: "选择楼层",
        },
        {
          placeholder: "请选择",
        }
      ],
      
      //是否可以入住 返回对象不能入住，无返回项则可以入住
      dropAble: function (person, room) {
        if (room.sexValue) {
          if (+person.sexValue !== +room.sexValue) {
            return {
              message: "此房间只能入住" + room.sexText + "性"
            }
          }
        }
      },
      
      apiBuildingList: {
        url: "/dorm/building/list/sub"
      },
      apiTeamCheckin: {
        url: "/dorm/room/occupy/team/checkin"
      },
    },
    
    //房源分配
    allocation: {
      //选择框
      selectList: [
        {
          placeholder: "选择分区",
        },
        {
          placeholder: "选择楼层",
        },
        {
          placeholder: "请选择",
        }
      ],
      //房间类型
      roomTypes: roomTypes,
      apiResetRoomStatus: {
        url: "/dorm/room/reserve/cancel",
        query: function () {
          return {
            reserveId: dsf.url.queryString("reserveId")
          }
        }
      },
      
      apiAssignRoomStatus: {
        url: "/dorm/room/reserve/assign",
        query: function () {
          const sdate = dsf.url.queryString("sDate");
          const edate = dsf.url.queryString("eDate");
          const now = new Date().Format("yyyy-MM-dd");
          return {
            reserveId: dsf.url.queryString("reserveId"),
            sDate: sdate? decodeURIComponent(sdate): now+" 00:00:00",
            eDate: edate? decodeURIComponent(edate): now+" 23:59:59"
          }
        }
      },
      
      apiAutoAssign: {
        url: "/dorm/room/reserve/auto/assign",
        query: function () {
          const sdate = dsf.url.queryString("sDate");
          const edate = dsf.url.queryString("eDate");
          const now = new Date().Format("yyyy-MM-dd");
          return {
            reserveId: dsf.url.queryString("reserveId"),
            sDate: sdate? decodeURIComponent(sdate): now+" 00:00:00",
            eDate: edate? decodeURIComponent(edate): now+" 23:59:59"
          }
        }
      },
      
      apiRoomReserveInfo: {
        url: "/dorm/room/reserve/situation",
        query: function () {
          return {
            reserveId: dsf.url.queryString("reserveId")
          }
        }
      },
      
    },
  }
  
  for (var i in config) {
    var attr = config[i];
    if (typeof attr === "object") {
      Object.getOwnPropertyNames(baseInfo).forEach(function (name) {
        attr[name] = _.isUndefined(attr[name])? baseInfo[name]: attr[name];
      })
    }
  }
  
  return config
};
