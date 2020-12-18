$(document).ready(function () {

	$("#btnlogin").click(function () {

		var uname = $("#username").val();
		var pwd = $("#pwd").val();

		getLogin(uname, pwd);

	});

	//this function is login to db using ajax
	function getLogin(uval, pval) {

		$.ajax({
			type: 'GET',
			url: "ws/ws_users.php",
			data: ({ op: 1, uname: uval, upwd: pval }),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {
				if (data == -1)
					alert("Data couldn't be loaded!");
				else {
					data = JSON.parse(xhr.responseText);
					parseDataLogin(data);
				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});

	}

	//////////////////////////////////////////////////////////////////////
	//parse data from login
	function parseDataLogin(data) {
		switch (data) {
			case "0":
				alert(data);
				window.location.href="http://localhost/Inventarium/admin.php";
				break;
			case "1":
				alert ("sexes");
				break;
			case "2":
				alert("sexes");
				break;
			default:
				alert("wrong shit");
				break;
		}
	}

	//	//////////////////////////////////////////////////////////////////////







});






