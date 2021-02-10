$(document).ready(function () {


	// Login Action button
	$("#btnlogin").click(function () {

		var uname = $("#username").val();
		var pwd = $("#pwd").val();
		
		if(checkfields(uname, pwd))
		{
		getLogin(uname, pwd);
		}
		else 
		{
			$("#empty").show();
		}
	});

	//AJAX login function 
	function getLogin(uval, pval) {
		$("#loading").show();
		$("#empty").hide();
		$("#wrong").hide();
		$("#field").hide();
		setTimeout(function () {
			$.ajax({
				type: 'GET',
				url: "ws/ws_users.php",
				data: ({ op: 1, uname: uval, upwd: pval }),

				dataType: 'json',
				timeout: 5000,
				success: function (data, textStatus, xhr) {

					if (data == -1)
						$("#loading").hide();
						

					else {
						data = JSON.parse(xhr.responseText);
						parseDataLogin(data);
						$("#loading").hide();

					}
				},
				error: function (xhr, status, errorThrown) {
					$("#loading").hide();
					alert(status + errorThrown);
				}
			});
		}, 1000)

	}

	//Check if fields empty
	function checkfields(username, pwd)
	{
		if(username == "" || pwd == "")
		{
			return false; 
		}
		else 
		{
			return true; 
		}
	}

	//////////////////////////////////////////////////////////////////////
	//parse data from login 
	function parseDataLogin(data) {
		switch (data) {
			case "0":
				window.location.href = "./admin.php";
				break;
			case "1":
				window.location.href = "./whsmgr.dash.php";
				break;
			case "2":
				$("#field").show();
				break;
			default:
				$("#wrong").show();
				break;
		}
		return;
	}

	//	//////////////////////////////////////////////////////////////////////




});






