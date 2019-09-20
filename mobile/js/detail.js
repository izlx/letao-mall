$(function () {
	var id = getParamsByUrl(location.href, 'id');
	var kuchunNum = null;
	var size = null;
	var productId = 0;
	$.ajax({
		url: '/product/queryProductDetail',
		type: 'GET',
		data: {
			id: id
		},
		success: function (res) {
			console.log(res);
			kuchunNum = res.num;
			productId = res.id;
			var html = template('productTpl', res);
			$('#product-box').html(html);
			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider();
		}
	})

	$('#product-box').on('tap', '.size span', function () {
		$(this).addClass('active').siblings('span').removeClass('active');
		size = $(this).html();
	})

	var oInp = $('#inp');
	$('#increase').on('tap', function () {
		var num = oInp.val();
		num++;
		if (num > kuchunNum) {
			num = kuchunNum;
		}
		oInp.val(num);
	})

	$('#reduce').on('tap', function () {
		var num = oInp.val();
		num--;
		if (num < 0) {
			num = 0;
		}
		oInp.val(num);
	})

	$('#addCart').on('tap', function () {
		if (!size) {
			alert('请选择尺码');
			return;
		}

		$.ajax({
			url: '/cart/addCart',
			type: 'POST',
			data: {
				productId: productId,
				num: kuchunNum,
				size: size
			},
			success: function (res){
				console.log(res);
				if (res.success) {
					mui.confirm('加入购物车成功，跳转到购物车？', function (message) {
						if (message.index) {
							// 跳转到购物车
							location.href = "cart.html";
						}
					})
				}
			}
		})
	})
})