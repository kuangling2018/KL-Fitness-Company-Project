<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect('127.0.0.1','root','','gym',3306);
mysqli_query($conn,"set names utf8");
@$mailbox=$_REQUEST['mailbox'];
@$password=$_REQUEST['password'];
if($mailbox===null||$mailbox==='')
{
	die('{"code":-1,"msg":"邮箱不能为空"}');
}
if($password===null||$password==='')
{
	die('{"code":-1,"msg":"密码不能为空"}');
}
$sql="select id from gym_user where mailbox='$mailbox' and binary password='$password'";
$result=mysqli_query($conn,$sql);
if($result==false)
{
	echo "请检查看".$sql;
}
else
{
	$uid=mysqli_fetch_row($result)[0];
	if($uid==null)
	{
		echo '{"code":-1,"msg":"用户名不存在"}';
	}
	else
	{
		session_start();
		$_SESSION['id']=$uid;
		echo '{"code":1,"msg":"登录成功"}';
	}	
}
?>
