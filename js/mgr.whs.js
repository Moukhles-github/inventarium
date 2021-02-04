$(document).ready(function () {

    getmgritem($("#tbmgrid").val());
    //get category function
    // Populate Tables function to get users and specific data. 
    function getmgritem(mgrid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({ op: 6, 
            mgr_id:mgrid
            
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populateitems(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }


    // function to insert data got by getusers(), to append it to a table. 
    function populateitems(data) {

        if (data.length > 0) {

            $("#tbody_mgr_whs").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.item_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_mgr_whs").append("<tr><td>" + row.item_name + "</td><td>"+ row.item_label +"</td><td>" + row.item_type_name + "</td><td>"+ item_re(row.item_reserve) +"</td><td>"+ item_re(row.item_returnable) +"</td><td>"+ row.item_lifespan +"</td><td>"+ row.item_entry_date +"</td><td >"+ check_status(row.item_status) +"</td><td><button id='tog"+ row.item_id +"' class='btntoggleact' value='"+ row.item_status +"'>"+ btn_status_text +"</button></td>");

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

    function item_re(resval) {
        if (resval == 1) {
            return "Yes"
        }
        else {
            return "No"
        }
    }
    $(document).on("click", ".btntoggleact", function () {

        var status_val = $(this).parent().siblings().eq(7);
        var btn_id = $(this).attr('id');
        var btn_nid = btn_id.substr(3, btn_id.length);
        var btn = $(this);
        toggle_item(status_val, btn_nid, btn);

    })

    function toggle_item(status_value, item_id, btn) {


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
            url: "ws/ws_item.php",
            data: ({
                op: 2,
                item_id: item_id,
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

})