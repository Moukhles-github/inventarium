$(document).ready(function () {

	//call the set values function to automaticaly select values
	setValues();
	
	//set sort and sow values from pre set values
	function setValues()
	{
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);
		//set selected
		//$("#sortorder option[value="+sortOrder+"]").attr('selected', 'selected');
		
		
		var showOrdersId = $(".showlisthidden").attr('id');
		var showOrder = showOrdersId.substring(4);
		//set selected option for showing order
		$("#showbystatus option[value="+showOrder+"]").attr('selected', 'selected');

        countpages(wsKeyword(), wsOrder(), wsShowOrders(), wsStartDate(), wsEndDate() , $("#rqstmgrid").val());
    }

    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////
	function wsKeyword()
	{
		return $(".searchbar").val();
	}
	
	function wsOrder()
	{
		//return $("#sortorder").val();
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);
		
		return sortOrder;
	}
	
	function wsRank()
	{
		return $("#rankorder").val();
	}
	
	function wsShowOrders()
	{
		return $("#showbystatus").val();
	}
	
		
	function wsStartDate()
	{
		return $("#startdate").val();
	}
	
	function wsEndDate()
	{
		return $("#enddate").val();
	}
	
	
	function wsWorkstation()
	{
		return $("#workstationorder").val();
    }
    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////

    
        

//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////

	
		
	//count pages
	function countpages(key, sort, show, sdate, edate, mgrID)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 23, key : key, sort : sort, show : show, sdate : sdate, edate : edate, mgrID:mgrID}),
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("Couldn't get your request");
                }
                else
                {
                    displayPages(data);
                }
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert(status +" "+ errorThrown);				  
            }
        });
    }

    //display pages function
    function displayPages(numberOfPages)
    {
        var link = "whsmgr.rqst.php?key="+wsKeyword()+"&sort="+wsOrder()+"&show="+wsShowOrders()+"&rank="+wsRank()+"&sdate="+wsStartDate()+"&edate="+wsEndDate()+"&wrks="+wsWorkstation()+"&";
        //used for disabling item and set next and previous indexes
        var disabledatstart = "";
        var disabledatend = " ";

        var disabledlinkstart = "";
        var disabledlinkend = "";

        //if there is no pages
        if(numberOfPages < 1)
            {
                $(".tbody_users").children().remove();
                $(".tbody_users").append('<h5>No result found!</h5>');
            }
        //if there is pages
        else
            {
                var i;
                var curentpage = $(".page-item").attr('id');
                var pagesToAppend = "";
                //next and prev pages
                var previousIndex = parseInt(curentpage) - 1;
                var nextIndex = parseInt(curentpage) + 1;
                
                //remove existing
                $(".pagination").children().remove();
                //check if the curent page is the first or the last page
                if(curentpage == 1)
                {
                    disabledatstart = " disabled";
                    disabledlinkstart = "";
                }
                else
                {
                    disabledlinkstart = "href='"+link;
                }

                if (curentpage == numberOfPages)
                {
                    disabledatend = " disabled";
                    disabledlinkend = "";
                }
                else
                {
                    disabledlinkend = "href='"+link;
                }
                        
                //append the first and the previous page 
                pagesToAppend +="<li class='page-item"+disabledatstart+"' id='first'><a class='page-link' "+disabledlinkstart+"page=1'>First</a></li>";
                pagesToAppend +="<li class='page-item"+disabledatstart+"' id='previous'><a class='page-link' "+disabledlinkstart+"page="+previousIndex+"'>Previous</a></li>";
                
                //check if the number of pages is smaller than the max that can be displayed
                if(numberOfPages <= 3)
                {
                    for (i = 1; i <= numberOfPages; i++)
                    {
                        if(i == curentpage)
                        {
                            pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                        }
                        else
                        {
                            pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                        }
                    }
                }
                else //number of pages bigger than 3
                {
                    //condition if current page is equal to 1 so it display only the first 3 pages
                    if(curentpage == 1)
                    {
                        for (i = 1; i <= 3; i++)
                        {
                            if(i == curentpage)
                            {
                                pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                            }
                            else
                            {
                                pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                            }
                        }
                    }
                    //condition if current page is bigger or equal to last 3  pages
                    else if(curentpage == numberOfPages)
                    {
                        for (i = numberOfPages - 2; i <= numberOfPages; i++)
                        {
                            if(i == curentpage)
                            {
                                pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                            }
                            else
                            {
                                pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                            }
                        }
                    }
                    //condition if current page is between last and first
                    else
                    {
                        for (i = parseInt(curentpage) - 1; i <= parseInt(curentpage) + 1; i++)
                        {
                            if(i == curentpage)
                            {
                                pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                            }
                            else
                            {
                                pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                            }
                        }
                    }
                }

                
                //append the last and the next page
                pagesToAppend +="<li class='page-item"+disabledatend+"' id='next'><a class='page-link' "+disabledlinkend+"page="+nextIndex+"'>Next</a></li>";
                pagesToAppend +="<li class='page-item"+disabledatend+"' id='last'><a class='page-link' "+disabledlinkend+"page="+numberOfPages+"'>Last</a></li>";
                

                //append to pages list
                $(".pagination").append(pagesToAppend);
                getEmployees(wsKeyword(), wsOrder(), wsShowOrders(), wsStartDate(), wsEndDate(), curentpage, $("#rqstmgrid").val());
            }
    }

    //Populate items
	function getEmployees(key, sort, show, sdate, edate, page, mgrID)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 24, key : key, sort : sort, show : show, sdate : sdate, edate : edate, page: page, mgrID:mgrID}),
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr)
            {
                if(data < 0)
                {
                    alert("Couldn't get your request");
                }
                else
                {
                    displayEmployees(data);
                }
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert(status +" "+ errorThrown);				  
            }
        });
    }

    function displayEmployees(data)
    {
        if(data == 0)
            {
                $('.tbody_users').children().remove();
                $('.tbody_users').children().append('<h5>No orders found</h5>');
            }
        else
            {
                $.each(data, function(index, row){
                    $("#tbody_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.user_name + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'>More info</button></td></tr>");
                });
            }
		
		getCompanies();
    }
	
	function convertStatusToText(status)
	{
		if(status == 1)
			{
				return "Active";
			}
		else
			{
				return "Unactive";
			}
	}


//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() +"&sdate="+wsStartDate()+"&edate="+wsEndDate()+ "&page=1");
    });
	
	///////////////////////////////////////////dortint header///////////////////////////
	$("#datesortheader").click(function(){
		var sortorder = $(this).attr('value');
		if(sortorder == 1)
			{
				window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&sdate="+wsStartDate()+"&edate="+wsEndDate()+ "&page=1");
			}
		else
			{
				window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() +"&sdate="+wsStartDate()+"&edate="+wsEndDate() + "&page=1");
			}
	});
	
	
	

    $("#showbystatus").change(function () {
        window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() +"&sdate="+wsStartDate()+"&edate="+wsEndDate()+ "&page=1");
    });
	
	$("#startdate").change(function(){
		window.location.replace("whsmgr.rqst.php?keyword="+wsKeyword()+"&sort="+wsOrder()+"&show="+wsShowOrders()+"&sdate="+wsStartDate()+"&edate="+wsEndDate()+"&page=1");
	});
	
	$("#enddate").change(function(){
		window.location.replace("whsmgr.rqst.php?keyword="+wsKeyword()+"&sort="+wsOrder()+"&show="+wsShowOrders()+"&sdate="+wsStartDate()+"&edate="+wsEndDate()+"&page=1");
	});
	

    $("#clearfilters").click(function () {
        window.location.replace("whsmgr.rqst.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() +"&sdate="+wsStartDate()+"&edate="+wsEndDate()+ "&page=1");
    });
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //get category function
    // Populate Tables function to get users and specific data. 
    function getrqst() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 1 }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populaterqst(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populaterqst(data) {

        if (data.length > 0) {

            $("#tbody_rqst").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.rqst_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.user_name + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'>More info</button></td></tr>");

            });

        }

    }

    //Check status to deactivate or activate users
    function check_status(statusval) {
        switch (statusval) {
            case '0':
                {
                    return "Waiting";
                }

            case '1':
                {
                    return "accepted";
                }

            case '2':
                {
                    return "handled";
                }

            case '3':
                {
                    return "returned";
                }

            default:
                return "error";

        }
    }
	
    getrqstmgr($("#rqstmgrid").val());
    //get category function
    // Populate Tables function to get users and specific data. 
    function getrqstmgr(mgrid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 3,
                mgr_id: mgrid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populaterqst(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populaterqst(data) {

        if (data.length > 0) {

            $("#tbody_mgr_rqst").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.rqst_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_mgr_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.emp_name + " " + row.emp_lname + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td id='" + row.rqst_status + "'>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'>More info</button></td></tr>");

            });

        }

    }

    //Check status to deactivate or activate users
    function check_status(statusval) {
        switch (statusval) {
            case '-1': 
            {
                return "Canceled"
            }
            case '0':
                {
                    return "Waiting";
                }

            case '1':
                {

                    return "accepted";
                }

            case '2':
                {
                    return "handled";
                }

            case '3':
                {
                    return "returned";
                }

            default:
                return "error";

        }
    }
    function getmorerqst(rqstid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 2,
                rqst_id: rqstid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsemorerqst(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    function parsemorerqst(data) {
        if (data.length > 0) {


            $.each(data, function (index, row) {
                btnstatus(row.rqst_status);
                $("#rqstinfoul").append("<li class='lirqst_id'>" + row.rqst_id + "</li><li>" + row.emp_name + " " + row.emp_lname + "</li><li>" + row.item_label + "</li><li>" + row.wrkst_name + "</li><li>" + row.whs_label + "</li><li>" + row.rqst_date + "</li><li>" + check_status(row.rqst_status) + "</li><li>" + resval(row.rqst_res) + "</li><li>" + retval(row.rqst_ret) + "</li><li>" + accval(row.rqst_res, row.rqst_acc_date) + "</li><li>" + hndlval(row.rqst_handled_date) + "</li><li>" + dndval(row.rqst_denied_date) + "</li><li>" + retdateval(row.rqst_ret, row.rqst_returned_date) + "</li>");

            });

        }
    }


    $(document).on('click', '.btn_modal_inforqst', function () {
        $("#rqstinfoul").empty();
        btn_id = $(this).attr('id');
        rqst_id = btn_id.substr(4, btn_id.length);
        var status = $(this).parent().siblings().eq(5);

        getmorerqst(rqst_id);
        $("#valrqst_id").val(rqst_id);
        $("#valrqst_status").val(status.attr('id'));

    })

    function resval(val) {
        if (val == 1) {
            return "Requires Reservation";
        }
        else {
            return "No Reservation Required";
        }
    }

    function retval(val) {
        if (val == 1) {
            return "Returnable";
        }
        else {
            return "Not Returnable";
        }
    }

    function accval(val, accdate) {
        if (val == 1 && !accdate) {
            return "Not Accepted Yet";
        }
        else if (val == 0) {
            return "No Reservation Needed";
        }
        else {
            return accdate;
        }
    }

    function hndlval(val) {
        if (!val) {
            return "Not handled Yet";
        }
        else {
            return val;
        }
    }

    function dndval(val) {
        if (!val) {
            return "Not Denied";
        }
        else {
            return val;
        }
    }

    function retdateval(val, retval) {
        if (!val && retval == 1) {
            return "Not returned Yet"
        }
        else if (val == "" && retval == 0) {
            return "-"
        }
        else {
            return val;
        }

    }

    function handlerval(val) {
        if (!val) {
            return "Not Handled Yet";
        }
        else {
            return val;
        }
    }

    function returnerval(val) {
        if (!val) {
            return "Not Returned Yet";
        }
        else {
            return val;
        }
    }

    function btnstatus(status) {
        switch (status) {
            case '-1':
            {
                $("#btnaccept").hide();
                $("#btnhandle").hide();
                $("#btnreturn").hide();
                $("#btncancel").hide();
            }
            break;
            case '0':
                {
                    $("#btnaccept").show();
                    $("#btnhandle").hide();
                    $("#btnreturn").hide();
                    $("#btncancel").show();

                }
                break;
            case '1':
                {
                    $("#btnhandle").show();
                    $("#btncancel").show();
                    $("#btnaccept").hide();
                    $("#btnreturn").hide();
                }
                break;
            case '2':
                {
                    $("#btnaccept").hide();
                    $("#btnhandle").hide();
                    $("#btncancel").hide();
                }
                break;
            case '3':
                {
                    $("#btnaccept").hide();
                    $("#btnhandle").hide();
                    $("#btnreturn").hide();
                    $("#btncancel").hide();
                }

            default:
                {
                    return "no status available";
                }
        }
    }

    ////////// RFID REading //////////////////////////////////////////////////
    interval = null;
    // setInterval(ArduinoCall, 1000);


    function ArduinoCall() {
        $.ajax({
            type: 'GET',
            url: "./ws/arduino_interface.php",
            data: ({ op: 1 }),
            dataType: 'json',
            timeout: 800,
            success: function (data, textStatus, xhr) {
                if (data != 0 && data != "0") {
                    $("#rfidval").val(data);
                    alertfadein();
                }
            },
            error: function (xhr, status, errorThrown) {
                // Do nothing
            }
        });
    }

    //add review alert
    function alertfadein() {
        var alert = $("#masteralert");
        alert.fadeIn(500);
        alert.delay(300);
        alert.fadeOut(500);
    }

    $("#btnhandle").click(function () {
        $(".backgroundhd").css('display', 'block');
        interval = 1;
        if (interval == !null) {
            interval = setInterval(ArduinoCall, 1000);
        }

    })

    $("#btnreturn").click(function () {
        $(".backgroundhd").css('display', 'block');
        interval = 1;
        if (interval == !null) {
            interval = setInterval(ArduinoCall, 1000);
        }

    })

    $('.closereader').click(function () {
        $('.backgroundhd').css('display', 'none');
        window.clearInterval(interval);
        interval = null;
    })



    // populate employee rfid
    function getemprfid(rfid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({
                op: 6,
                emp_rfid: rfid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populateempinfo(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    function populateempinfo(data) {
        if (data.length > 0) {

            $.each(data, function (index, row) {

                $("#empinfo").append("<li>" + row.emp_name + " " + row.emp_lname + "</li><li>" + row.cmp_name + "</li><li>" + row.wrkst_name + "</li><li>" + row.emp_rank_name + "</li><button id='emp" + row.emp_id + "' class='btnconfirm'>Confirm</button>");
            });

        }
    }

    $("#Getinfoscan").click(function () {

        var rfid = $("#rfidval").val();
        window.clearInterval(interval);
        interval = null;

        getemprfid(rfid);
    })

    $(document).on('click', '.btnconfirm', function () {

        var btn = $(this).attr('id');
        var emp_id = btn.substr(3, btn.length);
        var rqst_id = $("#valrqst_id").val();
        var status = $("#valrqst_status").val();
        if (status == 1) {
            handleitem(rqst_id, emp_id);
        }else if(status == 2)
        {
            returnitem(rqst_id, emp_id);
        }
    })

    function handleitem(rqstid, empid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 7,
                rqst_id: rqstid,
                emp_id: empid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("item handled");
                    window.location.reload();
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    function returnitem(rqstid, empid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 10,
                rqst_id: rqstid,
                emp_id: empid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("item returned");
                    window.location.reload();
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    /////// accept item \\\\\\\\\

    $("#btnaccept").click(function(){
        var rqstid = $(this).siblings('ul').children().siblings().eq(0).text();
        acceptitem(rqstid);
        
    });


    function acceptitem(rqstid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 8,
                rqst_id: rqstid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("item accepted");
                    window.location.reload();
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    /////// cancel item \\\\\\\\\\\\\

    $("#btncancel").click(function(){
        var rqstid = $(this).siblings('ul').children().siblings().eq(0).text();
        cancelitem(rqstid);

    })

    
    
    function cancelitem(rqstid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 9,
                rqst_id: rqstid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("item canceled");
                    window.location.reload();
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }



    ////////////////////////////   Express Request \\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function getwrkst()
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({
                op: 11

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsexpwrkst(data);
                    
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    function parsexpwrkst(data) {
		$("#crt_exp_wrkst").append('<option value="" disabled selected>Select a workstation</option>')
		$.each(data, function (index, row) {
			$("#crt_exp_wrkst").append('<option value="' + row.wrkst_id + '">' + row.wrkst_name + '</option>');
		})
    }

    $("#crt_exp_wrkst").change(function(){
        $("#exp_wrkst").val($("#crt_exp_wrkst").val());
    })

    function getitemtype()
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({
                op: 1

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsexpitemtype(data);
                    
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }


    function parsexpitemtype(data){
        
            $("#crt_exp_itemtype").append('<option value="" disabled selected>Select an item type</option>')
            $.each(data, function (index, row) {
                $("#crt_exp_itemtype").append('<option value="' + row.item_type_id + '">' + row.item_type_name + '</option>');
            })
    }


    function getitem(mgr, itemtype)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({
                op: 7,
                mgr_id: mgr, 
                type_id: itemtype
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsexpitem(data);
                    
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }

    function parsexpitem(data)
    {   
        $.each(data, function (index, row) {
           
            $("#crt_exp_item").append('<option id="'+row.item_returnable+'" value="' + row.item_id + '">' + row.item_name +" "+ row.item_label + '</option>');
        })
    }

    $("#crt_exp_item").change(function(){
        var change_user = $(this).children("option:selected").val();
		$("#exp_item").val(change_user);
        var ret = $(this).children("option:selected").attr('id');
        $("#exp_ret").val(ret);
        
    })

    $("#crt_exp_itemtype").change(function(){
        var change_user = $(this).children("option:selected").val();
		$("#exp_itemtype").val(change_user);
        var mgrid = $("#rqstmgrid").val();
        getitem(mgrid, change_user);

    })

    $("#btn_exp_rqst").click(function(){
        var user = $("#rqstmgrid").val();
        var itemtype = $("#exp_itemtype").val();
        var item = $("#exp_item").val();
        var wrkst = $("#exp_wrkst").val();
        var ret = $("#exp_ret").val();


        if(checkfieldsexp(user, itemtype, item, wrkst, ret))
        {
            
        }
        else 
        {
            alert("error");
        }

    })

    function crtexprqst(userid, itemtype, item, wrkst, ret)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 16,
                user_id: userid, 
                item_id: item,
                wrkst_id: wrkst, 
                ret:ret 

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsexpitem(data);
                    
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }




    $("#exprqst").click(function(){
        getitemtype();
        getwrkst();


    })

    function checkfieldsexp(userid, itemtype, item, wrkst, ret)
    {
        if(userid == "" || itemtype == "" || item == "" || wrkst == "" || ret == "")
        {
            return false; 
        }
        else 
        {
            return true; 
        }
    }


})

