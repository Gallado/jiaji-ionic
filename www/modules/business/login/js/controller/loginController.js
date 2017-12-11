angular.module('huatekApp.controllers').controller('LoginCtrl', function($scope,$state) {

  $scope.goLogin = function(username,password){
    $state.go('tab.home');

  };
  $scope.forgetPassword = function(){
    $state.go('forgetPassword');
  }

});
