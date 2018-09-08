$(function()
{
	var arr=[];//用来保存每个li的位置
	var iNow = 7;//每次最多显示8个数据(0-7)
	function loadProduct(pno,pageSize,kw)
	{
		$.ajax(
		{
			type:'get',
			url:'data/product.php',
			data:{pno:pno,pageSize:pageSize,kw:kw},
			success:function(data)
			{
				var {pno,pageSize,pageCount,total,data}=data;
				var num = pno*pageSize < total ? pageSize : total - (pno-1)*pageSize;//数据总量为total
				var html="";
				var $ul=$('#product_list>ul');
				if($ul.html()=='') 
				{
					$('#product_list>ul').css('height','726px');//定义初始高度
					for(var i=0;i<num;++i)
					{
						var item=data[i];
						html=`<li class="show_list">
							<a href="${item.href}"><img src="${item.pimage}"></a>
							<p class="price">￥${item.price}</p>
							<a href="${item.href}" class="intro">${item.pdetail}</a>
							<div>
								<span class="count">-</span>
								<input type="text" name="" value="1">
								<span class="count">+</span>
								<a href="javascript:;" class="addcart" data-pid=${item.pid}>加入购物车</a>
							</div>
						</li>`;
						$('#product_list>ul').append(html);
					}
					var $lis=$('#product_list>ul>li');
					for(var i=0;i<$lis.size();i++)
					{
						arr.push( [$lis[i].offsetLeft,$lis[i].offsetTop] );
					}
					for(var i=0;i<$lis.size();i++)
					{
						$lis[i].style.position = 'absolute';
						$lis[i].style.left = arr[i][0] + 'px';
						$lis[i].style.top = arr[i][1] + 'px';
						$lis[i].style.margin = 0;
					}				
				}
				else
				{
					var $lis=$('#product_list>ul>li');
					var timer = setInterval(function()
					{
						startMove($lis[iNow],{left : 800 ,top : 400,opacity:0});
						console.log(iNow);
						if(iNow == 0)
						{
							clearInterval(timer);
							iNow = num - 1;
							console.log(num);
							for(var i=0;i<num;++i)
							{
								var item=data[i];
								html=`<a href="${item.href}"><img src="${item.pimage}"></a>
									<p class="price">￥${item.price}</p>
									<a href="${item.href}" class="intro">${item.pdetail}</a>
									<div>
										<span class="count">-</span>
										<input type="text" name="" value="1">
										<span class="count">+</span>
										<a href="javascript:;" class="addcart" data-pid=${item.pid}>加入购物车</a>
									</div>`;
								$lis[i].innerHTML=html;
							}
							var timer2 = setInterval(function()
							{
								startMove($lis[iNow],{left : arr[iNow][0] ,top : arr[iNow][1] , opacity:100});
								if(iNow == 0)
								{
									clearInterval(timer2);
									iNow = num - 1;
								}
								else
								{
									iNow--;
								}
							},100);
						}
						else
						{
							iNow--;
						}
					},100);
				}

				//下面代码是创建页码条(多种情况分析)
				var pno=parseInt(pno);
				var pageSize=parseInt(pageSize);
				var pageCount=parseInt(pageCount);
				var html="";
				html+=`<li><a href="#1">首页</a></li>`;//汉字首页
				
				if(pno-1>0)//汉字上一页
				{
					html+=`<li><a href="#${pno-1}">上一页</a></li>`;
				}
				else
				{
					html+=`<li class="disabled"><a href="#x">上一页</a></li>`;
				}

				if(pageCount<5)//总页数少于5的情况
				{
					for(var i=1;i<=pageCount;++i)
					{
						if(pno==i)
						{
							html+=`<li class="active"><a href="#${i}">${i}</a></li>`;
						}
						else
						{
							html+=`<li><a href="#${i}">${i}</a></li>`;
						}
					}
				}
				else//总页数大于5的情况
				{
					for(var i=1;i<=5;i++)
					{

						if(pno==1||pno ==2)
						{
							oa=`<a href="#${i}">${i}</a>`;
							if(pno==i)
							{
								html+='<li class="active">'+oa+'</li>';
							}
							else
							{
								html+='<li>'+oa+'</li>';
							}	
						}
						else if((pageCount-pno)==0||(pageCount-pno)==1)
						{

							oa=`<a href="#${pageCount - 5 + i}">${pageCount- 5 + i}</a>`;
							if((pageCount-pno)==0&&i==5)
							{
								html+='<li class="active">'+oa+'</li>';
							}
							else if((pageCount-pno)==1&&i==4)
							{
								html+='<li class="active">'+oa+'</li>';
							}
							else
							{
								html+='<li>'+oa+'</li>';
							}
						}
						else
						{
							oa=`<a href="#${pno- 3 + i}">${pno - 3 + i}</a>`;
							if(i==3)
							{
								html+='<li class="active">'+oa+'</li>';
							}
							else
							{
								html+='<li>'+oa+'</li>';
							}
						}
					}
				}

				if(pno+1<=pageCount)//汉字下一页	
				{
					html+=`<li><a href="#${pno+1}">下一页</a></li>`;
				}
				else
				{
					html+=`<li class="disabled"><a href="#x">下一页</a></li>`;
				}	
				html+=`<li><a href="#${pageCount}">尾页</a></li>`;//汉字尾页		
				$('#pagination').html(html);
			},
			error:function()
			{
				alert('网络故障，请检查');
			}
		});		
	}
	loadProduct(1,8,'');

	//为页码绑定点击事件
	$('#pagination').on('click','li',function(ev)
	{
		ev.preventDefault();
		var pno=$(this).children().attr('href').slice(1);
		var kw=$('#search>div.rf>input[type=text]').val();
		if(pno=='x')
		{
			return;
		}
		else
		{
			loadProduct(pno,8,kw);
		}
	})
	//搜索按键查询
	$('#search>div.rf>button').click(function(ev)
	{
		var kw=$('#search>div.rf>input[type=text]').val();
		loadProduct(1,8,kw);
	})
	//回车功能
	$('#search>div.rf>input[type=text]').keyup(function(ev)
	{
		var kw=$('#search>div.rf>input[type=text]').val();
		if(ev.keyCode==13)
		{
			loadProduct(1,8,kw);
		}
	})
	//关键字点击搜索
	$('#search>div.lf').on('click','span>a',function(ev)
	{
		ev.preventDefault();
		var kw=$(this).html();
		$('#search>div.rf>input[type=text]').val(kw);
		loadProduct(1,8,kw);
	})
	//购买数量、加入购物车
	$('#product_list').on('click','ul>li>div>span',function(ev)
	{
		var index=$(this).index();//index=0,是减；index=2是加
		if(index==2)
		{
			var $input=$(this).prev();
			var count=parseInt($input.val());
			count++;
			$input.val(count);
		}
		else if(index==0)
		{
			var $input=$(this).next();
			var count=parseInt($input.val());
			if(count>1)
			{
				count--;
			}
			$input.val(count);
		}
	}).on('click','ul>li>div>a',function(ev)
	{
		ev.preventDefault();
		//添加购物车商品之前，先判断用户是否登录
		$.ajax({
			type:'get',
			url:'data/islogin.php',
			success:function(data)
			{
				if(data.code>0)//登录状态
				{
					var pid=$(this).data('pid');
					// console.log(pid);
					var count=parseInt($(this).siblings('input').val());
					// console.log(count);
					$.ajax({
						type:'post',
						url:'data/addproduct.php',
						data:{pid:pid,count:count},
						success:function()
						{
							alert('添加购物车成功');
						},
						error:function()
						{
							alert('网络故障，请检查');
						}
					});					
				}
				else//不是登录状态
				{
					alert('请先登录!');
					location.href="test_login.html?back="+location.href;
				}
			},
			error:function()
			{
				alert('网络故障，请检查');
			}
		});


	})
})


