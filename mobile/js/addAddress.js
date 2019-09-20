$(function () {
	var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));
	if (isEdit) {
		// 编辑操作
		if (localStorage.getItem("editAddress")) {
			var address = JSON.parse(localStorage.getItem("editAddress"));
			var html = template('editTpl',address);
			$('#editForm').html(html);
		}
	}else{
		// 添加操作
		var html = template('editTpl',{});
		$('#editForm').html(html);
	}
	var picker = new mui.PopPicker({layer:3}); 
	picker.setData(cityData);
	$('#selectCity').on('tap', function () {
		 picker.show(function (selectItems) {
		 	$('#selectCity').val(selectItems[0].text+selectItems[1].text+selectItems[2].text);
		 });
	}) 

	$('#confirm-btn').on('tap', function () {
		var userName = $.trim($('[name = "userName"]').val());
		var postCode = $.trim($('[name = "postCode"]').val());
		var city = $.trim($('[name = "city"]').val());
		var detail = $.trim($('[name = "detail"]').val());

		if (!userName) {
			mui.toast('请输入姓名');
			return;
		}
		if (!postCode) {
			mui.toast('请输入邮编');
			return;
		}

		var data = {
			address: city,
			addressDetail: detail,
			recipients: userName,
			postcode: postCode 
		}
		if (isEdit) {
			// 编辑操作
			var url = '/address/updateAddress';
			data.id = address.id;
		}else{
			// 添加操作
			var url = '/address/addAddress';
		}
		$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function (res){
				if (isEdit) {
					mui.toast('地址修改成功');
				}else{
					mui.toast('地址添加成功');
				}
				
				setTimeout(function () {
					location.href = 'address.html';
				},1000)
			}
		})
	})
})