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
            url: "ws/ws_company.php",
            data: ({ op: 5, key: key, sort: sort, show: show }),
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
        var link = "company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&";
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
            url: "ws/ws_company.php",
            data: ({ op: 6, key: key, sort: sort, show: show, page: page }),
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


                $("#tbody_company").append("<tr><td>" + row.cmp_name + "</td><td>" + row.cmp_address + "</td><td>" + row.cmp_subsidiary + "</td><td>" + check_status(row.cmp_status) + "</td><td><button id='updt" + row.cmp_id + "'  class='btn_modal_editcmp btn btn-primary' style='margin-right: 4px;' type='button' data-toggle='modal' data-target='#editcmpmodal'><i class='fas fa-edit'></i></button><button value='" + row.cmp_status + "' id='tog" + row.cmp_id + "' class='btn btn-primary btntoggleact' style='margin-right: 4px;'> Toggle </button></td><</tr>");
            });


        }
    }


    //////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });

    ///////////////////////////////////////////dortint header///////////////////////////
    $("#namesortheader").click(function () {
        var sortorder = $(this).attr('value');

        if (sortorder == 1) {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&page=1");
        }
        else {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&page=1");
        }
    });

    $("#lastnamesortheader").click(function () {
        var sortorder = $(this).attr('value');
        if (sortorder == 1) {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=3" + "&show=" + wsShowOrders() + "&page=1");
        }
        else {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=4" + "&show=" + wsShowOrders() + "&page=1");
        }
    });

    $("#datesortheader").click(function () {
        var sortorder = $(this).attr('value');
        if (sortorder == 1) {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=5" + "&show=" + wsShowOrders() + "&page=1");
        }
        else {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=6" + "&show=" + wsShowOrders() + "&page=1");
        }
    });

    $("#foulssortheader").click(function () {
        var sortorder = $(this).attr('value');
        if (sortorder == 1) {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=7" + "&show=" + wsShowOrders() + "&page=1");
        }
        else {
            window.location.replace("company.php?key=" + wsKeyword() + "&sort=8" + "&show=" + wsShowOrders() + "&page=1");
        }
    });




    $("#showbystatus").change(function () {
        window.location.replace("company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });


    $("#rankorder").change(function () {
        window.location.replace("company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });

    $("#workstationorder").change(function () {
        window.location.replace("company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });

    $("#clearfilters").click(function () {
        window.location.replace("company.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("company.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&page=1");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //get category function
    // Populate Tables function to get users and specific data. 
    function getcmp() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_company.php",
            data: ({ op: 1 }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populatecmp(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populatecmp(data) {

        if (data.length > 0) {

            $("#tbody_company").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.cmp_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_company").append("<tr><td>" + row.cmp_name + "</td><td>" + row.cmp_address + "</td><td>" + row.cmp_subsidiary + "</td><td>" + check_status(row.cmp_status) + "</td><td><button id='updt" + row.cmp_id + "'  class='btn_modal_editcmp' type='button' class='btn btn-primary' data-toggle='modal' data-target='#editcmpmodal'>Edit User</button><button value='" + row.cmp_status + "' id='tog" + row.cmp_id + "' class='btntoggleact'> " + btn_status_text + " </button></td><</tr>");

            });

        }

    }

    //Check status to deactivate or activate company
    function check_status(statusval) {
        if (statusval == 1) {

            return "Active";
        }
        else {
            return "Inactive";
        }
    }

    // Toggle cmp status.
    $(document).on("click", ".btntoggleact", function () {

        var status_val = $(this).parent().siblings().eq(3);
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(3, btn_id.length);
        var btn = $(this);
        toggle_cmp(status_val, btn_nid, btn);

    })

    function toggle_cmp(status_value, cmp_id, btn) {


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
            url: "ws/ws_company.php",
            data: ({
                op: 2,
                cmp_id: cmp_id,
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

    ///////////////////////// Create Company \\\\\\\\\\\\\\\\\\\\\\\
    $(document).on("click", "#btn_modal_crt_cmp", function () {
        $("#crt_cmp_name").val("");
        $("#crt_cmp_address").val("");
        $("#crt_cmp_sbusidiary").val("");
        $("#wrong").hide();
        $("#wrongmsg").hide();
    })

    $(document).on("click", "#btn_create_cmp", function () {

        var crt_cmp_name = $("#crt_cmp_name").val();
        var crt_cmp_address = $("#crt_cmp_address").val();
        var crt_cmp_subsidiary = $("#crt_cmp_sbusidiary").val();
        if (fieldval(crt_cmp_name, crt_cmp_address, crt_cmp_subsidiary)) {
            $("#wrong").hide();
            $("#wrongmsg").hide();
            create_cmp(crt_cmp_name, crt_cmp_address, crt_cmp_subsidiary);
        }
        else {
            $("#wrong").show();
            $("#wrongmsg").show();

        }

    })
    // validate fields 
    function fieldval(cmp_name, cmp_address, cmp_subsidiary) {

        if (cmp_name == "" || cmp_address == "" || cmp_subsidiary == "")
            return false;
        else
            return true;
    }
    function create_cmp(cmp_name, cmp_address, cmp_subsidiary) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_company.php",
            data: ({
                op: 3,
                cmp_name: cmp_name,
                cmp_address: cmp_address,
                cmp_subsidiary: cmp_subsidiary,

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


    ///////////////////////////////////////////////// Edit Company \\\\\\\\\\\\\\\\\\\\\\\\\\\
    $(document).on("click", ".btn_modal_editcmp", function () {
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(4, btn_id.length);
        var cmp_id = $("#updt_cmp_id").val(btn_nid);
        var cmp_name = $("#updt_cmp_name").val($(this).parent().siblings().eq(0).text());
        var cmp_address = $("#updt_cmp_address").val($(this).parent().siblings().eq(1).text());
        var cmp_subsidiary = $("#updt_cmp_subsidiary").val($(this).parent().siblings().eq(2).text());
        $(".modal-footer #wrong").hide();
        $(".modal-body #wrongmsg").hide();

    })



    $(document).on("click", "#btn_edit_cmp", function () {
        var updt_cmp_id = $("#updt_cmp_id").val();
        var updt_cmp_name = $("#updt_cmp_name").val();
        var updt_cmp_address = $("#updt_cmp_address").val();
        var updt_cmp_subsidiary = $("#updt_cmp_subsidiary").val();

        if (checkfieldupdt(updt_cmp_name, updt_cmp_address, updt_cmp_subsidiary)) {

            update_cmp(updt_cmp_id, updt_cmp_name, updt_cmp_address, updt_cmp_subsidiary);
        }
        else {
            $(".modal-footer #wrong").show();
            $(".modal-body #wrongmsg").show();

        }

    })
    function update_cmp(cmp_id, cmp_name, cmp_address, cmp_subsidiary) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_company.php",
            data: ({

                op: 4,

                cmp_id: cmp_id,

                cmp_name: cmp_name,

                cmp_address: cmp_address,
                cmp_subsidiary: cmp_subsidiary,

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                //		  		 $("#loadingImg").hide();				  

                if (data < 0) {
                    alert("couldn't update employee");
                }
                else {
                    $(".modal-footer #success").show();
                    setTimeout(function () { location.reload() }, 1000);
                }

            },
            error: function (xhr, status, errorThrown) {
                //				 $("#loadingImg").hide();				  
                alert(status + errorThrown);
            }
        });
    }
    //check fields
    function checkfieldupdt(cmp_name, cmp_address, cmp_subsidiary) {

        if (cmp_name == "" || cmp_address == "" || cmp_subsidiary == "") {
            return false;
        }

        else {
            return true;
        }

    }

    



})