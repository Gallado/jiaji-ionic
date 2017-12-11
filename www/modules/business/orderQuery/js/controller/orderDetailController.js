angular.module('huatekApp.controllers').controller('OrderDetailCtrl', function($scope,$state) {
  var init = function(){
    //根据查询页面的orderID去查询该订单的所有信息
    $scope.orderDetail = {
      "orderInfo":{
        "orderStatus":1,
        "orderNo":"WX012345678955",
        "orderType":0,
        "orderCompleteStatus":1,
        "sendCity":"北京市",
        "sendPerson":"Gherardo",
        "endCity":"西安市",
        "endPerson":"Wing",
        "reason":"不想寄了",
        "orderTime":"2017-07-31 14:25:30",
        "reservationTime":"2017-07-31 14:25:30"
      },
      "addressInfo":{
        "sendPerson":"Gherardo",
        "sendAddress":"浙江省嘉兴市南湖区浙江省嘉兴市南湖区高新路18号",
        "sendPersonTel":"18392021656",
        "getPerson":"Wing",
        "getAddress":"陕西省西安市高新区丈八四路神州数码锦业路",
        "getPersonTel":"18392021656"
      },
      "expressInfo":{
        "goodsInfo":"文件 1kg",
        "priceInfo":"文件 1kg",
        "collectMoney":"25",
        "isReturn":"无需返还",
        "orderNo":"WX012345678955",
        "remark":"无"
      }
    }

  };
  init();

  $scope.showMoreAddress = function(){
    if($scope.isShowMoreAddress){
      $scope.isShowMoreAddress = false;
    } else{
      $scope.isShowMoreAddress = true;
    }
  };

  $scope.showMoreExpressInformation = function(){
    if($scope.isShowMoreExpressInformation){
      $scope.isShowMoreExpressInformation = false;
    }else{
      $scope.isShowMoreExpressInformation = true;
    }
  };


  $scope.cancelOrder = function(){
    $state.go('cancelOrder');
  }


});
