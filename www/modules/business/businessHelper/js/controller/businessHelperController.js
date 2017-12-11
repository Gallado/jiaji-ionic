angular.module('huatekApp.controllers').controller('BusinessHelperCtrl', function($scope,$state) {
  var init = function(){


  };
  init();

  $scope.goPriceAging = function(){
    $state.go('priceAging');
  };
  $scope.goTransportRequirement = function(){
    $state.go('transportRequirement');
  };
  $scope.goProductDescription = function(){
    $state.go('productDescription');
  };
  $scope.goAppreciationService = function(){
    $state.go('appreciationService');
  }







});
