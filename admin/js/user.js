$(function () {
	/**
	 * 获取用户信息
	 */
	
	$.ajax({
		url: '/user/queryUser',
		type: 'GET',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function (res) {
			console.log(res);
			var html = template('userTpl', res);
			$('#user-box').html(html);
		}
	})

	/**
	 * 用户状态管理
	 */
	$('#user-box').on('click', '.edit-btn', function () {
		var isDelete = $(this).attr('data-isdelete');
		console.log(isDelete);
		var id = $(this).attr('data-id');
		$.ajax({
			url: '/user/updateUser',
			type: 'POST',
			data: {
				id: id,
				isDelete: Number(isDelete) ? 0 : 1
			},
			success: function (res) {
				if (res.success) {
					location.reload();
				}
			}
		})
	})
})