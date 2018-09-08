//自己写的一个ajax函数
function ajax({type,url,data,dataType}){
	return new Promise(success=>{
		//1.创建xhr异步对象
		var xhr=null;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}else{
			xhr=new ActiveXObject("Microsoft.XMLHttp");
		}
		//2.绑定监听事件
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				if(dataType==="json")
					success(JSON.parse(xhr.responseText));
				else
					success(xhr.responseText);
			}
		}
		if(type==="get"&&data!==undefined)
			url+="?"+data;
		//3.打开连接 
		xhr.open(type,url,true);
		//4.发送请求
		if(type==="post"&&data!==undefined)
			xhr.send(data);
		else
			xhr.send(null);
	})
}

/*获取页面样式*/
function getStyle(obj,attr)
{
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

/*完美运动框架*/
function startMove(obj,json,fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{
		var istop=true;
		for(var attr in json)
		{
			var cur=0;
			if(attr=='opacity')
			{
				cur=parseInt(parseFloat(getStyle(obj,attr)*100));
			}
			else
			{
				cur=parseInt(getStyle(obj,attr));						
			}
			var speed=(json[attr]-cur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur+speed+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
			if(cur!=json[attr])
			{
				istop=false;
			}						
		}
		if(istop)
		{
			clearInterval(obj.timer);
			fn&&fn();
		}																	
	},30);	
}
/*带限制范围的拖拽程序*/
function drag(obj)
{
	obj.onmousedown=function(ev)
	{
		var ev=ev||event;
		var disX=ev.clientX-this.offsetLeft;
		var disY=ev.clientY-this.offsetTop;
		if(obj.setCapture)
		{
			obj.setCapture();
		}
		document.onmousemove=function(ev)
		{
			var ev=ev||event;
			var L=ev.clientX-disX;
			var T=ev.clientY-disY;
			if(L<=0)
			{
				L=0;
			}
			if(L>document.documentElement.clientWidth-obj.clientWidth)
			{
				L=document.documentElement.clientWidth-obj.clientWidth;
			}
			if(T<=0)
			{
				T=0;
			}
			if(T>document.documentElement.clientHeight-obj.clientHeight)
			{
				T=document.documentElement.clientHeight-obj.clientHeight;
			}
			obj.style.left=L+'px';
			obj.style.top=T+'px';
		}
		document.onmouseup=function()
		{
			document.onmouseup=document.onmousemove=null;
			if(obj.releaseCapture)
			{
				obj.releaseCapture();
			}
		}
		return false;
	}
}