angular.module('huatekApp.services', [])
.factory('Chats', function() {
  /* Might use a resource here that returns a JSON array*/

  /* Some fake testing data*/
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

/*本地化存储数据*/
.factory('locals',['$window',function($window){
  return{
    /*存储单个属性*/
    set :function(key,value){
      $window.localStorage[key]=value;
    },
    /*读取单个属性*/
    get:function(key,defaultValue){
      return  $window.localStorage[key] || defaultValue;
    },
    /*存储对象，以JSON格式存储*/
    setObject:function(key,value){
      $window.localStorage[key]=JSON.stringify(value);
    },
    /*读取对象*/
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }

  }
}])
.service('base64', function () {
  var keyStr = "ABCDEFGHIJKLMNOP" +
          "QRSTUVWXYZabcdef" +
          "ghijklmnopqrstuv" + "wxyz0123456789+/" +
          "=";
          this.encode = function (input) {                 var output = "",
                  chr1, chr2, chr3 = "",
                  enc1, enc2, enc3, enc4 = "",
                  i = 0;
                  while (i < input.length) {
          chr1 = input.charCodeAt(i++); chr2 = input.charCodeAt(i++);
                  chr3 = input.charCodeAt(i++);
                  enc1 = chr1 >> 2; enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                  enc4 = chr3 & 63;
                  if (isNaN(chr2)) {
          enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
          enc4 = 64;
          }
          output = output +
                  keyStr.charAt(enc1) +
                  keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) +
                  keyStr.charAt(enc4);
                  chr1 = chr2 = chr3 = "";
                  enc1 = enc2 = enc3 = enc4 = "";
          }

          return output;
          };
          this.decode = function (input) {
          var output = "",
                  chr1, chr2, chr3 = "",
                  enc1, enc2, enc3, enc4 = "",
                  i = 0;
                  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                  while (i < input.length) {
          enc1 = keyStr.indexOf(input.charAt(i++));
                  enc2 = keyStr.indexOf(input.charAt(i++));
                  enc3 = keyStr.indexOf(input.charAt(i++));
                  enc4 = keyStr.indexOf(input.charAt(i++));
                  chr1 = (enc1 << 2) | (enc2 >> 4);
                  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                  chr3 = ((enc3 & 3) << 6) | enc4;
                  output = output + String.fromCharCode(chr1);
                  if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
                  enc1 = enc2 = enc3 = enc4 = "";
          }
          };
  })
/**
  过滤html代码
  用法 <div class="substance" ng-bind-html="goDocDetailData.content | to_trusted">
*/
.filter('to_trusted', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
 })
.service('conmmonService',['$http', function ($http) {
    return {
      isExistsSessionid:function(obj){
          if(null == obj || null == obj.sessionId || undefined == obj.sessionId || '' == obj.sessionId){
              return false;
          }else{
              return true;
          }
      }
    }
}])
