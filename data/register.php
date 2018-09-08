<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect('127.0.0.1','root','','gym','3306');
mysqli_query($conn,"set names utf8");
@$mailbox=$_REQUEST['mailbox'];
if($mailbox===null||$mailbox==='')
{
	die('{"code":-1,"msg":"邮箱不能为空"}');
}
@$password=$_REQUEST['password'];
if($password===null||$password==='')
{
	die('{"code":-1,"msg":"密码不能为空"}');
}
@$telephone=$_REQUEST['telephone'];
if($telephone===null||$telephone==='')
{
	die('{"code":-1,"msg":"电话号码不能为空"}');
}
session_start();
@$yzm=$_REQUEST['yzm']; //用户输入验证码
@$phpyzm=$_SESSION['code'];//php生成验证码
if($yzm!=$phpyzm)
{
	die('{"code":-1,"msg":"验证码错误"}');
}
$sql="insert into gym_user(id,mailbox,password,telephone,gender,uimg)";
$sql.=" values(default,'$mailbox','$password','$telephone',default,default)";
$result=mysqli_query($conn,$sql);
if($result==false)
{
	echo "请检查".$sql;
}
else
{
	echo '{"code":1,"msg":"注册成功"}';
}
?>