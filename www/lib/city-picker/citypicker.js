/**
 * Created by WillJiang on 08/12/2016.
 */
angular.module("cp",["ionic"])
  .directive('hmsPctSelect', function () {
    var TAG = 'hmsPCTSelectDirective';
    return {
      restrict: 'EA',
      scope: {
        default: '=defaultdata'
      },
      replace: true,
      transclude: true,
      template: '<div class="col" style="font-size: 14px;" ng-click="toSetDefaultPosition();">' +
      '{{selectedAddress.province+selectedAddress.city+selectedAddress.town}}' +
      '</div>',
      controller: function ($scope, $element, $attrs, $ionicModal, $http, $ionicSlideBoxDelegate, $timeout, $rootScope, $ionicScrollDelegate) {
        var selectedAddress = {};
        var addressData;
        this.$onInit = function () {
          selectedAddress = {};
          $scope.selectedAddress = {};


          $http.get('lib/city-picker/Area_Datas_v2.json').success(function (res) {
            console.log(res);
            addressData = res;
            $scope.provincesData = addressData['86'];
          }).error(function (err) {
            console.log('area_datas err = ' + angular.toJson(err));
          });

          $ionicModal.fromTemplateUrl('hmsPCTSelect-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.PCTModal = modal;
          })
        };

        $scope.lockSlide = function () {
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').enableSlide(false);
        };

        $scope.$watch('default', function (newValue) {
          if (newValue) {
            $scope.selectedAddress = newValue;
          }
        });

        $scope.toSetDefaultPosition = function () {
          $scope.showBackBtn = false;
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').slide(0);
          $ionicScrollDelegate.$getByHandle('PCTSelectProvince').scrollTop();
          $scope.PCTModal.show();
        };

        //选择省
        $scope.chooseProvince = function (selectedProvince) {
          var selectedProvinceIndex;

          angular.forEach($scope.provincesData, function (item, index) {
            if (item === selectedProvince) {
              selectedProvinceIndex = index;
              return;
            }
          });


          selectedAddress = {};
          $scope.showBackBtn = true;
          $scope.citiesData = addressData['' + selectedProvinceIndex + ''];


          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').next();
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').update();
          $ionicScrollDelegate.$getByHandle('PCTSelectCity').scrollTop();
          selectedAddress.province = selectedProvince;
        };

        //选择市
        $scope.chooseCity = function (selectedCity) {
          var selectedCityIndex;

          angular.forEach($scope.citiesData, function (item, index) {
            if (item === selectedCity) {
              selectedCityIndex = index;
              return;
            }
          });

          $scope.townData = addressData['' + selectedCityIndex + ''];

          selectedAddress.city = selectedCity;
          if (!$scope.townData) {
            selectedAddress.town = '';
            $scope.selectedAddress = selectedAddress;

            $rootScope.$broadcast('PCTSELECT_SUCCESS', {result: $scope.selectedAddress});

            $timeout(function () {
              $scope.PCTModal.hide();
            }, 200);
          }else{
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').next();
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').update();
            $ionicScrollDelegate.$getByHandle('PCTSelectTown').scrollTop();
          }
        };

        //选择县
        $scope.chooseTown = function (selectedTown) {
          selectedAddress.town = selectedTown;
          $scope.selectedAddress = selectedAddress;

          $rootScope.$broadcast('PCTSELECT_SUCCESS', {result: $scope.selectedAddress});

          $timeout(function () {
            $scope.PCTModal.hide();
          }, 200);
        };

        //slide返回上一级
        $scope.goBackSlide = function () {
          var currentIndex = $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').currentIndex();
          if (currentIndex > 0) {
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').previous();
          }
          if (currentIndex === 1) {
            $scope.showBackBtn = false;
          }
        };

        $scope.$on('$destroy', function () {
          $scope.PCTModal.remove();
        });
      }
    };
  })
