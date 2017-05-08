$(function() {
	$("#onlineOpen").click(function() {
			var onService_panel = $("#onService_panel");
			if (parseInt(onService_panel.css("right")) == 0) {
					onService_panel.animate({
							right: -215
					});
			} else {
					onService_panel.animate({
							right: 0
					});
			}
	});
	$(".online_icon").click(function() {
			$(".online_tab").fadeOut(100);
			var onclickId = $(this).attr("id");
			var findparent_tab;
			switch (onclickId) {
			case "online_tel_icon":
					findparent_tab = $("#onlineTelTab");
					break;
			case "online_qq_icon":
					findparent_tab = $("#onlineQQTab");
					break;
			case "online_message_icon":
					findparent_tab = $("#onlineMessageTab");
					break;
			}
			findparent_tab.fadeIn(100);
	});
	$("#onService_panel .tab_close").click(function() {
			$(this).parents(".online_tab").hide();
	});
});
$(function(){
	var winH = $(window).height(),x=0,moveh=0,ddheight=0,onlineList = $("#onlineList"),onlinePar = onlineList.parent(),ulheight = onlineList.height();
	
	if(onlineList.height()>winH-30){
		onlinePar.height(winH-30);
	}
	if(onlineList.height()<370){
		onlinePar.height(370);
	}
	onlinePar.mouseenter(function(){
		if($(this).height()<onlineList.height()){
			$(this).find(".but").show();
		}
	});
	onlinePar.mouseleave(function(){
		$(this).find(".but").hide();
	});
	onlinePar.find(".downBut").click(function(){
		if((ulheight-onlinePar.height())>10){
			if(onlineList.is(':animated')==false){
				moveh+=onlinePar.height()/3;
				onlineList.animate({marginTop:-(moveh)},500);
				ulheight-=onlinePar.height()/3;
				}
		}
	});
	onlinePar.find(".upBut").click(function(){
		if(ulheight<onlineList.height()){
			if(onlineList.is(':animated')==false){
				moveh-=onlinePar.height()/3;
				onlineList.animate({marginTop:-(moveh)},500);
				ulheight+=onlinePar.height()/3;
			}
		}
	});
//		
//		$(".box_m_m dd div").hover(function(){
//			ddheight = $(this).height();
//			$(this).parent().css({"z-index":2});
//			$(this).css({"height":"auto","position":"absolute","left":"0px","top":"0","background-color":"#fff"});
//		},function(){
//			$(this).parent().css({"z-index":1});
//			$(this).css({"height":ddheight,"position":"relative","left":"0px","top":"0","background-color":"transparent"});
//			});
//	}
});