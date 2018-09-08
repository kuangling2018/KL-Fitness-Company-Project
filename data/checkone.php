<?php
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"set names utf8");
session_start();
@$id=$_SESSION['id'];
@$pid=$_REQUEST['pid'];
@$checked=$_REQUEST['checked'];
if($id!=null)
{
	$sql="update gym_shoppingcart set ischecked=$checked where id=$id and pid=$pid";
	mysqli_query($conn,$sql);	
}
?>