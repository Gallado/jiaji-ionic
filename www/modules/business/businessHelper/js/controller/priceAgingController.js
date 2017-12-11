angular.module('huatekApp.controllers').controller('PriceAgingCtrl', function($scope,$state) {
  var init = function(){
    $scope.showMoreBusinessList = false;
    $scope.CityPickData = {
      cssClass: 'ionic-citypicker-list',//显示地区选择的样色类，默认'ionic-citypicker list'
      iconPosition:'' ,//图标显示位置
      iconClass:'ion-android-pin',// 图标类，默认'ion-android-pin'
      title :'地址',//显示的主题，默认'地址'
      closeText:'取消',//取消按钮显示的文本,默认'取消'
      buttonText:'确定',//确定按钮的文本，默认'确定'
      backdrop:true,  //是否显示背景幕,默认是true
      isCache:true,//该UI-router状态所对应的template是否是有缓存的，如果在状态中设置了cache:false,代表是没有缓存，那么必须设置该值iscache:false,如果路由状态中设置了cache:true或者没有设置（默认true),那么这个isCache可以不设置，利用默认的true就可以了。
      itemTab1 :true, //代表是第一级的选择项，eg：省份，默认是true,显示出来;
      itemTab2 :false, //代表是第二级的选择项，eg：城市，默认是false,在选择了一级的，才将二级显示出来;
      itemTab3 :false, //代表是第三级的选择项，eg：区，默认是false,在选择了二级的，才将三级显示出来;
      showItem1 :'省份内容显示区', //一级的选项菜单对应着每一级的显示内容区，eg:省份内容显示区;
      showItem2 :'城市内容显示区', //二级的选项菜单对应着每一级的显示内容区，eg:城市内容显示区;
      showItem3 :'区内容显示区', //三级的选项菜单对应着每一级的显示内容区，eg:区内容显示区;
      item1 :'' ,//选中的一级的值;
      item2 : '',//选中的二级的值;
      item3 :'', //选中的三级的值;
      isHasChild: true//判断是否有没有选择完整的地址，如果等于true，表明地址没有选择完整
    }
  };
  init();
  $scope.showMoreBusiness = function(){
    if($scope.showMoreBusinessList){
      $scope.showMoreBusinessList = false;
    }else{
      $scope.showMoreBusinessList = true;
    }
  }
  $scope.toOrder = function(){
    $state.go('sendGoods');

  }







});
