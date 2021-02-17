$(document).ready(function () {
	//
	//"use strict";

	window.serverURL = "http://localhost/inventarium/ws/";


	//call the set values function to automaticaly select values
	setValues();

	//set sort and sow values from pre set values
	function setValues() {
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);
		//set selected
		//$("#sortorder option[value=" + sortOrder + "]").attr('selected', 'selected');


		var showOrdersId = $(".showlisthidden").attr('id');
		var showOrder = showOrdersId.substring(4);
		//set selected option for showing order
		$("#showbystatus option[value=" + showOrder + "]").attr('selected', 'selected');

		getRanks();
	}


	////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////
	function wsKeyword() {
		return $(".searchbar").val();
	}

	function wsOrder() {
		//return $("#sortorder").val();
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);

		return sortOrder;
	}

	function wsRank() {
		return $("#rankorder").val();
	}

	function wsShowOrders() {
		return $("#showbystatus").val();
	}
	////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////


	//get category function
	function getRanks() {
		$.ajax({
			type: 'GET',
			url: "ws/ws_user_type.php",
			data: ({ op: 1 }),
			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {
				if (data < 1) {
					alert("No ranks available");
				}
				else {
					populateRanks(data);
				}
			},
			error: function (xhr, status, errorThrown) {
				alert("Error" + status + errorThrown);
			}
		});
	}

	// fill the category functionl
	function populateRanks(data) {
		$.each(data, function (index, row) {
			$("#rankorder").append('<option value="' + row.user_type_id + '">' + row.user_type_name + '</option>');
			$("#emp_rank").append('<option value="' + row.user_type_id + '">' + row.user_type_name + '</option>');
		});

		setRank();
	}


	//set sort and sow values from pre set values
	function setRank() {
		var rankOrderId = $(".rankhidden").attr('id');
		var rankOrder = rankOrderId.substring(4);
		//set selected option for showing order
		$("#rankorder option[value=" + rankOrder + "]").attr('selected', 'selected');

		//automaticaly call the count page function for pagination
		countpages(wsKeyword(), wsOrder(), wsShowOrders(), wsRank());
	}



	//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



	//count pages
	function countpages(key, sort, show, rank, wrks) {
		$.ajax({
			type: 'GET',
			url: "ws/ws_users.php",
			data: ({ op: 11, key: key, sort: sort, show: show, rank: rank }),
			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {
				if (data < 0) {
					alert("Couldn't get your users");
				}
				else {
					displayPages(data);
				}
			},
			error: function (xhr, status, errorThrown) {
				alert(status + " " + errorThrown);
			}
		});
	}

	//display pages function
	function displayPages(numberOfPages) {
		var link = "users.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&";
		//used for disabling item and set next and previous indexes
		var disabledatstart = "";
		var disabledatend = " ";

		var disabledlinkstart = "";
		var disabledlinkend = "";

		//if there is no pages
		if (numberOfPages < 1) {
			$(".tbody_users").children().remove();
			$(".tbody_users").append('<h5>No result found!</h5>');
		}
		//if there is pages
		else {
			var i;
			var curentpage = $(".page-item").attr('id');
			var pagesToAppend = "";
			//next and prev pages
			var previousIndex = parseInt(curentpage) - 1;
			var nextIndex = parseInt(curentpage) + 1;

			//remove existing
			$(".pagination").children().remove();
			//check if the curent page is the first or the last page
			if (curentpage == 1) {
				disabledatstart = " disabled";
				disabledlinkstart = "";
			}
			else {
				disabledlinkstart = "href='" + link;
			}
			if (curentpage == numberOfPages) {
				disabledatend = " disabled";
				disabledlinkend = "";
			}
			else {
				disabledlinkend = "href='" + link;
			}

			//append the first and the previous page 
			pagesToAppend += "<li class='page-item" + disabledatstart + "' id='first'><a class='page-link' " + disabledlinkstart + "page=1'>First</a></li>";
			pagesToAppend += "<li class='page-item" + disabledatstart + "' id='previous'><a class='page-link' " + disabledlinkstart + "page=" + previousIndex + "'>Previous</a></li>";

			//check if the number of pages is smaller than the max that can be displayed
			if (numberOfPages <= 3) {
				for (i = 1; i <= numberOfPages; i++) {
					if (i == curentpage) {
						pagesToAppend += "<li class='page-item disabled' id='" + i + "'><a class='page-link' >" + i + "</a></li>";
					}
					else {
						pagesToAppend += "<li class='page-ite' id='" + i + "'><a class='page-link' href='" + link + "page=" + i + "'>" + i + "</a></li>";
					}
				}
			}
			else //number of pages bigger than 3
			{
				//condition if current page is equal to 1 so it display only the first 3 pages
				if (curentpage == 1) {
					for (i = 1; i <= 3; i++) {
						if (i == curentpage) {
							pagesToAppend += "<li class='page-item disabled' id='" + i + "'><a class='page-link' >" + i + "</a></li>";
						}
						else {
							pagesToAppend += "<li class='page-ite' id='" + i + "'><a class='page-link' href='" + link + "page=" + i + "'>" + i + "</a></li>";
						}
					}
				}
				//condition if current page is bigger or equal to last 3  pages
				else if (curentpage == numberOfPages) {
					for (i = numberOfPages - 2; i <= numberOfPages; i++) {
						if (i == curentpage) {
							pagesToAppend += "<li class='page-item disabled' id='" + i + "'><a class='page-link' >" + i + "</a></li>";
						}
						else {
							pagesToAppend += "<li class='page-ite' id='" + i + "'><a class='page-link' href='" + link + "page=" + i + "'>" + i + "</a></li>";
						}
					}
				}
				//condition if current page is between last and first
				else {
					for (i = parseInt(curentpage) - 1; i <= parseInt(curentpage) + 1; i++) {
						if (i == curentpage) {
							pagesToAppend += "<li class='page-item disabled' id='" + i + "'><a class='page-link' >" + i + "</a></li>";
						}
						else {
							pagesToAppend += "<li class='page-ite' id='" + i + "'><a class='page-link' href='" + link + "page=" + i + "'>" + i + "</a></li>";
						}
					}
				}
			}


			//append the last and the next page
			pagesToAppend += "<li class='page-item" + disabledatend + "' id='next'><a class='page-link' " + disabledlinkend + "page=" + nextIndex + "'>Next</a></li>";
			pagesToAppend += "<li class='page-item" + disabledatend + "' id='last'><a class='page-link' " + disabledlinkend + "page=" + numberOfPages + "'>Last</a></li>";


			//append to pages list
			$(".pagination").append(pagesToAppend);
			getUsers(wsKeyword(), wsOrder(), wsShowOrders(), wsRank(), curentpage);
		}
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



	$("#sortorder").change(function () {
		window.location.replace("users.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
	});

	///////////////////////////////////////////dortint header///////////////////////////
	$("#usernamesortheader").click(function () {
		var sortorder = $(this).attr('value');

		if (sortorder == 1) {
			window.location.replace("users.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
		}
		else {
			window.location.replace("users.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
		}
	});

	$("#namesortheader").click(function () {
		var sortorder = $(this).attr('value');
		if (sortorder == 1) {
			window.location.replace("users.php?key=" + wsKeyword() + "&sort=3" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
		}
		else {
			window.location.replace("users.php?key=" + wsKeyword() + "&sort=4" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
		}
	});




	$("#showbystatus").change(function () {
		window.location.replace("users.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
	});

	$("#rankorder").change(function () {
		window.location.replace("users.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
	});

	$("#workstationorder").change(function () {
		window.location.replace("users.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
	});

	$("#clearfilters").click(function () {
		window.location.replace("users.php?key=&sort=1&show=0&rank=-1&page=1");
	});

	//seachbutton click funtion
	$("#searchbutton").click(function () {
		window.location.replace("users.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&page=1");
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//------------------------------   Methods ----------------------------------\\

	// Populate Tables function to get users and specific data. 
	function getUsers(key, sort, show, rank, page) {
		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({ op: 12, key: key, sort: sort, show: show, rank: rank, page: page }),

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

				$("#tbody_users").append("<tr><td>" + row.user_name + "</td><td>" + row.emp_name + "</td><td id='" + row.user_type_id + "'>" + row.user_type_name + "</td><td>" + check_status(row.user_status) + "</td><td><button id='updt" + row.user_id + "'  class='btn_modal_edituser btn btn-primary'  style='margin-right: 4px;' type='button' data-toggle='modal' data-target='#editusermodal'><i class='fas fa-edit'></i></button><button value='" + row.user_status + "' id='tog" + row.user_id + "' class='btntoggleact btn btn-primary'> " + btn_status_text + " </button><button id='res" + row.user_id + "' style='margin-left: 5px !important;' type='button' class='btn_reset_pwd btn btn-primary' data-toggle='modal' data-target='#resetpwd'>Reset Pass</button></td></tr>");

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
		else {
			$(".modal-content #wrongmsg").show();
			$(".modal-footer #wrong").show();
		}

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

					$(".modal-footer #success").show()
					setTimeout(function () { window.location.reload() }, 1000);
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

	//CREATE USERS 

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
		$(".modal-content #wrongmsg").hide();
		$(".modal-footer #wrong").hide();
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

		if (emp == "" || username == "" || pwd == "" || cpwd == "" || usertype == "")
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
		$("#updt_usrname").val($(this).parent().siblings().eq(0).text());
		var btn_id = $(this).attr('id');
		var btn_nid = btn_id.substr(4, btn_id.length);
		$("#updt_user_id").val(btn_nid);
		var act_type = $(this).parent().siblings().eq(2);
		$("#updt_user_type_tb").val(act_type.attr('id'));
		edpopUsertype(act_type)
		$(".modal-content #wrongmsg").hide();
		$(".modal-footer #wrong").hide();
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

	$(document).on("click", "#btn_edit_user", function () {

		var u_id = $("#updt_user_id").val();

		var u_name = $("#updt_usrname").val();

		var u_type = $("#updt_user_type_tb").val();
		// alert("ss");
		if (updt_fieldval(u_name, u_type)) {
			update_user(u_id, u_name, u_type)
		}
		else {
			$(".modal-content #wrongmsg").show();
			$(".modal-footer #wrong").show();
		}
	})

	function updt_fieldval(username, usertype) {
		if (username == "" || usertype == "") {
			return false;
		}

		else {
			return true;
		}

	}
	function update_user(user_id, username, usertype) {
		$.ajax({
			type: 'GET',
			url: window.serverURL + "ws_users.php",
			data: ({
				op: 4,
				user_id: user_id,
				user_name: username,
				user_type: usertype
			}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {


				if (data != 0)
					alert("No results");

				else {
					$(".modal-footer #success").show()
					data = JSON.parse(xhr.responseText);
					setTimeout(function () { window.location.reload() }, 1000);

				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});
	}


	////// Reset Users password 
	$(document).on("click", ".btn_reset_pwd", function () {
		$("#cnfresetpwd").val("");
		$("#rstpwd").val("");
		$(".modal-content #notmatch").hide();
		$(".modal-content #wrongmsg").hide();
		$(".modal-footer #wrong").hide();
		var userid = $(this).attr('id');
		var usrid = userid.substr(3, userid.length);
		$("#rstuserid").val(usrid);

	})

	$("#btn_reset_pwd").click(function () {
		$(".modal-content #notmatch").hide();
		$(".modal-content #wrongmsg").hide();
		$(".modal-footer #wrong").hide();
		var userid = $("#rstuserid").val();
		var pass = $("#rstpwd").val();
		var cnfpass = $("#cnfresetpwd").val();

		if (pass != "" || cnfpass != "") {

			if (pass == cnfpass) {
				reset_pwd(userid, pass);

			}
			else {
				$(".modal-content #notmatch").show();

			}
		}
		else {
			$(".modal-content #wrongmsg").show();
			$(".modal-footer #wrong").show();
		}

	})




	function reset_pwd(usrid, pwd) {
		$.ajax({
			type: 'GET',
			url: "./ws/ws_users.php",
			data: ({
				op: 17,
				pwd: pwd,
				user_id: usrid

			}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {


				if (data != 0)
					alert("No results");

				else {
					$(".modal-footer #success").show()
					data = JSON.parse(xhr.responseText);

					setTimeout(function () { window.location.reload() }, 1000);

				}
			},
			error: function (xhr, status, errorThrown) {

				alert(status + errorThrown);
			}
		});
	}
});
