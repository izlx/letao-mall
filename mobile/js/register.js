// 当html页面加载完以后
$(function() {
	/**
	 * 注册
	 * 1.给注册按钮添加点击事件
	 * 2.获取到用户信息
	 * 3.对用户输入的信息做验证
	 * 4.调用注册接口 实现注册功能
	 * 5.给出提示 告诉用户是否注册成功
	 * 6.跳转到登录页面
	 */
	$('#register-btn').on('click', function () {
		var username = $.trim($('[name = "username"]').val());
		var mobile = $.trim($('[name = "mobile"]').val());
		var password = $.trim($('[name = "password"]').val());
		var againPass = $.trim($('[name = "againPass"]').val());
		var vCode = $.trim($('[name = "vCode"]').val());
		if (!username) {
			mui.toast('请输入用户名');
			return;
		}
		if (mobile.length != 11) {
			mui.toast('请输入合法手机号');
			return;
		}
		if (password != againPass) {
			mui.toast('两次密码输入不一致');
			return;
		}
		if (!vCode || vCode.length != 6) {
			mui.toast('请输入合法的认证码');
			return;
		}

		$.ajax({
			url: '/user/register',
			type: 'POST',
			data: {
				username: username,
				password: password,
				mobile: mobile,
				vCode: vCode
			},
			beforeSend: function () {
				$('#login-btn').html('正在注册...');
			},
			success: function (res) {
				mui.toast('注册成功');
				$('#login-btn').html('注册成功');
				setTimeout(function () {
					location.href = 'login.html';
				},1000);
			}
		})
	})

	/**
	 * 获取验证码
	 * 1.给获取验证码按钮添加点击事件
	 * 2.调用接口获取认证码
	 * 3.将认证码输出到控制台
	 */
	$('#getCode').on('click', function () {
		$.ajax({
			url:'/user/vCode',
			type: 'GET',
			success: function (res) {
				alert(res.vCode)
			}
		})
	})
}) 