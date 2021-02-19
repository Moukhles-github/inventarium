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

        countpages(wsKeyword(), wsOrder(), wsShowOrders());

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

    function wsShowOrders() {
        return $("#showbystatus").val();
    }

    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////




    //////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    //count pages
    function countpages(key, sort, show) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({ op: 7, key: key, sort: sort, show: show }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                if (data < 0) {
                    alert("Couldn't get your companies");
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
        var link = "workstation.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&";
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
            getEmployees(wsKeyword(), wsOrder(), wsShowOrders(), curentpage);
        }
    }

    //Populate items
    function getEmployees(key, sort, show, page) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({ op: 8, key: key, sort: sort, show: show, page: page }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                if (data < 0) {
                    alert("Couldn't get your employees");
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
                $("#tbody_wrkst").append("<tr><td>" + row.wrkst_name + "</td><td>" + row.wrkst_location + "</td> <td id=" + row.wrkst_mgr_id + ">" + row.emp_name + " " + row.emp_lname + " </td>  <td>" + check_status(row.wrkst_status) + "</td><td><button id='updt" + row.wrkst_id + "'  class='btn_modal_editwrkst btn btn-primary'  style='margin-right: 4px;'  type='button' data-toggle='modal' data-target='#editwrkstmodal'><i class='fas fa-edit'></i></button><button value='" + row.wrkst_status + "' id='tog" + row.wrkst_id + "' class='btntoggleact btn btn-primary'  style='margin-right: 4px;' > Toggle </button></td><</tr>");
            });


        }
    }


    //////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });

    ///////////////////////////////////////////dortint header///////////////////////////
    $("#namesortheader").click(function () {
        var sortorder = $(this).attr('value');

        if (sortorder == 1) {
            window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&page=1");
        }
        else {
            window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&page=1");
        }
    });

    $("#lastnamesortheader").click(function () {
        var sortorder = $(this).attr('value');
        if (sortorder == 1) {
            window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=3" + "&show=" + wsShowOrders() + "&page=1");
        }
        else {
            window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=4" + "&show=" + wsShowOrders() + "&page=1");
        }
    });



    $("#showbystatus").change(function () {
        window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });


    $("#clearfilters").click(function () {
        window.location.replace("workstation.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("workstation.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //get category function
    // Populate Tables function to get users and specific data. 
    function getwrkst() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({ op: 2 }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populatewrkst(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populatewrkst(data) {

        if (data.length > 0) {

            $("#tbody_wrkst").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.wrkst_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_wrkst").append("<tr><td>" + row.wrkst_name + "</td><td>" + row.wrkst_location + "</td> <td id=" + row.wrkst_mgr_id + ">" + row.emp_name + " " + row.emp_lname + " </td>  <td>" + check_status(row.wrkst_status) + "</td><td><button id='updt" + row.wrkst_id + "'  class='btn_modal_editwrkst btn btn-primary'  style='margin-right: 4px;'  type='button' data-toggle='modal' data-target='#editwrkstmodal'>Edit</button><button value='" + row.wrkst_status + "' id='tog" + row.wrkst_id + "' class='btntoggleact btn btn-primary'  style='margin-right: 4px;' > " + btn_status_text + " </button></td><</tr>");

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
        toggle_wrkst(status_val, btn_nid, btn);

    })

    function toggle_wrkst(status_value, wrkst_id, btn) {


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
            url: "ws/ws_workstations.php",
            data: ({
                op: 3,
                wrkst_id: wrkst_id,
                status: finalStatus
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


    $(document).on("click", "#btn_modal_crt_wrkst", function () {
        $("#wkrst_mgr").empty();
        $("#crt_wrkst_name").val("");
        $("#crt_wrkst_Location").val("");
        $("#crt_wrkst_mgrid").val("");
        popmgrwrkst();
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();

    })

    $(document).on("click", "#btn_wrkst_crt", function () {

        var crt_wrkst_name = $("#crt_wrkst_name").val();
        var crt_wrkst_location = $("#crt_wrkst_Location").val();
        var crt_wrkst_mgr_id = $("#crt_wrkst_mgrid").val();

        if (fieldval(crt_wrkst_name, crt_wrkst_location, crt_wrkst_mgr_id)) {

            create_wrkst(crt_wrkst_name, crt_wrkst_location, crt_wrkst_mgr_id);
        }
        else {
            $(".modal-content #wrongmsg").show();
            $(".modal-footer #wrong").show();
        }

    })
    // validate fields 
    function fieldval(wrkst_name, wrkst_address, wrkst_mgr_id) {

        if (wrkst_name == "" || wrkst_address == "" || wrkst_mgr_id == "")
            return false;
        else
            return true;
    }
    function create_wrkst(wrkst_name, wrkst_address, wrkst_mgr_id) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_workstations.php",
            data: ({
                op: 4,
                wrkst_name: wrkst_name,
                wrkst_address: wrkst_address,
                wrkst_mgr_id: wrkst_mgr_id

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                //		  		 $("#loadingImg").hide();				  

                if (data != -1) {
                    $(".modal-footer #success").show();
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

    // populate workstation manager
    function popmgrwrkst() {


        $.ajax({
            type: 'GET',
            url: "./ws/ws_workstations",
            data: ({
                op: 6
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data > 0)
                    alert("No results");

                else {
                    data = JSON.parse(xhr.responseText);
                    parsemgrwrkst(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parsemgrwrkst(data) {

        $("#wkrst_mgr").append('<option value="" disabled selected>Select a Manager</option>')
        $.each(data, function (index, row) {
            $("#wkrst_mgr").append('<option value="' + row.user_id + '">' + row.emp_name +' '+ row.emp_lname +'</option>');
        });

    }

    $("#wkrst_mgr").change(function () {

        var change_user = $(this).children("option:selected").val();
        $("#crt_wrkst_mgrid").val(change_user);
    })

//////////////////////////////////////////////update Workstation

    $(document).on("click", ".btn_modal_editwrkst", function () {
        $("#updt_wrkst_act").empty();
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(4, btn_id.length);
        $("#edit_wrkst_name").val($(this).parent().siblings().eq(0).text());
        $("#edit_wrkst_Location").val($(this).parent().siblings().eq(1).text());
        var wrkst_act_mgr = $(this).parent().siblings().eq(2);
        $("#updt_wrkst_id").val(btn_nid);
        $("#updt_wrkst_mgrid").val(wrkst_act_mgr.attr('id'));
        edpopwrkstmgr(wrkst_act_mgr);
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();

    })

    // set available workstations manager
    function edpopwrkstmgr(wrkst_act_mgr) {
        var mgract_id = wrkst_act_mgr.attr('id');
        var mgract_text = wrkst_act_mgr.text();

        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations",
            data: ({
                op: 6,
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data < 0)
                    alert("No results");

                else {
                    data = JSON.parse(xhr.responseText);
                    parseedtwrksttype(data, mgract_id, mgract_text);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parseedtwrksttype(data, mgract_id, mgract_text) {
        $("#updt_wrkst_act").append('<option value=' + mgract_id + ' selected>' + mgract_text + '</option>')
        $.each(data, function (index, row) {
            $("#updt_wrkst_act").append('<option value="' + row.user_id + '">' + row.emp_name + " " + row.emp_lname + '</option>');
        });

        $("#updt_wrkst_act").change(function () {

            var change_user = $(this).children("option:selected").val();
            $("#updt_wrkst_mgrid").val(change_user);
        })

        $(document).on("click", "#btn_edit_wrkst", function () {

            var updt_wrkst_id = $("#updt_wrkst_id").val();
            var updt_wrkst_name = $("#edit_wrkst_name").val();
            var updt_wrkst_address = $("#edit_wrkst_Location").val();
            var updt_wrkst_mgr = $("#updt_wrkst_mgrid").val();
            ;

            if (checkfieldupdt(updt_wrkst_id, updt_wrkst_name, updt_wrkst_address, updt_wrkst_mgr)) {
                update_wrkst(updt_wrkst_id, updt_wrkst_name, updt_wrkst_address, updt_wrkst_mgr);
            }
            else {
                $(".modal-content #wrongmsg").show();
                $(".modal-footer #wrong").show();
            }

        })
        function update_wrkst(wrkst_id, wrkst_name, wrkst_address, wrkst_mgr) {
            $.ajax({
                type: 'GET',
                url: "./ws/ws_workstations.php",
                data: ({

                    op: 5,
                    wrkst_id: wrkst_id,
                    wrkst_name: wrkst_name,
                    wrkst_address: wrkst_address,
                    wrkst_mgr_id: wrkst_mgr


                }),

                dataType: 'json',
                timeout: 5000,
                success: function (data, textStatus, xhr) {
                    //		  		 $("#loadingImg").hide();				  

                    if (data < 0) {
                        alert("couldn't update employee");
                    }
                    else {
                        $(".modal-footer #success").show()
                    data = JSON.parse(xhr.responseText);
                    setTimeout(function(){window.location.reload()}, 1000);
                    }

                },
                error: function (xhr, status, errorThrown) {
                    //				 $("#loadingImg").hide();				  
                    alert(status + errorThrown);
                }
            });
        }

        function checkfieldupdt(updt_wrkst_id, updt_wrkst_name, updt_wrkst_address, updt_wrkst_mgr) {

            if (updt_wrkst_id == "" || updt_wrkst_name == "" || updt_wrkst_address == "" || updt_wrkst_mgr == "") {
                return false;
            }

            else {
                return true;
            }

        }


    }
})