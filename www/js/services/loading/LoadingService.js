angular.module('huatekApp.services').factory('LoadingService', function($ionicLoading){
  return {
    show:function(){
      $ionicLoading.show({
        /*template: '<i class="icon loadingIcon"></i>'*/
        template: '<p class="item-myicon"><ion-spinner icon="ios" class="spinner-light"></ion-spinner><span style="font-size: 12px;">加载中···</span></p>'
      });
    },
    hide:function(){
      $ionicLoading.hide();
    }
  }

})
