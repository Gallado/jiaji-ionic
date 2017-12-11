
/**
 *  页面分页组件. 
 * @page button 显示名字.
 * @pageSize button名字
 * @show={1,-1}  {显示,不显示}
 * @even click事件
 * @url 后台记录的访问路劲
 */
function QueryPage(page, pageSize, orderBy,sessionId){
	var queryPage = new Object;
	queryPage.page = page;
	queryPage.queryType = 'app';
	queryPage.pageSize = pageSize;
	queryPage.orderBy = orderBy;
	queryPage.queryParamList = [];
	queryPage.sessionId = sessionId;
	queryPage.addParam = function(param){
		queryPage.queryParamList.push(param);
	}
	return queryPage;
};

/***
 * 查询条件对象.
 * @type={string, long, double, date, dateTime}
 * @logic={'=','>','<',">=","<=","like","in"}
 */
function queryParam (title, name, type, componentType,logic, value, dropDataUrl,isShow, event){
	this.title = title;
	this.name = name;
	this.type = type;
	this.componentType = componentType;/*组件类型，默认不指定，如果需要使用单选的时候指定一下*/
	this.logic = logic;
	if(!logic || logic == undefined){
		this.logic = '=';
	}
	this.value = value;
	this.items = [];
	this.setitem = function(itemsArray) {
		this.items = itemsArray;
	}
	this.dropDataUrl = dropDataUrl;
	if(typeof(isShow) == "undefined") {
		this.isShow = true;
	} else {
		this.isShow = isShow;
	}
	this.event = event;
};

/***查询参数对象*/
function param (field, type, logic, value, items){
	this.field = field;
	this.type = type;
	this.logic = logic;
	this.value = value;
	if(null == items){
		this.items = [];
	}else{
		this.items = items;
	}
}

/***
 * 页面按钮对象.
 * @title button 显示名字.
 * @name button名字
 * @show={true,false}  {显示,不显示}
 * @even click事件
 * @url 后台记录的访问路劲
 */
function pageButton(title, name, url, event, target){
	var pageButton = new Object();
	pageButton.title = title;
	pageButton.name = name;
	pageButton.event = event;
	/*pageButton.show = actionMap.get(url)!=null;*/
	pageButton.disable = false;
	pageButton.target = target;
	return pageButton;
}

/*数据操作按钮集合对象*/
function DataOperatorArr(){
	var operatorBtns = new Object();
	operatorBtns.btns = [];
	operatorBtns.setBtn = function(btn){
		this.btns.push(btn);
	};
	return operatorBtns;
}

/*数据操作按钮*/
function DataBtn(title,name,operator){
	var btn = new Object();
	btn.title = title;
	btn.name = name;
	btn.operator = operator;
	return btn;
}


/*全局操作按钮*/
function GlobalBtnArr(){
	var btnArr = new Object();
	btnArr.btns = [];
	btnArr.setBtn = function(btn){
		this.btns.push(btn);
	};
	return btnArr;
}

/*全局操作按钮*/
function GlobalBtn(title,name,operator){
	var btn = new Object();
	btn.title = title;
	btn.name = name;
	btn.operator = operator;
	return btn;
}

/*查看详情对象*/
function QuerySingle(path,id){
	var querySingle = new Object();
	querySingle.path = path;
	querySingle.id = id;
	return querySingle;
}

/*表单字段集合对象*/
function FormFieldArr(){
	var formArr = new Object();
	formArr.columnArr = [];
	formArr.hiddenFieldArr = [];
	formArr.setHiddenField = function(hiddenField){
		this.hiddenFieldArr.push(hiddenField);
	};
	formArr.setColumns = function(column){
		this.columnArr.push(column);
	};
	return formArr;
}

/*表单分栏对象*/
function FormColumn(title,name){
	var column = new Object();
	column.title = title;
	column.name = name;
	column.fieldArr = [];
	column.setField = function(field){
		this.fieldArr.push(field);
	}
	return column;
}

/*表单字段对象*/
function FormField(title, name, type,componentType,require, max, min,readonly,dropDataUrl,event,defaultValue,display){
	this.title = title;
	this.name = name;
	this.type = type;
	this.componentType = componentType;
	/**
	 * 目前设置下面几种类型的数据:
	 * email、phone、number
	 */
	this.require = require;
	this.max = max;
	this.event = event;
	if(null == min){
		this.min = '0';
	}else{
		this.min = min;
	}
	this.items = [];
	this.value = defaultValue;
	this.dropDataUrl = dropDataUrl;
	this.readonly = readonly?true:false;
	this.display = display?true:false;
	this.isShow = true;
}


/***
 * 
 * @param title 显示名称
 * @param name 字段名
 * @param type 字段类型
 * @param require 是否必填
 * @param max 最大长度
 * @param model 显示类型
 * @param event 事件
 * @param min 最小长度
 */
function FormElement(column,title, name, type, require, max, model, event, min,defaultValue,dropDataUrl,readonly){
	this.column = column;
	this.title = title;
	this.name = name;
	this.type = type;
	/**
	 * 目前设置下面几种类型的数据:
	 * email、phone、number
	 */
	this.require = require;
	this.max = max;
	this.model = model;
	this.event = event;
	if(null == min){
		this.min = '0';
	}else{
		this.min = min;
	}
	this.css = "";
	this.items = [];
	this.value = defaultValue;
	/***
	 * 针对模糊查询数据回填显示困难的问题，
	 * 提供一个显示展示数据的字段.
	 * 该字段在服务器端以如下格式传递：
	 * fieldName_=displayValue
	 * 和真实值相差一个下划线.
	 */
	this.displayValue;
	this.dropDataUrl = dropDataUrl;
	this.showText = "";
	this.errorMsg = "";
	this.readonly = readonly?true:false;
	this.uploadFileDir="";/*如果为文件字段，指定上传的目录，按照模块划分*/
	this.businessId="";/*业务的id*/
	this.viewDivId="";/*图片上传后用于显示图片的div id*/
	this.busiType="";/*业务类型 id*/
	/*date 和  time 类型默认值*/
	this.dateFormat = "yyyy-MM-dd";/*日期格式*/
	this.autoclose = "1";/*是否自动关闭 boolean*/
    this.dateType = "string";/*预期类型  date | number | unix | iso | string*/
    this.minDate = "01/01/1900"; /*最小时间*/
    this.maxDate = "31/12/2050"; /*最大时间*/
    this.placeholder = ""; /*占位符  起始时间和结束时间*/
    this.timeType = "string";
    this.timeFormat="HH:mm:ss";
    this.minTime = "00:00:00";/*最大时间*/
    this.maxTime = "24:59:59";/*最小时间*/
    /*时间日期区间*/
    this.endTitle = "";/*结束字段的名称*/
    this.minValue = "";/*最小值*/
    this.maxValue = "";/*最大值*/
    this.minTimeValue = "";/*日期时间区间的开始时间*/
    this.maxTimeValue = "";/*日期时间区间的结束时间*/
    this.minCss = null;
    this.maxCss = null;
    this.minTimeCss = null;
    this.maxTimeCss = null;
    this.minErrorMsg = null;
    this.maxErrorMsg = null;
    this.minTimeErrorMsg = null;
    this.maxTimeErrorMsg = null;
    this.isShow = true;/*字段是否显示*/
    this.useCase = null;
    /*下拉的默认配显示字段和返回字段*/
    this.showName = 'name';
    /*if(model == 'select'){*/
    	this.returnValue = 'code';
    /*}else{
    	this.returnValue = null;
    }*/
    
	this.returnField = null;
	this.showField = null;
	/*类型为number时，最小值,最大值*/
	this.number_MinValue = "";  /* 大于 number_MinValue*/
	this.number_MaxValue = "";  /*小于等于number_MaxValue*/
	this.number_MinValueNoEqual="";  /*大于等于 number_MinValueNoEqual*/
	this.number_MaxValueEqual=""; /*小于number_MaxValueEqual*/
	this.filesCount = 0;
	/*数字组件专用*/
	this.number_decimals = 0;
	this.number_max = 99999999999;
	this.number_min = 0;
	this.ObjectType = 'FormElement';
}


/**
 * @param wrapTitle 栏目名称
 */
function multipleColumn(id,wrapTitle){
	this.id = id;
	this.wrapTitle = wrapTitle;
	this.disable = false;
}


/***
 * 本对象用于存储form表单字段formField的items的元素值.
 * @param name 选择项显示名.
 * @param code 选择项的值.
 */
function selectItem(name, code){
	this.name = name;
	this.code = code;
}

/**
 * 错误信息
 * @param title
 * @param msg
 */
function errorMsgItem (title, msg){
	this.title = title;
	this.msg = msg;
}

/**
 * 数据操作按钮对象
 */
 function dataOperatorBtn(title,name,operator){
 	this.title = title;
 	this.name = name;
 	this.operator = operator;
 }

/*列表字段*/
 function listField(title,name,icon,value){
 	this.title = title;
 	this.name = name;
 	this.icon = icon;
 	this.value = value;
 }