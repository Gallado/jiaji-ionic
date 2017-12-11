
/** 
 * 对日期进行格式化， 
 * @param date 要格式化的日期 
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有： 
 *     y:年, 
 *     M:年中的月份(1-12), 
 *     d:月份中的天(1-31), 
 *     h:小时(0-23), 
 *     m:分(0-59), 
 *     s:秒(0-59), 
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
function dateFormat(date, format) {
    if(format === undefined){
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1, 
        "d": date.getDate(), 
        "h": date.getHours(),  
        "m": date.getMinutes(), 
        "s": date.getSeconds(), 
        "q": Math.floor((date.getMonth() + 3) / 3), 
        "S": date.getMilliseconds() 
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};

/**拷贝查询条件*/
function copyQueryPage(queryPage){
    var newQueryPage = new QueryPage(queryPage.page, queryPage.pageSize, queryPage.orderBy, queryPage.sessionId);
    if(queryPage.queryParamList && queryPage.queryParamList.length>0){
        var params = [];
        for(var i=0; i<queryPage.queryParamList.length; i++){
            params[i] = copyQueryParam(queryPage.queryParamList[i]);
        }
        newQueryPage.queryParamList = params;
    }
    return newQueryPage;
}

/**拷贝查询参数*/
function copyQueryParam(queryParam){
    /*处理日期时间类型*/
       if (queryParam.componentType == 'date-time') {
            if (cnex4_isEmpty_str(queryParam.value)) {
                queryParam.value = queryParam.value;
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
}



/**前端工具类*/


/**
 * YYYY-MM-DD HH:mm:ss
 */
function getNowFormatDate(d) {
    var date;
    if(typeof(d) == 'undefined'){
        date = new Date();
    }else{
        date = d;
    }
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    
    var hour=date.getHours();
    var minute =date.getMinutes();
    var second =date.getSeconds();
    
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}
function getNowFormatYYYYMMDD(d) {
    var date;
    if(typeof(d) == 'undefined'){
        date = new Date();
    }else{
        date = d;
    }
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
    var currentdate = year + seperator1 + month + seperator1 + strDate
            + " 00:00:00";
    return currentdate;
}
/**
 * get YYYY/MM/DD
 */
function getYYYYMDDDate(){
    var tt =getNowFormatDate();
    return getDate(tt);
}
function getYYYYMDDDate(d){
    var tt =getNowFormatDate(d);
    return getDate(tt);
}
/**
 * 传入一个字符串类型的日期时间格式，返回日期字符串
 * 例如：传入2015-01-02 12:10:11 返回2015-01-02
 */
function getDate(strDateTime){
    if(strDateTime && strDateTime.length == 19){
        var index = strDateTime.indexOf(' ');
        return strDateTime.substring(0,index);
    }
    return null;
}

/**
 * 传入一个字符串类型的日期时间格式，返回时间字符串
 * 例如：传入2015-01-02 12:10:11 返回12:10:11
 */
function getTime(strDateTime){
    if(strDateTime && strDateTime.length == 19){
        var index = strDateTime.indexOf(' ');
        return strDateTime.substr(index+1);
    }
    return null;
}

/**
 * 从formField中获取日期时间的值
 * @param formField
 */
function getDateTimeFromFormFiled(formField){
    return formField.minValue + " " + formField.maxValue;
}

/**
 * 从formField中获取日期时间的值
 * @param formField
 */
function getDateTimeForDateTimeSection(minValue,maxValue){
    return minValue + " " + maxValue;
}

/**
 * 根据只读列表将formFieldMap中对象都设置上只读属性
 * @param readOnlyArray
 * @param formFieldMap
 */
function setReadOnly(readOnlyArray,formFieldMap){
    if(readOnlyArray && readOnlyArray.length > 0){
        for(var i = 0 ; i < readOnlyArray.length ; i ++){
            if(formFieldMap.get(readOnlyArray[i]) && formFieldMap.get(readOnlyArray[i]) != undefined){
                formFieldMap.get(readOnlyArray[i]).readonly = true;
            }
        }
    }
}


/*全部设置为readOnly*/
function setWholeReadOnly(formFieldArray,formFieldMap){
    if(formFieldArray && formFieldArray.length > 0){
        for(var i = 0 ; i < formFieldArray.length ; i ++){
            if(formFieldMap.get(formFieldArray[i].name) && formFieldMap.get(formFieldArray[i].name) != undefined){
                formFieldMap.get(formFieldArray[i].name).readonly = true;
            }
        }
    }
}



/**
 * 根据只读列表将formFieldMap中对象都设置成非只读属性
 * @param notReadOnlyArray
 * @param formFieldMap
 */
function setNotReadOnly(notReadOnlyArray,formFieldMap){
    if(notReadOnlyArray && notReadOnlyArray.length > 0){
        for(var i = 0 ; i < notReadOnlyArray.length ; i ++){
            if(formFieldMap.get(notReadOnlyArray[i]) && formFieldMap.get(notReadOnlyArray[i]) != undefined){
                formFieldMap.get(notReadOnlyArray[i]).readonly = false;
            }
        }
    }
}

/**
 * 将传入集合的isShow属性设成false
 * @param hiddenArray
 * @param formFieldMap
 */
function setHidden(hiddenArray,formFieldMap){
    if(hiddenArray && hiddenArray.length > 0){
        for(var i = 0 ; i < hiddenArray.length ; i ++){
            if(formFieldMap.get(hiddenArray[i]) && formFieldMap.get(hiddenArray[i]) != undefined){
                formFieldMap.get(hiddenArray[i]).isShow = false;
                formFieldMap.get(hiddenArray[i]).value = '';
            }
        }
    }
}

/**
 * 将传入集合的isShow属性设成true
 * @param hiddenArray
 * @param formFieldMap
 */
function setShow(hiddenArray,formFieldMap){
    if(hiddenArray && hiddenArray.length > 0){
        for(var i = 0 ; i < hiddenArray.length ; i ++){
            if(formFieldMap.get(hiddenArray[i]) && formFieldMap.get(hiddenArray[i]) != undefined){
                formFieldMap.get(hiddenArray[i]).isShow = true;
            }
        }
    }
}


/**
 * 清空字段
 * @param cleanArray
 * @param formFieldMap
 */
function cleanForm(cleanArray,formFieldMap){
    if(cleanArray && cleanArray.length > 0){
        for(var i = 0 ; i < cleanArray.length ; i ++){
            if(formFieldMap.get(cleanArray[i]) && formFieldMap.get(cleanArray[i]) != undefined){
                if(formFieldMap.get(cleanArray[i]).model == 'date-section'){
                    formFieldMap.get(cleanArray[i]).minValue = null;
                    formFieldMap.get(cleanArray[i]).maxValue = null;
                }else{
                    formFieldMap.get(cleanArray[i]).value = null;
                }
            }
        }
    }
}

/**
 * 把集合中的字段值改为false
 * @param cleanArray
 * @param formFieldMap
 */
function cleanFormFalse(cleanArray,formFieldMap){
    if(cleanArray && cleanArray.length > 0){
        for(var i = 0 ; i < cleanArray.length ; i ++){
            if(formFieldMap.get(cleanArray[i]) && formFieldMap.get(cleanArray[i]) != undefined){
                formFieldMap.get(cleanArray[i]).value = false;
            }
        }
    }
}

/**
 * 根据只读列表将formFieldMap中对象都设置不可用
 * @param readOnlyArray
 * @param formFieldMap
 */
function setDisabled(readOnlyArray,formFieldMap){
    if(readOnlyArray && readOnlyArray.length > 0){
        for(var i = 0 ; i < readOnlyArray.length ; i ++){
            if(formFieldMap.get(readOnlyArray[i]) && formFieldMap.get(readOnlyArray[i]) != undefined){
                formFieldMap.get(readOnlyArray[i]).disabled = 'disabled';
            }
        }
    }
}

/**
 * 根据必填列表将formFieldMap中对象都设置非必填
 * @param requireArray
 * @param formFieldMap
 */
function setRequire(requireArray,formFieldMap){
    if(requireArray && requireArray.length > 0){
        for(var i = 0 ; i < requireArray.length ; i ++){
            if(formFieldMap.get(requireArray[i]) && formFieldMap.get(requireArray[i]) != undefined){
                formFieldMap.get(requireArray[i]).require = 0;
            }
        }
    }
}

/**
 * 根据列表将formFieldMap中对象设置是否必填属性
 * @param requireArray
 * @param formFieldMap
 * @param requ 1为必填，0为非必填
 */
function getRequire(requireArray,formFieldMap,requ){
    if(requireArray && requireArray.length > 0){
        for(var i = 0 ; i < requireArray.length ; i ++){
            if(formFieldMap.get(requireArray[i]) && formFieldMap.get(requireArray[i]) != undefined){
                formFieldMap.get(requireArray[i]).require = requ;
            }
        }
    }
}



/**
 * 校验未选中，多选
 * @param selectData
 */
function check(selectData){
    if(selectData.length == 0){
        submitTips('请在列表中选择一条用于操作的数据。','warning');
        return true;
    }
    if(selectData.length > 1){
        submitTips('警告：不能选择多条数据。','warning');
        return true;
    }
    return false;
}

/**
 * 自动消失的提示信息
 * @param type [success,error,warning,info]
 * @param msg 提示信息
 * @param time 时间
 */
function submitTips(msg,type,time){
    if(type == 'error'){
        time = time*1000 || 5000;
        var d=+new Date();
        $('#notify').append('<div class="ui-notify ui-notify-error" id="J_st'+d+'"><h4>提示信息</h4><div class="text">'+msg+'</div>');
        $('#J_st'+d).slideDown('120',function(){
            setTimeout(function(){
                $('#J_st'+d).slideUp('120',function(){
                    $(this).remove();
                })
            },time);
        });
    }else if(type == 'success'){
        time = time*1000 || 3000;
        var d=+new Date();
        $('#notify').append('<div class="ui-notify ui-notify-success" id="J_st'+d+1+'"><h4>提示信息</h4><div class="text">'+msg+'</div>');
        $('#J_st'+d+1).slideDown('120',function(){
            setTimeout(function(){
                $('#J_st'+d+1).slideUp('120',function(){
                    $(this).remove();
                })
            },time);
        });
    }else if(type == 'warning'){
        time = time*1000 || 3000;
        var d=+new Date();
        $('#notify').append('<div class="ui-notify ui-notify-warning" id="J_st'+d+2+'"><h4>提示信息</h4><div class="text">'+msg+'</div>');
        $('#J_st'+d+2).slideDown('120',function(){
            setTimeout(function(){
                $('#J_st'+d+2).slideUp('120',function(){
                    $(this).remove();
                })
            },time);
        });
    }else if(type == 'info'){
        time = time*1000 || 3000;
        var d=+new Date();
        $('#notify').append('<div class="ui-notify ui-notify-info" id="J_st'+d+3+'"><h4>提示信息</h4><div class="text">'+msg+'</div>');
        $('#J_st'+d+3).slideDown('120',function(){
            setTimeout(function(){
                $('#J_st'+d+3).slideUp('120',function(){
                    $(this).remove();
                })
            },time);
        });
    }
    
}


/**
 * 将showName和returnValue对应的值放到dataArray中
 * @param showName
 * @param returnValue
 * @param data
 * @returns
 */
function resolveShowFieldAndReturnField(fieldObj,dataArray){    
    var showField = null,returnField = null;
    if(fieldObj.showField != null){
        showField = fieldObj.showField;
        if(fieldObj.returnField == null){
            returnField = fieldObj.showField;
        }else{
            returnField = fieldObj.returnField;
        }
    }else{
        showField = fieldObj.showName;
        if(fieldObj.returnValue == null){
            returnField = fieldObj.showName;
        }else{
            returnField = fieldObj.returnValue;
        }
    }
    /*设置默认值*/
    var defaultValueArr = [];
    /*设置显示值和返回值*/
    angular.forEach(dataArray,function(data,index,array){
        if(data.isDefault && 1 == data.isDefault){
            defaultValueArr.push(data[returnField]);
        }
        data._returnField = data[returnField];
        if(showField.indexOf(' ') > -1){
            var showFieldArr = showField.split(' ');
            var showFieldValue = '';
            /*解析表达式*/
            if(showFieldArr.length > 1){
                showFieldValue +=  data[showFieldArr[0]] + ' <';
                for(var i = 1 ; i < showFieldArr.length ; i ++){
                    if(i+1 != showFieldArr.length){
                        showFieldValue += data[showFieldArr[i]] + ' ';
                    }else{
                        showFieldValue += data[showFieldArr[i]];
                    }
                    
                }
                showFieldValue += '>';
            }
            data._showField = showFieldValue;
        }else{
            data._showField = data[showField];
        }
    });
    
    fieldObj.defaultValue = defaultValueArr;
}

/**
 * 清空多选下拉
 */
function cleanAll(){
    if($(".bs-deselect-all") && $(".bs-deselect-all").length > 0){
        $(".bs-deselect-all").each(function(){
            $(this).click();
        });
    }
}

function insertLineNode(nodeArray,node,newNodeName){
    var index = 1;
    for(var i = 0 ; i < nodeArray.length ; i ++){
        if(nodeArray[i].column == node.column && nodeArray[i].name == node.name){
            index = i;
            break;
        }
    }
    var newNode = {column:node.column,name:newNodeName};
    nodeArray.splice(index, 0, newNode);  
}


/**
 * 遮罩层（打开）
 * @param div_id
 */
function showDiv(div_id) {
    var mouseleft = 0;
    var mousetop = 0;
    if (!$("#" + div_id)[0]) {
        $(
                "<div id='" + div_id + "' style='display: none;'><img src='assets/css/images/cnexloading.gif' alt='' /></div>")
                .appendTo("body");
    }
    var div_obj = $("#" + div_id);
    var windowWidth = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;
    var popupHeight = div_obj.height();
    var popupWidth = div_obj.width();
    if (!$("#mask")[0]) {
        $("<div id='mask' style='display: none; left: 0; top: 0'></div>")
                .appendTo("body");
    }
    /* 添加并显示遮罩层*/
    $("#mask").css({
        "z-index" : "99999",
        "opacity" : "0.6",
        "display" : "block",
        "position" : "absolute",
        "background-color" : "#fff"
    }).width(windowWidth).height(windowHeight);
    div_obj.css({
        "z-index" : "100000",
        "position" : "absolute",
        "left" : mouseleft,
        "top" : mousetop,
        "display" : "block"
    });
}

/**
 *  遮罩层（关闭）
 * @param div_id
 */
function hideDiv(div_id) {
    $("#mask").css({
        "display" : "none"
    });
    $("#" + div_id).css({
        "display" : "none"
    });
}


/**
 * 生成UUID
 * @param len 长度
 * @param radix 进制
 * @returns
 */
function getUUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;

      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
}

/**
 * 去除数组中重复数据，并排序
 */
function uniqueArray(data) {
    data = data || [];
    var a = {};
    for (var i = 0; i < data.length; i++) {
        var v = data[i];
        if (typeof (a[v]) == 'undefined') {
            a[v] = 1;
        }
    };
    data.length = 0;
    for ( var i in a) {
        data[data.length] = i;
    }
    return data;
}

/**
 * 根据给定时间对象返回星期几:
 * 格式‘星期一(2016-08-01)’
 * @param date
 * @returns {String}
 */
function getCurDate(date)
{
 var week;
 switch (date.getDay()){
 case 1: week="星期一"; break;
 case 2: week="星期二"; break;
 case 3: week="星期三"; break;
 case 4: week="星期四"; break;
 case 5: week="星期五"; break;
 case 6: week="星期六"; break;
 default: week="星期日";
 }
 var years = date.getFullYear();
 var month = add_zero(date.getMonth()+1);
 var days = add_zero(date.getDate());
 var ndate = week + "(" +years+"-"+month+"-"+days + ")";
 return ndate;
}

/**
 * 日期补0
 * @param temp
 * @returns
 */
function add_zero(temp)
{
 if(temp<10) return "0"+temp;
 else return temp;
}

/**
 * 获取指定时间所在月的天数数组
 * @param selectedDate
 * @returns
 */
function getMonthDaysArray(selectedDate)
{
    var year = selectedDate.substring(0,4); 
    var month= selectedDate.substring(5,7); 
    var d = new Date(year, month, 0); 
    var daysCount = d.getDate(); 
    var strs = [];
    for (var i = 0; i < daysCount; i++) {
        var ndate = year+"-"+month+"-"+add_zero((i+1));
        strs[i] = ndate;
    }
    
    return strs;
 }

/** 数字金额大写转换(可以处理整数,小数,负数) */    
var digitUppercase = function(n) {  
    var fraction = ['角', '分'];  
    var digit = [  
        '零', '壹', '贰', '叁', '肆',  
        '伍', '陆', '柒', '捌', '玖'  
    ];  
    var unit = [  
        ['元', '万', '亿'],  
        ['', '拾', '佰', '仟']  
    ];  
    var head = n < 0 ? '欠' : '';  
    n = Math.abs(n);  
    var s = '';  
    for (var i = 0; i < fraction.length; i++) {  
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
    }  
    s = s || '整';  
    n = Math.floor(n);  
    for (var i = 0; i < unit[0].length && n > 0; i++) {  
        var p = '';  
        for (var j = 0; j < unit[1].length && n > 0; j++) {  
            p = digit[n % 10] + unit[1][j] + p;  
            n = Math.floor(n / 10);  
        }  
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;  
    }  
    return head + s.replace(/(零.)*零元/, '元')  
        .replace(/(零.)+/g, '零')  
        .replace(/^整$/, '零元整');  
};  

/**
 * 将yyyy-MM-dd格式的字符串转换成日期
 * @param str
 * @returns {Date}
 */
function stringToDate(str){
    var dateStrs = str.split("-");
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    return new Date(year, month, day);
}

/**
 * 判断字段是否有值
 * @param str
 * @returns {Boolean}
 */
function cnex4_isEmpty_str(str){
    if( undefined != str && null != str && '' != str && 0 != str){
        return true;
    }
    return false;
}

/**
 * 判断字段是否不为空
 * @param str
 * @returns {Boolean}
 */
function cnex4_isNotEmpty_str(str){
    if(undefined != str && null != str && '' != str && 0 != str){
        return true;
    }else{
        return false;
    }
}


/**
 * 判断是否正整数
 * @param val
 * @returns {Boolean}
 */
function cnex4_is_positive_integer(val){
    var reg = /^\d+$/;
    if(!reg.test(val)){
        return false;
    }
    return true;
}

/**
 * 判断是否是数字
 * @param val
 * @returns {Boolean}
 */
function cnex4_is_positive_number(val){
    var reg = /^[0-9]*$/;
    if(!reg.test(val)){
        return false;
    }
    return true;
}

/**
 * 判断字段是否不为空
 * @param str
 * @returns {Boolean}
 */
function cnex4_isNotBlank_str(str){
    if(undefined != str && null != str && str.length > 0){
        return true;
    }else{
        return false;
    }
}

/**
 * 判断是否是数字,小数点后两位
 * @param val
 * @returns {Boolean}
 */
function cnex4_is_positive_number_two(val){
    var reg = /^\d+(\.\d{2})?$/;
    if(!reg.test(val)){
        return false;
    }
    return true;
}

Array.prototype.indexOf = function(val) {              
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) return i;  
    }  
    return -1;  
};  

Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 

/**
 * 制保留2位小数，如：2，会在2后面补上00.即2.00 
 */
function formatValue(value){
    if (!value){
        return "0.00";
    }else{
        var f = Math.round(value*100)/100;
        var s = f.toString(); 
        var rs = s.indexOf('.'); 
        if (rs < 0) { 
            rs = s.length; 
             s += '.'; 
        } 
        while (s.length <= rs + 2) { 
            s += '0'; 
        } 
      return s; 
    }
}

function setReportNameToCurrent(reportCode){
    if(reportCode.indexOf('report_') > -1){
        currentReportCode = reportCode.substr(7);
        console.log(currentReportCode);
    }
    
}
/**
 * 判断地址是否包含省市区路号关键字
 * @param source
 * @returns {Boolean} 不包含其中任何一个返回false，否则返回true
 */
function checkAddressStr(source){
    if( 
            source.indexOf('区') < 0 || source.indexOf('路') < 0 || source.indexOf('号') < 0 
        ){
        return false;
    }
    return true;
}

/**
 * 动态加载JS
 * @param url
 */
function loadScript(url) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src = url;
     document.body.appendChild(script);
 }


Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "h+": this.getHours(), 
        "m+": this.getMinutes(), 
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds() 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


/**
 * 同时只能选择一个数据用于编辑验证
 */
var tipsMessage = function(selectData) {
    var flag = true;
    /*获取当前选择的数据.*/
    if (selectData.length > 1) {
        submitTips('警告：不能选择多条数据操作。', 'warning');
        flag = false;
    }
    if (selectData.length == 0) {
        submitTips('请至少勾选一条数据！', 'warning');
        flag = false;
    }
    return flag;
};


