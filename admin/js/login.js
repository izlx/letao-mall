$.ajax({
	url: '/employee/checkRootLogin',
	type: 'GET',
	async: false,
	success: function (res) {
		if (res.success) {
			location.href = 'user.html';
		}
	}
})

/*登录*/
$(function () {
	$('#login-btn').on('click', function () {
		var username = $.trim($('[name="username"]').val());
		var password = $.trim($('[name="password"]').val());
		if (!username) {
			alert('请输入用户名');
			return;
		}

		if (!password) {
			alert('请输入密码');
			return;
		}

		$.ajax({
			url: '/employee/employeeLogin',
			type: 'POST',
			data: {
				username: username,
				password: password
			},
			success: function (res){
				if (res.success) {
					location.href = 'user.html';
				}else{
					alert(res.message);
				}
			}
		})
	})
})