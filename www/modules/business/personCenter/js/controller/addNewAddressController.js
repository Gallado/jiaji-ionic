angular.module('huatekApp.controllers').controller('AddNewAddressCtrl', function($scope,$state) {

  $scope.newAddressOK = function(data){
    console.log(data);
    $state.go('commonAddress');
  }

});
