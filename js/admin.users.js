$(document).ready(function () {
	//
	//"use strict";

	window.serverURL = "http://localhost/inventarium/ws/";

	getUsers(); //used to populate the tables

	//------------------------------   Methods ----------------------------------\\

	// Populate Tables function to get users and specific data. 
	function getUsers() {
		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({ op: 7 }),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {

				if (data == -1)
					alert("Data couldn't be loaded!");
				else {
					data = JSON.parse(xhr.responseText);
					populateUsers(data);
				}
			},
			error: function (xhr, status, errorThrown) {
				alert(status + errorThrown);
			}
		});

	}


	// function to insert data got by getusers(), to append it to a table. 
	function populateUsers(data) {

		if (data.length > 0) {

			$("#tbody_users").empty();



			$.each(data, function (index, row) {

				var btn_status_text = "";

				if (row.user_status == 0) {

					btn_status_text = "Enable";
				}
				else
					btn_status_text = "Disable";

				$("#tbody_users").append("<tr><td>" + row.user_name + "</td><td>" + row.emp_name + "</td><td id='" + row.user_type_id + "'>" + row.user_type_name + "</td><td>" + check_status(row.user_status) + "</td><td><button id='updt" + row.user_id + "'  class='btn_modal_edituser' type='button' class='btn btn-primary' data-toggle='modal' data-target='#editusermodal'>Edit User</button><button value='" + row.user_status + "' id='tog" + row.user_id + "' class='btntoggleact'> " + btn_status_text + " </button></td></tr>");

			});

		}

	}


	//Check status to deactivate or activate users
	function check_status(statusval) {
		if (statusval == 1) {

			return "Active";
		}
		else {
			return "Inactive";
		}
	}

	// Toggle User's status.
	$(document).on("click", ".btntoggleact", function () {
		var status_val = $(this).parent().siblings().eq(3);
		var btn_id = $(this).attr('id');
		var btn_nid = btn_id.substr(3, btn_id.length);
		var btn = $(this);
		toggle_user(status_val, btn_nid, btn);

	})

	function toggle_user(status_value, user_id, btn) {


		var finalStatus;
		if (btn.val() == 1) {
			finalStatus = 0;
			btn.text("Enable");
		} else {
			finalStatus = 1;
			btn.text("Disable");
		}

		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({
				op: 5,
				u_id: user_id,
				val: finalStatus
			}),
			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {


				if (data == 0) {
					status_value.text(check_status(finalStatus));
					btn.val(finalStatus);
				} else {
					data = JSON.parse(xhr.responseText);
				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});

	}

	// create users btn 
	$(document).on("click", "#btn_create_user", function () {
		var u_emp_id = $("#cuser_emp_id").val();
		var username = $("#new_usrname").val();
		var cusers_type = $("#cuser_type").val();
		var cpwd = $("#new_password").val();
		var npwd = $("#confirm_password").val();
		if (fieldval(u_emp_id, username, cpwd, npwd, cusers_type) && checkpwd(cpwd, npwd)) {

			create_user(u_emp_id, username, cpwd, cusers_type);
		}
		else alert("error");

	})




	//Create users funciton 
	function create_user(emp_id, username, pwd, user_type) {
		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({
				op: 3,
				user_emp_id: emp_id,
				user_name: username,
				user_pwd: pwd,
				user_type: user_type

			}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {
				//		  		 $("#loadingImg").hide();				  

				if (data != -1) {
					alert("Successful");
					getUsers();
				}
				else {
					data = JSON.parse(xhr.responseText);

				}
			},
			error: function (xhr, status, errorThrown) {
				//				 $("#loadingImg").hide();				  
				alert(status + errorThrown);
			}
		});
	}

	//Populate drop down employee

	$(document).on("click", "#btn_modal_cusers", function () {
		$("#emp_id").empty();
		$("#user_type").empty();
		$("#new_usrname").val("");
		$("#new_password").val("");
		$("#confirm_password").val("");
		popemps();
		popUsertype();
		$("#cuser_type").val("");
		$("#cuser_emp_id").val("");
	});

	$("#user_type").change(function () {

		var change_user = $(this).children("option:selected").val();
		$("#cuser_type").val(change_user);
	})

	$("#emp_id").change(function () {

		var change_user = $(this).children("option:selected").val();
		$("#cuser_emp_id").val(change_user);
	})

	// check password 
	function checkpwd(pwd, confirm_pwd) {
		if (pwd == confirm_pwd)
			return true;
		else
			return false;
	};
	// validate fields 
	function fieldval(emp, username, pwd, cpwd, usertype) {

		if (emp == "" && username == "" && pwd == "" && cpwd == "" && usertype == "")
			return false;
		else
			return true;
	}

	// populate employees 
	function popemps() {


		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({
				op: 9
			}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {


				if (data == 0)
					alert("No results");

				else {
					data = JSON.parse(xhr.responseText);
					parseempcb(data);
				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});
	}

	function parseempcb(data) {
		$("#emp_id").append('<option value="" disabled selected>Select an employee</option>')
		$.each(data, function (index, row) {
			$("#emp_id").append('<option value="' + row.emp_id + '">' + row.emp_name + " " + row.emp_lname + '</option>');
		});

	}




	//Populate drop down user types
	function popUsertype() {


		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({
				op: 10
			}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {


				if (data == 0)
					alert("No results");

				else {
					data = JSON.parse(xhr.responseText);
					parseUsertype(data);
				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});
	}

	function parseUsertype(data) {
		$("#user_type").append('<option value="" disabled selected>Select an type</option>')
		$.each(data, function (index, row) {
			$("#user_type").append('<option value="' + row.user_type_id + '">' + row.user_type_name + '</option>');
		});

	}

	// edit user

	$(document).on("click", ".btn_modal_edituser", function () {
		$("#updt_user_type").empty();
		$("#updt_usrname").val( $(this).parent().siblings().eq(0).text());
		var btn_id = $(this).attr('id');
		var btn_nid = btn_id.substr(4, btn_id.length);
		$("#updt_user_id").val(btn_nid);
		var act_type = $(this).parent().siblings().eq(2);
		$("#updt_user_type_tb").val(act_type.attr('id'));
		edpopUsertype(act_type)
	})
	//Populate drop down user types
	function edpopUsertype(user_act_type) {
		var utypeact_id = user_act_type.attr('id');
		var utypeact_text = user_act_type.text();

		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({
				op: 10
			}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {


				if (data == 0)
					alert("No results");

				else {
					data = JSON.parse(xhr.responseText);
					parseedUsertype(data, utypeact_id, utypeact_text);
				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});
	}

	function parseedUsertype(data, utype_id, utype_text) {
		$("#updt_user_type").append('<option value=' + utype_id + ' disabled selected>' + utype_text + '</option>')
		$.each(data, function (index, row) {
			$("#updt_user_type").append('<option value="' + row.user_type_id + '">' + row.user_type_name + '</option>');
		});

	}

	$("#updt_user_type").change(function () {

		var change_user = $(this).children("option:selected").val();
		$("#updt_user_type_tb").val(change_user);
	})




});
