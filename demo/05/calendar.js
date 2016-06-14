/**
 * @Author:  dixiao
 * @Date:   2016/3/29.
 *
 */
;
(function ($) {
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),   //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    var topclass = 'pkg_circle_top', topdisableclass = 'pkg_circle_top pkg_circle_top_disable',
        bottomclass = 'pkg_circle_bottom', bottomdisableclass = 'pkg_circle_bottom pkg_circle_bottom_disable';

    function Calendar(o) {
        this.tpl = ['<div class="calendar" role="calendar">',
            '        <ul class="calendar_num basefix">',
            '        <li class="bold">六</li>',
            '        <li>五</li>',
            '        <li>四</li>',
            '        <li>三</li>',
            '        <li>二</li>',
            '        <li>一</li>',
            '        <li class="bold">日</li>',
            '        </ul>',
            '        <div class="basefix" id="bigCalendar">',
            '        </div>',
            '        <div class="calendar_loding">',
            '        <img src="http://pic.c-ctrip.com/vacation_v1/loading_50-0816.gif" alt="">查询中，请稍后...',
            '        </div>',
            '    </div>'].join("");
        this.init(o);
    }

    Calendar.prototype = {
        init: function (o) {
            this.$calendar = $('[role="calendar"]');
            if(this.$calendar.length>0){
                this.$calendar.show();
                return;
            }else{
                $(document.body).append(this.tpl);
                this.$calendar = $('[role="calendar"]');
            }
            this.$ul = this.$calendar.find('ul');
            this.li = this.$calendar.find('ul li');
            this.id = $(o.id);
            var txtdata = this.id.data("curdate");
            $(document.body).find('.calendar_loding').remove();
            this.setDate(o.dataPrice,o.dataPrice.CDate);
            this.drawDate(o.dataPrice,o.dataPrice.CDate,topdisableclass,bottomclass);
            var that =this;
            $("body").on("click", ".pkg_circle_top", function () {
                var inputxt = $(o.id);
                var curdate = new Date(inputxt.data('curdate'));
                var update = new Date(curdate.getFullYear(), curdate.getMonth(), 0);
                var data = inputxt.data("rang");
                var mindate = new Date(data.CDate);
                if (update.getFullYear() <= mindate.getFullYear() && update.getMonth() < mindate.getMonth()) {
                    $(this).addClass('pkg_circle_top_disable');
                }
                else {
                    that.setDate(data,update);
                    var upclass = topclass;
                    var upsenddate = new Date(curdate.getFullYear(), (curdate.getMonth() - 1), 0);
                    if (upsenddate.getMonth() < mindate.getMonth()) {
                        upclass = topdisableclass;
                    }
                    that.drawDate(data, update, upclass, bottomclass);
                }
            });
            $("body").on("click", ".pkg_circle_bottom", function () {
                var inputxt = $(o.id);
                var curdate = new Date(inputxt.data('curdate'));
                var nextdate = new Date(curdate.getFullYear(), (curdate.getMonth() + 2), 0);
                var data = inputxt.data("rang");
                var maxdate = new Date(data.EDate);
                if (nextdate.getFullYear() >= maxdate.getFullYear() && nextdate.getMonth() > maxdate.getMonth()) {
                    $(this).addClass('pkg_circle_bottom_disable');
                }
                else {
                    that.setDate(data,nextdate);
                    var nextclass = bottomclass;
                    var nextsendate = new Date(curdate.getFullYear(), (curdate.getMonth() + 3), 0);
                    if (nextsendate.getMonth() > maxdate.getMonth()) {
                        nextclass = bottomdisableclass;
                    }
                    that.drawDate(data, nextdate, topclass, nextclass);
                }
            });

            $("body").on("click", ".calendar_right .on", function () {
                var inputtxt = that.id;
                var datatime =$(this).attr('date')
                inputtxt.val(datatime);
                var price = $(this).attr('dateprice');
                that.setDate(o.dataPrice,datatime)
                o.callback&&o.callback(price);
                that.$calendar.hide()
            })

        },
        setDate : function(dataPrice,curdate){
            this.id.data({'rang':dataPrice,'curdate':curdate});

        },
        drawDate: function (data,curdate,topClass,bottomClass) {
            var sdate = new Date(curdate);
            var curdate = new Date(sdate.getFullYear(), (sdate.getMonth() + 1), 0);
            var curmonthfirstday = new Date(sdate.getFullYear(), (sdate.getMonth())).getDay();//当月第一天星期几
            var curMonthDays = curdate.getDate();
            var result = "";
            var j = 1;
            for (var i = 1; i <= 42; i++) {
                if ((i - 1) % 7 == 0) {
                    result += "<tr>"
                }
                if (i <= curmonthfirstday || (i > curMonthDays + curmonthfirstday)) {
                    result += '<td></td>';
                }
                else {
                    var tpdate = new Date(sdate.getFullYear(), (sdate.getMonth()), j).format('yyyy-MM-dd');
                    var tpj = (tpdate == new Date().format('yyyy-MM-dd')) ? '今天' : j;
                    if (data != "" && data.dateInfo[tpdate]) {
                        result += '<td class="on" date=' + tpdate + ' dateprice=' + data.dateInfo[tpdate] + '><a><span class="date basefix">' + tpj + '</span><span class="team basefix" style="display: none;">&nbsp;</span> ' +
                            '<span class="calendar_price01"><dfn>¥</dfn>' + data.dateInfo[tpdate] + '</span></a></td> ';
                    }
                    else {
                        result += '<td date=' + tpdate + '><a><span class="date basefix">' + tpj + '</span></a></td>';
                    }
                    j++;
                }
                if (i % 7 == 0) {
                    result += "</tr>";
                }
            }
            result = '<table class="calendar_right"><tbody>' + result + '</tbody></table>';
            var tableft = '<div class="calendar_left pkg_double_month"><p class="border bgblue" style="display: none;"></p><p>' + sdate.getFullYear() + '年<br>' + (sdate.getMonth() + 1) + '月</p>' +
                '<a href="javscript:;" title="上一月" class="'+topClass+'">上一月</a><a href="javscript:;" title="下一月" class="'+bottomClass+'">下一月</a></div>'
            $('#bigCalendar').html(tableft + result);

        }

    }
    window.Calendar = Calendar;

})(jQuery);