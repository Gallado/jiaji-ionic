angular.module('huatekApp.controllers').controller('PersonCenterCtrl', function($scope,$state) {
  var init = function(){

  };
  init();

  $scope.goCommonAddress = function(){
    $state.go('commonAddress');
  };

  $scope.goMessageCenter = function(){
    $state.go('messageCenter');
  };
  $scope.goIntegral = function(){
    $state.go('integral');
  };
  $scope.goCoupon = function(){
    $state.go('coupon');
  };
  $scope.goPersonSetting = function(){
    $state.go('personSetting');
  };
  $scope.goMyEvaluation = function(){
    $state.go('myEvaluation');
  };
  $scope.goSendDraftbox = function(){
    $state.go('sendDraftbox');
  }

});
