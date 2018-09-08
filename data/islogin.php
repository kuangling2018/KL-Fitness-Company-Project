<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1",'root',"","gym",3306);
mysqli_query($conn,"set names utf8");
session_start();
@$id=$_SESSION["id"];
if(@$id==null)
{
	echo '{"code":-1,"msg":"请登录！"}';
}
else
{
	$sql="select name from gym_user where id=$id";
	$result=mysqli_query($conn,$sql);
	if($result==false)
	{
		echo "请检查".$sql;
	}
	else
	{
		$name=mysqli_fetch_row($result)[0];
		$output['code']=1;
		$output['msg']=$name."，您好！";
		echo json_encode($output);
	}
}
?>