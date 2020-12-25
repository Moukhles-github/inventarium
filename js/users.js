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

				$("#tbody_users").append("<tr><td>" + row.user_name + "</td><td>" + row.emp_name + "</td><td>" + row.user_type_name + "</td><td>" + check_status(row.user_status) + "</td><td><button id='btnupdate'> Update </button><button value='" + row.user_status + "' id='tog" + row.user_id + "' class='btntoggleact'> " + btn_status_text + " </button></td></tr>");

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





	//Create users
	function create_user (emp_id, username, pwd, user_type)
	{
		
	}

	//Populate drop down employee

	$(document).on("click", "#btn_modal_cusers", function(){
			$("#emp_id").empty();
			$("#user_type").empty();
			popemps();
			popUsertype();



	});

	$("#user_type").change(function(){
		$("#user_type").empty();
		var  = $(this).children("option:selected").val();
		$(".crurank").val(rankval);
})



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
			$("#emp_id").append('<option value="' + row.emp_id + '">' + row.emp_name +" "+row.emp_lname+ '</option>');
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
			$("#user_type").append('<option value="' + row.user_type_id + '">' + row.user_type_name+ '</option>');
		});

	}
});
