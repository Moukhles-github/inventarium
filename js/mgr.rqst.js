$(document).ready(function () {

 
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

})