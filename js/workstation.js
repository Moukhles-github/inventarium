$(document).ready(function () {

    getwrkst();

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

                $("#tbody_wrkst").append("<tr><td>" + row.wrkst_name + "</td><td>" + row.wrkst_location + "</td> <td id=" + row.wrkst_mgr_id + ">" + row.emp_name + " " + row.emp_lname + " </td>  <td>" + check_status(row.wrkst_status) + "</td><td><button id='updt" + row.wrkst_id + "'  class='btn_modal_editwrkst' type='button' class='btn btn-primary' data-toggle='modal' data-target='#editwrkstmodal'>Edit Workstation</button><button value='" + row.wrkst_status + "' id='tog" + row.wrkst_id + "' class='btntoggleact'> " + btn_status_text + " </button></td><</tr>");

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

    })

    $(document).on("click", "#btn_wrkst_crt", function () {

        var crt_wrkst_name = $("#crt_wrkst_name").val();
        var crt_wrkst_location = $("#crt_wrkst_Location").val();
        var crt_wrkst_mgr_id = $("#crt_wrkst_mgrid").val();

        if (fieldval(crt_wrkst_name, crt_wrkst_location, crt_wrkst_mgr_id)) {

            create_wrkst(crt_wrkst_name, crt_wrkst_location, crt_wrkst_mgr_id);
        }
        else alert("error");

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
                    alert("Successful");
                    window.location.reload();
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

    // populate employees 
    function popmgrwrkst() {


        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations",
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
            $("#wkrst_mgr").append('<option value="' + row.user_id + '">' + row.user_name + '</option>');
        });

    }

    $("#wkrst_mgr").change(function () {

        var change_user = $(this).children("option:selected").val();
        $("#crt_wrkst_mgrid").val(change_user);
    })

    //update employee 
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

    })
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
                alert("error");
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
                    wrkst_address:wrkst_address, 
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
                        location.reload();
                    }

                },
                error: function (xhr, status, errorThrown) {
                    //				 $("#loadingImg").hide();				  
                    alert(status + errorThrown);
                }
            });
        }

        function checkfieldupdt(updt_wrkst_id, updt_wrkst_name, updt_wrkst_address, updt_wrkst_mgr) {

            if (updt_wrkst_id == "" || updt_wrkst_name == "" || updt_wrkst_address == "" || updt_wrkst_mgr =="") {
                return false;
            }

            else {
                return true;
            }

        }


    }
})