<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect('127.0.0.1','root','','gym','3306');
mysqli_query($conn,"set names utf8");
@$mailbox=$_REQUEST['mailbox'];
if($mailbox===null||$mailbox==='')
{
	die('{"code":-1,"msg":"邮箱不能为空"}');
}
$sql="select * from gym_user where mailbox='$mailbox'";
$result=mysqli_query($conn,$sql);
if($result==false)
{
	echo "请检查".$sql;
}
else
{
	$user=mysqli_fetch_assoc($result);
	if($user==null)
	{
		echo '{"code":1,"msg":"允许注册"}';
	}
	else
	{
		echo '{"code":-1,"msg":"用户名已被注册"}';
	}
}
?>