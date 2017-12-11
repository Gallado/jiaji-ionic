angular.module('huatekApp.controllers').controller('MyEvaluationCtrl', function($scope,$state) {
  var init =function(){
    $scope.selectMessageTabIndex = 0;

  };
  init();
  $scope.selectMessageTab = function(flag){
    $scope.selectMessageTabIndex = flag;

  }






});
