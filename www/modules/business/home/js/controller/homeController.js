angular.module('huatekApp.controllers').controller('HomeCtrl', function($scope,HomeService,$cordovaBarcodeScanner,$timeout) {
  var init = function(){
    $scope.initData =  HomeService.getData();
    console.log($scope.initData);
  };
  init();

  $scope.doRefresh = function () {
    console.log('Refreshing!');
    $timeout(function () {
      init();
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 3000);
  };

  $scope.scanStart = function () {
    $cordovaBarcodeScanner.scan()
      .then(function(barcodeData) {
        $scope.barcodeData = barcodeData.text;
        alert( $scope.barcodeData);
        // Success! Barcode data is here 扫描数据：barcodeData.text
      }, function(error) {
        alert("ERROR:" + error);
        // An error occurred
      });
    };

  $scope.toTelphone = function($event,phone){
    window.open('tel:' + phone);
    //获取打电话的时间
    var time=new Date();
    console.log(phone);

  }

});
