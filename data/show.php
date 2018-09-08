<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"SET NAMES UTF8");
@$id=$_REQUEST['id'];
$reg='/^[0-9]{1,}$/';
$result=preg_match($reg,$id);
if(!$result)
{
	die('{"code":-1,"msg":"格式不正确"}');
}
$sql="select name,mailbox,telephone,gender from gym_user where id=$id";
$result=mysqli_query($conn,$sql);
if($result===false)
{
	echo "请检查".$sql;
}
else
{
	$data=mysqli_fetch_row($result);
	$output=["code"=>1,"data"=>$data];
	echo json_encode($output);
}
?>