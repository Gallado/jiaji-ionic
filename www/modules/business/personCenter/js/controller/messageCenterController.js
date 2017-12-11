angular.module('huatekApp.controllers').controller('MessageCenterCtrl', function($scope,$state) {
  var init =function(){
    $scope.selectMessageTabIndex = 0;

  };
  init();
  $scope.selectMessageTab = function(flag){
    $scope.selectMessageTabIndex = flag;

  }




});
