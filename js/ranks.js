$(document).ready(function () {

    getrank();

    //get category function
    // Populate Tables function to get users and specific data. 
    function getrank() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_ranks.php",
            data: ({ op: 1 }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populaterank(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populaterank(data) {

        if (data.length > 0) {

            $("#tbody_ranks").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.emp_rank_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_ranks").append("<tr><td>" + row.emp_rank_name + "</td><td>" + check_status(row.emp_rank_status) + "</td><td><button id='updt" + row.emp_rank_id + "'  class='btn_modal_editrank' type='button' class='btn btn-primary' data-toggle='modal' data-target='#editrankmodal'>Edit Rank</button><button value='" + row.emp_rank_status + "' id='tog" + row.emp_rank_id + "' class='btntoggleact'> " + btn_status_text + " </button></td><</tr>");

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

        var status_val = $(this).parent().siblings().eq(1);
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(3, btn_id.length);
        var btn = $(this);
        toggle_cmp(status_val, btn_nid, btn);

    })

    function toggle_cmp(status_value, rank_id, btn) {


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
            url: "ws/ws_ranks.php",
            data: ({
                op: 2,
                rank_id: rank_id,
                liveval: finalStatus
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
        $("#crt_rank_name").val("");
        $("#crt_cmp_address").val("");
        $("#crt_cmp_sbusidiary").val("");

    })

    $(document).on("click", "#btn_create_rank", function () {

        var crt_rank_name = $("#crt_rank_name").val();
        
        if (fieldval(crt_rank_name)) {

            create_rank(crt_rank_name);
        }
        else alert("error");

    })
    // validate fields 
    function fieldval(rank_name) {

        if (rank_name == "" )
            return false;
        else
            return true;
    }
    function create_rank(rank_name) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_ranks.php",
            data: ({
                op: 3,
                rank_name: rank_name,

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
    $(document).on("click", ".btn_modal_editrank", function(){
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(4, btn_id.length);
        var cmp_id = $("#updt_rank_id").val(btn_nid);
        var cmp_name = $("#updt_rank_name").val($(this).parent().siblings().eq(0).text());
      


    })



    $(document).on("click", "#btn_edit_rank", function() {
            var updt_rank_id = $("#updt_rank_id").val();
            var updt_rank_name = $("#updt_rank_name").val(); 
           ; 
            
            if(checkfieldupdt(updt_rank_name))
            {
                update_rank(updt_rank_id, updt_rank_name);
            }
            else 
            {
                alert ("error");
            }

    })
    function update_rank(rank_id, rank_name) {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_ranks.php",
            data: ({
                
                op: 4,
                rank_id : rank_id,
                rank_name : rank_name
                

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

    function checkfieldupdt (rank_name){

        if (rank_name == "" )
        {
            return false; 
        }
        
        else {
            return true; 
        }

    }



})