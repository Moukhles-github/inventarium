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
		
		countpages(wsKeyword(), wsOrder(), wsShowOrders());

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
	
	function wsShowOrders()
	{
		return $("#showbystatus").val();
	}
	
    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////

    
        

//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////

	
		
	//count pages
	function countpages(key, sort, show)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({op : 8, key : key, sort : sort, show : show}),
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("Couldn't get your companies");
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
        var link = "warehouse.php?key="+wsKeyword()+"&sort="+wsOrder()+"&show="+wsShowOrders()+"&";
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
                getEmployees(wsKeyword(), wsOrder(), wsShowOrders(), curentpage);
            }
    }

    //Populate items
	function getEmployees(key, sort, show, page)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({op : 9, key : key, sort : sort, show : show, page: page}),
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr)
            {
                if(data < 0)
                {
                    alert("Couldn't get your employees");
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
                    $("#tbody_whouse").append("<tr><td>" + row.whs_label + "</td><td id='" + row.whs_mgr_id + "'>" + row.emp_name + " " + row.emp_lname + "</td><td>" + row.whs_address + "<td> " + row.whs_date + "</td><td>" + check_status(row.whs_status) + "</td><td><button id='updt" + row.whs_id + "'  class='btn_modal_editwhs btn btn-primary'  style='margin-right: 4px;' type='button' data-toggle='modal' data-target='#editwhousemodal'><i class='fas fa-edit'></i></button><button style='margin-right: 4px;' id='item"+ row.whs_id+"' class='itembtn btn btn-primary'> <i class='fas fa-tools'></i></button><button value='" + row.whs_status + "' id='tog" + row.whs_id + "'  style='margin-right: 4px;' class='btntoggleact btn btn-primary'> Toggle </button></td></tr>");
                });
				
				
            }
    }



//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });
	
	///////////////////////////////////////////dortint header///////////////////////////
	$("#namesortheader").click(function(){
		var sortorder = $(this).attr('value');

		if(sortorder == 1)
			{
				window.location.replace("warehouse.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&page=1");
			}
		else
			{
				window.location.replace("warehouse.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&page=1");
			}
	});
	
	$("#datesortheader").click(function(){
		var sortorder = $(this).attr('value');
		if(sortorder == 1)
			{
				window.location.replace("warehouse.php?key=" + wsKeyword() + "&sort=3" + "&show=" + wsShowOrders() + "&page=1");
			}
		else
			{
				window.location.replace("warehouse.php?key=" + wsKeyword() + "&sort=4" + "&show=" + wsShowOrders() + "&page=1");
			}
	});
	
	
	

    $("#showbystatus").change(function () {
        window.location.replace("warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });
	

    $("#clearfilters").click(function () {
        window.location.replace("warehouse.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("warehouse.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // function to insert data got by getusers(), to append it to a table. 

    //get category function
    // Populate Tables function to get users and specific data. 
    function getwhs() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({ op: 1 }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populatewhs(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populatewhs(data) {

        if (data.length > 0) {

            $("#tbody_whouse").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.whs_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_whouse").append("<tr><td>" + row.whs_label + "</td><td id='" + row.whs_mgr_id + "'>" + row.emp_name + " " + row.emp_lname + "</td><td>" + row.whs_address + "<td> " + row.whs_date + "</td><td>" + check_status(row.whs_status) + "</td><td><button id='updt" + row.whs_id + "'  class='btn_modal_editwhs btn btn-primary'  style='margin-right: 4px;' type='button' data-toggle='modal' data-target='#editwhousemodal'><i class='fas fa-edit'></i></button><button value='" + row.whs_status + "' id='tog" + row.whs_id + "'  style='margin-right: 4px;' class='btntoggleact btn btn-primary'> toggle </button><button style='margin-right: 4px;' id='item"+ row.whs_id+"' class='itembtn btn btn-primary'> <i class='fas fa-tools'></i> </button></td><</tr>");

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

        var status_val = $(this).parent().siblings().eq(4);
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(3, btn_id.length);
        var btn = $(this);
        toggle_whs(status_val, btn_nid, btn);

    })

    function toggle_whs(status_value, whs_id, btn) {


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
            url: "ws/ws_warehouse.php",
            data: ({
                op: 2,
                whs_id: whs_id,
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

    $(document).on("click", "#btn_modal_crt_whs", function () {
        $("#crt_whouse_Label").val("");
        $("#crt_whouse_address").val("");
        $("#crt_whouse_type").empty();
        $("#crt_whouse_mgr").empty();
        $("#crt_whs_mgr_id").val("");
        getwhsmgr();
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();
        
    })


    function getwhsmgr() {

        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({
                op: 4
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == 0)
                    alert("No results");

                else {
                    data = JSON.parse(xhr.responseText);
                    parsewhsmgr(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parsewhsmgr(data) {
        $("#crt_whouse_mgr").append('<option value="" disabled selected>Select a mgr</option>')
        $.each(data, function (index, row) {
            $("#crt_whouse_mgr").append('<option value="' + row.user_id + '">' + row.emp_name + " " + row.emp_lname + '</option>');
        });

    }

    $("#crt_whouse_mgr").change(function () {

        var change_type = $(this).children("option:selected").val();
        $("#crt_whs_mgr_id").val(change_type);
    })

    $(document).on("click", "#btn_whouse_crt", function () {
        var whsname = $("#crt_whouse_Label").val();
        var whsmgr = $("#crt_whs_mgr_id").val();
        var whsaddress = $("#crt_whouse_address").val();

        if (checkfields(whsname, whsmgr, whsaddress)) {
            createwhs(whsname, whsmgr, whsaddress);
        }
        else {
            $(".modal-content #wrongmsg").show();
			$(".modal-footer #wrong").show();
        }

    })

    function createwhs(whsname, whsmgr, whslocation) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({
                op: 5,
                whs_name: whsname,
                whs_mgr: whsmgr,
                whs_address: whslocation

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data < 0)
                    alert("No results");

                else {
                    
					$(".modal-footer #success").show()
                    data = JSON.parse(xhr.responseText);
                    setTimeout(function(){window.location.reload()}, 1000);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }


    function checkfields(whsname, whsmgr, whslocation) {
        if (whsname == "" || whsmgr == "" || whslocation == "") {
            return false;
        }

        else
            return true;
    }


    $(document).on("click", ".btn_modal_editwhs", function () {

        $("#edt_whouse_type").empty();
        var btn_id = $(this).attr('id');
        var whs_id = btn_id.substr(4, btn_id.length);
        $("#edt_whouse_Label").val($(this).parent().siblings().eq(0).text());
        $("#edt_whouse_address").val($(this).parent().siblings().eq(2).text());
        var whs_mgr = $(this).parent().siblings().eq(1);
        $("#edt_whs_mgr_id").val(whs_mgr.attr('id'));
        $("#edt_whs_id").val(whs_id);
        getwhsmgred(whs_mgr);
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();

    })

    function getwhsmgred(mgr) {
        var id = mgr.attr('id');
        var mgrname = mgr.text();

        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({
                op: 4
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == 0)
                    alert("No results");

                else {
                    data = JSON.parse(xhr.responseText);
                    parsewhsmgred(data, id, mgrname);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parsewhsmgred(data ,mgrid, mgrtext) {
        $("#edt_whouse_mgr").append('<option value="'+ mgrid +'" >'+ mgrtext +'</option>')
        $.each(data, function (index, row) {
            $("#edt_whouse_mgr").append('<option value="' + row.user_id + '">' + row.emp_name + " " + row.emp_lname + '</option>');
        });

    }

    $("#edt_whouse_mgr").change(function () {

        var change_type = $(this).children("option:selected").val();
        $("#edt_whs_mgr_id").val(change_type);
    })

    function checkeditfields(whsid, whslb, whsmgr, whsaddress) {
        if (whsid == "" || whslb == "" || whsmgr == "" || whsaddress == "") {
            return false;
        }
        else
            return true;
    }

    $(document).on("click", "#btn_edit_whouse", function () {
        var whsid = $("#edt_whs_id").val();
        var whslabel = $("#edt_whouse_Label").val();
        var whsmgr = $("#edt_whs_mgr_id").val();
        var whsaddress = $("#edt_whouse_address").val();

        if(checkeditfields(whsid, whslabel, whsmgr, whsaddress))
        {
            updatewhs(whsid, whslabel, whsmgr, whsaddress);
        }
        else 
        {
        $(".modal-content #wrongmsg").show();
        $(".modal-footer #wrong").show();
        }

    })

    function updatewhs(whsid, whslabel, whsmgr, whsaddress) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({
                op: 6,
                whs_id: whsid,
                whs_label: whslabel,
                whs_mngr: whsmgr,
                whs_address: whsaddress

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data < 0)
                   alert("Couldnt load")
                else {
                    $(".modal-footer #success").show()
                    data = JSON.parse(xhr.responseText);
                    setTimeout(function(){window.location.reload()}, 1000);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        }
        )

        

    }

    $(document).on("click", ".itembtn", function () {
        var whs_id = $(this).attr('id'); 
        var whs_nid = whs_id.substr(4, whs_id.length)
        window.location.href="item.php?whs_id="+ whs_nid +"";
        
    });


})

