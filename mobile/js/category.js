$(function() {
	// 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});

	// 获取一级分类数据
	$.ajax({
		url:'/category/queryTopCategory',
		type:'GET',
		success: function (response){
			console.log(response);
			// 模板引擎
			// 将数据和html做拼接
			// 1）html模板
			// 2）数据
			// 告诉模板引擎 html和数据怎样进行拼接
			var html = template('category-first', {result: response.rows});
			$('#links').html(html);

			// 如果一级分类有数据的话
			if (response.rows.length) {
				// 给第一个一级分类添加选中的状态
				$('#links').find('a').eq(0).addClass('active');
				var id = response.rows[0].id;
				getSecondCategory(id);
			}
		}
	});

	/*
		点击一级分类数据获取二级分类的数据
			1.一级分类添加点击事件
			2.在事件处理函数中获取到一级分类的id
			3.调用二级分类的接口获取对应的数据
			4.将数据展示到对应的位置中
			5.如果接口中没有数据，要在页面中显示暂无数据
	*/
	// 1.一级分类添加点击事件
	$('#links').on('click', 'a', function () {
		// 2.在事件处理函数中获取到一级分类的id
		var id = $(this).attr('data-id');
		// 给当前点击的一级分类添加选中的状态
		$(this).addClass('active').siblings().removeClass('active');
		// 3.调用二级分类的接口获取对应的数据
		getSecondCategory(id);
	})
})

// 根据一级分类ID获取二级分类
function getSecondCategory(id) {
	$.ajax({
		url: '/category/querySecondCategory',
		type: 'GET',
		data: {
			id: id
		},
		success: function (response){
			console.log(response);
			var html = template('category-second', response);
			$('.brands').html(html);
		}
	})
}