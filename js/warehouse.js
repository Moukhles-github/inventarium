$(document).ready(function () {

    getwhs();

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

                $("#tbody_whouse").append("<tr><td>" + row.whs_label + "</td><td id='" + row.whs_mgr_id + "'>" + row.emp_name + " " + row.emp_lname + "</td><td>" + row.whs_address + "<td> " + row.whs_date + "</td><td>" + check_status(row.whs_status) + "</td><td><button id='updt" + row.whs_id + "'  class='btn_modal_editwhs' type='button' class='btn btn-primary' data-toggle='modal' data-target='#editwhousemodal'>Edit User</button><button value='" + row.whs_status + "' id='tog" + row.whs_id + "' class='btntoggleact'> " + btn_status_text + " </button><button id='item"+ row.whs_id+"' class='itembtn'> items </button></td><</tr>");

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
            alert("error")
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
                    data = JSON.parse(xhr.responseText);
                    window.location.reload();
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
        $("#edt_whouse_address").val($(this).parent().siblings().eq(3).text());
        var whs_mgr = $(this).parent().siblings().eq(2);
        $("#edt_whs_mgr_id").val(whs_mgr.attr('id'));
        $("#edt_whs_id").val(whs_id);
        getwhsmgred();

    })

    function getwhsmgred() {

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
                    parsewhsmgred(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parsewhsmgred(data) {
        $("#edt_whouse_mgr").append('<option value="" disabled selected>Select a mgr</option>')
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
        alert("error");

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


                if (data == 0)
                   window.location.reload();
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("no data");
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

