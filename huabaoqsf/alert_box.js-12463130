var w1,w2,w3,w4,w5,w6;

//创建窗体
function get_url_window(url,title,width,height,no_top){
    if(!width)width=670;
    if(!height)height=430;
    var tmp_arr = set_bg(width,height);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];
    var isWin = dhxWins.isWindow("w1");
    if(isWin==false){
        w1=dhxWins.createWindow("w1",left_width,top_height,width,height);
    }else{
        dhxWins.window("w1").setDimension(width,height);
        dhxWins.window("w1").setPosition(left_width,top_height);
    }
    dhxWins.window("w1").setText(title);
    dhxWins.window("w1").button("park").hide();
    dhxWins.window("w1").button("minmax1").hide();
    if(no_top==1){
         dhxWins.window("w1").hideHeader();
    }
    dhxWins.window("w1").denyResize();
    var t=url+'&etc='+new Date().getTime();
    dhxWins.window("w1").attachURL(url);
    dhxWins.window("w1").attachEvent("onClose", function(win){
       $('#bg_div').remove();
       return true;
    });
}

//创建新窗体
function create_window3(title,width,height,url){
    if(!width)width=300;
    if(!height)height=150;
    //alert(2);
    var tmp_arr = set_bg(width,height);
    var top_height = top_height?top_height:tmp_arr[0];
    var left_width = tmp_arr[1];
    w3= dhxWins.createWindow("w3",left_width,top_height,width,height);
    w3.setText(title);
    w3.button("park").hide();
    w3.button("minmax1").hide();
    w3.attachURL(url);
    w3.denyResize();
    w3.setIcon();
    w3.setModal(true);
}

function show_msg_new(msg,width,height,time,top_height){
    if(!width)width=300;
    if(!height)height=150;

    var tmp_arr = set_bg(width,height);
    var top_height = top_height?top_height:tmp_arr[0];
    var left_width = tmp_arr[1];

    dhxWins = new dhtmlXWindows();
    dhxWins.enableAutoViewport(true);
    dhxWins.setImagePath("/msg/codebase/imgs/");
    w1 = dhxWins.createWindow("w1",left_width,top_height,width,height);
    w1.setText("信息提示");
    w1.button("park").hide();
    w1.button("minmax1").hide();
    w1.denyResize();
    w1.setIcon();
    w1.attachHTMLString('<font style="font-size:14px">'+msg+'</font>');
    if(time){
        setTimeout('close_window()',time);
    }
}

//设置背景
function set_bg(tmp_width,tmp_height){

    setTimeout(set_bg2,200);
    if(!tmp_height){
        tmp_height=200;
    }

    //显示出已经添加完以后的数据
    var offset_height = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    var offset_width = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    var offset_top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
    var top_height = offset_top+(offset_height - tmp_height)/2;
    var left_width = (offset_width - tmp_width)/2;

    var tmp_arr = new Array(top_height,left_width);
    return tmp_arr;
}

function set_bg2(){
    //将背景变灰
    var height=$(document).height();
    var height2=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    height=(height>height2)?height:height2;
    var bg_div = '<div id="bg_div" style= "position:absolute;left:0px;top:0px;filter:alpha(opacity=30);z-index:40;width:'+$(document).width()+'px;height:'+height+'px;background:#000;opacity:0.3" align="center"><iframe style="position:absolute; visibility:inherit; top:0px; left:0px; width:'+$(document).width()+'px; height:'+height+'px; z-index:-1;filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\';" frameborder="0"></iframe></div>';
    $('body').append(bg_div);
}

//设置表单参数值
function set_form_param_val(param_id,param_val){
    $("#param_"+param_id).val(param_val);
}

//关闭窗体
function close_window(tag){
   if(tag){
     dhxWins.window(tag).close();
   }else{
     dhxWins.window("w1").close();
   }
}

// 关闭弹出框
function close_window2(tag){
    dhxWins.window("w"+tag).close();
}


//获取位置
function get_postion(tmp_width,tmp_height){

    if(!tmp_height){
        tmp_height=200;
    }

    //显示出已经添加完以后的数据
    var offset_height = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    var offset_width = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    var offset_top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
    var top_height = offset_top+(offset_height - tmp_height)/2;
    var left_width = (offset_width - tmp_width)/2;

    var tmp_arr = new Array(top_height,left_width);
    return tmp_arr;
}


//重新定义窗体尺寸
function resize_window(window_name,title,width,height,type){
    if(!width)width=780;
    if(!height)height=410;
    width=width+6;
    var tmp_arr = get_postion(width,height);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];
    var isWin = dhxWins.isWindow(window_name);
    if(isWin){
        dhxWins.window(window_name).setText(title);
        dhxWins.window(window_name).setPosition(left_width,top_height);
        dhxWins.window(window_name).setDimension(width,height);
        if(type==1){
            dhxWins.window(window_name).button("close").disable();
        }
        if(type==2){
            dhxWins.window(window_name).button("close").enable();
        }
    }
}
