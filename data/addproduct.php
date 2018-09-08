<?php
$conn=mysqli_connect("127.0.0.1",'root','','gym',3306);
mysqli_query($conn,"set names utf8");
session_start();
@$id=$_SESSION['id'];
@$pid=$_REQUEST['pid'];
@$count=$_REQUEST['count'];
if($id!=null&&$pid!=null&&$count!=null)
{
	$sql="select lid from gym_shoppingcart where id=$id and pid=$pid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$lid=$row[0];
	if($row==null)
	{
		$sql="insert into gym_shoppingcart values(null,$id,$pid,$count,default)";
		mysqli_query($conn,$sql);
	}
	else
	{
		$sql="update gym_shoppingcart set count=count+$count where lid=$lid";
		mysqli_query($conn,$sql);
	}
}
?>