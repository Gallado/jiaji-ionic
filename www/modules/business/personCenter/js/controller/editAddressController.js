angular.module('huatekApp.controllers').controller('EditAddressCtrl', function($scope,$state,CacheService) {

  $scope.newAddress = CacheService.editAddress;
  $scope.editAddressOk = function(data){
    console.log(data);

    $state.go('commonAddress');

  }


});
