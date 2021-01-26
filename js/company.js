$(document).ready(function () {

    getcmp();

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


    $(document).on("click", "#btn_modal_crt_cmp" , function(){
        $("#crt_cmp_name").val("");
        $("#crt_cmp_address").val("");
        $("#crt_cmp_sbusidiary").val("");

    })

    $(document).on("click", "#btn_create_cmp", function () {

        var crt_cmp_name = $("#crt_cmp_name").val();
        var crt_cmp_address = $("#crt_cmp_address").val();
        var crt_cmp_subsidiary = $("#crt_cmp_sbusidiary").val();
        if (fieldval(crt_cmp_name, crt_cmp_address, crt_cmp_subsidiary)) {

            alert("good");
            create_cmp(crt_cmp_name, crt_cmp_address, crt_cmp_subsidiary);
        }
        else alert("error");

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



    //update employee 
    $(document).on("click", ".btn_modal_editcmp", function(){
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(4, btn_id.length);
        var cmp_id = $("#updt_cmp_id").val(btn_nid);
        var cmp_name = $("#updt_cmp_name").val($(this).parent().siblings().eq(0).text());
        var cmp_address = $("#updt_cmp_address").val($(this).parent().siblings().eq(1).text());
        var cmp_subsidiary = $("#updt_cmp_subsidiary").val($(this).parent().siblings().eq(2).text());


    })



    $(document).on("click", "#btn_edit_cmp", function() {
            var updt_cmp_id = $("#updt_cmp_id").val();
            var updt_cmp_name = $("#updt_cmp_name").val(); 
            var updt_cmp_address = $("#updt_cmp_address").val(); 
            var updt_cmp_subsidiary = $("#updt_cmp_subsidiary").val(); 
            
            if(checkfieldupdt(updt_cmp_name, updt_cmp_address, updt_cmp_subsidiary))
            {
                update_cmp(updt_cmp_id, updt_cmp_name, updt_cmp_address, updt_cmp_subsidiary);
            }
            else 
            {
                alert ("erroe");
            }

    })
    function update_cmp(cmp_id, cmp_name, cmp_address, cmp_subsidiary) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_company.php",
            data: ({
                
                op: 4,

                cmp_id : cmp_id,

                cmp_name: cmp_name,
                
                cmp_address: cmp_address,
                cmp_subsidiary: cmp_subsidiary,

            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                //		  		 $("#loadingImg").hide();				  

                if(data < 0)
                {
                    alert("couldn't update employee");
                }
                else
                {
                    location.reload();
                }  
            
            },
            error: function (xhr, status, errorThrown) {
                //				 $("#loadingImg").hide();				  
                alert(status + errorThrown);
            }
        });
    }

    function checkfieldupdt (cmp_name, cmp_address, cmp_subsidiary){

        if (cmp_name == "" || cmp_address == "" || cmp_subsidiary == "" )
        {
            return false; 
        }
        
        else {
            return true; 
        }

    }



})