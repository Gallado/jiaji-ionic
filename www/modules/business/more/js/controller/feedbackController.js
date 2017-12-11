angular.module('huatekApp.controllers').controller('FeedbackCtrl', function($scope,$state) {
  var init = function(){
    $scope.opinion ={"text":"","phone":""};
    $scope.showOpinionList = false;
    $scope.activeOpinionType ="请选择类型";
    $scope.OpinionListData = [{"name":"派收服务"},{"name":"自寄自取服务"},{"name":"价格时效"},{"name":"APP功能"},{"name":"其他意见"}]


  };
  init();

  $scope.openOpinionList = function(){
    if($scope.showOpinionList){
      $scope.showOpinionList = false;
    }else{
      $scope.showOpinionList = true;
    }
  };

  $scope.selectOpinionList = function(data){
    $scope.activeOpinionType = data.name;
    $scope.showOpinionList = false;

  };

  $scope.submit = function(type,data){
    console.log(type);
  }







});
