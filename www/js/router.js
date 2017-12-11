angular.module('huatekApp.router', [])
  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      //首页
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'modules/business/home/index.html',
            controller: 'HomeCtrl'
          }
        }
      })

      //发现
      .state('tab.discovery', {
        url: '/discovery',
        views: {
          'tab-discovery': {
            templateUrl: 'modules/business/discovery/index.html',
            controller: 'DiscoveryCtrl'
          }
        }
      })

      //个人中心
      .state('tab.personCenter', {
        url: '/personCenter',
        views: {
          'tab-personCenter': {
            templateUrl: 'modules/business/personCenter/index.html',
            controller: 'PersonCenterCtrl'
          }
        }
      })

      //更多
      .state('tab.more', {
        url: '/more',
        views: {
          'tab-more': {
            templateUrl: 'modules/business/more/index.html',
            controller: 'MoreCtrl'
          }
        }
      })

      /*积分*/
      .state('integral', {
        url: '/integral',
        cache:false,
        templateUrl: 'modules/business/discovery/views/integral.html',
        controller: 'IntegralCtrl'
      })

      /*优惠券*/
      .state('coupon', {
        url: '/coupon',
        cache:false,
        templateUrl: 'modules/business/discovery/views/coupon.html',
        controller: 'CouponCtrl'
      })

      /*意见反馈*/
      .state('feedback', {
        url: '/feedback',
        cache:false,
        templateUrl: 'modules/business/more/views/feedback.html',
        controller: 'FeedbackCtrl'
      })

      /*常用地址*/
      .state('commonAddress', {
        url: '/commonAddress/:router',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/commonAddress.html',
        controller: 'CommonAddressCtrl'
      })
      /*新增地址*/
      .state('addNewAddress', {
        url: '/addNewAddress',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/addNewAddress.html',
        controller: 'AddNewAddressCtrl'
      })
      /*编辑地址*/
      .state('editAddress', {
        url: '/editAddress',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/editAddress.html',
        controller: 'EditAddressCtrl'
      })

      /*消息中心*/
      .state('messageCenter', {
        url: '/messageCenter',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/messageCenter.html',
        controller: 'MessageCenterCtrl'
      })
      /*发件草稿箱*/
      .state('sendDraftbox', {
        url: '/sendDraftbox',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/sendDraftbox.html',
        controller: 'SendDraftboxCtrl'
      })
      /*我的评价*/
      .state('myEvaluation', {
        url: '/myEvaluation',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/myEvaluation.html',
        controller: 'MyEvaluationCtrl'
      })

      /*登录页*/
      .state('login', {
        url: '/login',
        cache:false,
        templateUrl: 'modules/business/login/index.html',
        controller: 'LoginCtrl'
      })
      /*忘记密码*/
      .state('forgetPassword', {
        url: '/forgetPassword',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/forgetPassword.html',
        controller: 'ForgetPasswordCtrl'
      })

      /*我要下单*/
      .state('sendGoods', {
        url: '/sendGoods',
        cache:false,
        templateUrl: 'modules/business/sendGoods/index.html',
        controller: 'SendGoodsCtrl'
      })

      /*发货记录*/
      .state('deliveryRecord', {
        url: '/deliveryRecord',
        cache:false,
        templateUrl: 'modules/business/deliveryRecord/index.html',
        controller: 'DeliveryRecordCtrl'
      })

      /*发货记录详情*/
      .state('deliveryDetail', {
        url: '/deliveryDetail',
        cache:false,
        templateUrl: 'modules/business/deliveryRecord/views/deliveryDetail.html',
        controller: 'DeliveryDetailCtrl'
      })


      /*收货记录*/
      .state('receiptRecord', {
        url: '/receiptRecord',
        cache:false,
        templateUrl: 'modules/business/receiptRecord/index.html',
        controller: 'ReceiptRecordCtrl'
      })

      /*业务助手*/
      .state('businessHelper', {
        url: '/businessHelper',
        cache:false,
        templateUrl: 'modules/business/businessHelper/index.html',
        controller: 'BusinessHelperCtrl'
      })
      /*价格时效*/
      .state('priceAging', {
        url: '/priceAging',
        cache:false,
        templateUrl: 'modules/business/businessHelper/views/priceAging.html',
        controller: 'PriceAgingCtrl'
      })
      /*运输要求*/
      .state('transportRequirement', {
        url: '/transportRequirement',
        cache:false,
        templateUrl: 'modules/business/businessHelper/views/transportRequirement.html',
        controller: 'TransportRequirementCtrl'
      })
      /*产品介绍*/
      .state('productDescription', {
        url: '/productDescription',
        cache:false,
        templateUrl: 'modules/business/businessHelper/views/productDescription.html',
        controller: 'ProductDescriptionCtrl'
      })
      /*增值服务*/
      .state('appreciationService', {
        url: '/appreciationService',
        cache:false,
        templateUrl: 'modules/business/businessHelper/views/appreciationService.html',
        controller: 'AppreciationServiceCtrl'
      })


      /*网点查询*/
      .state('websiteQuery', {
        url: '/websiteQuery',
        cache:false,
        templateUrl: 'modules/business/websiteQuery/index.html',
        controller: 'WebsiteQueryCtrl'
      })

      /*网点地图*/
      .state('websiteMap', {
        url: '/websiteMap',
        cache:false,
        templateUrl: 'modules/business/websiteQuery/views/websiteMap.html',
        controller: 'WebsiteMapCtrl'
      })

      /*运单查询*/
      .state('orderQuery', {
        url: '/orderQuery',
        cache:false,
        templateUrl: 'modules/business/orderQuery/index.html',
        controller: 'OrderQueryCtrl'
      })
      /*运单详情*/
      .state('orderDetail', {
        url: '/orderDetail',
        cache:false,
        templateUrl: 'modules/business/orderQuery/views/orderDetail.html',
        controller: 'OrderDetailCtrl'
      })
      /*取消订单*/
      .state('cancelOrder', {
        url: '/cancelOrder',
        cache:false,
        templateUrl: 'modules/business/orderQuery/views/cancelOrder.html',
        controller: 'CancelOrderCtrl'
      })


      /*派送范围*/
      .state('deliveryRange', {
        url: '/deliveryRange',
        cache:false,
        templateUrl: 'modules/business/deliveryRange/index.html',
        controller: 'DeliveryRangeCtrl'
      })

      /*个人设置*/
      .state('personSetting', {
        url: '/personSetting',
        cache:false,
        templateUrl: 'modules/business/personCenter/views/personSetting.html',
        controller: 'PersonSettingCtrl'
      })





      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })


      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
