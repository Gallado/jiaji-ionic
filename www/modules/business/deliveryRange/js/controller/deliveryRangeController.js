angular.module('huatekApp.controllers').controller('DeliveryRangeCtrl', function($scope,$state) {
  var init = function(){
    $scope.showSearchResult = false;

    $scope.goSearch = function(item){
      //根据选择的地址去查询
      $scope.showSearchResult = true;
    };

  };
  init();
});
