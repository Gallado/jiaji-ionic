angular.module('huatekApp.controllers').controller('CancelOrderCtrl', function($scope,$state) {
  var init = function(){
    $scope.cancelList = [
      {"name":"快递员未按时间规定时间上门","isChoose":0},
      {"name":"上门时间/地点修改","isChoose":0},
      {"name":"联系不到快递员","isChoose":0},
      {"name":"快递员提前索取取件码","isChoose":0},
      {"name":"快递员态度差","isChoose":0},
      {"name":"价格太贵","isChoose":0},
      {"name":"已发货","isChoose":0},
      {"name":"不想寄了","isChoose":0}]
  };
  init();


  $scope.selectItem = function(index,name){
    $scope.cancelList.forEach(function(val,index,arr){
      if($scope.cancelList[index].name == name){
        if($scope.cancelList[index].isChoose === 1){
          $scope.cancelList[index].isChoose = 0;
        }else{
          $scope.cancelList[index].isChoose = 1;
        }

      }
    })

  };

  $scope.cancelReasonList = [];
  $scope.cancelOrder = function(){
    $scope.cancelList.forEach(function(val,index,arr){
      if($scope.cancelList[index].isChoose === 1){
        $scope.cancelReasonList.push($scope.cancelList[index]);
      }
    });
    console.log($scope.cancelReasonList);
  }


});
