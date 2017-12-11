angular.module('huatekApp.controllers').controller('SendGoodsCtrl', function($scope,$rootScope, $state,CacheService,$cordovaGeolocation,$cordovaContacts, $ionicPlatform,LoadingService) {
  // 获取GPS定位信息
  var getAutoLocation = function(Callback) {
    //GPS定位
    $cordovaGeolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: false
    }).then(function(position) {
      /*alert(position.coords.longitude); //GPS精度
       alert(position.coords.latitude);//GPS维度*/
      Callback(position.coords);
      var gcj = coordtransform.wgs84togcj02(position.coords.longitude, position.coords.latitude);
      var baidu = coordtransform.gcj02tobd09(gcj[0], gcj[1]);
      var pt = new BMap.Point(baidu[0], baidu[1]);
      var gc = new BMap.Geocoder();
      // 根据坐标获取地址
      gc.getLocation(pt, function(rs) {
        var addComp = rs.addressComponents;
        alert(addComp);
      });
    }, function() {
      // myToast.success('定位失败！');
      alert('定位失败');
    });
  };


  var init = function(){
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
    };
  };
  init();


  // 获取用户定位信息
  $scope.getLocation = function(){
    //获取用户GPS定位经纬度
    getAutoLocation(function(position){
      console.log(position);
      /*alert(position.longitude);
      alert(position.latitude);*/
      var position = {"longitude":108.863941,"latitude":34.196159};
      var ggPoint = new BMap.Point(position.longitude,position.latitude);
      //坐标转换完之后的回调函数
      translateCallback = function (data){
        if(data.status === 0) {
          var lng = data.points[0].lng;
          var lat = data.points[0].lat;
          getAddress(lng,lat);
        }
      };

      setTimeout(function(){
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback)
      }, 1000);

      var getAddress = function(lng,lat){
        var myGeo = new BMap.Geocoder();
        // 根据坐标得到地址描述
        myGeo.getLocation(new BMap.Point(lng, lat), function(result){
          if (result){
            //alert(result.addressComponents.city);
            $scope.address= result.addressComponents.province +'-'+result.addressComponents.city+'-'+result.addressComponents.district;
            alert($scope.address);
            console.log($scope.address);
          }else{

          }
        });
      };

    });

  };


  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      if(fromState.name === 'commonAddress'){
        if(CacheService.selectSendPerson){
          $scope.sendPerson = CacheService.selectSendPerson;
          $scope.address =  CacheService.selectSendPerson.address;
          $scope.$apply();
        }
        if(CacheService.selectGetPerson){
          $scope.getPerson = CacheService.selectGetPerson;
          $scope.address =  CacheService.selectSendPerson.address;
        }
      }

    });

  //监听从哪里来的页面
  /*$scope.$on('$ionicView.beforeEnter', function() {
      if(CacheService.selectSendPerson){
        $scope.sendPerson = CacheService.selectSendPerson;
        $scope.address =  CacheService.selectSendPerson.address;
        $scope.$apply();
      }
      if(CacheService.selectGetPerson){
        $scope.getPerson = CacheService.selectGetPerson;
        $scope.address =  CacheService.selectSendPerson.address;
        /!*$scope.$apply();*!/
      }
    });*/

  $scope.goSelectPerson = function(flag){
    if(flag === 0){
      $state.go('commonAddress',{router:'sendPerson'});
    }else if(flag ===1){
      $state.go('commonAddress',{router:'getPerson'});
    }

  };


  $scope.submitOrder = function(){
    LoadingService.show();
    var sendCity = document.getElementById("sendCity").innerText;
    var getCity = document.getElementById("getCity").innerText;
    setTimeout(function(){
      LoadingService.hide();
    },5000)
  };



  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    alert('设备就绪');
    console.log(navigator.contacts);
  }

  $scope.addContact = function () {
    $cordovaContacts.save($scope.contactForm).then(function (result) {
      // 成功
      alert('成功');
    }, function (err) {
      // 失败
      alert('失败');
    });
  };
  $scope.getAllContacts = function () {
    $cordovaContacts.find().then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
    })
  };
  $scope.findContactsBySearchTerm = function (searchTerm) {
    var opts = {
      filter: searchTerm,
      multiple: true,
      fields: ['displayName', 'name'],
      desiredFields: [id]
    };
    if ($ionicPlatform.isAndroid()) {
      opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
    }

    $cordovaContacts.find(opts).then(function (contactsFound) {
      $scope.contacts = contactsFound;
    })
  };

  $scope.pickContactUsingNativeUI = function () {
    $cordovaContacts.pickContact().then(function (contactPicked) {
      $scope.contact = contactPicked;
    })
  }




});
