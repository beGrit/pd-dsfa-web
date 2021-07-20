var viewLeftTreeConfig = {
  name: "排座组织架构配置",
  //排宿舍业务
  dormitory: {
    title: "人员架构",
    getLeafsUrl: "$/seat_config/seat_fakedata/personList.json?seatId=@[url('id')]&relId=@[url('relId')]",
    model: "tree",
    
    //参数别名
    leafProps: {
      label: "_name",
      children: "children",
      isLeaf: "isLeaf",
      id: "_id"
    },
    
    //用于处理返回的结果
    dealRespond: function(data) {
      return data
    },
    
    //是否可以拖动
    isDragable: function(item) {
      return true;
      //return item.isPerson !== "0";
    },
    
    //是否是可以排座的人，而非班级
    isUser: function(item) {
      return item.isPerson !== "0";
    },
    
    //是否开启多选
    openMultipleChoose: true,
    
    //是否懒加载(此功能暂不支持)
    lazy: false,
    lazyLoadFunc: function(node, resolve) {
      var a = {
        _name: "ha哈哈哈",
        isLeaf: true,
        children: [
          {
            _name: "123"
          }
        ]
      }
      resolve(a)
    }
    
  }
}