angular.module('huatekApp.controllers').controller('CouponCtrl', function($scope,$state) {
  var init = function(){
    $scope.couponTabIndex = 0;


  };
  init();
  $scope.couponTab = function(flag){
    $scope.couponTabIndex = flag;
  }







});
