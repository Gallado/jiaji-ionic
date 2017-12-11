angular.module('huatekApp.directive').directive('searchBar', [function () {
	return {
		scope: {
			ngModel: '='
		},
		require: ['^ionNavBar', '?ngModel'],
		restrict: 'E',
		replace: true,
		template: '<ion-nav-buttons side="right">'+
						'<div class="searchBar">'+
							'<div class="searchTxt" ng-show="ngModel.show">'+
						  		'<div class="bgdiv"></div>'+
						  		'<div class="bgtxt">'+
						  			'<input type="text" placeholder="请输入运单号" ng-model="ngModel.txt">'+
						  		'</div>'+
					  		'</div>'+
						  	'<button class="button button-icon ion-search" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></button>'+
						'</div>'+
					'</ion-nav-buttons>',

		compile: function (element, attrs) {
			var icon=attrs.icon
					|| (ionic.Platform.isAndroid() && 'ion-android-search')
					|| (ionic.Platform.isIOS()     && 'ion-ios7-search')
					|| 'ion-search';
			angular.element(element[0].querySelector('.button')).addClass(icon);

			return function($scope, $element, $attrs, ctrls) {
				var navBarCtrl = ctrls[0];
				$scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;

			};
		},
		controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
			var title, definedClass;
			$scope.$watch('ngModel.show', function(showing, oldVal, scope) {
				if(showing!==oldVal) {
					if(showing) {
						if(!definedClass) {
							var numicons=$scope.navElement.children().length;
							angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
						}

						title = $ionicNavBarDelegate.title();
						console.log(title);
						console.log(1);
						$ionicNavBarDelegate.setTitle('');
					} else {
						$ionicNavBarDelegate.setTitle(title);
						console.log(title);
						console.log(2);
					}
					console.log(title);
					console.log(4);
				} else if (!title) {
					title = $ionicNavBarDelegate.title();
					console.log(title);
					console.log(3);
				}
			});
		}]
	};
}])