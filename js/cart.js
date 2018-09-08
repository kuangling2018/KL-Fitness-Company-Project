$(function()
{
  function loadCart()
  {
    $.ajax({
      type:'get',
      url:"data/islogin.php",
      success:function(data)
      {
        // console.log(data);
        if(data.code<0)
        {
          alert('请先登录');
          location.href="test_login.html?back="+location.href;
        }
        else
        {
          $.ajax({
            type:'get',
            url:"data/cartdetail.php",
            success:function(data){
              console.log(data);
              var html='';
              for(var i=0;i<data.length;++i)
              {
                var item=data[i];
                var {ischecked,count,href,pcolor,pdetail,price,psize,pweight,sm,pid}=item;
                html+=`<div class="imfor">
                <div class="check">
                          <img src="images/${ischecked==0?'product_normal.png':'product_true.png'}" data-pid="${pid}" alt="">
                        </div>
                        <div class="product">
                          <p>
                            <a href="test_detail.html?pid=${pid}"><img src="${sm}" alt="${pdetail}"></a>
                          </p>
                          <a href="test_detail.html?pid=${pid}">${pdetail}</a>
                        </div>
                        <div class="col">
                          <p>${pcolor}</p>
                        </div>
                        <div class="weight">
                          <p>${pweight}</p>              
                        </div>
                        <div class="size">
                            <p>${psize}</p>                
                        </div>
                        <div class="price">
                          <p class="price-desc">专享价</p>
                          <p>
                            <b>￥</b>${parseInt(price).toFixed(2)}
                          </p>
                        </div>
                        <div class="num">
                          <span class="reduce" data-pid="${pid}" >&nbsp;-&nbsp;</span>
                          <input type="text" value="${count}">
                          <span class="add" data-pid="${pid}" >&nbsp;+&nbsp;</span>
                        </div>
                        <div class="total-price">
                          <span>￥</span>
                          <span>${parseInt((price*count)).toFixed(2)}</span>
                        </div>
                        <div class="del">
                          <a href="#" data-pid="${pid}">删除</a>
                        </div></div>`;
              }
              $('#content-box-body').html(html);
              if($('#content-box-body').is(":has(img[src$=normal.png])"))
              //这里也有个全选功能，不是放在下面点击按钮中，而是放在购物车加载模块中
              {
                $('#content-box div.check-top>img').attr('src',"images/product_normal.png");
              }
              else
              {
                $('#content-box div.check-top>img').attr('src',"images/product_true.png");
              }
            },
            error:function()
            {
              alert('请检查网络故障!');
            }
          }); 

        }
      },
      error:function()
      {
        alert('网络故障，请检查');
      }
    });

  }

  loadCart();

  //数量点击更新数据库事件
  $('#content-box-body').on('click','div.imfor>div.num>span',function()
  {
    var $span=$(this);
    var pid=$span.attr('data-pid');
    var count=$span.siblings('input').val();
    if($span.is('.add'))
    {
      count++;
    }
    else
    {
      count--;
    }
    $.ajax({
      type:'post',
      url:"data/updatecart.php",
      data:{pid:pid,count:count},
      success:function()
      {
        loadCart();
      },
      error:function()
      {
        alert("网络故障，请检查");
      }
    });
  }).on('click','div.imfor>div.del>a',function(ev)//购物车的删除按钮功能
  {
    ev.preventDefault();//这里一定不要忘了阻止默认事件
    var $a=$(this);
    var pid=$a.data('pid');
    console.log(pid);
    if(confirm('确认删除吗?'))
    {
      $.ajax({
        type:'post',
        url:"data/updatecart.php",
        data:{pid:pid,count:0},
        success:function()
        {
          loadCart();
        },
        error:function()
        {
          alert('网络故障，请检查');
        }
      })
    }
  })

  //全选按钮功能
  $('#content-box div.check-top').click(function()
  {
    var checked=$(this).children('img').attr("src").endsWith("normal.png")?1:0;
    //通过这种方式判断是否选中，因为不是checkbox按钮
    $.ajax({
      type:'post',
      url:"data/checkall.php",
      data:{checked},
      success:function()
      {
        loadCart();
      },
      error:function()
      {
        alert('网络故障，请检查');
      }
    })
  });

  //其他按钮的选择功能
  $('#content-box-body').on('click','div.imfor>div.check',function()
  {
    var pid=$(this).children().data('pid');
    var checked=$(this).children('img').attr("src").endsWith("normal.png")?1:0;
    $.ajax({
      type:'post',
      url:"data/checkone.php",
      data:{pid:pid,checked:checked},
      success:function()
      {
        loadCart();
      },
      error:function()
      {
        alert('网络故障，请检查');
      }
    })
  })

})