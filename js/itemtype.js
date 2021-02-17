$(document).ready(function () {
    gettypes();
//// get item types

    function gettypes() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({ op: 2 }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    parsetypes(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });
    }

    function parsetypes(data){

        if (data.length > 0) {

            $("#tbody_type").empty();



            $.each(data, function (index, row) {
                    var btntext="error";

                    if (row.item_type_status == 1 || row.item_type_status =='1')
                    {
                        btntext ="Active";

                    }
                    else if (row.item_type_status == 0 || row.item_type_status =='0')

                    {
                        btntext="Deactive";
                    }



                $("#tbody_type").append("<tr><td>"+ row.item_type_name +"</td><td id='tog"+ row.item_type_status +"'>"+ check_status(row.item_type_status)+"</td><td><button id='updt" + row.item_type_id + "'  class='btn_modal_edttype btn btn-primary' type='button' data-toggle='modal' data-target='#edittypemodal'><i class='fas fa-edit'></i></button><button style='margin-left: 4px;' value='" + row.item_type_status + "' id='tog" + row.item_type_id + "' class='btntoggleact btn btn-primary'>Toggle</button></td></tr>");

            });

        }

    }


    // toggle items

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
        toggle_type(status_val, btn_nid, btn)

    })

    function toggle_type(status_value, type_id, btn) {


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
            url: "ws/ws_item_type.php",
            data: ({
                op: 3,
                type_id: type_id,
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

    //////////////////////////create item type \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    $("#btn_modal_crt_type").click(function(){
        $("#crt_type_name").val("");
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();
        $(".modal-footer #success").hide();
    })

    $("#btn_create_type").click(function(){
        var typename = $("#crt_type_name").val();
        if (typename == "")
        {
            $(".modal-content #wrongmsg").show();
            $(".modal-footer #wrong").show();
        }   
        else 
        {
                
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();
            createtype(typename);
        }
    })

    function createtype(name)
    {
        
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({
                op: 4,
                type_name: name
            }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == -1) {
                    alert("couldn't add");
                } else {
                    data = JSON.parse(xhr.responseText);
                    $(".modal-footer #success").show();
                    setTimeout(function(){window.location.reload()}, 1200)
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }


    ////////////// edit user type \\\\\\\\\\\\\\\\\\\\
    $(document).on("click", ".btn_modal_edttype", function () {
        var name = $(this).parent().siblings().eq(0).text();
        var id = $(this).attr('id');
        var nid = id.substr(4, id.length);

        $("#updt_type_name").val(name);
        $("#updt_type_id").val(nid);    
        
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();

    })

    $("#btn_edit_type").click(function(){

        var name = $("#updt_type_name").val();
        var id = $("#updt_type_id").val();

        if(name == "" )
        {
            $(".modal-content #wrongmsg").show();
            $(".modal-footer #wrong").show();
        }
        else 
        {
                
        $(".modal-content #wrongmsg").hide();
        $(".modal-footer #wrong").hide();
            updatetype(name, id);
        }
    })

    
    function updatetype(name, id)
    {
        
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({
                op: 4,
                type_id: id, 
                type_name: name

            }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == -1) {
                    alert("couldn't add");
                } else {
                    data = JSON.parse(xhr.responseText);
                    $(".modal-footer #success").show();
                    setTimeout(function(){window.location.reload()}, 1200)
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }










})