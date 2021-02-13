$(document).ready(function () {

    //call the set values function to automaticaly select values
    setValues();

    //set sort and sow values from pre set values
    function setValues() {
        var sortOrderId = $(".sortlisthidden").attr('id');
        var sortOrder = sortOrderId.substring(4);
        //set selected
        //$("#sortorder option[value="+sortOrder+"]").attr('selected', 'selected');


        var showOrdersId = $(".showlisthidden").attr('id');
        var showOrder = showOrdersId.substring(4);
        //set selected option for showing order
        $("#showbystatus option[value=" + showOrder + "]").attr('selected', 'selected');

        countpages(wsKeyword(), wsOrder(), wsShowOrders(), wsStartDate(), wsEndDate(), $("#rqstmgrid").val());
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


    function wsStartDate() {
        return $("#startdate").val();
    }

    function wsEndDate() {
        return $("#enddate").val();
    }


    function wsWorkstation() {
        return $("#workstationorder").val();
    }
    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////




    //////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    //count pages
    function countpages(key, sort, show, sdate, edate, mgrID) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 23, key: key, sort: sort, show: show, sdate: sdate, edate: edate, mgrID: mgrID }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                if (data < 0) {
                    alert("Couldn't get your request");
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
        var link = "whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&wrks=" + wsWorkstation() + "&";
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
            getEmployees(wsKeyword(), wsOrder(), wsShowOrders(), wsStartDate(), wsEndDate(), curentpage, $("#rqstmgrid").val());
        }
    }

    //Populate items
    function getEmployees(key, sort, show, sdate, edate, page, mgrID) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 24, key: key, sort: sort, show: show, sdate: sdate, edate: edate, page: page, mgrID: mgrID }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                if (data < 0) {
                    alert("Couldn't get your request");
                }
                else {
                    displayEmployees(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + " " + errorThrown);
            }
        });
    }

    function displayEmployees(data) {
        if (data == 0) {
            $('.tbody_users').children().remove();
            $('.tbody_users').children().append('<h5>No orders found</h5>');
        }
        else {
            $.each(data, function (index, row) {
                $("#tbody_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.user_name + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'><i class='fas fa-info-circle'></i></button><button type='button' class='btn btn-primary' id='btnaccept'>Accept</button><button id='btncancel' type='button' class='btn btn-primary'>Cancel</button><button type='button' id='hndrqstbtn' class='btn_modal_exprqst btn btn-primary' style='margin-right: 4px;' data-toggle='modal' data-target='#handlemodal'>handle</button><button type='button' id='returnbtn' class='btn_modal_exprqst btn btn-primary'  data-toggle='modal' data-target='#returnmodal'>Return</button></td></tr>");
            });
        }


    }

    function convertStatusToText(status) {
        if (status == 1) {
            return "Active";
        }
        else {
            return "Unactive";
        }
    }


    //////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    ///////////////////////////////////////////dortint header///////////////////////////
    $("#datesortheader").click(function () {
        var sortorder = $(this).attr('value');
        if (sortorder == 1) {
            window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
        }
        else {
            window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
        }
    });




    $("#showbystatus").change(function () {
        window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    $("#startdate").change(function () {
        window.location.replace("whsmgr.rqst.php?keyword=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    $("#enddate").change(function () {
        window.location.replace("whsmgr.rqst.php?keyword=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });


    $("#clearfilters").click(function () {
        window.location.replace("whsmgr.rqst.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("whsmgr.rqst.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //get category function
    // Populate Tables function to get users and specific data. 


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

                $("#tbody_mgr_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.emp_name + " " + row.emp_lname + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td id='" + row.rqst_status + "'>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'>More info</button><button type='button' id='exprqst' style='margin-right: 4px;'></button><button type='button' id='exprqst' class='btn_modal_exprqst btn btn-primary' style='margin-right: 4px;' data-toggle='modal' data-target='#exprqstmodal'>Express Request</button></td></tr>");

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
                
                $("#rqstinfoul").append("<label>Request Number:</label><p>#" + row.rqst_id + "</p><label>Employee Requesting: </label><p>" + row.emp_name + " " + row.emp_lname + "</p><label>Item Label</label><p>" + row.item_label + "</p><label>Warehouse:</label><p>" + row.whs_label + "</p><label>Facility:</label><p>" + row.wrkst_name + "</p><label>Date Requested:</label><p>" + row.rqst_date + "</p><label>Current Request Status:</label><p>" + check_status(row.rqst_status) + "</p><label> Properties</label><p>" + resval(row.rqst_res) + "</p><p>" + retval(row.rqst_ret) + "</p><label>Accepted Date</label><p>" + accval(row.rqst_res, row.rqst_acc_date) + "</p><label>Handled Date</label><p>" + hndlval(row.rqst_handled_date) + "</p><label>Denied Date</label><p>" + dndval(row.rqst_denied_date) + "</p><label>Returned Date</label><p>" + retdateval(row.rqst_ret, row.rqst_returned_date) + "</p>");

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
            return retval;
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

    ////////////////////////////////// Request Handling \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    ////////////////////////// accept item \\\\\\\\\\\\\\\\\\\\\\\\\\\

    $("#btnaccept").click(function () {
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

                    window.location.reload();
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    /////// cancel item \\\\\\\\\\\\\

    $("#btncancel").click(function () {
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


    $("#exprqst").click(function () {
        $("#crt_exp_itemtype").empty();
        populateitemtype();


    })

    /// get item type
    function populateitemtype() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({
                op: 1,
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parseitemtype(data);

                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }

    // item type populate
    function parseitemtype(data) {
        $("#crt_exp_itemtype").append('<option value="" disabled selected>Select an item type</option>')
        if (data.length > 0) {


            $.each(data, function (index, row) {

                $("#crt_exp_itemtype").append("<option value='" + row.item_type_id + "' >" + row.item_type_name + "</option>");

            });

        }

    }
    /// on change get specific items
    $("#crt_exp_itemtype").change(function () {
        $("#crt_exp_item").empty();
        var change_item = $(this).children("option:selected").val();
        populateitems($("#rqstmgrid").val(), change_item);
    })

    //get items 
    function populateitems(mgr, itemtype) {
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
                    parseitem(data);

                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }

    //parse items 
    function parseitem(data) {
        $("#crt_exp_item").append('<option value="" disabled selected>Select an item</option>')
        if (data.length > 0) {


            $.each(data, function (index, row) {

                $("#crt_exp_item").append("<option id='" + row.item_returnable + "' value='" + row.item_id + "' >" + row.item_name + "|" + row.item_label + "</option>");

            });

        }

    }

    $("#crt_exp_item").change(function () {
        var id = $(this).children("option:selected").val();
        var ret = $(this).children("option:selected").attr('id');
        $("#exp_item").val(id);
        $("#exp_ret").val(ret);

    })

    //// rfid scanning
    var canScan = false;

    $("#exprqst").click(function () {
        if (!canScan) {
            canScan = true;
        }
    });

    $(document).on("click", ".btn_edit_employee", function () {
        if (!canScan) {
            canScan = true;
        }
    });

    $("#close_exp_form").click(function () {
        if (canScan) {
            canScan = false;
        }
    });

    $(".close").click(function () {
        if (canScan) {
            canScan = false;
        }
    });
    $("#getemp").click(function () {
        if (canScan && $(".emp_rfid").val() != "") {
            canScan = false;
        }
    })




    setInterval(ArduinoCall, 1000);

    function ArduinoCall() {
        if (canScan) {
            $.ajax({
                type: 'GET',
                url: "./ws/arduino_interface.php",
                data: ({ op: 1 }),
                dataType: 'json',
                timeout: 800,
                success: function (data, textStatus, xhr) {
                    if (data != 0 && data != "0" && data != "") {
                        $(".emp_rfid").val(data);
                    }
                },
                error: function (xhr, status, errorThrown) {
                    // Do nothing
                }
            });
        }
    }
    // get emp rfid 

    $("#getemp").click(function () {
        if ($(".emp_rfid").val() != "") {
            var rfid = $(".emp_rfid").val();
            popemprfid(rfid);
        }
        else {
            alert("Please input rfid")
        }

    })

    function popemprfid(rfid) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_employees.php",
            data: ({
                op: 6,
                emp_rfid: rfid

            }),
            dataType: 'json',
            timeout: 800,
            success: function (data, textStatus, xhr) {
                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parseemps(data);
                    $("#exp_fields").val('1');
                }
            },
            error: function (xhr, status, errorThrown) {
                // Do nothing
            }
        });
    }

    function parseemps(data) {

        if (data.length > 0) {


            $.each(data, function (index, row) {

                $("#empinfo").append("<li id='" + row.emp_id + "'>" + row.emp_name + " " + row.emp_lname + "</li><li>" + row.cmp_name + "</li><li id='" + row.wrkst_id + "'>" + row.wrkst_name + "</li>");

            });

        }
    }


    $("#btn_exp_rqst").click(function () {
        var wrkstid = $(this).parent().siblings('.modal-body').children().siblings('ul').children().siblings().eq(2).attr('id');
        var empid = $(this).parent().siblings('.modal-body').children().siblings('ul').children().siblings().eq(0).attr('id');
        var itemid = $("#exp_item").val();
        var ret = $("#exp_ret").val();
        var user = $("#rqstmgrid").val();
        var fields = $("#exp_fields").val();

        if(wrkstid == "" || empid == "" || itemid =="" || ret == "" || fields == "" )
        {
            alert("life is shit ");
        }
        else {
            exprqst(wrkstid, user, empid, itemid, ret);
        }
    })

    function exprqst(wrkst,user, emp, item, ret)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 16,
                user_id: user, 
                rqst_item: item, 
                wrkst_id: wrkst, 
                ret: ret, 
                rqst_emp: emp
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    window.location.reload();

                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }
    
})


