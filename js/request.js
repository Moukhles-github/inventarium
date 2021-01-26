$(document).ready(function () {

    getrqst();

    //get category function
    // Populate Tables function to get users and specific data. 
    function getrqst() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 1 }),

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

            $("#tbody_rqst").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.rqst_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.user_name + "</td><td> " + row.item_label +" </td><td>"+ row.wrkst_name +"</td><td>" + row.rqst_date + " </td><td>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst' type='button' class='btn btn-primary' data-toggle='modal' data-target='#rqstinfomodal'>More info</button></td></tr>");

            });

        }

    }

    //Check status to deactivate or activate users
    function check_status(statusval) {
        switch(statusval)
        {
            case 0: 
            {
                return "Waiting";    
            }
            break;
            case 1:
                {
                    return "accepted";
                }
                break;
            case 2:
                {
                    return "handled";
                }
            break; 
            case 3:
                {
                    return "returned";
                }
             break;
            default:
                return "error";
            break;
        }
    }
    function getmorerqst(rqstid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ op: 2,
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

    function parsemorerqst(data){
        if (data.length > 0) {

            $("#rqstinfoul").empty();
            var rqstid = $(this).parent().siblings().eq(0);
            var rqstuser = $(this).parent().siblings().eq(1);
            var rqstitem = $(this).parent().siblings().eq(2);
            var rqstfacility = $(this).parent().siblings().eq(3);
            var rqststatus = $(this).parent().siblings().eq(4);


            $.each(data, function (index, row) {

                // $("#rqstinfoul").append("<li> " + row.+" </li>");

            });

        }
    }


    $(document).on('click', '.btn_modal_inforqst', function(){

        getmorerqst(rqst_id);


    })

    function resval(val)
    {
        if (val == 1)
        {
            return "Requires Reservation";
        }
        else 
        {
            return "No Reservation Required";
        }
    }

    function retval(val)
    {
        if (val == 1)
        {
            return "Returnable";
        }
        else
        {
            return "Not Returnable";
        }
    }

    function accval(val, accdate)
    {
        if(val == 1 && accdate == "")
        {
            return "Not Accepted Yet";
        }
        else if (val == 0)
        {
            return "No Reservation Needed";
        }
        else
        {
            return accdate;
        }
    }

    function hndlval (val)
    {
        if (val == "")
        {
            return "Not handled Yet";
        }
        else 
        {
            return val;
        }
    }

    function dndval (val)
    {
        if (val == "")
        {
            return "Not Denied";
        }
        else
        {
            return val;
        }
    }

    function retdateval (val, retval)
    {
        if (val == "" && retval == 1)
        {
            return "Not returned Yet"
        }
        else if (val == "" && retval == 0)
        {
            return "-"
        }
        else{
            return val;
        }

    }

    function handlerval(val)
    {
        if(val == "" )
        {
            return "Not Handled Yet";
        }
        else 
        {
            return val; 
        }
    }

    function returnerval(val)
    {
        if (val == "")
        {
            return "Not Returned Yet"
        }
        else
        {
            return val; 
        }
    }


})