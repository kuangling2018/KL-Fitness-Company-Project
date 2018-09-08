<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"SET NAMES UTF8");
$sql="select id,mailbox,telephone,gender,uimg from gym_user";
$result=mysqli_query($conn,$sql);
if($result===false)
{
	echo "请检查".$sql;
}
else
{
	$data=mysqli_fetch_all($result,1);
	$output=["code"=>1,"data"=>$data];
	echo json_encode($output);
}
?>