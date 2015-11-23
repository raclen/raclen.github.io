/**
 * Created by dixiao on 2015/11/12.
 */
var configdata = {
    "2014110601": {
        "equal": [1111, 2222, 4444],
        "lessEqual": 2000,
        "greaterEqual": "",
        "less": "",
        "greater": 87
    }
    ,
    "2014110602": {
        "equal": [8529, 8530],
        "lessEqual": "",
        "greaterEqual": "",
        "less": "",
        "greater": ""
    }

};
var res = {};
var home = {
    config:{
        resource:{}
    },
    getAllres:function(_d){
        _self=this;
        var api_resources = 'data/api_resources.js';
        $.ajax({
            url: api_resources,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {

            },
            success: function (data) {
                _self.qconditions(_d,data)
            },error:function(err){
                console.log(err);
            }
        })
    },
    init: function () {
        var _self = this;
        _self.getCategory();
        $(document.body).on('click', function () {
            $('.text-detail').hide();
        });
        $('.item-bar>input').on('click', function (e) {
            $('.text-detail').show();
            e.preventDefault();
            e.stopPropagation();
        });
        $('#item-sel').on('change', function () {
            if ($(this).val() != 0) {
                $('#detail-ul li').find('input').hide();
                $('.li-sub').hide();
            }else{
                $('#detail-ul li').find('input').show();
                $('.li-sub').show();
            }
        });
        $('#upSubmit').on('click',function(){
            alert(JSON.stringify(configdata));
        })
    },
    qconditions: function (arr,_r) {
        var _self = this;
        _self.config.resource=_r;
        //根据id获取名称
        function getArrayName(_arr,cg,did){
            for(var k= 0,len= _arr[cg].length;k<len;k++){
                if(_arr[cg][k].id==did){
                    return _arr[cg][k].name;
                }
            }
            return did;
        }
        for (var i in arr) {
            res[arr[i].categoryId] = {};
            res[arr[i].categoryId].categoryName = arr[i].categoryName;
            res[arr[i].categoryId].type = arr[i].type;
        }
        function str_arr(arr,_i) {
            var str = '';
            for (var i in arr) {
                str = str + '<a class="a-close" data-id="' + arr[i] + '" href="javascript:void(0)">' + getArrayName(_self.config.resource,_i,arr[i]) + '×</a>';
            }
            return str;
        }

        for (var i in configdata) {
            if (res[i].type == 1) {
                var equal = '', less = '', greater = '', lessEqual = '', greaterEqual = '';
                if (configdata[i].equal.length > 0) {
                    equal = '<p class="pequal" data-type="equal">等于：' + str_arr(configdata[i].equal,i) + '</p>';

                }
                if (!!configdata[i].less) {
                    less = '<p class="pless" data-type="less">小于：<a class="a-close" data-id="' + arr[i] + '" href="javascript:void(0)">' + configdata[i].less + '×</a></p>';
                }
                if (!!configdata[i].greater) {
                    greater = '<p class="pgreater" data-type="greater">大于：<a class="a-close" data-id="' + arr[i] + '" href="javascript:void(0)">' + configdata[i].greater + '×</a></p>';
                }
                if (!!configdata[i].lessEqual) {
                    lessEqual = '<p class="plessEqual" data-type="lessEqual">小于等于：<a class="a-close" data-id="' + arr[i] + '" href="javascript:void(0)">' + configdata[i].lessEqual + '×</a></p>';
                }
                if (!!configdata[i].greaterEqual) {
                    greaterEqual = '<p class="pgreaterEqual" data-type="greaterEqual">大于等于：<a class="a-close" data-id="' + arr[i] + '" href="javascript:void(0)">' + configdata[i].greaterEqual + '×</a></p>';
                }


                $('#text-mains').append(
                    '  <div class="text-content" data-category="' + i + '">' +
                    '     <h2>' + res[i].categoryName + '</h2>' + equal + less + greater + lessEqual + greaterEqual +
                    '<a href="javascript:void(0)" class="cClose">×</a>' +
                    '  </div>'
                );
            } else if (res[i].type == 2) {
                $('#text-mains').append(
                    '  <div class="text-content" data-category="' + i + '">' +
                    '  <h2>' + res[i].categoryName + '</h2>' +
                    '  <p class="pequal" data-type="equal">等于：' + str_arr(configdata[i].equal,i) + '</p>' +
                    '<a href="javascript:void(0)" class="cClose">×</a>' +
                    '  </div>'
                );
            }
        }

        //关闭整个div
        $('#text-mains').on('click', '.cClose', function () {
            var $textc = $(this).parents('.text-content');
            $textc.remove();
            var category = $textc.data('category');
            delete configdata[category];
        })
        //关闭当前选中的
        $('#text-mains').on('click', '.a-close', function () {
            var $this = $(this);
            var _id = $this.data('id');
            var category = $this.parents('.text-content').data('category');
            var meet = $this.parent().data('type');
            if (meet == 'equal') {
                var _index = configdata[category][meet].indexOf(_id);
                configdata[category][meet].splice(_index, 1);
                $this.remove();
            } else {
                configdata[category][meet] = '';
                $this.parent().remove();
            }
            $this.remove();
        });
        var arrfun = {
            unique: function (arr) {
                var res = [];
                for (var i in arr) {
                    if (!res.length || this.compare(arr[i], res)) {
                        res.push(arr[i]);
                    }
                }
                return res;

            },
            compare: function (k, arr) {
                for (var i in arr) {
                    if (arr[i] == k) {
                        return false;
                    }
                }
                return true;
            }
        }
        //填充数据
        function showSearch(_arr1) {
            var _arr=[];
            _arr1.forEach(function(item,i){
                _arr[i]=parseFloat(item);
            });
            var category = $('.nav-pills .active').find('a').data('categoryid');
            var $textc = $('.text-content[data-category=' + category + ']');
            if ($textc.length == 0) {
                $textc = $('<div class="text-content" data-category=' + category + '><h2>' + res[category].categoryName + '</h2><a href="javascript:void(0)" class="cClose">×</a></div>')
                $('#text-mains').append($textc);
            }
            if (!configdata[category]) {
                var $pequal = $('<p class="pequal" data-type="equal">等于：</p>');
                $pequal.append(str_arr(_arr,category));
                $textc.append($pequal);
                configdata[category] = {};
                configdata[category].equal = [];
                configdata[category].equal=configdata[category].equal.concat(_arr);

            } else {
                var arrequal = configdata[category].equal;
                var $pequal = $textc.find('.pequal');
                var newarr = arrfun.unique(_arr.concat(arrequal));
                $pequal.find('a').remove();
                $pequal.append(str_arr(newarr,category));
                configdata[category].equal = [];
                configdata[category].equal=configdata[category].equal.concat(newarr);
            }
            $('.text-detail').hide();
        }

        //多选添加
        $('.text-detail').on('click', '#sub-button', function () {
            var _arr = [];
            $('#detail-ul li input:checked').each(function () {
                _arr.push($(this).parent().data('id'));
            });
            showSearch(_arr);


        });
        //输入框回车提交
        $('#keySubmit').on('keydown', function (e) {
            var select = $('#item-sel');
            var selval = select.val() || "0";
            e = e || event;
            if (e.keyCode === 13) {
                //alert('回车');
                var tval = $(this).val();
                var _arrVal = tval.split(/,|，/g);
                if(_arrVal.length===1&&selval!=0)_self.seleltRes(_arrVal[0],_arrVal[0]);
                showSearch(_arrVal);
            }
        })

    },
    //比较某个ID是否在数组中
    equalid: function (id, arr) {
        for (var i in arr) {
            if (arr[i] == id) {
                return true;
            }
        }
        return false;
    },
    //获取目录列表
    getCategory: function () {
        var _self = this;
        var api_category = 'data/api_category.js';
        $.ajax({
            url: api_category,
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'jsonp1',
            beforeSend: function () {

            },
            success: function (data) {
                var $navul = $('#nav-pills');
                for (var i = 0, len = data.length; i < len; i++) {
                    $navul.append('<li><a href="javascript:void(0)" data-type="' + data[i].type + '" data-categoryId="' + data[i].categoryId + '">' + data[i].categoryName + '</a></li>');

                }
                _self.getAllres(data);
                $navul.find('li').eq(0).addClass('active');
                var $navli = $('.nav-pills>li');
                $navli.on('click', function (e) {
                    var c = $(this).find('a').data('categoryid');
                    var _type = res[c].type;
                    var $itemSel = $('#item-sel');
                    $itemSel.removeAttr('disabled');
                    if (_type == 2) {
                        $itemSel.val(0).attr('disabled', 'disabled');
                        $itemSel.trigger('change');

                    }
                    _self.getResources(c);
                    $navli.removeClass('active');
                    $(this).addClass('active');
                });
                _self.getResources(data[0].categoryId);
            }
        })

    },
    seleltRes:function(valId,txt){
        var select = $('#item-sel');
        var selval = select.val() || "0";
        var category = $('.nav-pills .active').find('a').data('categoryid');
        var $textc = $('.text-content[data-category=' + category + ']');
        if ($textc.length == 0) {
            $textc = $('<div class="text-content" data-category=' + category + '><h2>' + res[category].categoryName + '</h2><a href="javascript:void(0)" class="cClose">×</a></div>')
            $('#text-mains').append($textc);
        }
        //渲染

        var _category = configdata[category];

        switch (selval) {
            case "0":
                if (!configdata[category]) {
                    var $pequal = $('<p class="pequal" data-type="equal">等于：</p>');
                    $pequal.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pequal);
                    configdata[category] = {};
                    configdata[category].equal = [];
                    configdata[category].equal.push(valId);
                    break;
                }
                if (!_self.equalid(valId, _category.equal)) {
                    var $pequal = $textc.find('.pequal');
                    $pequal.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    _category.equal.push(valId);
                    break;
                }
                break;

            case "1":
                if (!_category) {
                    var $pless = $('<p class="pless" data-type="less">小于：</p>');
                    $pless.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pless);
                    configdata[category] = {};
                    configdata[category].less = valId;
                    break;
                }
                if (!!_category.lessEqual && valId < _category.lessEqual) {
                    $textc.find('.plessEqual').remove();
                    var $pless = $('<p class="pless" data-type="less">小于：</p>');
                    $pless.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pless);
                    _category.less = valId;
                    _category.lessEqual='';
                    break;

                }
                if (!!_category.less && valId < _category.less) {
                    $textc.find('.pless a').remove();
                    var $pless = $textc.find('.pless');
                    $pless.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    _category.less = valId;
                    break;
                }
                if (!!_category.lessEqual && valId >= _category.lessEqual||!!_category.less && valId >= _category.less) {
                    break;
                }
                if (!_category.less) {
                    var $pless = $('<p class="pless" data-type="less">小于：</p>');
                    $pless.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pless);
                    _category.less = valId;
                    break;
                }


            case "2":
                if (!configdata[category]) {
                    var $pgreater = $('<p class="pgreater" data-type="greater">大于：</p>');
                    $pgreater.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pgreater);
                    configdata[category] = {};
                    configdata[category].greater = valId;
                    break;
                }
                if (!!_category.greaterEqual && valId > _category.greaterEqual) {
                    $textc.find('.pgreaterEqual').remove();
                    var $pgreater = $('<p class="pgreater" data-type="greater">大于：</p>');
                    $pgreater.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pgreater);
                    _category.greater = valId;
                    _category.greaterEqual='';
                    break;
                }
                if (!!_category.greater && valId > _category.greater) {
                    $textc.find('.pgreater a').remove();
                    var $pgreater = $textc.find('.pgreater');
                    $pgreater.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    _category.greater = valId;
                    break;
                }
                if (!!_category.greaterEqual && valId <= _category.greaterEqual||!!_category.greater && valId <= _category.greater) {
                    break;
                }
                if (!_category.greater) {
                    var $pgreater = $('<p class="pgreater" data-type="greater">大于：</p>');
                    $pgreater.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pgreater);
                    _category.greater = valId;
                    break;
                }
            case "3":
                if (!configdata[category]) {
                    var $plessEqual = $('<p class="plessEqual" data-type="lessEqual">小于等于：</p>');
                    $plessEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($plessEqual);
                    configdata[category] = {};
                    configdata[category].lessEqual = valId;
                    break;
                }
                if (!!_category.less && valId < _category.less) {
                    $textc.find('.pless').remove();
                    var $plessEqual = $('<p class="plessEqual" data-type="lessEqual">小于等于：</p>');
                    $plessEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($plessEqual);
                    _category.lessEqual = valId;
                    _category.less = '';
                    break;
                }
                if (!!_category.lessEqual && valId < _category.lessEqual) {
                    $textc.find('.plessEqual a').remove();
                    var $plessEqual = $textc.find('.plessEqual');
                    $plessEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    _category.lessEqual = valId;
                    break;
                }
                if (!!_category.less && valId >= _category.less||!!_category.lessEqual && valId >= _category.lessEqual) {
                    break;
                }
                if (!_category.lessEqual) {
                    var $plessEqual = $('<p class="plessEqual" data-type="lessEqual">小于等于：</p>');
                    $plessEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($plessEqual);
                    _category.lessEqual = valId;
                    break;
                }
            case "4":
                if (!configdata[category]) {
                    var $pgreaterEqual = $('<p class="pgreaterEqual" data-type="greaterEqual">大于等于：</p>');
                    $pgreaterEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pgreaterEqual);
                    configdata[category] = {};
                    configdata[category].greaterEqual = valId;
                    break;
                }
                if (!!_category.greater && valId > _category.greater) {
                    $textc.find('.pgreater').remove();
                    var $pgreaterEqual = $('<p class="pgreaterEqual" data-type="greaterEqual">大于等于：</p>');
                    $pgreaterEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pgreaterEqual);
                    _category.greaterEqual = valId;
                    _category.greater = '';
                    break;
                }
                if (!!_category.greaterEqual && valId > _category.greaterEqual) {
                    $textc.find('.pgreaterEqual a').remove();
                    var $pgreaterEqual = $textc.find('.pgreaterEqual');
                    $pgreaterEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    _category.greaterEqual = valId;
                    break;
                }
                if (!!_category.greater && valId <= _category.greater||!!_category.greaterEqual && valId <= _category.greaterEqual) {
                    break;
                }
                if (!_category.greaterEqual) {
                    var $pgreaterEqual = $('<p class="pgreaterEqual" data-type="greaterEqual">大于等于：</p>');
                    $pgreaterEqual.append('<a class="a-close" data-id="' + valId + '" href="javascript:void(0)">' + txt + '×</a>');
                    $textc.append($pgreaterEqual);
                    _category.greaterEqual = valId;
                    break;
                }
        }

        $(this).parents('.text-detail').hide();
    },
    //获取下拉数据
    getResources: function (category) {

        var _self = this;
        var api_resources = 'data/api_resources.js';
        $.ajax({
            url: api_resources,
            type: 'GET',
            dataType: 'json',
//            jsonpCallback: 'jsonp2',
            beforeSend: function () {

            },
            success: function (d) {
                var data = d[category];
                var $textli = $('#detail-ul');
                $textli.html('');
                for (var i = 0, len = data.length; i < len; i++) {
                    $textli.append('<li data-id=' + data[i].id + '>' + data[i].name + '<input class="li-check" type="checkbox"/></li>');
                }
                $('.text-detail').show();
                $('.text-detail .li-check').on('click', function (e) {
                    e.stopPropagation();
                });
                $('#detail-ul li').on('click', function () {
                    var txt = $(this).text();
                    var valId = $(this).data('id');
//                    var _index = $('.nav-pills .active').index();
                    _self.seleltRes(valId,txt);
                })
            }, error: function (err) {
                console.log(err);
            }
        })
    }

};
home.init();
