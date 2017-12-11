angular.module('huatekApp.controllers').controller('DiscoveryCtrl', function($scope,$state) {
  var init = function(){


  };
  init();

  $scope.goCoupon = function(){
    $state.go('coupon');
  }
  $scope.goIntegral = function(){
    $state.go('integral');
  }







});
