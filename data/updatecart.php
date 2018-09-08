<?php
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"set names utf8");
session_start();
@$id=$_SESSION['id'];
@$pid=$_REQUEST['pid'];
@$count=$_REQUEST['count'];
if($pid!=null&&$count!=null)
{
	if($count>0)
	{
		$sql="update gym_shoppingcart set count=$count where pid=$pid and id=$id";
		
	}
	else
	{
		$sql="delete from gym_shoppingcart where pid=$pid and id=$id";
	}
	mysqli_query($conn,$sql);
}
?>