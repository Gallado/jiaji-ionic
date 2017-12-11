angular.module('huatekApp.controllers').controller('PersonSettingCtrl', function($scope,$state,$ionicActionSheet, $cordovaImagePicker,$cordovaCamera,$cordovaFileTransfer) {
  var init =function(){
    $scope.selectMessageTabIndex = 0;
    $scope.imagesList =[];

  };
  init();
  $scope.goLogin = function(){
    $state.go('login');
  };

  /**
   *选择头像
   */
  $scope.picture = function() {
    $ionicActionSheet.show({
      buttons: [
        { text: '相机' },
        { text: '图库' }
      ],
      cancelText: '关闭',
      cancel: function() {
        return true;
      },
      buttonClicked: function(index) {
        switch (index){
          case 0:
            takePhoto();
            break;
          case 1:
            pickImage();
            break;
          default:
            break;
        }
        return true;
      }
    });
  };


  //image picker
  var pickImage = function () {
    var options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        $scope.imagesList.push(results[0]);
        upImage(results[0]);
      }, function (error) {
        // error getting photos
      });
  };
  var takePhoto = function () {
    var options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: false,                                        //在选择之前允许修改截图
      encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {

      CommonJs.AlertPopup(imageData);
      var image = document.getElementById('myImage');
      image.src = imageData;
      upImage(imageData);
      //image.src = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      // error
      CommonJs.AlertPopup(err.message);
    });

  };

  //图片上传upImage（图片路径）
  //http://ngcordova.com/docs/plugins/fileTransfer/  资料地址
  var upImage = function (imageUrl) {
    document.addEventListener('deviceready', function () {
      var url = "http://192.168.1.248/api/UserInfo/PostUserHead";
      var options = {};
      $cordovaFileTransfer.upload(url, imageUrl, options)
        .then(function (result) {
          alert(JSON.stringify(result.response));
          alert("success");
          alert(result.message);
        }, function (err) {
          alert(JSON.stringify(err));
          alert(err.message);
          alert("fail");
        }, function (progress) {
          // constant progress updates
        });

    }, false);
  }





});
