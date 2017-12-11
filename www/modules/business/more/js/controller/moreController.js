angular.module('huatekApp.controllers').controller('MoreCtrl', function($scope,$state) {
  var init = function(){


  };
  init();

  $scope.goFeedback = function(){
    $state.go('feedback');
  }

  $scope.selectToggle = function(){
    var selectMessage = document.getElementById("messageTips").checked;

  }

});
