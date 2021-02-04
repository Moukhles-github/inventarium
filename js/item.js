$(document).ready(function () {

    var whs_id = $("#whs_id").val();

    getitems(whs_id);
    //get category function
    // Populate Tables function to get users and specific data. 
    function getitems(whsid) {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({
                op: 1,
                whs_id: whsid


            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {

                if (data == -1)
                    alert("Data couldn't be loaded!");
                else {
                    data = JSON.parse(xhr.responseText);
                    populateitem(data);
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(status + errorThrown);
            }
        });

    }
// go to ranks
$("#emp_ranks").click(function(){

    window.location.replace("./ranks.php")
})

    // function to insert data got by getusers(), to append it to a table. 
    function populateitem(data) {

        if (data.length > 0) {

            $("#tbody_item").empty();



            $.each(data, function (index, row) {

                var btn_status_text = "";

                if (row.item_status == 0) {

                    btn_status_text = "Enable";
                }
                else
                    btn_status_text = "Disable";
                //item name                     //item label                   //item reservation                               //item warehouse                                 //item returnable                                       //item lifespan                    //item date                                 //item status                                           //item update                                                                                                                                       //item toggle status
                $("#tbody_item").append("<tr><td>" + row.item_name + "</td><td>" + row.item_label + "</td ><td id='" + row.item_type_id + "'>"+ row.item_type_name +"</td></td><td id='" + row.item_reserve + "'> " + item_re(row.item_reserve) + " </td><td id='" + row.item_whs_id + "'>" + row.whs_label + "</td><td id='" + row.item_returnable + "'>" + item_re(row.item_returnable) + "</td><td id='"+ row.item_lifespan +"'>" + row.item_lifespan + " </td><td> " + row.item_entry_date + "</td><td id='" + row.item_status + "'>" + check_status(row.item_status) + "</td><td><button id='updt" + row.item_id + "'  class='btn_modal_editwhs' type='button' class='btn btn-primary' data-toggle='modal' data-target='#editwhousemodal'>Edit User</button><button value='" + row.item_status + "' id='tog" + row.item_id + "' class='btntoggleact'> " + btn_status_text + " </button></tr>");

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


    // item status
    $(document).on("click", ".btntoggleact", function () {

        var status_val = $(this).parent().siblings().eq(8);
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


    ////////////////// create item //////////////////////////////

    $("#btn_modal_item_whs").click(function () {
        $("#crt_item_type").empty();
        $("#crt_item_whs").empty();
        $("#crt_whs_id").val("");
        $("#crt_res_id").val("");
        $("#crt_ret_id").val("");
        $("#crt_type_id").val("");
        $("#crt_item_name").val("");
        $("#crt_item_label").val("");
        $("#crt_item_life").val("");
        $('input[name="reservation"]').prop('checked', false);
        $('input[name="returnable"]').prop('checked', false);
        getwhs();
        getitemtype();


    })

    function getwhs() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({
                op: 7,
            }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == 0) {
                    alert("no result");
                } else {
                    data = JSON.parse(xhr.responseText);
                    parsewhs(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parsewhs(data) {
        $("#crt_item_whs").append('<option value="" disabled selected>Select a type</option>')
        $.each(data, function (index, row) {
            $("#crt_item_whs").append('<option value="' + row.whs_id + '">' + row.whs_label + '</option>');
        });

    }

    $("#crt_item_whs").change(function () {

        var change_type = $(this).children("option:selected").val();
        $("#crt_whs_id").val(change_type);
    })

    $('input[name="reservation"]').change(function () {
        var val = $(this).val();
        $("#crt_res_id").val(val);
    })

    $('input[name="returnable"]').change(function () {
        var val = $(this).val();
        $("#crt_ret_id").val(val);
    })

    function crtcheckfields(itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife)
    {
        if (itemname == "" || itemlabel == "" || itemtype == "" || itemres == "" || itemwhs == "" || itemret == "" || itemlife == "") {
            return false;
        }
        else {
            return true;
        }
    }
    // populate item type
    
    function getitemtype() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({
                op: 1,
            }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == 0) {
                    alert("no result");
                } else {
                    data = JSON.parse(xhr.responseText);
                    parseitemtype(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parseitemtype(data) {
        $("#crt_item_type").append('<option value="" disabled selected>Select a type</option>')
        $.each(data, function (index, row) {
            $("#crt_item_type").append('<option value="' + row.item_type_id + '">' + row.item_type_name + '</option>');
        });

    }

    $("#crt_item_type").change(function () {

        var change_type = $(this).children("option:selected").val();
        $("#crt_type_id").val(change_type);
    })


    $("#btn_item_crt").click(function(){
        var itemname = $("#crt_item_name").val();
        var itemlabel = $("#crt_item_label").val(); 
        var itemtype = $("#crt_type_id").val();
        var itemres = $("#crt_res_id").val();
        var itemwhs = $("#crt_whs_id").val();
        var itemret = $("#crt_ret_id").val();
        var itemlife = $("#crt_item_life").val();

        if (crtcheckfields(itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife))
        {
                createitem(itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife);
        }
        else {
            alert("error");
        }
    })


    function createitem (itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({
                op: 3,
                item_name: itemname,
                item_label: itemlabel, 
                item_type: itemtype,
                item_res: itemres, 
                item_whs: itemwhs, 
                item_ret: itemret,
                item_life: itemlife 
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////update items ///////////////////////////////////

    $(document).on("click", ".btn_modal_editwhs", function () {
        $("#edt_item_type").empty();
        ////////////////
        var btnid = $(this).attr('id');
        var itemid = btnid.substr(4, btnid.length);
        var itemname = $(this).parent().siblings().eq(0).text();
        var itemlabel = $(this).parent().siblings().eq(1).text();
        var itemtype = $(this).parent().siblings().eq(2);
        var itemtypeid = itemtype.attr('id');
        var itemres = $(this).parent().siblings().eq(3);
        var itemresid = itemres.attr('id');
        var itemwhs = $(this).parent().siblings().eq(4);
        var itemwhsid = itemwhs.attr('id');
        var itemret = $(this).parent().siblings().eq(5);
        var itemretid = itemret.attr('id');
        var itemlife = $(this).parent().siblings().eq(6);
        var itemlifeid = itemlife.attr('id');

        /////////////////////////////////
        $("#edt_item_id").val(itemid);
        $("#edt_whs_id").val(itemwhsid);
        $("#edt_item_name").val(itemname);
        $("#edt_item_label").val(itemlabel);
        $("#edt_res_id").val(itemresid);
        $("#edt_type_id").val(itemtypeid);
        $("#edt_ret_id").val(itemretid);
        $("#edt_item_life").val(itemlifeid);
        getedtwhs();
        getedtitemtype();
    })

    function getedtitemtype() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_item_type.php",
            data: ({
                op: 1,
            }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == 0) {
                    alert("no result");
                } else {
                    data = JSON.parse(xhr.responseText);
                    parseitemtype(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parseitemtype(data) {
        $("#edt_item_type").append('<option value="" disabled selected>Select a type</option>')
        $.each(data, function (index, row) {
            $("#edt_item_type").append('<option value="' + row.item_type_id + '">' + row.item_type_name + '</option>');
        });

    }

    $("#edt_item_type").change(function () {

        var change_type = $(this).children("option:selected").val();
        $("#edt_type_id").val(change_type);
    })

    function getedtwhs() {
        $.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({
                op: 7,
            }),
            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {


                if (data == 0) {
                    alert("no result");
                } else {
                    data = JSON.parse(xhr.responseText);
                    parsewhs(data);
                }
            },
            error: function (xhr, status, errorThrown) {

                alert(status + errorThrown);
            }
        });
    }

    function parsewhs(data) {
        $("#edt_item_whs").append('<option value="" disabled selected>Select a type</option>')
        $.each(data, function (index, row) {
            $("#edt_item_whs").append('<option value="' + row.whs_id + '">' + row.whs_label + '</option>');
        });

    }

    $("#edt_item_whs").change(function () {

        var change_type = $(this).children("option:selected").val();
        $("#edt_whs_id").val(change_type);
    })

    $('input[name="edtreservation"]').change(function () {
        var val = $(this).val();
        $("#edt_res_id").val(val);
    })

    $('input[name="edtreturnable"]').change(function () {
        var val = $(this).val();
        $("#edt_ret_id").val(val);
    })
    
    $("#btn_item_edt").click(function(){
        itemid = $("#edt_item_id").val();
        itemname = $("#edt_item_name").val();
        itemlabel = $("#edt_item_label").val();
        itemtype = $("#edt_type_id").val();
        itemres = $("#edt_res_id").val();
        itemwhs = $("#edt_whs_id").val();
        itemret = $("#edt_ret_id").val();
        itemlife =$("#edt_item_life").val();

        if(checkedtfields(itemid, itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife))
        {
                edititem(itemid, itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife);
                
        }
        else
        {
            alert("error"); 
        }
        


    })


    function checkedtfields(itemid, itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife)
    {
        if (itemid ==""|| itemname =="" || itemlabel =="" || itemtype =="" || itemres == "" || itemwhs == "" || itemret == "" || itemlife =="")
        {
            return false;
        }

        else 
        {
            return true; 
        }
    }

    function edititem(itemid, itemname, itemlabel, itemtype, itemres, itemwhs, itemret, itemlife)
    {
        $.ajax({
            type: 'GET',
            url: "./ws/ws_item.php",
            data: ({
                
                op: 4,
                item_id: itemid, 
                item_name:itemname, 
                item_label:itemlabel, 
                item_type:itemtype, 
                item_reserve: itemres, 
                item_whs: itemwhs, 
                item_returnable: itemret, 
                item_lifespan: itemlife
            }),

            dataType: 'json',
            timeout: 5000,
            success: function (data, textStatus, xhr) {
                //		  		 $("#loadingImg").hide();				  

                if (data == 0)
                   window.location.reload();
                else {
                    data = JSON.parse(xhr.responseText);
                    alert("no data");
                }
            
            },
            error: function (xhr, status, errorThrown) {
                //				 $("#loadingImg").hide();				  
                alert(status + errorThrown);
            }
        });
    }




});