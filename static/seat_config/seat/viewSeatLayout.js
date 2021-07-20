var viewSeatLayoutConfig = {
  name: "排座运行页面配置",
  dormitory: {
    "getLayoutUrl": "",
    openMultipleChoose: true,   //座位是否开启多选
    isSeatAble: function(seat, person){
      //return seat.seatNum%2 > 0
      return true
    }
    
  }
}