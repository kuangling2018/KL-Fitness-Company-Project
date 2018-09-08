<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"SET NAMES UTF8");
@$kw=$_REQUEST['kw'];
@$pno=$_REQUEST['pno'];
@$pageSize=$_REQUEST['pageSize'];
if($pno==null)
{
	$pno=1;
}
if($pageSize==null)
{
	$pageSize=8;
}
$reg='/^[0-9]{1,}$/';
$result=preg_match($reg,$pno);
if(!$result)
{
	die('{"code":-1,"msg":"页码格式不正确"}');
}
$result=preg_match($reg,$pageSize);
if(!$result)
{
	die('{"code":-1,"msg":"页码格式不正确"}');
}
if($kw==null)
{
	$sql="select count(*) from gym_product";
	$result=mysqli_query($conn,$sql);
	if($result===false)
	{
		echo "请检查".$sql;
	}
	else
	{
		$total=mysqli_fetch_row($result)[0];
	}
	$pageCount=ceil($total/$pageSize);
	$start=($pno-1)*$pageSize;
	$sql="select pid,pdetail,price,pimage,href from gym_product limit $start,$pageSize";
}
else
{
	$sql="select count(*) from gym_product where pdetail like '%$kw%'";
	$result=mysqli_query($conn,$sql);
	if($result===false)
	{
		echo "请检查".$sql;
	}
	else
	{
		$total=mysqli_fetch_row($result)[0];
	}
	$pageCount=ceil($total/$pageSize);
	$start=($pno-1)*$pageSize;
	$sql="select pid,pdetail,price,pimage,href from gym_product where pdetail like '%$kw%' limit $start,$pageSize";
}

$result=mysqli_query($conn,$sql);
if($result==false)
{
	echo "请检查".$sql;
}
else
{
	$data=mysqli_fetch_all($result,1);
	$output=["pno"=>$pno,"pageSize"=>$pageSize,"pageCount"=>$pageCount,"total"=>$total,"data"=>$data];
	echo json_encode($output);
}
?>