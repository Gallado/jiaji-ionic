angular.module('huatekApp.controllers').controller('WebsiteQueryCtrl', function($scope,$state,$cordovaGeolocation,$timeout) {

  $scope.ionScrollHeight = (window.innerHeight - 103) + 'px';
  //初始化定位
  $scope.selectAred = "陕西省-西安市-高新区";


  // 根据GPS获取获取用户所在位置
  var getAutoLocation = function() {
    //GPS定位
    $scope.location = '';
    $cordovaGeolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: false
    }).then(function(position) {
      alert(position);
      alert(position.coords.longitude);
      alert(position.coords.latitude);
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
    //获取当前用户定位信息
    getAutoLocation();

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



  $scope.vm = {
    moredata: false,
    messages: [],
    pagination: {
      perPage: 7,
      currentPage: 1
    },
    init: function() {
      /*services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
       vm.messages = data;
       })*/
      $scope.websiteData = [{
        "name":"西安市雁塔区锦业路营业部",
        "address":"西安市高新区锦业路与丈八三路十字西南角绿地世纪城俱乐部1楼",
        "telephone":"029-98564821/1/2/3",
        "tag":"发货  提货",
        "distance":"1.82米"
      }, {
        "name":"西安市雁塔区丈八东路营业部",
        "address":"西安市雁塔区丈八东路金泰假日花城14号楼（签收单返回地址：陕西西安雁塔区子午大道江林新城，否则我部无法接收）",
        "telephone":"029-98564821/1/2/3",
        "tag":"发货  提货",
        "distance":"1.97公里"
      },{
        "name":"西安市雁塔区子午大道营业部",
        "address":"西安市亚那天去子午大道与雁环路十字向北200米子午大道路东，上班时间周内08:30-10:00，周末08:30-17:30,可发货、物流、快递，可刷卡，导航错误，请勿使用",
        "telephone":"029-98564821/1/2/3",
        "tag":"提货",
        "distance":"1.9797米"
      },{
        "name":"西安市高新区西北大道营业部",
        "address":"西安市高新区西部大道与博士路交口向西20米（紫薇田园都市J区32棟2单元2102号）",
        "telephone":"029-98564821/1/2/3",
        "tag":"发货  提货",
        "distance":"2.02"
      },{
        "name":"西安市高新区南窑头营业部",
        "address":"西安市高新区高新六路副36号（科技四路与高新六路被扣100米路西）",
        "telephone":"029-98564821/1/2/3",
        "tag":"发货",
        "distance":"3.1397公里"
      }]
      $scope.vm.messages = $scope.websiteData;
    }
  };
  $scope.vm.init();
  /*上拉加载更多*/
  $scope.closeMore = false;
  $scope.upInfinite = function() {
    $scope.vm.pagination.currentPage += 1;
    /* ajax request后的数据*/
    $scope.websiteData = [{
      "name":"西安市雁塔区锦业路营业部1",
      "address":"西安市高新区锦业路与丈八三路十字西南角绿地世纪城俱乐部1楼",
      "telephone":"029-98564821/1/2/3",
      "tag":"发货  提货",
      "distance":"1.82米"
    }, {
      "name":"西安市雁塔区丈八东路营业部1",
      "address":"西安市雁塔区丈八东路金泰假日花城14号楼（签收单返回地址：陕西西安雁塔区子午大道江林新城，否则我部无法接收）",
      "telephone":"029-98564821/1/2/3",
      "tag":"发货  提货",
      "distance":"1.97公里"
    },{
      "name":"西安市雁塔区子午大道营业部1",
      "address":"西安市亚那天去子午大道与雁环路十字向北200米子午大道路东，上班时间周内08:30-10:00，周末08:30-17:30,可发货、物流、快递，可刷卡，导航错误，请勿使用",
      "telephone":"029-98564821/1/2/3",
      "tag":"提货",
      "distance":"1.97公里"
    },{
      "name":"西安市高新区西北大道营业部1",
      "address":"西安市高新区西部大道与博士路交口向西20米（紫薇田园都市J区32棟2单元2102号）",
      "telephone":"029-98564821/1/2/3",
      "tag":"发货  提货",
      "distance":"2.02米"
    },{
      "name":"西安市高新区南窑头营业部1",
      "address":"西安市高新区高新六路副36号（科技四路与高新六路被扣100米路西）",
      "telephone":"029-98564821/1/2/3",
      "tag":"发货",
      "distance":"3.13公里"
    }];
    $scope.vm.messages = $scope.vm.messages.concat($scope.websiteData);
    setTimeout(function() {
      if (!$scope.vm.messages.length > 0) {
        $scope.closeMore = true;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, 3000);
  };

  //搜索
  $scope.searchItem = function(keyWords){
    console.log(keyWords);
    //根据输入的关键字去过滤信息
  };

  //清空输入的关键字
  $scope.clearKeyWords = function(){
    $scope.keyWords = '';
  };

  $scope.goWebsiteMap = function(item){
    //$state.go('websiteMap');
    var originRegion = '北京';
    var destinationRegion = '北京';
    window.location.href="http://api.map.baidu.com/direction?origin=39.977552,116.301934&destination=39.919141,116.508328&mode=driving&origin_region=北京&destination_region=北京&output=html&src=yourCompanyName|yourAppName";

  };

  $scope.toTelphone = function($event,phone){
    window.open('tel:' + phone);
    //获取打电话的时间
    var time=new Date();
    console.log(phone);

  }

});
