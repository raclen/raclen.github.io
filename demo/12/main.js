;
(function(w) {
    var util = {
        /**
         * 对象复制
         */
        extend: function(destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
        /**
         * [判断两个日历相差几个月]
         * @return {[type]} [description]
         */
        getMonthNum: function(d1, d2) {
            var d1_year = new Date(d1).getFullYear(),
                d1_month = new Date(d1).getMonth(),
                d2_year = new Date(d2).getFullYear(),
                d2_month = new Date(d2).getMonth();
            if (d1_year > d2_year) {
                console.log("传入数据错误最大日历小于最小日历");
                return;
            } else if (d1_year <= d2_year) {
                return (d2_year - d1_year) * 12 + d2_month - d1_month + 1;
            }

        },
        /**
         * 根据当前年月，计算下一个月的年月
         * @para year {int} eg: 2014 YYYY
         * @para month {int} eg: 12 MM/M
         * @return {object}
         */
        getNextMonthDate: function(year, month) {
            if (month > 12) {
                year = year + Math.floor((month - 1) / 12);

                if (month % 12 == 0) {
                    month = 12;
                } else {
                    month = month % 12;
                }
            }

            return {
                year: year,
                month: month
            }
        },
        /**
         * 处理小于10的数字前自动加0
         * @para num {num} int
         * return {string} '02'
         */
        formatNum: function(num) {
            if (num < 10) {
                num = '0' + num;
            }

            return num;
        },

        /**
         * 连接年月日，连接符为`-`
         * return {string} yyyy-mm-dd
         */
        joinDate: function(year, month, day) {
            var formatNum = util.formatNum;

            return year + '-' + formatNum(month) + '-' + formatNum(day);
        },

        /**
         * 将格式化后日期转化为数字，便于日期计算
         * @para date {string|date object} yyyy-mm-dd|日期对象
         * return {string} yyyymmdd
         */
        dateToNum: function(date) {
            var rst = '';
            if (typeof date == 'string') {
                rst = date.split('-').join('');
            } else {
                rst = util.formatDate(date).split('-').join('');
            }

            return rst;
        },

        /**
         * 格式化日期对象
         * @para {date object} 日期对象
         * return {string} yyyy-mm-dd
         */
        formatDate: function(dateObj) {
            var year = dateObj.getFullYear(),
                month = dateObj.getMonth() + 1,
                day = dateObj.getDate();

            return util.joinDate(year, month, day);
        },
        /**
         * 获取每个月有多少天
         */
        mdays: function(ynow) {
            return m_days = [0, 31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        },
        /**
         * 判断闰年
         * @param year
         * @returns {number}
         */
        is_leap: function(year) {
            return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
        },

    };
    var defaultConfig = {
        minDate: '2016-07-27',
        maxDate: '2017-02-17',
        el: 'calendar',
        isShowHoliday: true,
        price: null
    }
    var holidaysMap = [{
        name: '今天',
        date: [util.formatDate(new Date())]
    }, {
        name: '明天',
        date: [util.formatDate(new Date(+new Date() + 86400000))]
    }, {
        name: '后天',
        date: [util.formatDate(new Date(+new Date() + 2 * 86400000))]
    }, {
        name: '圣诞节',
        date: ['2014-12-25', '2015-12-25', '2016-12-25', '2017-12-25', '2018-12-25', '2019-12-25', '2020-12-25']
    }, {
        name: '情人节',
        date: ['2015-02-14', '2016-02-14', '2017-02-14', '2018-02-14', '2019-02-14', '2020-02-14']
    }, {
        name: '元旦',
        date: ['2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01', '2019-01-01', '2020-01-01']
    }, {
        name: '除夕',
        date: ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-2']
    }, {
        name: '春节',
        date: ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25']
    }, {
        name: '元宵节',
        date: ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-18']
    }, {
        name: '清明节',
        date: ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04']
    }, {
        name: '五一',
        date: ['2015-05-01', '2016-05-01', '2017-05-01', '2018-05-01', '2019-05-01', '2020-05-01']
    }, {
        name: '端午节',
        date: ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25']
    }, {
        name: '中秋节',
        date: ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01']
    }, {
        name: '国庆节',
        date: ['2015-10-01', '2016-10-01', '2017-10-01', '2018-10-01', '2019-10-01', '2020-10-01']
    }];

    function Calendar(opt) {
        this.options = util.extend(defaultConfig, opt);
        this.init(this.options)

    }
    Calendar.prototype = {
        init: function(opt) {
            var count = util.getMonthNum(this.options.minDate, this.options.maxDate);
            var cHtml = "";
            var year = new Date(this.options.minDate).getFullYear(),
                month = new Date(this.options.minDate).getMonth() + 1;
            for (var i = 0; i < count; i++) {
                var curMonth = month + i,
                    curDate = util.getNextMonthDate(year, curMonth);
                cHtml += this.render(curDate.year, curDate.month);
            }
            var el = document.getElementById(this.options.el);
            el.innerHTML = cHtml;
            var oli = el.querySelectorAll('li');
            oli.forEach(function(item) {
                item.addEventListener('click', function(e) {
                    oli.forEach(function(item2) {
                        item2.className = item2.className.replace(/cur/, "");
                    })
                    if (!e.currentTarget.className.match(/iv/)) {
                        console.log(e.currentTarget.dataset.date + e.currentTarget.dataset.price);
                        e.currentTarget.className += ' cur';
                    }
                })
            })




        },
        /**
         * [根据年月来画当前月的日历图]
         * @param  {[type]} date [description]
         * @return {[type]}      [description]
         */
        render: function(year, month) {
            var that = this;
            //当前月有多少天
            var numdays = util.mdays(year)[month];
            var first_date = new Date(year, month - 1, 1);
            //获取当月第一天是星期几
            var first_day = first_date.getDay();
            //第一天是星期几加上总天数，一个星期共有7天，除以7，就是行数，只能多不能少，所以用Math.ceil向上取整数
            var str_num = Math.ceil((first_day + numdays) / 7); //得到表格有多少行
            var strLi = "";
            console.log(str_num);
            //这里为了精确有多少行，也可以直接用最多6行乘以7
            for (var j = 0; j < str_num * 7; j++) {
                var templi = '';
                var date_num = j - first_day + 1;
                //如果不是正常的月份数字，就为空不显示
                if (date_num < 1 || date_num > numdays) {
                    templi = '<li class="iv"></li>'
                } else {
                    templi = '<li><i>' + date_num + '</i><i></i></li>';
                    //判断星期几
                    var jdate = util.joinDate(year, month, date_num);
                    var wkDay = new Date(jdate).getDay();
                    var price = '',
                        holiday = '',
                        className = [];
                    //如果是周六、周日加一个样式
                    if (wkDay == 6 || wkDay == 0) {
                        className = ['wk'];
                    }
                    var dateNum = util.dateToNum(util.joinDate(year, month, date_num));
                    //不在指定范围内的日期置灰
                    if (that.options.minDate && dateNum < util.dateToNum(that.options.minDate) ||
                        that.options.maxDate && dateNum > util.dateToNum(that.options.maxDate)) {
                        className = ['iv'];
                    }
                    //价格处理
                    if (that.options.price && that.options.price.hasOwnProperty(util.joinDate(year, month, date_num))) {
                        price = "￥" + that.options.price[util.joinDate(year, month, date_num)];
                        className.push('dl')
                    }
                    //节假日处理
                    if (that.options.isShowHoliday) {
                        for (var k = 0, hlen = holidaysMap.length; k < hlen; k++) {
                            var name = holidaysMap[k]['name'],
                                dateArr = holidaysMap[k]['date'];
                            for (var l = 0, len = dateArr.length; l < len; l++) {
                                var item = dateArr[l];
                                if (dateNum == util.dateToNum(item)) {
                                    holiday = name;
                                    className.push('hl')
                                    break;
                                }
                            }
                        }
                    }

                    templi = '<li data-price="' + price + '" data-date="' + util.joinDate(year, month, date_num) + ' "class="' + className.toString().replace(/,/g, " ") + '"><i>' + (holiday ? holiday : date_num) + '</i><i class="price-info">' + price + '</i></li>';

                }

                strLi += templi;
            }
            return '<div class="cal-wrap"><h2>' + year + '年' + util.formatNum(month) + '月</h2><ul class="day">' + strLi + '</ul></div>';
        }
    }
    window.Calendar = Calendar;
})(window);
