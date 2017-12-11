/**自定义插件*/
angular.module('huatekApp.directive', [])
.directive('autoFocus', function(){
          return function(scope, element){
            element[0].focus();
          };
    });

