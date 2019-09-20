$(function () {
	/**
	 * 获取商品列表并展示
	 */
	
	$.ajax({
		url: '/product/queryProductDetailList',
		type: 'GET',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function (res) {
			// console.log(res);
			var html = template('productTpl', res);
			$('#productBox').html(html);
		}
	})

	/**
	 * 添加商品
	 * 1.获取二级分类并展示在选择框中
	 * 2.实现图片上传
	 * 3.实现添加上商品
	 */
	
	// 获取二级分类并展示在选择框中
	$.ajax({
		url: '/category/querySecondCategoryPaging',
		type: 'GET',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function (res) {
			// console.log(res);
			var html = template('secondTpl', res);
			$('#secondBox').html(html);
		}
	})

	// 实现图片上传
	var imageArray = [];
	$('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	imageArray.push(data.result);
            console.log(data.result.picAddr);
        }
    });

    // 实现添加商品
    $('#addProduct').on('click', function () {
    	var brandId = $.trim($('[name = "brandId"]').val());
    	var proName = $.trim($('[name = "proName"]').val());
    	var proDesc = $.trim($('[name = "proDesc"]').val());
    	var num = $.trim($('[name = "num"]').val());
    	var size = $.trim($('[name = "size"]').val());
    	var oldPrice = $.trim($('[name = "oldPrice"]').val());
    	var price = $.trim($('[name = "price"]').val());

    	$.ajax({
    		url: '/product/addProduct',
    		type: 'POST',
    		data: {
    			proName: proName,
    			oldPrice: oldPrice,
    			price: price,
    			proDesc: proDesc,
    			size: size,
    			statu: 1,
    			num: num,
    			brandId: brandId,
    			pic: imageArray
    		},
    		success: function (res) {
    			console.log(res);
    			if (res.success) {
    				location.reload();
    			}else{
    				alert(res.message);
    			}
    		}
    	})
    })
})