angular.module('huatekApp.controllers').controller('IntegralCtrl', function($scope,$state) {
  var init = function(){
    $scope.goIntegralListData =[{
      "date":"当前",
      "integral":"203"
    },{
      "date":"08.09",
      "integral":"2"
    },{
      "date":"12.11",
      "integral":"1"
    },{
      "date":"03.34",
      "integral":"2"
    },{
      "date":"05.01",
      "integral":"1"
    }]


  };
  init();







});
