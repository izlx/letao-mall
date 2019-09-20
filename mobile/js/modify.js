$(function () {
	/**
	 * 修改密码
	 * 1.获取修改密码按钮并添加点击事件
	 * 2.获取用户输入的信息
	 * 3.对用户输入的信息做校验
	 * 4.调用修改密码接口 实现修改密码功能
	 * 5.跳转到登录页面 重新登录
	 */
	$('#modify-btn').on('tap', function () {
		var originPass = $.trim($('[name = "originPass"]').val());
		var newPass = $.trim($('[name = "newPass"]').val());
		var confirmNewPass = $.trim($('[name = "confirmNewPass"]').val());
		var vCode = $.trim($('[name = "vCode"]').val());
		if (!originPass) {
			mui.toast('请输入原密码');
			return;
		}
		if (newPass != confirmNewPass){
			mui.toast('两次密码输入不一致');
			return;
		}

		$.ajax({
			url: '/user/updatePassword',
			type: 'POST',
			data: {
				oldPassword: originPass,
				newPassword: newPass,
				vCode: vCode
			},
			success: function (res) {
				if (res.success) {
					mui.toast('修改密码成功');
					setTimeout(function () {
						location.href = 'login.html'
					},1000)
				}
			}
		})
	})
	/**
	 * 获取认证码
	 */
	$('#getCode').on('tap', function () {
		$.ajax({
			url: '/user/vCode',
			type: 'GET',
			success: function (res) {
				console.log(res.vCode);
			}
		})
	})
})