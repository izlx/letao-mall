/*登录拦截*/
$.ajax({
	url: '/employee/checkRootLogin',
	type: 'GET',
	async: false,
	success: function (res) {
		if (res.error && res.error == '400') {
			location.href = 'login.html';
		}
	}
})

$(function(){
	// 退出
	$('.login_out_bot').on('click', function () {
		if (confirm('确定要推出吗？')) {
			$.ajax({
				url: '/employee/employeeLogout',
				type: 'GET',
				success: function (res) {
					if (res.success) {
						location.href = 'login.html';
					}else{
						alert('res.message');
					}
				}
			})
		}
	})




















	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});