$(function () {
	var page = 1;
	var pageSize = 10;
	var totalPage = 0;

	getData();
	$('#nextBtn').on('click', function () {
		page++;
		if (page > totalPage) {
			page = totalPage;
			alert('已近是最后一页了');
			return;
		}
		getData();
	})

	$('#prevBtn').on('click', function () {
		page--;
		if (page < 1) {
			page = 1;
			alert('已近是首页了');
			return;
		}
		getData();
	})

	function getData() {
		$.ajax({
			url: '/category/querySecondCategoryPaging',
			type: 'GET',
			data: {
				page: page,
				pageSize: pageSize
			},
			success: function (res) {
				// console.log(res)
				totalPage = Math.ceil(res.total / pageSize);
				var html = template('categorySecondTpl', res);
				$('#categorySecond-box').html(html);
			}
		})
	}

	/**
	 * 二级分类添加
	 * 1.获取一级分类的数据并显示在选择框中
	 * 2.图片文件上传
	 * 3.调用接口 实现二级分类数据添加
	 */
	
	// 查询二级分类
	$.ajax({
		url: '/category/queryTopCategoryPaging',
		type: 'GET',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function (res) {
			console.log(res);
			var html = template('categoryFirstTpl', res);
			$('#categoryFirstBox').html(html);
		}
	})

	// 上传图片
	var previewImg = '';
	$('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result.picAddr);
            // 上传图片预览
            $('#preview').attr('src', data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    });

	// 添加二级分类
	$('#save').on('click', function () {
		var categoryId = $.trim($('[name = "categoryId"]').val());
		var brandName = $.trim($('[name = "brandName"]').val());

		$.ajax({
			url: '/category/addSecondCategory',
			type: 'POST',
			data: {
				brandName: brandName,
				categoryId: categoryId,
				brandLogo: previewImg,
				hot: 0
			},
			success: function (res) {
				console.log(res);
				if (res.success) {
					location.reload();
				}
			}
		})
	})
})