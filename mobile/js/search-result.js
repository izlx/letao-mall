var keyword = getParamsByUrl(location.href, 'keyword');
var page = 1;
var html = '';
var priceSort = 1;
var numSort = 1;
var that = null;
$(function() {
	/*
		根据用户输入的关键字获取搜索结果
			1.获取到地址栏中用户输入的搜索关键字
			2.用关键字去调取搜索接口
			3.将搜索结果展示在页面中
	 */
	
	

	mui.init({
	  pullRefresh: {
	    container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up: {
	      height:50,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
	});

	/*
		按照价格对商品进行排序
			1.对价格按钮添加点击事件
			2.将价格排序规则传递到接口中
			3.对之前的各种配置进行初始化
				清空页面中的数据
				恢复当前页的值为1
				重新开启上拉加载
			4.将排序后的结果重新展示在页面中
	 */
	
	$('#priceSort').on('tap', function() {
		priceSort = priceSort == 1 ? 2 : 1;
		html= '';
		page= 1;
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData();
	})
	$('#numSort').on('tap', function() {
		numSort = numSort == 1 ? 2 : 1;
		html= '';
		page= 1;
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData();
	})
})

function getData() {
	if (!that) {
		that = this;
	}
	$.ajax({
		url: '/product/queryProduct',
		typr: 'GET',
		data: {
			page: page++,
			pageSize: 3,
			proName: keyword,
			price: priceSort,
			num: numSort
		},
		success: function (response) {
			if (response.data.length > 0) {
				html += template('searchTpl', response);
				$('#search-box').html(html);
				that.endPullupToRefresh(false);
			}else{
				that.endPullupToRefresh(true);
			}
		}
	})
}