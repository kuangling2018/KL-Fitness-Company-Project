<?php
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1","root","","gym",3306);
mysqli_query($conn,"set names utf8");
session_start();
@$id=1;//$_SESSION['id'];
if($id!=null)
{
	$output=[];
	$sql="select pid,count,ischecked from gym_shoppingcart where id=$id";
	$result=mysqli_query($conn,$sql);
	if($result==false)
	{
		echo "请检查".$sql;
	}
	else
	{
		$row=mysqli_fetch_all($result,1);
		// var_dump($row);
		for($i=0;$i<count($row);$i++)
		{
			$arr=[];
			$pid=$row[$i]['pid'];
			$count=$row[$i]['count'];
			$ischecked=$row[$i]['ischecked'];

			$arr['pid']=$pid;
			$arr['count']=$count;
			$arr['ischecked']=$ischecked;

			$sql="select pdetail,price,href from gym_product where pid=$pid";
			$result=mysqli_query($conn,$sql);
			if($result==false)
			{
				echo "请检查".$sql;
			}
			else
			{
				$row_1=mysqli_fetch_assoc($result);
				$arr['pdetail']=$row_1['pdetail'];
				$arr['price']=$row_1['price'];
				$arr['href']=$row_1['href'];
			}
			$sql="select pcolor,pweight,psize from gym_detail where pid=$pid";
			$result=mysqli_query($conn,$sql);
			if($result==false)
			{
				echo "请检查".$sql;
			}
			else
			{
				$row_2=mysqli_fetch_assoc($result);
				$arr['pcolor']=$row_2['pcolor'];
				$arr['pweight']=$row_2['pweight'];
				$arr['psize']=$row_2['psize'];
			}
			$sql="select sm from gym_pic where pid=$pid";
			$result=mysqli_query($conn,$sql);
			if($result==false)
			{
				echo "请检查".$sql;
			}
			else
			{
				$row_3=mysqli_fetch_row($result);
				$arr['sm']=$row_3[0];
			}

			// var_dump($arr);
			$output[]=$arr;
		}
		echo json_encode($output);	
	}
}


?>