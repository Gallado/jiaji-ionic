Array.prototype.remove = function(s) {
    for (var i = 0; i < this.length; i++) {
        if (s == this[i])
            this.splice(i, 1);
    }
}

/***
 * 设置数组对象中的两个属性作为map的量key和value值.
 */
function getMap(datas, keyName, valueName) {
    var map = new Map();
    if (datas == null || datas.length == 0) {
        return map;
    }
    for (var i = 0; i < datas.length; i++) {
        map.put(datas[i][keyName], datas[i][valueName]);
    }
    return map;
}
/***
 * 设置数组中的某个值作为key.
 */
function getMap(datas, keyName) {
    var map = new Map();
    if (datas == null || datas.length == 0) {
        return map;
    }
    for (var i = 0; i < datas.length; i++) {
        map.put(datas[i][keyName], datas[i]);
    }
    return map;
}

/***
 * 设置数组中的某个值作为key.
 */
function getFormFieldMap(datas, keyName,scope) {
    var map = new Map();
    var formFieldArrayList = []
    if (datas == null || datas.length == 0 ) {
        return map;
    }
    if(datas.hiddenFieldArr != undefined && datas.hiddenFieldArr.length > 0){
         for (var i = 0; i < datas.hiddenFieldArr.length; i++) {
            map.put(datas.hiddenFieldArr[i][keyName], datas.hiddenFieldArr[i]);
        }
    }
    if(datas.columnArr != undefined && datas.columnArr.length > 0){
        for (var k = 0; k < datas.columnArr.length; k++) {
            for (var j = 0; j < datas.columnArr[k].fieldArr.length; j++) {
                if(datas.columnArr[k].fieldArr[j][keyName] != undefined){
                    map.put(datas.columnArr[k].fieldArr[j][keyName], datas.columnArr[k].fieldArr[j]);
                    formFieldArrayList.push(datas.columnArr[k].fieldArr[j]);
                }
            }
        }
    }
    if(scope){
        scope.formFieldArrayList = formFieldArrayList;
    }
    return map;
}

/**
 * Simple Map
 * 
 * 
 * var m = new Map();
 * m.put('key','value');
 * ...
 * var s = "";
 * m.each(function(key,value,index){
 *      s += index+":"+ key+"="+value+"\n";
 * });
 * alert(s);
 * 
 * @author dewitt
 * @date 2008-05-24
 */
function Map() {
    /** 存放键的数组(遍历用到) */
    this.keys = new Array();
    /** 存放数据 */
    this.data = new Object();

    /**
     * 放入一个键值对
     * @param {String} key
     * @param {Object} value
     */
    this.put = function(key, value) {
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };

    /**
     * 获取某键对应的值
     * @param {String} key
     * @return {Object} value
     */
    this.get = function(key) {
        return this.data[key];
    };

    /**
     * 删除一个键值对
     * @param {String} key
     */
    this.remove = function(key) {
        this.keys.remove(key);
        this.data[key] = null;
    };

    /**
     * 遍历Map,执行处理函数
     * 
     * @param {Function} 回调函数 function(key,value,index){..}
     */
    this.each = function(fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
        }
    };

    /**
     * 获取键值数组(类似Java的entrySet())
     * @return 键值对象{key,value}的数组
     */
    this.entrys = function() {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entrys;
    };

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function() {
        return this.keys.length == 0;
    };

    /**
     * 获取键值对数量
     */
    this.size = function() {
        return this.keys.length;
    };

    /**
     * 重写toString 
     */
    this.toString = function() {
        var s = "{";
        for (var i = 0; i < this.keys.length; i++, s += ',') {
            var k = this.keys[i];
            s += k + "=" + this.data[k];
        }
        s += "}";
        return s;
    };
}
