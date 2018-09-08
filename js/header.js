(function()
{
	var link=document.createElement('link');
	link.rel="stylesheet";
	link.href="css/header.css";
	document.head.appendChild(link);
	ajax(
	{
		type:'get',
		url:'head.html',
	}).then(function(html)
	{
		document.getElementById('header').innerHTML=html;
		//一开始，界面就验证用户名是否登录
		$.ajax({
			type:'get',
			url:'data/islogin.php',
			success:function(data)
			{
				if(data.code>0)
				{
					$('#slogan>p>span').html(data.msg);
					$('#slogan>:nth-child(3)').show();
					$('#slogan>:nth-child(5)').show();
				}
				else
				{
					$('#slogan>p>span').html('');
				}
			},
			error:function()
			{
				alert('网络故障，请检查');
			}
		});
		//登录按钮
		$('#slogan>:nth-child(2)').click(function()
		{
			location.href="test_login.html?back="+location.href;
		});
		//注销按钮
		$('#slogan>:nth-child(3)').click(function()
		{
			$.ajax({
				type:'get',
				url:'data/logout.php',
				success:function()
				{
					location.reload(true);
				},
				error:function()
				{
					alert('网络故障，请检查');
				}
			})
		});
	})
})();