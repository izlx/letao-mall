$(function () {
	var address = null;
	$.ajax({
		url: '/address/queryAddress',
		type: 'GET',
		success: function (res) {
			address = res;
			var html = template('addressTpl', {result: res});
			$('#address-box').html(html);
		}
	})

	$('#address-box').on('tap', '.delete-btn', function () {
		var id = this.getAttribute('data-id');
		var li = this.parentNode.parentNode;
		console.log(li);
		mui.confirm('确定要删除吗？', function (message) {
			// 确认删除
			if (message.index == 1) {
				$.ajax({
					url: '/address/deleteAddress',
					type: 'POST',
					data: {
						id: id
					},
					success: function (res) {
						if (res.success) {
							location.reload();
						}
					}
				})
			}else{
			// 取消删除
				mui.swipeoutClose(li);
			}
		})
	})

	$('#address-box').on('tap', '.edit-btn', function () {
		var id = this.getAttribute('data-id');
		for (var i = 0; i < address.length; i++) {
			if (address[i].id == id) {
				localStorage.setItem('editAddress', JSON.stringify(address[i]));
				break;
			}
		}
		// 跳转到编辑页面
		location.href = "addAddress.html?isEdit=1";
	})
})