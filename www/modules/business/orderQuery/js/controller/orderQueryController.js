angular.module('huatekApp.controllers').controller('OrderQueryCtrl', function($scope,$state) {
  var init = function(){
    //初始化查询初始化数据
    // orderStatus: 0：寄件  1：收件
    // orderCompleteStatus: 0：代揽收  1：已完成
    $scope.orderList = [{
      "orderStatus":0,
      "orderNo":"WX012345678952",
      "orderType":0,
      "orderCompleteStatus":0,
      "sendAddress":"北京市",
      "sendPerson":"Gherardo",
      "endAddress":"西安市",
      "endPerson":"Wing",
      "orderTime":"2017-07-31 14:25:30"
    },{
      "orderStatus":1,
      "orderNo":"WX012345678955",
      "orderType":0,
      "orderCompleteStatus":1,
      "sendAddress":"北京市",
      "sendPerson":"Gherardo",
      "endAddress":"西安市",
      "endPerson":"Wing",
      "orderTime":"2017-07-31 14:25:30"
    }];


  };
  //初始化方法
  init();


  $scope.goOrderDetail = function(){
    $state.go('orderDetail');
  }


});
