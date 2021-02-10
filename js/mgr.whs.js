$(document).ready(function () {

	
	var mgr_id = $("#tbmgrid").val();
	
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

		gettypes();
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

	function wstype() {
		return $("#rankorder").val();
	}

	function wsShowOrders() {
		return $("#showbystatus").val();
	}
	////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////


	//get category function
	function gettypes() {
		$.ajax({
			type: 'GET',
			url: "ws/ws_item_type.php",
			data: ({ op: 1 }),
			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {
				if (data < 1) {
					alert("No types available");
				}
				else {
					populatetypes(data);
				}
			},
			error: function (xhr, status, errorThrown) {
				alert("Error" + status + errorThrown);
			}
		});
	}

	// fill the category functionl
	function populatetypes(data) {
		$.each(data, function (index, row) {
			$("#rankorder").append('<option value="' + row.item_type_id + '">' + row.item_type_name + '</option>');
		});

		settype();
	}


	//set sort and sow values from pre set values
	function settype() {
		var rankOrderId = $(".rankhidden").attr('id');
		var rankOrder = rankOrderId.substring(4);
		//set selected option for showing order
		$("#rankorder option[value=" + rankOrder + "]").attr('selected', 'selected');

		//automaticaly call the count page function for pagination
		countpages(wsKeyword(), wsOrder(), wsShowOrders(), wstype(), mgr_id);
	}





	//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



	//count pages
	function countpages(key, sort, show, type, mgrid) {
		$.ajax({
			type: 'GET',
			url: "ws/ws_item.php",
			data: ({ op: 13, key: key, sort: sort, show: show, type: type , mgrid: mgrid}),
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
		var link = "whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&type=" + wstype() + "&mgr_id="+ mgr_id + "&";
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
			getUsers(wsKeyword(), wsOrder(), wsShowOrders(), wstype(), curentpage, mgr_id);
		}
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



	$("#sortorder").change(function () {
		window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&type=" + wstype() + "&mgrid="+ mgr_id + "&page=1");
	});
	
	///////////////////////////////////////////dortint header///////////////////////////
	$("#itemnamesortheader").click(function(){
		var sortorder = $(this).attr('value');

		if(sortorder == 1)
			{
				window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
			}
		else
			{
				window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
			}
	});
	
	$("#labelsortheader").click(function(){
		var sortorder = $(this).attr('value');
		if(sortorder == 1)
			{
				window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=3" + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
			}
		else
			{
				window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=4" + "&show=" + wsShowOrders() + "&type=" + wstype() + "&mgrid="+ mgr_id + "&page=1");
			}
	});
	
	
	

	$("#showbystatus").change(function () {
		window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
	});

	$("#rankorder").change(function () {
		window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
	});

	$("#workstationorder").change(function () {
		window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
	});

	$("#clearfilters").click(function () {
		window.location.replace("whsmgr.warehouse.php?key=&sort=1&show=0&type=-1&page=1&mgrid="+mgr_id);
	});

	//seachbutton click funtion
	$("#searchbutton").click(function () {
		window.location.replace("whsmgr.warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&type=" + wstype()  + "&mgrid="+ mgr_id + "&page=1");
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//------------------------------   Methods ----------------------------------\\

	// Populate Tables function to get users and specific data. 
	function getUsers(key, sort, show, type, page, mgrid) {
		$.ajax({
			type: 'GET',
			url: "ws/ws_item.php",
			data: ({ op: 14, key: key, sort: sort, show: show, type: type, page: page, mgrid: mgrid}),

			dataType: 'json',
			timeout: 5000,
			success: function (data, textStatus, xhr) {

				if (data == -1)
					alert("Data couldn't be loaded!");
				else {
					data = JSON.parse(xhr.responseText);
					populateitems(data);
				}
			},
			error: function (xhr, status, errorThrown) {
				alert(status + errorThrown);
			}
		});

	}
	
    //getmgritem($("#tbmgrid").val());
    //get category function
    // Populate Tables function to get users and specific data. 
//    function getmgritem(mgrid) {
//        $.ajax({
//            type: 'GET',
//            url: "ws/ws_item.php",
//            data: ({ op: 6, 
//            mgr_id:mgrid
//            
//            }),
//
//            dataType: 'json',
//            timeout: 5000,
//            success: function (data, textStatus, xhr) {
//
//                if (data == -1)
//                    alert("Data couldn't be loaded!");
//                else {
//                    data = JSON.parse(xhr.responseText);
//                    populateitems(data);
//                }
//            },
//            error: function (xhr, status, errorThrown) {
//                alert(status + errorThrown);
//            }
//        });
//
//    }


    // function to insert data got by getusers(), to append it to a table. 
    function populateitems(data) {

        if (data.length > 0) {

            $("#tbody_mgr_whs").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.item_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_mgr_whs").append("<tr><td>" + row.item_name + "</td><td>"+ row.item_label +"</td><td>" + row.item_type_name + "</td><td>"+ item_re(row.item_reserve) +"</td><td>"+ item_re(row.item_returnable) +"</td><td>"+ row.item_lifespan +"</td><td>"+ row.item_entry_date +"</td><td >"+ check_status(row.item_status) +"</td><td><button id='tog"+ row.item_id +"' class='btntoggleact btn btn-primary' value='"+ row.item_status +"'>"+ btn_status_text +"</button></td>");

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

    function item_re(resval) {
        if (resval == 1) {
            return "Yes"
        }
        else {
            return "No"
        }
    }
    $(document).on("click", ".btntoggleact", function () {

        var status_val = $(this).parent().siblings().eq(7);
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(3, btn_id.length);
        var btn = $(this);
        toggle_item(status_val, btn_nid, btn);

    })

    function toggle_item(status_value, item_id, btn) {


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
            url: "ws/ws_item.php",
            data: ({
                op: 2,
                item_id: item_id,
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

})