angular.module('huatekApp.controllers').controller('WebsiteMapCtrl', function($scope,$state) {
  var init = function(){
    // 百度地图API功能  初始化地图
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("西安");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放


    $scope.websiteInfo ={
      "name":"西安市雁塔区锦业路营业部",
      "address":"西安市高新区锦业路与丈八三路十字西南角绿地世纪城俱乐部1楼",
      "telephone":"029-98564821/1/2/3",
      "tag":"发货  提货",
      "distance":"1.82"
    };

    var p1 = new BMap.Point(116.301934,39.977552);
    var p2 = new BMap.Point(116.508328,39.919141);

    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(p1, p2);

  };
  init();
});
