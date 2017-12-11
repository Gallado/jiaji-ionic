angular.module('huatekApp.controllers').controller('CommonAddressCtrl', function($scope,$state,CacheService,$stateParams) {
  $scope.commonAddressData = [{
    "name":"Gherardo",
    "phoneNo":"18392021656",
    "address":"陕西省-西安市-雁塔区",
    "detailAddress":'锦业路'
  },{
    "name":"Wing",
    "phoneNo":"18392021656",
    "address":"陕西省-西安市-雁塔区",
    "detailAddress":'电子六路'
  }];
  //编辑地址
  $scope.editAddress = function(item){
    console.log(item);

    CacheService.editAddress = item;
    $state.go('editAddress');
  };
  //新增地址
  $scope.addNewAddress = function(){
    $state.go('addNewAddress');
  };


  $scope.selectItem = function(item){
    var isFormSend = $stateParams.router;
    if(!isFormSend){
      return;
    }else{
      if(isFormSend == 'sendPerson'){
        CacheService.selectSendPerson = item;
        $state.go('sendGoods');

      }else if(isFormSend == 'getPerson'){
        CacheService.selectGetPerson = item;
        $state.go('sendGoods');
      }


    }

  }


});
