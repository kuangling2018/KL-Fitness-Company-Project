$(function()
{
	//用户名框验证
	$('div.user_login>ul>li>input[name=mailbox]').on('blur',function()
	{
		$(this).next().html('');
		var reg=/\w+@[a-z0-9]+\.[a-z]{2,4}/;
		if(reg.test($(this).val()))
		{
			$(this).next().removeClass().addClass('login_success');
		}
		else
		{
			$(this).next().removeClass().addClass('login_fail');
		}
	}).on('focus',function()
	{
		$(this).next().removeClass().addClass('login_focus').html('*邮箱格式');
		$('div.user_login>[type=button]').prop('disabled',false);
	})

	//密码框验证
	$('div.user_login>ul>li>input[type=password]').on('blur',function()
	{
		$(this).next().html('');
		if($(this).val().length>5&&$(this).val().length<20)
		{
			$(this).next().removeClass().addClass('login_success');
		}
		else
		{
			$(this).next().removeClass().addClass('login_fail');
		}
	}).on('focus',function()
	{
		$(this).next().removeClass().addClass('login_focus').html('*密码长度至少6位，但不超过20位');
		$('div.user_login>[type=button]').prop('disabled',false);
	})

	//按钮事件
	$('div.user_login>[type=button]').on('click',function()
	{
		var $btn=$(this);
		var bool0=$('div.user_login>ul>li>span:eq(0)').hasClass('login_success');
		var bool1=$('div.user_login>ul>li>span:eq(1)').hasClass('login_success');
		if(bool0&&bool1)
		{
			var mailbox=$('div.user_login>ul>li>input[type=text]').val();
			var password=$('div.user_login>ul>li>input[type=password]').val();
			$.ajax(
			{
				type:'get',
				url:'data/login.php',
				data:'mailbox='+mailbox+'&password='+password,
				success:function(data)
				{
					if(data.code>0)
					{
						alert(data.msg);
						var i=location.search.indexOf('=');
						if(i!=-1)
						{
							location.href=location.search.slice(i+1);							
						}
						else
						{
							location.href="test_index.html";
						}
					}
					else
					{
						alert(data.msg);
					}
				}
			})
		}
		else
		{
			$btn.prop('disabled',true);
		}
	})

	
})