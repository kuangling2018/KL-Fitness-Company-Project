$(function()
{
	//用ajax加载网页教练所有图片
	$.ajax(
	{
		type:'get',
		url:'data/show_all.php',
		success:function(data)
		{
			var {code,data}=data;
			var html='';
			if(code==1)
			{
				for(var i=0;i<data.length;++i)
				{
					var item=data[i];
					html+=`<li class="active">
							<a href="#"><img src="${item.uimg}"></a>
							<div class="shadow">
								<a href="#"><img src="images/figure1.png"></a>
								<a href="#" data-id="${item.id}"><img src="images/figure2.png"></a>
							</div>
						</li>`;
				}
			}
			$('#show>ul.content').html(html);
		},
		error:function()
		{
			alert("网络故障，请检查");
		}
	});

	//教练图片滑进滑出，遮罩效果
	$('#show>ul.content').on('mouseover','li',function(ev)
	{
		ev.preventDefault();
		$('#show div.shadow').hide();		
		$(this).children('div.shadow').show();
	});
	$('#show>ul.content').on('mouseout','li',function(ev)
	{
		ev.preventDefault();
		$('#show div.shadow').hide();	
	});

	//提示图片变绿滑进滑出效果
	$('#show>ul').on('mouseover','li>div.shadow>a',function(ev)
	{
		ev.preventDefault();
		var index=$(this).index();
		if(index==0)
		{
			$(this).children().first().attr('src','images/figure11.png');
		}
		if(index==1)
		{
			$(this).children().last().attr('src','images/figure22.png');
		}
	});
	$('#show>ul').on('mouseout','li>div.shadow>a',function(ev)
	{
		ev.preventDefault();
		var index=$(this).index();
		if(index==0)
		{
			$(this).children().first().attr('src','images/figure1.png');
		}
		if(index==1)
		{
			$(this).children().last().attr('src','images/figure2.png');
		}
	});

	//点击按钮出现教练信息
	$('#show>ul.content').on('click','li>div.shadow>a:last-child',function(ev)
	{
		ev.preventDefault();
		var id=$(this).attr('data-id');
		id=parseInt(id);
		$.ajax(
		{
			type:'get',
			url:'data/show.php',
			data:{id:id},
			success:function(data)
			{
				var {code,data}=data;
				if(code==1)
				{
					console.log(data);
					if (data[3]=='1') 
					{
						$('#show>div[data-toggle=collapse] span.gender').html('男');
					}
					else
					{
						$('#show>div[data-toggle=collapse] span.gender').html('女');
					}
					$('#show>div[data-toggle=collapse] span.pname').html(data[0]);
					$('#show>div[data-toggle=collapse] span.ptelephone').html(data[2]);
					$('#show>div[data-toggle=collapse] span.pemail').html(data[1]);
				}
			},
			error:function()
			{
				alert("网络故障，请检查");
			}
		});
		$('#show>div[data-toggle=collapse]').addClass('in');
	});

	//点击按钮教练信息框退出
	$('#show>div[data-toggle=collapse] li.txt-btn').on('click','a',function(ev)
	{
		ev.preventDefault();
		$('#show>div[data-toggle=collapse]').removeClass('in');
	});
	//点击按钮中"预约"和"取消"按钮动态效果
	$('#show>div[data-toggle=collapse] li.txt-btn').on('mouseover','a',function()
	{
		$(this).addClass('active').siblings().removeClass();
	});
	//给教练信息框添加日期插件
	$('#show>div[data-toggle=collapse]>div>ul>li>input.pdate').datepicker(
	{
		changeMonth:true,
		changeYear:true,
		dateFormat:'yy年mm月dd日'
	}).datepicker("option",$.datepicker.regional['zh-CN']);

	//给分类按钮(全部、男生、女生)添加点击事件
	$('#show>div.title').on('click','a',function(ev)
	{
		ev.preventDefault();
		$(this).addClass('active').siblings().removeClass();
		var gender=$(this).attr('data-sex');
		if(gender=='-1')
		{
			$.ajax(
			{
				type:'get',
				url:'data/show_all.php',
				success:function(data)
				{
					var {code,data}=data;
					var html='';
					if(code==1)
					{
						for(var i=0;i<data.length;++i)
						{
							var item=data[i];
							html+=`<li class="active">
									<a href="#"><img src="${item.uimg}"></a>
									<div class="shadow">
										<a href="#"><img src="images/figure1.png"></a>
										<a href="#" data-id="${item.id}"><img src="images/figure2.png"></a>
									</div>
								</li>`;
						}
					}
					$('#show>ul.content').html(html);
				},
				error:function()
				{
					alert("网络故障，请检查");
				}
			});
		}
		else
		{
			var html='';
			$('#show>ul.content').html('');
			$.ajax(
			{
				type:'get',
				url:'data/show_all.php',
				success:function(data)
				{
					var {code,data}=data;
					console.log(data);
					var data_new=[];
					for(var item of data)
					{
						if(item.gender==gender)
						{
							data_new.push(item);
						}
					}
					console.log(data_new);
					for(var i=0;i<data_new.length;++i)
					{
						var item=data_new[i];
						html+=`<li class="active" data-gender="${item.gender}">
								<a href="#"><img src="${item.uimg}"></a>
								<div class="shadow">
									<a href="#"><img src="images/figure1.png"></a>
									<a href="#" data-id="${item.id}"><img src="images/figure2.png"></a>
								</div>
							</li>`;
					}
					$('#show>ul.content').html(html);	
				},
				error:function()
				{
					alert('网络故障，请检查');
				}
			});		
		}

	});

})