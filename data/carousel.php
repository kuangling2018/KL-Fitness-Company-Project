<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect('127.0.0.1','root','','gym','3306');
mysqli_query($conn,"set names utf8");
$sql="select img from gym_carousel";
$result=mysqli_query($conn,$sql);
$output=[];
if($result==false)
{
	echo "请检查".$sql;
}
else
{
	$row=mysqli_fetch_all($result);
	$output['code']=1;
	$output['data']=$row;
	echo json_encode($output);
}
?>