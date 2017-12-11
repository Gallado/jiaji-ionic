angular.module('huatekApp.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

/*//文件上传
.factory('UploadFile', function(Toast) {
  return {
    /!**
     * 上传文件到服务器
     *
     * @param fileUrl 文件路径
     * @param server 服务器接口
     *!/
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
        Toast.show("设置头像成功");
      }

      function err(error){
        Toast.show("上传头像失败，请确保网络正常后再试");
      }
    }
  }
})*/

  //文件上传
  .factory('UploadFile', function(Toast) {
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
          options.fileKey = "BeanYon";//后台获取文件的键值
          options.fileName = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;

          var params = {};//这里可添加自定义参数
          options.params = params;

          var ft = new FileTransfer();
          ft.upload(fileUrl,
            encodeURI(server),
            success,
            err,
            options);
        }

        function success(r){
          Toast.show("图片已经成功上传");
        }

        function err(error){
          Toast.show("上传头像失败，请确保网络正常后再试");
        }
      }
    }
  })

//配置单张图片选择
  .factory('SelectPicture', function(UploadFile, Toast) {
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
          };

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
              Toast.show("选择头像失败");
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
