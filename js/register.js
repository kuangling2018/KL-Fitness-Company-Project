$(function()
{
	//邮箱验证
		$('div.user_register>table>tbody>tr>td>input:first()').on('blur',function()
		{
			var $txt=$(this).next();
			var mailbox=$(this).val();
			var reg=/\w+@[a-z0-9]+\.[a-z]{2,4}/;
			if(reg.test(mailbox))
			{
				$.ajax(
				{
					type:'post',
					url:'data/isregister.php',
					data:'mailbox='+mailbox,
					success:function(data)
					{
						console.log(data);
						if(parseInt(data.code)==1)
						{
							$txt.addClass('register_success');
						}
						else
						{
							$txt.html('*用户名已注册').css('color','red');
						}
					},
					error:function()
					{
						alert('网络故障,请检查！');
					}
				});	
			}
			else
			{
				$txt.addClass('register_fail');
			}			
		}).on('focus',function()
		{
			$(this).next().removeClass().html('');
		});

		//密码验证
		$('div.user_register>table>tbody>tr>td>input[type=password]:first()')
		.on('blur',function()
		{
			$(this).next().html('');
			if($(this).val().length>5&&$(this).val().length<20)
			{
				$(this).next().addClass('register_success');
			}
			else
			{
				$(this).next().addClass('register_fail');
			}
		}).on('focus',function()
		{
			$(this).next().removeClass();
			$(this).next().html('*密码长度至少6位，但不超过20位');
		})

		//确认密码验证
		$('div.user_register>table>tbody>tr>td>input[type=password]:last()')
		.on('blur',function()
		{
			var password_ago=
			$('div.user_register>table>tbody>tr>td>input[type=password]:first()').val();
			if(password_ago==$(this).val())
			{
				$(this).next().addClass('register_success');
			}
			else
			{
				$(this).next().html('*前后密码不一致').css('color','red');
			}
		}).on('focus',function()
		{
			$(this).next().removeClass();
			$(this).next().html('');
		})

		//电话号码验证
		$('div.user_register>table>tbody>tr>td>input[name=telephone]')
		.on('blur',function()
		{
			var telephone=$(this).val();
			var reg=/^1[34578]\d{9}$/;//电话号码的正则表达式
			if(reg.test(telephone))
			{
				$(this).next().addClass('register_success');	
			}
			else
			{
				$(this).next().addClass('register_fail');
			}	
		}).on('focus',function()
		{
			$(this).next().removeClass();
		})

		//注册按钮
		$('div.user_register>input[type=button]').on('click',function()
		{
			var mailbox=$('div.user_register>table>tbody>tr>td>input[name=mailbox]').val();
			var password=$('div.user_register>table>tbody>tr>td>input[name=password]:first()').val();
			var telephone=$('div.user_register>table>tbody>tr>td>input[name=telephone]').val();
			var yzm=$('div.user_register>table>tbody>tr>td>input[name=yzm]').val();
			var $law=$('div.user_register>span>input[type=checkbox]');
			// console.log(mailbox);
			// console.log(password);
			// console.log(telephone);
			// console.log(yzm);
			// console.log($law.prop('checked'));
			if($law.prop('checked'))
			{
				$.ajax(
				{
					type:'get',
					url:'data/register.php',
					data:{mailbox:mailbox,password:password,telephone:telephone,yzm:yzm},
					success:function(data)
					{
						if(data.code>0)
						{
							alert(data.msg);
							location.href='test_login.html';
						}
						else
						{
							alert(data.msg);
						}
					}
				})				
			}
		})



})