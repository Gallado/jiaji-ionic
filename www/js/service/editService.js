/*新增*/
var EditServiceFunction = function($rootScope, $state, $ionicModal, $timeout, $http, $q,$ionicPopup) {
    var _scope;
    var _location;
    var _fieldMap;
    var _http;
    var _functions;
    var showPopup;
    /*获取提交数据*/
    var getPostData = function() {
        var postData = {};
        if ($rootScope.user && $rootScope.user.sessionId) {
            postData["sessionId"] = $rootScope.user.sessionId;
        }
        if (_fieldMap) {
            _fieldMap.each(function(k, data, i) {
                if (data.value) {
                    postData[k] = data.value;
                }
            });
        }
        return postData;
    };
    /*url添加sessionId*/
    var loadURLSession= function(url){
        return url+ '?sessionId=' + $rootScope.user.sessionId;
    }

    this.getPostDataForApp = function() {
        var postData = {};
        if ($rootScope.user && $rootScope.user.sessionId) {
            postData["sessionId"] = $rootScope.user.sessionId;
        }
        if (_fieldMap) {
            _fieldMap.each(function(k, data, i) {
                if (data.value) {
                    postData[k] = data.value;
                }
            });
        }
        return postData;
    };



    /**初始化editService*/
    this.init = function(scope, detailTitle, formFieldArr, model) {
        _scope = scope;
        _http = $http;
        scope.detailTitle = detailTitle;
        scope.formFieldArr = formFieldArr;
        this.setFormFields(formFieldArr);
        scope.model = model;
    };

    /**设置页面表单对象*/
    this.setFormFields = function(formFieldArray) {
        _fieldMap = getFormFieldMap(formFieldArray, "name",_scope);
        _scope.dataFiled = _fieldMap;
        /* for (var index in _scope.formFieldArrayList) {
             var field = _scope.formFieldArrayList[index];
             cacheService.bindFieldData(field);
         }*/
    };

    this.getFieldMap = function() {
        return _fieldMap;
    };

    /**设置字段影藏*/
    this.setDisplayFileds = function(arr) {
        if (arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (_fieldMap.get(arr[i])) {
                    _fieldMap.get(arr[i]).display = false;
                }
            }

        }
    }

    /**给页面字段设置当前登陆用户信息*/
    this.setUserInfo = function(obj) {
        if (obj) {
            for (var i in obj) {
                if (_fieldMap.get(i) && $rootScope.getUserInfo(obj[i])) {
                    _fieldMap.get(i).value = $rootScope.getUserInfo(obj[i]);
                }
            }
        }
    };

    /**给页面字段赋值*/
    this.setFieldValue = function(fieldName, fieldValue) {
        if (_fieldMap.get(fieldName)) {
            _fieldMap.get(fieldName).value = fieldValue;
        }else{
            console.log("无此对象");
        }
    }

    /*设置保存请求路径*/
    this.setSaveUrl = function(saveUrl, homeUrl) {
        _scope.save = function() {
            if (!isAllowPost()) {
                return;
            }
            console.log(112233);
            _scope.promise = _http.post(loadURLSession(saveUrl), getPostData()).success(function(response) {
                if (response.type == 'success') {
                    showPopup(_scope,response.text);
                    $state.go(homeUrl);
                } else {
                    /*submitTips(response.text, 'error');*/
                }
            }).error(function(response){
                showPopup(_scope,response.text);
                return;
            }); 
        }
    };

    /*设置更新请求路径*/
    this.setUpdateUrl = function(updateUrl, homeUrl) {
        _scope.update = function() {
            if(!isAllowPost()){
                return ;
            }
            _scope.promise = _http.post(loadURLSession(updateUrl), getPostData()).success(function(response) {
                if (response.type == 'success') {
                    showPopup(_scope,response.text);
                    $state.go(homeUrl);
                } else {
                    /*submitTips(response.text, 'error');*/
                }
            });
        };
    };

    /**
     * beforeInitCallback 在数据加载成功之后，渲染页面之前执行
     * afterInitCallback 在数据加载成功之后，渲染页面之后执行
     */
    this.loadData = function(url, id, afterInitCallback, beforeInitCallback) {
        _scope.promise = _http.get(loadURLSession(url + "/" + id)).success(function(response) {
             /*数据渲染前*/
            if(angular.isFunction(beforeInitCallback)){
               beforeInitCallback();
            }
            if (_scope.model == 'read') {
                // _scope.detail = response;
                if (response) {
                    for (var i in response) {
                        if (_fieldMap.get(i)) {
                            _fieldMap.get(i).readOnly = true;
                            if(_fieldMap.get(i).componentType == 'modal-select-single-name'){
                                _fieldMap.get(i).opt = {name:response[i]};
                            }else if(_fieldMap.get(i).componentType == 'modal-select-single-org'){
                                _fieldMap.get(i).opt = {orgName:response[i]};
                            }else{
                                _fieldMap.get(i).value = response[i];
                            }
                        }
                    }
                }
            } else {
                if (response) {
                    for (var i in response) {
                        if (_fieldMap.get(i)) {
                            if(_fieldMap.get(i).componentType == 'modal-select-single-name'){
                                _fieldMap.get(i).opt = {name:response[i]};
                            }else if(_fieldMap.get(i).componentType == 'modal-select-single-org'){
                                _fieldMap.get(i).opt = {orgName:response[i]};
                            }else{
                                _fieldMap.get(i).value = response[i];
                            }
                        }
                    }
                }
            };
            /*数据渲染后*/
            if(angular.isFunction(afterInitCallback)){
               afterInitCallback();
            }
        });
    };

    /*校验表单是否允许提交*/
    var isAllowPost = function() {
        var formFieldArray = _scope.formFieldArrayList;
        // var formFieldArray = _scope.formFieldArr;
        console.log(formFieldArray);
        var allowPost = true;
        /*未取到表单字段集合*/
        if (!formFieldArray || formFieldArray.length < 1) {
            return true;
        }
        /*遍历当前集合，校验所有字段*/
        for (var i = 0; i < formFieldArray.length; i++) {
            checkData(i);
        }
        var errorMsgArray = [];
        /*遍历当前集合，判断时候所有字段校验都通过*/
        angular.forEach(formFieldArray, function(data, index, array) {
            if (data.errorMsg != null || data.minErrorMsg != null || data.maxErrorMsg != null || data.minTimeErrorMsg != null || data.maxTimeErrorMsg != null) {
                console.log(data.title + "，data.errorMsg=" + data.errorMsg + ";data.minErrorMsg=" + data.minErrorMsg + "data.maxErrorMsg=" + data.maxErrorMsg + ";data.minTimeErrorMsg=" + data.minTimeErrorMsg + ";data.maxTimeErrorMsg=" + data.maxTimeErrorMsg);
                var errorMessage = '';
                if (null != data.errorMsg) {
                    errorMessage += data.errorMsg;
                }
                if (null != data.minErrorMsg) {
                    errorMessage += data.minErrorMsg;
                } else {
                    if (null != data.maxErrorMsg) {
                        errorMessage += data.maxErrorMsg;
                    }
                }
                if (null != data.minTimeErrorMsg) {
                    errorMessage += data.minTimeErrorMsg;
                } else {
                    if (null != data.maxTimeErrorMsg) {
                        errorMessage += data.maxTimeErrorMsg;
                    }
                }
                var errorItem = new errorMsgItem(data.title, errorMessage);
                errorMsgArray.push(errorItem);
                allowPost = false;
                return;
            }
        });
        if (!allowPost) {
            // submitTips('数据输入错误:' + errorMsgArray[0].title + errorMsgArray[0].msg, 'error');
            showPopup(_scope,'数据输入错误:' + errorMsgArray[0].title + errorMsgArray[0].msg);
            return false;
        }
        return true;
    };

    /*更新操作*/
    this.updateData = function(toUrl, homeUrl, id, checkDataCallback, saveDataCallback) {
        if (!this.isAllowPost()) {
            return;
        } else {
            if (checkDataCallback != null && typeof(checkDataCallback) == "function") {
                if (!checkDataCallback()) {

                    /*                  bootbox.alert("数据输入错误，请修正后再提交!\t");*/
                    submitTips('数据输入错误，请修正后再提交!\t', 'error');
                    return;
                }
            }
        }
        var data = this.getPostData();
        var actionUrl = toUrl + "/" + id;
        _scope.promise = _http.post(actionUrl, data).success(function(response) {
            if (response.type == 'success') {
                if (homeUrl != null && homeUrl != '') {
                    _location.path(homeUrl);
                }
                if (saveDataCallback != null && typeof(saveDataCallback) == "function") {
                    saveDataCallback();
                }
            } else {
                submitTips(response.text, 'error');
            }
        });
    };

    /*提交操作*/
    this.submitData = function(toUrl, id) {
        if (!this.isAllowPost()) {
            return;
        }
        var data = this.getPostData();
        var actionUrl = toUrl + "/" + _scope.taskId + "/" + _scope.busiId;
        _scope.promise = _http.post(actionUrl, data).success(function(response) {
            if (response.type == 'success') {
                if (_scope.popCallBack) {
                    _scope.popCallBack();
                }
                _scope.$hide();
            } else {
                submitTips(response.text, 'error');
            }
        });
    };

    /*更新数据表*/
    this.updateDataTable = function(toUrl, homeUrl, id, gridTable) {
        if (!this.isAllowPost()) {
            return;
        }
        var data = this.getPostData();
        var table = gridTable.data;
        var actionUrl = toUrl + "/" + id;
        _scope.promise = _http.post(actionUrl, data, table).success(function() {
            _location.path(homeUrl);
        });
    };


    /**
     * 提供回调方法，在数据验证成功执行特定操作，比如关闭弹出框
     */
    this.saveData = function(toUrl, homeUrl, checkDataCallback, saveDataCallback) {
        if (!this.isAllowPost()) {
            return;
        } else {
            if (checkDataCallback != null && typeof(checkDataCallback) == "function") {
                if (!checkDataCallback()) {

                    /*                  bootbox.alert("数据输入错误，请修正后再提交!\t");*/
                    submitTips('数据输入错误，请修正后再提交!\t', 'error');
                    return;
                }
            }
        }
        var data = this.getPostData();
        _scope.promise = _http.post(toUrl, data).success(function(response) {
            if (response.type == 'success') {
                if (homeUrl != null && homeUrl != '') {
                    _location.path(homeUrl);
                }
                if (saveDataCallback != null && typeof(saveDataCallback) == "function") {
                    saveDataCallback();
                }
            } else {
                submitTips(response.text, 'error');
            }
        });
    };


    this.saveOrderData = function(toUrl, homeUrl, checkDataCallback, saveDataCallback) {
        if (!this.isAllowPost()) {
            return;
        } else {
            if (checkDataCallback != null && typeof(checkDataCallback) == "function") {
                if (!checkDataCallback()) {
                    bootbox.alert("数据输入错误，请修正后再提交!\t");
                    return;
                }
            }
        }
        var data = this.getPostData();
        _scope.promise = _http.post(toUrl, data).success(function(response) {
            if (response.type == 'success') {
                if (homeUrl != null && homeUrl != '') {
                    _location.path(homeUrl);
                }
                if (saveDataCallback != null && typeof(saveDataCallback) == "function") {
                    saveDataCallback();
                }
            } else {
                submitTips(response.text, 'error');
            }
        });
    };


    /**
     * 获取字典的js服务（需要在init、setFormFields服务被调用之后，再调用）
     * 
     * @param toUrl
     *            提供字典查询的服务URL
     */
    this.initParams = function(toUrl, initSuccessCallback) {
        /*_scope.promise = _http.get(toUrl).success(function(params) {
            for (var i = 0; i < params.length; i++) {
                var formField = _fieldMap.get(params[i].fieldName);
                if (formField) {
                    resolveShowFieldAndReturnField(formField, params[i].params);
                    formField.items = params[i].params;
                }
            };
        }).then(function(rest) {
            if (angular.isFunction(initSuccessCallback)) {
                initSuccessCallback();
            }
        });*/
    };

    /***
     * 加载api数据.
     */
    this.initFieldItems = function(formField, dataUrl) {
        _scope.promise = _http.get(dataUrl).success(function(params) {
            formField.items = params;
        });
    }



    /**
     * 弹出模态窗口(此类按钮不走权限过滤，不需要配置菜单，通常在表单中直接弹出)
     * 
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
    };

    /**
     * 数据校验方法
     * 
     * @param index
     *            单独字段校验时字段的序号
     */
    var checkData = function(index, checkObj) {
        var formField = checkObj || _scope.formFieldArrayList[index];

        /*初始化错误提示及样式*/
        formField.css = null;
        formField.minCss = null;
        formField.maxCss = null;
        formField.minTimeCss = null;
        formField.maxTimeCss = null;
        formField.errorMsg = null;
        formField.minErrorMsg = null;
        formField.maxErrorMsg = null;
        formField.minTimeErrorMsg = null;
        formField.maxTimeErrorMsg = null;
        var return_falg = false;
        /*checkbox,notHandle和不显示字段不做任何处理*/
        if (formField.componentType == 'notHandle' || !formField.isShow || formField.componentType == 'checkbox'||formField.componentType == 'toggle') {
            return;
        }
        /*必填字段校验，且不为隐藏字或者非处理字段*/
        if (formField.require == '1' || formField.require == 'true' || formField.require == 'require') {
            /*值部位空的时候*/
            /*特殊组件需要按类型判断()*/
            if (formField.componentType == "choose-pictrue" || formField.type=="file" ) {
                /*附件上传*/
                var filesCount = formField.filesCount;
                if (undefined == filesCount || null == filesCount || 0 == filesCount) {
                    formField.errorMsg = '上传附件不能为空';
                    formField.css = "validation-failure";
                    return;
                }
                var maxFilesCount = formField.maxFilesCount;
                if (filesCount > maxFilesCount) {
                    formField.errorMsg = '上传附件数量不能大于' + maxFilesCount;
                    formField.css = "validation-failure";
                    return;
                }
            }else {
                if ((formField.value == null || formField.value == "" || formField.value == undefined) && 0 != formField.value) {
                    formField.errorMsg = '值不能为空';
                    formField.css = "validation-failure";
                    return;
                }
            }
            if (formField.value != null && formField.value != '') {
                if (formField.componentType != "choose-pictrue"||formField.type!="file") {
                    if (formField.min >= 0 && formField.max >= 0 && (formField.value.length > formField.max || formField.value.length < formField.min)) {
                        formField.errorMsg = '长度应在' + formField.min + '和' + formField.max + '之间';
                        formField.css = "validation-failure";
                        return;
                    }
                    if (formField.min > 0 && formField.value.length < formField.min) {
                        formField.errorMsg = '长度不能小于' + formField.min;
                        formField.css = "validation-failure";
                        return;
                    }
                }
                if (formField.componentType == 'int' ) {
                    var reg = /^-?\d+$/;
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '输入的不是整数';
                        formField.css = "validation-failure";
                        return;
                    }
                    if (formField.number_MinValue != "") {
                        var value = formField.value;
                        var number_MinValue = formField.number_MinValue;
                        if (value <= number_MinValue) {
                            formField.errorMsg = '输入的值不能小于等于' + number_MinValue;
                            formField.css = "validation-failure";
                            return;
                        }
                    }
                    if (formField.number_MaxValue != "") {
                        var value = formField.value;
                        var number_MaxValue = formField.number_MaxValue;
                        if (value > number_MaxValue) {
                            formField.errorMsg = '输入的值不能大于' + number_MaxValue;
                            formField.css = "validation-failure";
                            return;
                        }
                    }
                }
                if (formField.componentType == 'number') {
                    var reg = /^(-?\d+)(\.\d+)?$/;
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '输入的不是数字';
                        formField.css = "validation-failure";
                        return;
                    }
                    if (undefined != formField.scale && (formField.value).toString().indexOf('.') > -1 && (formField.value).toString().split('.')[1].length > formField.scale * 1) {
                        formField.errorMsg = '请保留' + formField.scale + '位小数！';
                        formField.css = "validation-failure";
                        return;
                    }
                    if (formField.number_MinValue != "") {
                        var value = formField.value;
                        var number_MinValue = formField.number_MinValue;
                        if (parseFloat(value) <= parseFloat(number_MinValue)) {
                            formField.errorMsg = '输入的值不能小于等于' + number_MinValue;
                            formField.css = "validation-failure";
                            return;
                        }
                    }
                    if (formField.number_MaxValue != "") {
                        var value = formField.value;
                        var number_MaxValue = formField.number_MaxValue;
                        if (parseFloat(value) > parseFloat(number_MaxValue)) {
                            formField.errorMsg = '输入的值不能大于' + number_MaxValue;
                            formField.css = "validation-failure";
                            return;
                        }
                    }
                    if (formField.number_MinValueNoEqual != "") {
                        var value = formField.value;
                        var number_MinValueNoEqual = formField.number_MinValueNoEqual;
                        if (parseFloat(value) < parseFloat(number_MinValueNoEqual)) {
                            formField.errorMsg = '输入的值不能小于' + number_MinValueNoEqual;
                            formField.css = "validation-failure";
                            return;
                        }
                    }
                    if (formField.number_MaxValueEqual != "") {
                        var value = formField.value;
                        var number_MaxValueEqual = formField.number_MaxValueEqual;
                        if (parseFloat(value) >= parseFloat(number_MaxValueEqual)) {
                            formField.errorMsg = '输入的值不能大于等于' + number_MaxValueEqual;
                            formField.css = "validation-failure";
                            return;
                        }
                    }
                }
                if (formField.componentType == 'email') {
                    var reg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '非法的邮箱格式';
                        formField.css = "validation-failure";
                    }
                    return;
                }
                if (formField.componentType == 'phone') {
                    var reg = /^(\+86)?(1[0-9]{10})$/;
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '非法的手机号码格式';
                        formField.css = "validation-failure";
                    }
                    return;
                }
                if (formField.componentType == 'telephone') {
                    var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '非法的电话号码格式,电话格式:区号+号码';
                        formField.css = "validation-failure";
                    }
                    return;
                }
                /*既满足手机号又能满足电话号*/
                if (formField.componentType == 'telephoneOrPhone') {
                    var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
                    var reg2 = /^(\+86)?(1[0-9]{10})$/;
                    if (!reg.test(formField.value) && !reg2.test(formField.value)) {
                        formField.errorMsg = '手机或固话,固话格式:区号-号码';
                        formField.css = "validation-failure";
                    }
                    return;
                }
                if (formField.componentType == 'personalCard') {
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '非法的身份证号码输入';
                        formField.css = "validation-failure";
                    }
                    return;
                }
                /*输入正整数,不包括 0*/
                if (formField.componentType == 'numberInt') {
                    var reg = /^\+?[1-9][0-9]*$/
                    if (!reg.test(formField.value)) {
                        formField.errorMsg = '请输入非零的正整数';
                        formField.css = "validation-failure";
                    }
                    return;
                }
            }

        }

    };

    var showPopup = this.showPopup = function(scope,parmes) {

        scope.tips = parmes;
        var myPopup = $ionicPopup.show({
            title: scope.tips,
            scope: scope
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        $timeout(function() {
            myPopup.close(); 
        }, 2000);
    };

};
angular.module('huatekApp.services').service('editService', EditServiceFunction);
