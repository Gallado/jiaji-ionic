angular.module('huatekApp.controllers').controller('DeliveryRecordCtrl', function($scope,$state,$ionicLoading,$timeout) {
  var init = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 2000);
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
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.doRefresh = function () {
    console.log('Refreshing!');
    $timeout(function () {
      init();
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 3000);
  };

  $scope.goDetail = function(){
    $state.go('deliveryDetail')
  }





});
