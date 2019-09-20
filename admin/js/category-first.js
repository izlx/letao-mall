$(function () {
	/**
	 * 获取一级分类数据并展示
	 */
	var page = 1;
	var pageSize = 10;
	var totalPage = 0;
	
	getData();

	// 下一页
	$('#next').on('click', function () {
		page++;
		if (page > totalPage) {
			page = totalPage;
			alert('已经是最后一页了');
			return;
		}

		getData();
	})

	// 上一页
	$('#prev').on('click', function () {
		page--;
		if (page < 1) {
			page = 1;
			alert('已经是首页了');
			return;
		}

		getData();
	})

	// 上一页
	function getData() {
		$.ajax({
			url: '/category/queryTopCategoryPaging',
			type: 'GET',
			data: {
				page: page,
				pageSize: pageSize
			},
			success: function (res) {
				console.log(res);
				totalPage = Math.ceil(res.total / pageSize);
				var html = template('categoryFirstTpl', res);
				$('#categoryFirst-box').html(html);
			}
		})
	}

	/**
	 * 添加一级分类
	 * 1.获取一级分类保存按钮 并添加点击事件
	 * 2.获取用户输入的分类名称 并且检验
	 * 3.调用添加一级分类接口 实现功能
	 * 4.刷新页面
	 */
	
	$('#save').on('click', function () {
		var categoryFirst = $.trim($('[name = "categoryFirst"]').val());
		if (!categoryFirst) {
			alert('请输入名称');
			return;
		}
		$.ajax({
			url: '/category/addTopCategory',
			type: 'POST',
			data: {
				categoryName: categoryFirst
			},
			success: function (res) {
				if (res.success) {
					location.reload();
				}
			}
		})
	})

})