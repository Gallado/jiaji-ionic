angular.module('huatekApp.services').factory('HomeService', function(){
  return{
    getData :function(){
      var parmas = "A";
      var data = {"name":"Gherardo","age":20};
      return data;
    }
  }
});
