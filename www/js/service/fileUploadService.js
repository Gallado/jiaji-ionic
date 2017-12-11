angular.module('huatekApp.services')
//文件上传
.factory('UploadFile', function() {
  return {
    /**
     * 上传文件到服务器
     *
     * @param fileUrl 文件路径
     * @param server 服务器接口
     */
    uploadFile: function(fileUrl, server) {
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        var options = new FileUploadOptions();
        options.fileKey = "BeanYon";
        options.fileName = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;

        var params = {account: localStorage.account};
        options.params = params;

        var ft = new FileTransfer();
        ft.upload(fileUrl, 
                  encodeURI(server), 
                  success, 
                  err, 
                  options);
      }

      function success(r){
        /*Toast.show("设置头像成功");*/
      }

      function err(error){
        /*Toast.show("上传头像失败，请确保网络正常后再试");*/
      }
    }
  }
})

//配置单张图片选择
.factory('SelectPicture', function(UploadFile) {
  return {
    /**
     * 从相机或图库选择一张图片
     * 
     * @param type 选择类型，0 拍照，1 相册
     * @param width 目标宽度
     * @param height 目标高度
     * @param scope $scope对象
     */
    chooseSinglePicture: function(type, width, height, scope) {
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        var options = {//相机配置
          targetWidth: width,
          targetHeight: height,
          quality: 100,
          allowEdit: true
        }

        if(type == 1){//图片源设置为相册
          options.sourceType = 2;
        }

        navigator.camera.getPicture(
          function(res){
            scope.avatar_src = res;
            scope.$apply();
            localStorage.avatar = res;
            UploadFile.uploadFile(res, "我的服务器地址");//传递自己的服务器接口地址
          }, function(res){
            /*Toast.show("选择头像失败");*/
          }, options
        );
      }
    },

    /**
     * 从图库选择多张图片
     */
    choosePictures: function() {
      window.imagePicker.getPictures(function(res){
        alert(res+",success");
      }, function(res){
        alert(res+",failed");
      }, {
        maximumImagesCount: 10,  
        width: 80,  
        height: 80,  
        quality: 80 
      });
    }
  }
});

