$(document).ready(function () {

    getrqstmgr($("#rqstmgrid").val());
    //get category function
    // Populate Tables function to get users and specific data. 
    function getrqstmgr(mgrid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ 
            op: 3, 
            mgr_id:mgrid
            
            }),

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

            $("#tbody_mgr_rqst").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.rqst_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";

                $("#tbody_mgr_rqst").append("<tr><td>" + row.rqst_id + "</td><td> " + row.emp_name + " "+ row.emp_lname + "</td><td> " + row.item_label + " </td><td>" + row.wrkst_name + "</td><td>" + row.rqst_date + " </td><td id='"+ row.rqst_status + "'>" + check_status(row.rqst_status) + "</td><td><button id='info" + row.rqst_id + "'  class='btn_modal_inforqst btn btn-primary' type='button' style='margin-right: 4px;'  data-toggle='modal' data-target='#rqstinfomodal'>More info</button></td></tr>");

            });

        }

    }

    //Check status to deactivate or activate users
    function check_status(statusval) {
        switch (statusval) {
            case '0':
                {
                    return "Waiting";
                }

            case '1':
                {   
                    
                    return "accepted";
                }

            case '2':
                {
                    return "handled";
                }

            case '3':
                {
                    return "returned";
                }

            default:
                return "error";

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
                btnstatus(row.rqst_status);
                $("#rqstinfoul").append("<li>"+ row.rqst_id +"</li><li>"+ row.emp_name +" "+ row.emp_lname +"</li><li>"+ row.item_label +"</li><li>"+ row.wrkst_name +"</li><li>"+ row.whs_label +"</li><li>"+ row.rqst_date +"</li><li>"+ check_status(row.rqst_status) +"</li><li>"+ resval(row.rqst_res) +"</li><li>"+ retval(row.rqst_ret) +"</li><li>"+ accval(row.rqst_res, row.rqst_acc_date) +"</li><li>"+ hndlval(row.rqst_handled_date) +"</li><li>"+ dndval(row.rqst_denied_date) +"</li><li>"+ retdateval(row.rqst_ret, row.rqst_returned_date) +"</li>");

            });

        }
    }


    $(document).on('click', '.btn_modal_inforqst', function () {
        $("#rqstinfoul").empty();
        btn_id = $(this).attr('id');
        rqst_id = btn_id.substr(4, btn_id.length)
        getmorerqst(rqst_id);
        $("#valrqst_id").val(rqst_id);


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

    function accval(val, accdate) {
        if (val == 1 && !accdate) {
            return "Not Accepted Yet";
        }
        else if (val == 0) {
            return "No Reservation Needed";
        }
        else {
            return accdate;
        }
    }

    function hndlval(val) {
        if (!val) {
            return "Not handled Yet";
        }
        else {
            return val;
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

    function retdateval(val, retval) {
        if (!val && retval == 1) {
            return "Not returned Yet"
        }
        else if (val == "" && retval == 0) {
            return "-"
        }
        else {
            return val;
        }

    }

    function handlerval(val) {
        if (!val) {
            return "Not Handled Yet";
        }
        else {
            return val;
        }
    }

    function returnerval(val) {
        if (!val) {
            return "Not Returned Yet";
        }
        else {
            return val;
        }
    }

    function btnstatus(status)
    {
     switch(status)
     {
         case '0':
             {
                $("#btnaccept").show();
                $("#btnhandle").hide();
                $("#btnreturn").hide();
             }
             break;
         case '1':
             {
                $("#btnhandle").show();
                $("#btncancel").show();
                $("#btnaccept").hide();
                $("#btnreturn").hide();
             }
            break;
        case '2':
            {
                $("#btnaccept").hide();
                $("#btnhandle").hide();
                $("#btncancel").hide();
            }
            break;
        
        default:
            {
                return "no status available";
            }
     }
    }
    
////////// RFID REading //////////////////////////////////////////////////
    interval = null;
    // setInterval(ArduinoCall, 1000);
    
   
    function ArduinoCall() {
        $.ajax({
            type: 'GET',
            url: "./ws/arduino_interface.php",
            data: ({ op : 1}),
            dataType: 'json',
            timeout: 800,
            success: function (data, textStatus, xhr) {
                if (data != 0 && data != "0") {
                    $("#rfidval").val(data);
                    alertfadein();
                }
            },
            error: function (xhr, status, errorThrown) {
                // Do nothing
            }
        });
    }

    //add review alert
	function alertfadein()
	{
		var alert = $("#masteralert");
		alert.fadeIn(500);
    	alert.delay(300);
    	alert.fadeOut(500);
    }

    $("#btnhandle").click(function(){
        $(".backgroundhd").css('display', 'block');
        interval = 1;
       if(interval == !null)
       {
           interval = setInterval(ArduinoCall, 1000);
       }
        
    })

    $('.closereader').click(function(){
        $('.backgroundhd').css('display', 'none');
        window.clearInterval(interval);
        interval = null;
    })



    // populate employee rfid
    function getemprfid(rfid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({ 
            op: 6, 
            emp_rfid:rfid
            
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populateempinfo(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }

    function populateempinfo(data){
        if (data.length > 0) {

            $.each(data, function (index, row) {

                $("#empinfo").append("<li>"+ row.emp_name +" "+ row.emp_lname +"</li><li>"+ row.cmp_name +"</li><li>"+ row.wrkst_name +"</li><li>"+ row.emp_rank_name +"</li><button id='emp"+ row.emp_id +"' class='btnconfirm'>Confirm</button>");        
               });

        }
    }
 
    $("#Getinfoscan").click(function(){

        var rfid = $("#rfidval").val();
        window.clearInterval(interval);
        interval = null;

        getemprfid(rfid);
    })

    $(document).on('click', '.btnconfirm', function () {
        
        var btn = $(this).attr('id');
        var emp_id = btn.substr(3, btn.length);
        var rqst_id = $("#valrqst_id").val();
        handleitem(rqst_id,emp_id);
    })

    function handleitem(rqstid, empid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({ 
            op: 7, 
            rqst_id: rqstid,
            emp_id: empid
            
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("item handled");
                    window.location.reload();
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }
    

})

    