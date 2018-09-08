$(function()
{
	var $pid=$(location).attr('href').split('=')[1];
	$.ajax({
		type:'get',
		url:'data/detail.php',
		data:{pid:$pid},
		success:function(data)
		{
			// console.log(data);
			var {product,imgs}=data;
			var html='';
			html=`<li>产品名称:<span class="pname">${product.pname}</span></li>
		          <li>产品型号:<span class="ptype">${product.ptype}</span></li>
		          <li>产品颜色:<span class="pcolor">${product.pcolor}</span></li>
		          <li>产品净重:<span class="pweight">${product.pweight}</span></li>
		          <li>产品尺寸:<span class="psize">${product.psize}</span></li>
		          <li>产品价格:<span class="price">￥${product.price}</span></li>`;
		    $('#show-detail>ul').html(html);

		    //加载4张小图片
		    var item_img=``; 
		    var len=imgs.length;
		    for(var i=0;i<len;++i)
		    {
		    	var item=imgs[i];
			    item_img+=`<li><img src="${item.sm}" data-md="${item.md}" data-lg="${item.lg}"></li>`;
		    }
		    $('#icon_list').html(item_img);

		    // 加载第1张中图片
		    var img_md=imgs[0].md;
		    var img_lg=imgs[0].lg;
		    $('#mImg').attr('src',img_md);
		    $('#largeDiv>img').attr('src',img_lg);
		    //小图片换上去,中图片变换,大图片也变换
		    $('#icon_list').on('mouseenter','li',function()
		    {
		    	var md=$(this).children().data('md');
		    	var lg=$(this).children().data('lg');
		    	$('#mImg').attr('src',md);
		    	$('#largeDiv>img').attr('src',lg);
		    });

		    // 放大镜效果
		    $('#superMask').hover(
		    	function(){
		    		$('#mask').show();
		    		$('#largeDiv').show();
		    	},
		    	function(){
		    		$('#mask').hide();
		    		$('#largeDiv').hide();
		    });
		    $('#superMask').mousemove(function(ev)
		    {
		    	var L=ev.pageX-$(this).offset().left;
		    	var T=ev.pageY-$(this).offset().top;
		    	var disL=L-$('#mask').outerWidth()/2;
		    	if(disL<0)
		    	{
		    		disL=0;
		    	}
		    	else if(disL>$(this).outerWidth()-$('#mask').outerWidth())
		    	{
		    		disL=$(this).outerWidth()-$('#mask').outerWidth();
		    	}
		    	var disT=T-$('#mask').outerHeight()/2;
		    	if(disT<0)
		    	{
		    		disT=0;
		    	}
		    	else if(disT>$(this).outerHeight()-$('#mask').outerHeight())
		    	{
		    		disT=$(this).outerHeight()-$('#mask').outerHeight();
		    	}
		    	$('#mask').css('left',disL);
		    	$('#mask').css('top',disT);
		    	var percentX=disL/($(this).outerWidth()-$('#mask').outerWidth());
		    	var percentY=disT/($(this).outerHeight()-$('#mask').outerHeight());
		    	var disL_ab=$('#largeDiv').outerWidth()-$('#largeDiv>img').outerWidth();
		    	var disT_ab=$('#largeDiv').outerHeight()-$('#largeDiv>img').outerHeight();
		    	$('#largeDiv>img').css('left',percentX*(disL_ab));
		    	$('#largeDiv>img').css('top',percentY*(disT_ab));
		    })
		},
		error:function()
		{
			alert('网络故障请检查');
		}
	})
});