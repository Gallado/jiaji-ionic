/*查询条件保存对象*/
var queryValues = {};

angular.module('huatekApp.services').service('listService',function($rootScope, $state, $ionicModal, $timeout, $http,$ionicPopup,$ionicSideMenuDelegate) {
    var _scope;
    var _http;
    var _queryPageMap;
    var loadURL;
    var _queryPage;

    var getQueryPage = function(queryPage) {
        var sessionId = null;
        if($rootScope.user){
            sessionId = $rootScope.user['sessionId'];
        }
        var newQueryPage = new QueryPage( _scope.curPage, queryPage.pageSize, queryPage.orderBy,sessionId);
        if (queryPage.queryParamList && queryPage.queryParamList.length > 0) {
            var params = [];
            for (var i = 0; i < queryPage.queryParamList.length; i++) {
                params[i] = getQueryParam(queryPage.queryParamList[i]);
            }
            newQueryPage.queryParamList = params;
        }
        return newQueryPage;
    };


    var getQueryParam = function(queryParam) {
        /*处理日期时间类型*/
        if (queryParam.componentType == 'date-time') {
            if (cnex4_isEmpty_str(queryParam.value)) {
                queryParam.value = getNowFormatDate(new Date(queryParam.value));
            } else {
                queryParam.value = null;
            }
        }
        if (queryParam.logic == "notHandle") {
            queryParam.value = null;
        }
        /*处理带操作符的数字类型*/
        if (queryParam.type == 'number' && queryParam.componentType == 'operatorNumber') {
            if (queryParam.value !== null || queryParam.value !== '') {
                queryParam.logic = queryParam.operator;
            }
        }
        return new param(queryParam.name, queryParam.type, queryParam.logic, queryParam.value, queryParam.params);
    };

    var loadData_post = function(url, queryPage,loadSuccessCallBack) {
        _http.post(url, queryPage).success(function(response) {
            console.log(response);
            if(response.content != undefined && angular.isArray(response.content) && response.content.length > 0){
                _scope.searchDataList = response.content;
            }else{
                /*封装数据*/
                _scope.searchDataList = response;

            }
            if( typeof(loadSuccessCallBack) == "function" ){
                loadSuccessCallBack();
            }

        });
    }




    this.init = function(scope,listTitle,pageFields,querySingle) {
        _scope = scope;
        _http = $http;
        /*设置页面标题*/
        scope.listTitle = listTitle;
        /*设置页面显示字段*/
        scope.pageFields = pageFields;
        /*默认为第一页*/
        scope.curPage = 1;
        $rootScope.globalBtn =[];
        $ionicModal.fromTemplateUrl('templates/searchModal.html', {
            scope: scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            scope.modal = modal;
        });

        /*下拉刷新*/
        scope.doRefresh = function() {
            /*_http.get('jsonForTest/searchListJson_refresh.json').success(function(data) {
                _scope.searchDataList = data.data;
                _scope.$broadcast('scroll.refreshComplete');
            });*/
            scope.closeMore = false;
             scope.curPage = 1;
            loadData_post(loadURL, getQueryPage(_queryPage),function(){
                scope.$broadcast('scroll.refreshComplete');
            });
        };

        /*上拉加载更多*/
        scope.loadMore = function() {
             scope.curPage ++;
             _http.post(loadURL, getQueryPage(_queryPage)).success(function(response) {
                console.log(response);
                if (response.length > 0) {
                     if(response.content != undefined && angular.isArray(response.content)){
                         /*封装数据*/
                        scope.searchDataList = scope.searchDataList.concat(response.content);
                    } else {
                         /*封装数据*/
                        scope.searchDataList = scope.searchDataList.concat(response);
                    }
                    scope.$broadcast('scroll.infiniteScrollComplete');
                }else{
                    console.log('已经加载到最后一页！');
                    scope.closeMore = true;
                }
               
            });
        }

        /*查询*/
        scope.search = function() {
                console.log("查询");
             scope.curPage = 1;
            loadData_post(loadURL, getQueryPage(_queryPage));
            scope.modal.hide();
        };

        /*清空查询*/
        scope.cleanAll = function() {
            console.log("清空查询查询");
            for(var obj in _queryPage.queryParamList){
               _queryPage.queryParamList[obj].value = null;
               _queryPage.queryParamList[obj].opt = null;
            }
        };
        /*弹出查询窗口*/
        scope.openModal = function() {
            scope.modal.show();
        };
        /*关闭查询窗口*/
        scope.closeModal = function() {
            scope.modal.hide();
        };
        /*点击显示更多操作按钮*/
        scope.showMoreOperate = function(data) {
            if (data.showMoreOperate) {
                data.showMoreOperate = false;
            } else {
                data.showMoreOperate = true;
            }
        };
        /*查看详情*/
        if(querySingle && querySingle.path){
            scope.watchDetail = function(data){
                $state.go(querySingle.path,{"type":"1","id":data[querySingle.id]});
            };
        }

    };

    /*设置数据操作按钮*/
    this.setDataOperatorBtns = function(dataOperatorBtns){
        var btnList=dataOperatorBtns.btns;
        dataOperatorBtns.btns=[];
        var btns = [];
        for(var i=0;i<btnList.length;i++){
            var btn = new Object();
            btn=btnList[i];
            if($rootScope.sourcePathMap.get(btn.name)){
              dataOperatorBtns.setBtn(btn);
            }
        }   
        _scope.dataOperatorBtns = dataOperatorBtns;
    };

    /*设置全局操作按钮*/
    this.setGlobalBtn = function(globalBtn){
        var btnList=globalBtn.btns;
        globalBtn.btns=[];
        var btns = [];
        for(var i=0;i<btnList.length;i++){
            var btn = new Object();
            btn=btnList[i];
            if($rootScope.sourcePathMap.get(btn.name)){
              globalBtn.setBtn(btn);
            }
        }
        _scope.globalBtn = globalBtn;
        //全局操作的按钮存入rootScope
        $rootScope.globalBtn = globalBtn;
    };

    this.turnPage = function(path,type,id){
        //全局按钮跳转页面后关闭右菜单
        if($ionicSideMenuDelegate.isOpenRight()){
          $ionicSideMenuDelegate.toggleRight();
        }
        if(type){
            switch(type){
                case 1:
                    $state.go(path,{"type":type,"id":id});
                    break;
                case 2:
                    $state.go(path,{"type":type});
                    break;
                case 3:
                    $state.go(path,{"type":type,"id":id});
                    break;
                default:
                    $state.go(path);
                    break;
            }
        }else{
             $state.go(path);
        }
    };

    /***************************************************************************
     * 查询后台数据返回来的就是
     * @param notNeedQueryPage 值为true的时候去掉查询条件(在列表页面弹出模态窗口的时候，如果模态窗口是列表，loadData的时候会自动拼上父列表的查询条件，所以需要在loadData的时候把notNeedQueryPage设置为true)
     */
    this.loadData = function(url, loadSuccessCallBack) {
        loadURL = url+ '?sessionId=' + $rootScope.user.sessionId;
        loadData_post(loadURL, getQueryPage(_queryPage),loadSuccessCallBack);
    };


    this.setQueryPage = function(queryPage) {
        _queryPage = queryPage;
        _scope.queryFieldList = [];
        for (var m, i = 0; i < queryPage.queryParamList.length; i++) {
            if (queryPage.queryParamList[i].isShow) {
                _scope.queryFieldList.push(queryPage.queryParamList[i]);
            }
        }
        _queryPageMap = getMap(queryPage.queryParamList, "field");
    };

    this.getFieldMap = function() {
        return _queryPageMap;
    };

    /**
     * 获取字典的js服务（需要在init、setFormFields服务被调用之后，再调用）
     *
     * @param toUrl
     *            提供字典查询的服务URL
     */
    this.initQueryParams = function(toUrl, initSuccessCallback) {
        _scope.promise = _http.get(toUrl).success(function(params) {
            for (var i = 0; i < params.length; i++) {
                var queryParam = _queryPageMap.get(params[i].fieldName);
                if (queryParam) {
                    resolveShowFieldAndReturnField(queryParam, params[i].params);
                    queryParam.items = params[i].params;
                    /*设置默认值*/
                    if (queryParam.defaultValue != undefined && queryParam.defaultValue.length > 0) {
                        if (queryParam.logic && '=' == queryParam.logic) {
                            queryParam.value = queryParam.value || queryParam.defaultValue[0];
                        } else if (queryParam.logic && 'in' == queryParam.logic) {
                            queryParam.params = queryParam.params || queryParam.defaultValue;
                        }

                    }
                }
            }
            if (angular.isFunction(initSuccessCallback)) {
                initSuccessCallback();
            }
        });
    };


    /**
     * 添加数据
     */
    this.addData = function(url) {
        _location.path(url);
    }

    /**
     * 弹出模态窗口(此类按钮走权限过滤，需要配置菜单)
     *
     * @param url
     */
    this.showModal = function(url, $modal, title) {
        var btn = actionMap.get(url);
        return $modal({
            title: title,
            content: 'My Content',
            show: false,
            backdrop: 'static',
            keyboard: false,
            controller: btn.controller,
            template: TemplatePrefix + btn.view
        });
    }


    /**
     * 弹出模态窗口(此类按钮不走权限过滤，不需要配置菜单，通常在表单中直接弹出)
     * @param btnObj
     */
    this.showModalForNoMenu = function(btnObj, $modal) {
        return $modal({
            title: btnObj.title,
            content: btnObj.content,
            show: false,
            backdrop: 'static',
            keyboard: false,
            controller: btnObj.controller,
            template: TemplatePrefix + btnObj.template
        });
    }
    this.showPopup = function(scope,parmes) {

        scope.tips = parmes;
        /*An elaborate, custom popup*/
        var myPopup = $ionicPopup.show({
            /*template: '<input type="password" ng-model="data.wifi">',*/
            title: scope.tips,
            /*subTitle: 'Please use normal things',*/
            scope: scope
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        $timeout(function() {
            myPopup.close(); /*close the popup after 3 seconds for some reason*/
        }, 2000);
    };
    /***************************************************************************
     * 编辑用户.
     */
    /*this.editData = function(gridApi, toUrl) {
        var selectData = this.returnSectData(gridApi);
        if (selectData.length > 1) {
            submitTips('警告：不能选择多条数据操作。', 'warning');
            return;
        }
        if (selectData.length == 0) {
            submitTips('请在列表中选择一条数据操作。', 'warning');
            return;
        }
        _location.path(toUrl + "/" + selectData[0].id);
    }*/

    /**
     * 返回选中行对象数组
     */
    /*this.returnSectData = function(gridApi) {
        return gridApi.selection.getSelectedRows();
    }*/

    /***********************************************************************
     * 获取当前选择数据
     */
    /*this.getSelectData = function(gridApi) {
        var selectData = gridApi.selection.getSelectedRows();
        if (selectData.length > 1) {
            submitTips('警告：不能选择多条数据。', 'warning');
            return;
        }
        if (selectData.length == 0) {
            submitTips('请在列表中至少选择要操作的数据。', 'warning');
            return;
        }
        return selectData[0];
    }*/

});

/*angular.module('huatekApp.services').service('listService', ListServiceFunction);*/
