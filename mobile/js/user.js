// 保存用户信息
var userInfo = null;
$.ajax({
	url: '/user/queryUserMessage',
	type: 'GET',
	// 同步
	async: false,
	success: function (res) {
		if (res.error && res.error == 400) {
			location.href = 'login.html';
		}
		userInfo = res;
	}
})
$(function () {
	/**
	 * 退出登录
	 * 1.获取到退出登录按钮并添加点击事件
	 * 2.调用退出登录接口实现 退出登录
	 * 3.如果退出成功 跳转到首页
	 */
	$('#logout').on('click', function () {
		$.ajax({
			url: '/user/logout',
			type: 'GET',
			success: function (res) {
				if (res.success) {
					mui.toast('退出登录成功');
					setTimeout(function () {
						location.href = 'index.html';
					},1000)
				}
			}
		})
	})
	var html = template('userTpl', userInfo);
	$('#userInfoBox').html(html);
})