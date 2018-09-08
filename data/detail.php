<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"SET NAMES UTF8");
$output=[ "product"=>[],"imgs"=>[] ];
@$pid=$_REQUEST["pid"];
if($pid!=null)
{
	$sql="SELECT * FROM `gym_detail` where pid=$pid";
	$result=mysqli_query($conn,$sql);
	$output["product"]=mysqli_fetch_all($result,1)[0];

	$sql="SELECT * FROM `gym_pic` where pid=$pid";
	$result=mysqli_query($conn,$sql);
	$output["imgs"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);