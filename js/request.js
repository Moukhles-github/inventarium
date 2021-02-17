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

        countpages(wsKeyword(), wsOrder(), wsShowOrders(), wsStartDate(), wsEndDate());
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
    function countpages(key, sort, show, sdate, edate) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 5, key: key, sort: sort, show: show, sdate: sdate, edate: edate }),
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
        var link = "request.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&wrks=" + wsWorkstation() + "&";
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
            getEmployees(wsKeyword(), wsOrder(), wsShowOrders(), wsStartDate(), wsEndDate(), curentpage);
        }
    }

    //Populate items
    function getEmployees(key, sort, show, sdate, edate, page) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 6, key: key, sort: sort, show: show, sdate: sdate, edate: edate, page: page }),
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
                $("#tbody_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.user_name + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'><i class='fas fa-info-circle'></i></button></td></tr>");
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
        window.location.replace("request.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    ///////////////////////////////////////////dortint header///////////////////////////
    $("#datesortheader").click(function () {
        var sortorder = $(this).attr('value');
        if (sortorder == 1) {
            window.location.replace("request.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
        }
        else {
            window.location.replace("request.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
        }
    });




    $("#showbystatus").change(function () {
        window.location.replace("request.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    $("#startdate").change(function () {
        window.location.replace("request.php?keyword=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    $("#enddate").change(function () {
        window.location.replace("request.php?keyword=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });


    $("#clearfilters").click(function () {
        window.location.replace("request.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("request.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&sdate=" + wsStartDate() + "&edate=" + wsEndDate() + "&page=1");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //get category function
    // Populate Tables function to get users and specific data. 

    //Check status to deactivate or activate users
    function check_status(statusval) {
        switch (statusval) {
            case '-1':
                {
                    return "Cancelled";
                }
            case '0':
                {
                    return "Waiting";
                }

            case '1':
                {
                    return "Accepted";
                }

            case '2':
                {
                    return "Handled";
                }

            case '3':
                {
                    return "Returned";
                }

            default:
                return "Error";

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

                $("#rqstinfoul").append("<label>Request Number:</label><p>#" + row.rqst_id + "</p><label>Employee Requesting: </label><p>" + row.emp_name + " " + row.emp_lname + "</p><label>Item Label</label><p>" + row.item_label + "</p><label>Warehouse:</label><p>" + row.whs_label + "</p><label>Facility:</label><p>" + row.wrkst_name + "</p><label>Date Requested:</label><p>" + row.rqst_date + "</p><label>Current Request Status:</label><p>" + check_status(row.rqst_status) + "</p><label> Properties</label><p>" + resval(row.rqst_res) + "</p><p>" + retval(row.rqst_ret) + "</p><label>Accepted Date</label><p>" + accval(row.rqst_res, row.rqst_acc_date, row.rqst_status) + "</p><label>Handled Date</label><p>" + hndlval(row.rqst_handled_date, row.rqst_handler_id, row.rqst_status) + " <p id='hndler'><p></p></p><label>Denied Date</label><p>" + dndval(row.rqst_denied_date) + "</p><label>Returned Date</label><p>" + retdateval(row.rqst_ret, row.rqst_returned_date, row.rqst_returner_id, row.rqst_status) + "<p id='rter'><p/></p>");

            });

        }
    }


    $(document).on('click', '.btn_modal_inforqst', function () {
        $("#rqstinfoul").empty();
        btn_id = $(this).attr('id');
        rqst_id = btn_id.substr(4, btn_id.length)
        getmorerqst(rqst_id);


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

    function accval(val, accdate, status) {
        if (val == 1 && status == 0) {
            return "Not accepted yet";
        }
        else if (val == 0) {
            return "No Acceptance Needed";
        }
        else if (val == 1 && accdate != "" && status > 0) {
            return accdate;
        }
        else if (status == -1) {
            return "Cancelled"
        }

    }

    function hndlval(val, hndler, status) {
        if (status >= 2) {
            getempshd(hndler);
            return val;
        }
        else if (status > 0 && status < 2) {
            return "Not Handled Yet";
        }

        else if (status == -1) {
            return "-"
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

    function retdateval(val, retval, retname, status) {
       if(val == 1 && status == 3)
       {
           getempstr(retname);
           return retval;
       }
       else if(val == 0)
       {
           return "Not Returnable";
       }
       else if(val == 1 && !retval)
       {
           return "Not Returned Yet";
       }

    }

    //// get handler employee name 
    function getempshd(empid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 25,
                emp_id: empid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsehandler(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }

    function parsehandler(data) {
        if (data.length > 0) {

            $.each(data, function (index, row) {

                $("#hndler").text(row.emp_name + " " + row.emp_lname);

            });

        }
    }

    //////get returner employee name 
    function getempstr(empid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({
                op: 25,
                emp_id: empid

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parserter(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }

    function parserter(data) {
        if (data.length > 0) {

            $.each(data, function (index, row) {

                $("#rter").text(row.emp_name + " " + row.emp_lname);

            });

        }
    }




})
