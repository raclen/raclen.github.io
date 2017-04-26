
//ÏÔÊ¾±íÇé¿òº¯Êý
var faceArray = [
			{face_name:'Î¢Ð¦',face_id:'face1',face_url:'1.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/1.gif*/},
			{face_name:'Æ²×ì',face_id:'face2',face_url:'2.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/2.gif*/},
			{face_name:'É«',face_id:'face3',face_url:'3.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/3.gif*/},
			{face_name:'·¢´ô',face_id:'face4',face_url:'4.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/4.gif*/},
			{face_name:'µÃÒâ',face_id:'face5',face_url:'5.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/5.gif*/},
			{face_name:'Á÷Àá',face_id:'face6',face_url:'6.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/6.gif*/},
			{face_name:'º¦Ðß',face_id:'face7',face_url:'7.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/7.gif*/},
			{face_name:'±Õ×ì',face_id:'face8',face_url:'8.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/8.gif*/},
			{face_name:'Ë¯',face_id:'face9',face_url:'9.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/9.gif*/},
			{face_name:'´ó¿Þ',face_id:'face10',face_url:'10.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/10.gif*/},
			{face_name:'ÞÏÞÎ',face_id:'face11',face_url:'11.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/11.gif*/},
			{face_name:'·¢Å­',face_id:'face12',face_url:'12.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/12.gif*/},
			{face_name:'µ÷Æ¤',face_id:'face13',face_url:'13.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/13.gif*/},
			{face_name:'ö·ÑÀ',face_id:'face14',face_url:'14.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/14.gif*/},
			{face_name:'¾ªÑÈ',face_id:'face15',face_url:'15.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/15.gif*/},
			{face_name:'ÄÑ¹ý',face_id:'face16',face_url:'16.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/16.gif*/},
			{face_name:'¿á',face_id:'face17',face_url:'17.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/17.gif*/},
			{face_name:'Àäº¹',face_id:'face18',face_url:'18.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/18.gif*/},
			{face_name:'×¥¿ñ',face_id:'face19',face_url:'19.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/19.gif*/},
			{face_name:'ÍÂ',face_id:'face20',face_url:'20.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/20.gif*/},
			{face_name:'¿ÉÁ¯',face_id:'face21',face_url:'21.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/21.gif*/},
			{face_name:'ÍµÐ¦',face_id:'face22',face_url:'22.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/22.gif*/},
			{face_name:'¿É°®',face_id:'face23',face_url:'23.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/23.gif*/},
			{face_name:'°×ÑÛ',face_id:'face24',face_url:'24.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/24.gif*/},
			{face_name:'°ÁÂý',face_id:'face25',face_url:'25.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/25.gif*/},
			{face_name:'¼¢¶ö',face_id:'face26',face_url:'26.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/26.gif*/},
			{face_name:'À§',face_id:'face27',face_url:'27.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/27.gif*/},
			{face_name:'¾ª¿Ö',face_id:'face28',face_url:'28.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/28.gif*/},
			{face_name:'Á÷º¹',face_id:'face29',face_url:'29.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/29.gif*/},
			{face_name:'º©Ð¦',face_id:'face30',face_url:'30.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/30.gif*/},
			{face_name:'´ó±ø',face_id:'face31',face_url:'31.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/31.gif*/},
			{face_name:'·Ü¶·',face_id:'face32',face_url:'32.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/32.gif*/},
			{face_name:'ÖäÂî',face_id:'face33',face_url:'33.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/33.gif*/},
			{face_name:'ÒÉÎÊ',face_id:'face34',face_url:'34.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/34.gif*/},
			{face_name:'Ðê..',face_id:'face35',face_url:'35.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/35.gif*/},
			{face_name:'ÔÎ',face_id:'face36',face_url:'36.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/36.gif*/},
			{face_name:'ÕÛÄ¥',face_id:'face37',face_url:'37.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/37.gif*/},
			{face_name:'Ë¥',face_id:'face38',face_url:'38.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/38.gif*/},
			{face_name:'÷¼÷Ã',face_id:'face39',face_url:'39.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/39.gif*/},
			{face_name:'ÇÃ´ò',face_id:'face40',face_url:'40.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/40.gif*/},
			{face_name:'ÔÙ¼û',face_id:'face41',face_url:'41.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/41.gif*/},
			{face_name:'ÏÅ',face_id:'face42',face_url:'42.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/42.gif*/},
			{face_name:'²Áº¹',face_id:'face43',face_url:'43.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/43.gif*/},
			{face_name:'¿Ù±Ç',face_id:'face44',face_url:'44.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/44.gif*/},
			{face_name:'¹ÄÕÆ',face_id:'face45',face_url:'45.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/45.gif*/},
			{face_name:'ôÜ´óÁË',face_id:'face46',face_url:'46.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/46.gif*/},
			{face_name:'»µÐ¦',face_id:'face47',face_url:'47.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/47.gif*/},
			{face_name:'×óºßºß',face_id:'face48',face_url:'48.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/48.gif*/},
			{face_name:'ÓÒºßºß',face_id:'face49',face_url:'49.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/49.gif*/},
			{face_name:'¹þÇ·',face_id:'face50',face_url:'50.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/50.gif*/},
			{face_name:'±ÉÊÓ',face_id:'face51',face_url:'51.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/51.gif*/},
			{face_name:'Î¯Çü',face_id:'face52',face_url:'52.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/52.gif*/},
			{face_name:'¿ì¿ÞÁË',face_id:'face53',face_url:'53.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/53.gif*/},
			{face_name:'ÒõÐ¦',face_id:'face54',face_url:'54.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/54.gif*/},
			{face_name:'Ç×Ç×',face_id:'face55',face_url:'55.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/55.gif*/},
			{face_name:'±§±§',face_id:'face56',face_url:'56.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/56.gif*/},
			{face_name:'ÀñÎï',face_id:'face57',face_url:'57.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/57.gif*/},
			{face_name:'²Ëµ¶',face_id:'face58',face_url:'58.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/58.gif*/},
			{face_name:'Î÷¹Ï',face_id:'face59',face_url:'59.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/59.gif*/},
			{face_name:'Æ¡¾Æ',face_id:'face60',face_url:'60.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/60.gif*/},
			{face_name:'ÀºÇò',face_id:'face61',face_url:'61.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/61.gif*/},
			{face_name:'Æ¹ÅÒ',face_id:'face62',face_url:'62.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/62.gif*/},
			{face_name:'Ì«Ñô',face_id:'face63',face_url:'63.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/63.gif*/},
			{face_name:'¿§·È',face_id:'face64',face_url:'64.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/64.gif*/},
			{face_name:'·¹',face_id:'face65',face_url:'65.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/65.gif*/},
			{face_name:'ÖíÍ·',face_id:'face66',face_url:'66.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/66.gif*/},
			{face_name:'Ãµ¹å',face_id:'face67',face_url:'67.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/67.gif*/},
			{face_name:'µòÐ»',face_id:'face68',face_url:'68.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/68.gif*/},
			{face_name:'Ê¾°®',face_id:'face69',face_url:'69.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/69.gif*/},
			{face_name:'°®ÐÄ',face_id:'face70',face_url:'70.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/70.gif*/},
			{face_name:'ÐÄËé',face_id:'face71',face_url:'71.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/71.gif*/},
			{face_name:'µ°¸â',face_id:'face72',face_url:'72.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/72.gif*/},
			{face_name:'ÉÁµç',face_id:'face73',face_url:'73.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/73.gif*/},
			{face_name:'Õ¨µ¯',face_id:'face74',face_url:'74.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/74.gif*/},
			{face_name:'µ¶',face_id:'face75',face_url:'75.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/75.gif*/},
			{face_name:'×ãÇò',face_id:'face76',face_url:'76.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/76.gif*/},
			{face_name:'Æ°³æ',face_id:'face77',face_url:'77.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/77.gif*/},
			{face_name:'±ã±ã',face_id:'face78',face_url:'78.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/78.gif*/},
			{face_name:'ÔÂÁÁ',face_id:'face79',face_url:'79.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/79.gif*/},
			{face_name:'°®Äã',face_id:'face80',face_url:'80.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/80.gif*/},
			{face_name:'NO',face_id:'face81',face_url:'81.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/81.gif*/},
			{face_name:'OK',face_id:'face82',face_url:'82.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/82.gif*/},
			{face_name:'Ç¿',face_id:'face83',face_url:'83.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/83.gif*/},
			{face_name:'²î¾¢',face_id:'face84',face_url:'84.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/84.gif*/},
			{face_name:'Èõ',face_id:'face85',face_url:'85.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/85.gif*/},
			{face_name:'ÎÕÊÖ',face_id:'face86',face_url:'86.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/86.gif*/},
			{face_name:'Ê¤Àû',face_id:'face87',face_url:'87.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/87.gif*/},
			{face_name:'±§È­',face_id:'face88',face_url:'88.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/88.gif*/},
			{face_name:'¹´Òý',face_id:'face89',face_url:'89.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/89.gif*/},
			{face_name:'È­Í·',face_id:'face90',face_url:'90.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/90.gif*/},
			{face_name:'»ØÍ·',face_id:'face91',face_url:'91.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/91.gif*/},
			{face_name:'âæ»ð',face_id:'face92',face_url:'92.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/92.gif*/},
			{face_name:'×ªÈ¦',face_id:'face93',face_url:'93.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/93.gif*/},
			{face_name:'¿ÄÍ·',face_id:'face94',face_url:'94.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/94.gif*/},
			{face_name:'°®Çé',face_id:'face95',face_url:'95.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/95.gif*/},
			{face_name:'·ÉÎÇ',face_id:'face96',face_url:'96.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/96.gif*/},
			{face_name:'ÌøÌø',face_id:'face97',face_url:'97.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/97.gif*/},
			{face_name:'·¢¶¶',face_id:'face98',face_url:'98.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/98.gif*/},
			{face_name:'ÌøÉþ',face_id:'face99',face_url:'99.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/99.gif*/},
			{face_name:'»ÓÊÖ',face_id:'face100',face_url:'100.gif'/*tpa=http://www.huabaoqsf.com/images/wap/face/100.gif*/}
		];
var appendObj;
//doc  ÎÄÕÂÏêÏ¸Ò³·¢±íÆÀÂÛ
var showFace = function(clickObj,toObj,doc){
	appendObj = toObj;
	if(!$("#faceArea").length){
		var aarray = [],n,i=0;
		for(;n = faceArray[i];i++){
			aarray.push('<a href="###" data-name="['+faceArray[i].face_name+']" data-id="'+faceArray[i].face_id+'" data-url="'+faceArray[i].face_url+'"></a>');
		}
		var a = aarray.join("");
		var faceArea =$('<div class="faceArea" id="faceArea"><em class="close">¡Á</em><div class="faceDiv"><div class="face">'+a+'</div></div></div>');
		$("body").append(faceArea);

		faceArea.on({
			click : function(){
				faceArea.css("display","none");
			}
		},"em.close")
		faceArea.find("http://www.huabaoqsf.com/js/wap/div.face").on({
			click : function(){
				if(appendObj.val() == '»ØÁ½¾ä°É...'){
					appendObj.val('');
					appendObj.focus();
				}
				var tmp_data_name = $(this).attr("data-name");
				var tmp_data_name_length = tmp_data_name.length;
				if(appendObj.attr('id') == 'theme_content'){
					var limit_obj = appendObj.parent().parent().parent().siblings('.ev_popbox_t').find('#limitingtext');
				}else{
					var limit_obj = appendObj.parent().siblings('.ev_popbox_t').find('#limitingtext');
				}
				var tmp_limit = limit_obj.html();
				tmp_limit = parseInt(tmp_limit);
				tmp_limit = tmp_limit-(tmp_data_name_length-2);
				limit_obj.html(tmp_limit);
				appendObj.val(appendObj.val()+$(this).attr("data-name"));
				faceArea.hide();
			}
		},"a");
	}else{
		var faceArea = $("#faceArea");
	}
	if(doc){
		var t = clickObj.offset().top+clickObj.height()+10,l = clickObj.offset().left-230;
	}else{
		var t = clickObj.offset().top+clickObj.height(),l = $('#wrapper').offset().left;
	}
	// if(clickObj.parent().attr('class') == 'ev_popbox_t'){
		// var popbox = clickObj.parents("#popbox");
		// var thisH = parseInt(popbox.css("margin-top"))+popbox.height();//°×É«¿ò¸ß¶È
		// var t = thisH,l = $('.wrapper').offset().left;
		// faceArea.css({"position":"fixed"});
	// }
	faceArea.css({"display":"block","top":t+"px","left":l+"px"});
};
