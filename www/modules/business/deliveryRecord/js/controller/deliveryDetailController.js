angular.module('huatekApp.controllers').controller('DeliveryDetailCtrl', function($scope,$state) {
  var init = function(){
    $scope.deliveryRecordList =[{
      "time":"2017-07-30 14:25:30",
      "orderNo":"WX170731532839",
      "waybillNo":"WX1234567890",
      "departure":"西安",
      "destination":"北京",
      "reason":"已撤销"
    }, {
      "time":"2017-07-30 14:25:30",
      "orderNo":"WX170731532839",
      "waybillNo":"WX1234567890",
      "departure":"西安",
      "destination":"北京",
      "reason":"已撤销"
    },{
      "time":"2017-07-30 14:25:30",
      "orderNo":"WX170731532839",
      "waybillNo":"WX1234567890",
      "departure":"西安",
      "destination":"北京",
      "reason":"已撤销"
    }]

  };
  init();





});
