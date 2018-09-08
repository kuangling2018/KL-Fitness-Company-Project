$(function()
{
    //'关于我们'点击按钮样式发生变化
	$('div.aboutUs>div.cm_content>ul').delegate('li','click',function()
	{
		var $tar=$(this);
		$tar.addClass('aboutUs_title').siblings().removeClass('aboutUs_title');
		var href=$(this).children(':first').attr('href');
  		$(href).addClass('active').siblings().removeClass('active');
	});
	//图片轮播加载
	$.ajax({
		type:'get',
		url:'data/carousel.php',
		success:function(data)
		{
			var {code,data}=data;
			console.log(data);
			if(code==1)
			{
				var html='';
				for(var i=0;i<data.length;++i)
				{
					html+=`<li><img src="${data[i]}"></li>`;
				}
				$('#banner>ul.clear').html(html);//这一块是将轮播的图片加载进来

				//按钮透明度发生变化
				$('#banner>div.left_part').mouseenter(function()
				{
					$('#banner>a.ck_left').css('opacity',"1");
				});
				$('#banner>div.left_part').mouseleave(function()
				{
					$('#banner>a.ck_left').css('opacity',"0");
				});
				$('#banner>div.right_part').mouseenter(function()
				{
					$('#banner>a.ck_right').css('opacity',"1");
				});
				$('#banner>div.right_part').mouseleave(function()
				{
					$('#banner>a.ck_right').css('opacity',"0");
				});

				$('#banner>a.ck_left').hover(
					function(){
						$(this).css('opacity',"1");
					},
					function(){
						$(this).css('opacity',"0");
					}
				);
				$('#banner>a.ck_right').hover(
					function(){
						$(this).css('opacity',"1");
					},
					function(){
						$(this).css('opacity',"0");
					}
				);

				//banner大图片轮播特效
				var len=$('#banner>ul.slide>li').size();
				var count1=0;//定时器中记录当前小圆点的位置情况
				var btn_off=true;//开关
				var timer=null;
				var img_width=$('#banner>ul:first-child>li>img').width();
				//小圆点的初始状态
				$('#banner>ul:first-child').css('width',len*img_width);
				$('#banner>ul.slide>li:first-child').css('backgroundColor','green');
				//小圆点点击事件
				$('#banner>ul.slide').on('click','li',function()
				{
					$(this).css('backgroundColor','green').siblings().css('backgroundColor','white');
					var ul1=$(this).parent().siblings('ul')[0];
					count1=$(this).index();
					startMove(ul1,{left:-count1*1080});
				});
				//定时器部分
				timer=setInterval(toRun,2000);
				function toRun()
				{	
					if(btn_off)
					{
						btn_off=false;
						var li_copy=$('#banner>ul:first-child>li:first-child').clone(true);
						var $ul=$('#banner>ul:first-child');
						$ul.append(li_copy);
						var len=$('#banner>ul.slide>li').size();
						$ul.css('width',len*img_width);
						startMove($ul[0],{left:-1080},function()
						{
							$ul.children().first().remove();
							$ul.css('left',0);
							btn_off=true;						
						});		
						if(count1==len-1)
						{
							count1=0;
						}
						else
						{
							count1++;			
						}
						$('#banner>ul.slide>li').css('backgroundColor','white');
						$('#banner>ul.slide>li')[count1].style.backgroundColor='green';
					}
				}
				//鼠标进入banner关闭定时器
				$('#banner').hover(
					function()
					{
						clearInterval(timer);
				    	timer=null;
					},
					function()
					{
						timer=setInterval(toRun,2000);
					}
				)
				//按左键图片滑动
				// var oleft=document.querySelector('#banner>a.ck_left');
				// var oright=document.querySelector('#banner>a.ck_right');
				// oleft.onclick=function(ev)
				// {
				// 	var ev=ev||event;
				// 	inow--;
				// 	if(inow==-1)
				// 	{
				// 		inow=len-1;
				// 	}
				// 	for(var i=0;i<len;++i)
				// 	{
				// 		li2[i].style.backgroundColor='white';
				// 	}
				// 	li2[inow].style.backgroundColor='green';
				// 	startMove(ul1,{left:-inow*1080});
				// 	ev.preventDefault();
				// }
				// 按右键图片滑动
				// oright.onclick=function(ev)
				// {
				// 	var ev=ev||event;
				// 	inow++;
				// 	if(inow==len)
				// 	{
				// 		inow=0;
				// 	}
				// 	for(var i=0;i<len;++i)
				// 	{
				// 		li2[i].style.backgroundColor='white';
				// 	}
				// 	li2[inow].style.backgroundColor='green';
				// 	startMove(ul1,{left:-inow*1080});
				// 	ev.preventDefault();
				// }

			}
		},
		error:function()
		{
			alert('网络故障，请检查');
		}
	});

});
		
(function()
{
	// //'成功案例'实现图片轮播，鼠标华上去暂停，并且是发生无缝运动
	// var div=document.querySelector('div.successfulCase>div.cm_slide');
	// var ul=document.querySelector('div.successfulCase>div.cm_slide>ul');
	// //这里只找一个，所以不用document.querySelectorAll
	// ul.innerHTML+=ul.innerHTML;
	// ul.style.width=ul.offsetWidth*2+'px';
	// var timer=null;
	// speed=-6;
	// function move()
	// {
	// 	if(ul.offsetLeft<-ul.offsetWidth/2)
	// 	{
	// 		ul.style.left=0;
	// 	}
	// 	else if(ul.offsetLeft>0)
	// 	{
	// 		ul.style.left=-ul.offsetWidth/2+'px';
	// 	}
	// 	ul.style.left=ul.offsetLeft+speed+'px';
	// }
	// timer=setInterval(move,30);
	// div.onmouseover=function()
	// {
	// 	clearInterval(timer);
	// }
	// div.onmouseout=function()
	// {
	// 	timer=setInterval(move,30);
	// }

//'产品中心'实现按钮点击图片轮播
	var btn_left=document.querySelector('div.productCenter>div.cm_slide>a.slide_arrow_left');
	var btn_right=document.querySelector('div.productCenter>div.cm_slide>a.slide_arrow_right');
	var ul_product=document.querySelector('div.productCenter>div.cm_slide>div>ul');
	var li_product=ul_product.getElementsByTagName('li');
	var left_off=true;
	var right_off=true;
	btn_left.onclick=function(ev)
	{
		if(left_off)
		{
			left_off=false;
			var ev=ev||event;
			ev.preventDefault();
			var li_copy=li_product[0].cloneNode(true);
			ul_product.appendChild(li_copy);
			ul_product.style.width=(li_product[0].offsetWidth+12)*li_product.length+'px';
			startMove(ul_product,{left:-(li_product[0].offsetWidth+12)},function()
			{
				left_off=true;
				ul_product.style.left=0;
				ul_product.removeChild(li_product[0]);
				ul_product.style.width=(li_product[0].offsetWidth+12)*li_product.length+'px';
			});			
		}
	}
	btn_right.onclick=function(ev)
	{
		if(right_off)
		{
			right_off=false;
			var ev=ev||event;
			ev.preventDefault();
			var li_copy=li_product[li_product.length-1].cloneNode(true);
			ul_product.insertBefore(li_copy,li_product[0]);
			ul_product.style.width=(li_product[0].offsetWidth+12)*li_product.length+'px';
			startMove(ul_product,{right:-(li_product[0].offsetWidth+12)},function()
			{
				right_off=true;
				ul_product.style.left=0;
				ul_product.removeChild(li_product[li_product.length-1]);
				ul_product.style.width=(li_product[0].offsetWidth+12)*li_product.length+'px';
			});			
		}
	}

})();
