$(document).ready(function(){
	
	//call the set values function to automaticaly select values
	setValues();
	
	//set sort and sow values from pre set values
	function setValues()
	{
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);
		//set selected
		//$("#sortorder option[value="+sortOrder+"]").attr('selected', 'selected');
		
		
		var showOrdersId = $(".showlisthidden").attr('id');
		var showOrder = showOrdersId.substring(4);
		//set selected option for showing order
		$("#showbystatus option[value="+showOrder+"]").attr('selected', 'selected');

        getRanks();
    }

    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////
	function wsKeyword()
	{
		return $(".searchbar").val();
	}
	
	function wsOrder()
	{
		//return $("#sortorder").val();
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);
		
		return sortOrder;
	}
	
	function wsRank()
	{
		return $("#rankorder").val();
	}
	
	function wsShowOrders()
	{
		return $("#showbystatus").val();
	}
	
	function wsWorkstation()
	{
		return $("#workstationorder").val();
    }
    ////////////////////////////////////////////////////////////////////////////get all values/////////////////////////////////////////////////////////


    //get category function
	function getRanks()
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_ranks.php",
            data: ({op : 1}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 1)
                {
                    alert("No ranks available");
                }
                else
                {
                    populateRanks(data);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
    }
    
    // fill the category functionl
    function populateRanks(data)
    {
        $.each(data, function(index, row){
            $("#rankorder").append('<option value="'+row.emp_rank_id+'">'+row.emp_rank_name+'</option>');
            $("#emp_rank").append('<option value="'+row.emp_rank_id+'">'+row.emp_rank_name+'</option>');
        });
        
        setRank();
    }
    

    //set sort and sow values from pre set values
	function setRank()
	{
		var rankOrderId = $(".rankhidden").attr('id');
		var rankOrder = rankOrderId.substring(4);
		//set selected option for showing order
        $("#rankorder option[value="+rankOrder+"]").attr('selected', 'selected');

        getWorkstations()
    }
    

    //get category function
	function getWorkstations()
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({op : 1}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 1)
                {
                    alert("No workstations available");
                }
                else
                {
                    populateWorkstations(data);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
    }
    
    // fill the category functionl
    function populateWorkstations(data)
    {
        $.each(data, function(index, row){
            $("#workstationorder").append('<option value="'+row.wrkst_id+'">'+row.wrkst_name+'</option>');
            $("#emp_wrks").append('<option value="'+row.wrkst_id+'">'+row.wrkst_name+'</option>'); //populate the add employee form
        });
        
        setWorkstation();
    }

    //set sort and sow values from pre set values
	function setWorkstation()
	{
		var workstationOrdersId = $(".workstationlisthidden").attr('id');
		var workstationOrder = workstationOrdersId.substring(11);
		//set selected option for showing order
        $("#workstationorder option[value="+workstationOrder+"]").attr('selected', 'selected');
        
        //automaticaly call the count page function for pagination
        countpages(wsKeyword(), wsOrder(), wsShowOrders(), wsRank(), wsWorkstation());
    }

    
        

//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////

	
		
	//count pages
	function countpages(key, sort, show, rank, wrks)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({op : 1, key : key, sort : sort, show : show, rank : rank, wrks : wrks}),
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("Couldn't get your employees");
                }
                else
                {
                    displayPages(data);
                }
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert(status +" "+ errorThrown);				  
            }
        });
    }

    //display pages function
    function displayPages(numberOfPages)
    {
        var link = "employees.php?key="+wsKeyword()+"&sort="+wsOrder()+"&show="+wsShowOrders()+"&rank="+wsRank()+"&wrks="+wsWorkstation()+"&";
        //used for disabling item and set next and previous indexes
        var disabledatstart = "";
        var disabledatend = " ";

        var disabledlinkstart = "";
        var disabledlinkend = "";

        //if there is no pages
        if(numberOfPages < 1)
            {
                $(".tbody_users").children().remove();
                $(".tbody_users").append('<h5>No result found!</h5>');
            }
        //if there is pages
        else
            {
                var i;
                var curentpage = $(".page-item").attr('id');
                var pagesToAppend = "";
                //next and prev pages
                var previousIndex = parseInt(curentpage) - 1;
                var nextIndex = parseInt(curentpage) + 1;
                
                //remove existing
                $(".pagination").children().remove();
                //check if the curent page is the first or the last page
                if(curentpage == 1)
                {
                    disabledatstart = " disabled";
                    disabledlinkstart = "";
                }
                else
                {
                    disabledlinkstart = "href='"+link;
                }
                if (curentpage == numberOfPages)
                {
                    disabledatend = " disabled";
                    disabledlinkend = "";
                }
                else
                {
                    disabledlinkend = "href='"+link;
                }
                        
                //append the first and the previous page 
                pagesToAppend +="<li class='page-item"+disabledatstart+"' id='first'><a class='page-link' "+disabledlinkstart+"page=1'>First</a></li>";
                pagesToAppend +="<li class='page-item"+disabledatstart+"' id='previous'><a class='page-link' "+disabledlinkstart+"page="+previousIndex+"'>Previous</a></li>";
                
                //check if the number of pages is smaller than the max that can be displayed
                if(numberOfPages <= 3)
                {
                    for (i = 1; i <= numberOfPages; i++)
                    {
                        if(i == curentpage)
                        {
                            pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                        }
                        else
                        {
                            pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                        }
                    }
                }
                else //number of pages bigger than 3
                {
                    //condition if current page is equal to 1 so it display only the first 3 pages
                    if(curentpage == 1)
                    {
                        for (i = 1; i <= 3; i++)
                        {
                            if(i == curentpage)
                            {
                                pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                            }
                            else
                            {
                                pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                            }
                        }
                    }
                    //condition if current page is bigger or equal to last 3  pages
                    else if(curentpage == numberOfPages)
                    {
                        for (i = numberOfPages - 2; i <= numberOfPages; i++)
                        {
                            if(i == curentpage)
                            {
                                pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                            }
                            else
                            {
                                pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                            }
                        }
                    }
                    //condition if current page is between last and first
                    else
                    {
                        for (i = parseInt(curentpage) - 1; i <= parseInt(curentpage) + 1; i++)
                        {
                            if(i == curentpage)
                            {
                                pagesToAppend +="<li class='page-item disabled' id='"+i+"'><a class='page-link' >"+i+"</a></li>";
                            }
                            else
                            {
                                pagesToAppend +="<li class='page-ite' id='"+i+"'><a class='page-link' href='"+link+"page="+i+"'>"+i+"</a></li>";
                            }
                        }
                    }
                }

                
                //append the last and the next page
                pagesToAppend +="<li class='page-item"+disabledatend+"' id='next'><a class='page-link' "+disabledlinkend+"page="+nextIndex+"'>Next</a></li>";
                pagesToAppend +="<li class='page-item"+disabledatend+"' id='last'><a class='page-link' "+disabledlinkend+"page="+numberOfPages+"'>Last</a></li>";
                

                //append to pages list
                $(".pagination").append(pagesToAppend);
                getEmployees(wsKeyword(), wsOrder(), wsShowOrders(), wsRank(), wsWorkstation(), curentpage);
            }
    }

    //Populate items
	function getEmployees(key, sort, show, rank, wrks, page)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({op : 2, key : key, sort : sort, show : show, rank : rank, wrks : wrks, page: page}),
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr)
            {
                if(data < 0)
                {
                    alert("Couldn't get your employees");
                }
                else
                {
                    displayEmployees(data);
                }
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert(status +" "+ errorThrown);				  
            }
        });
    }

    function displayEmployees(data)
    {
        if(data == 0)
            {
                $('.tbody_users').children().remove();
                $('.tbody_users').children().append('<h5>No orders found</h5>');
            }
        else
            {
                $.each(data, function(index, row){
                    $("#tbody_users").append('<tr><td>'+row.emp_ssn+'</td><td value="'+row.emp_cmp_id+'">'+row.cmp_name+'</td><td>'+row.emp_name+'</td><td>'+row.emp_lname+'</td><td>'+row.emp_ph_nb+'</td><td class="emp_address_td">'+row.emp_address+'</td><td>'+row.emp_join_date+'</td><td value="'+row.emp_wrkst_id+'">'+row.wrkst_name+'</td><td value="'+row.emp_rank_id+'">'+row.emp_rank_name+'</td><td>'+row.emp_fouls+'</td><td>'+row.emp_rfid+'</td><td value="'+row.emp_status+'">'+convertStatusToText(row.emp_status)+'</td><td id="emp'+row.emp_id+'"><button type="button"  style="margin-right: 4px;" class="btn btn-primary btn_edit_employee" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button><button class="btn btn-primary btn_toogle_active">Toggle</button></td></tr>');
                });
            }
		
		getCompanies();
    }
	
	function convertStatusToText(status)
	{
		if(status == 1)
			{
				return "Active";
			}
		else
			{
				return "Unactive";
			}
	}


//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("employees.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
    });
	
	///////////////////////////////////////////dortint header///////////////////////////
	$("#namesortheader").click(function(){
		var sortorder = $(this).attr('value');

		if(sortorder == 1)
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=1" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
		else
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=2" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
	});
	
	$("#lastnamesortheader").click(function(){
		var sortorder = $(this).attr('value');
		if(sortorder == 1)
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=3" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
		else
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=4" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
	});
	
	$("#datesortheader").click(function(){
		var sortorder = $(this).attr('value');
		if(sortorder == 1)
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=5" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
		else
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=6" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
	});
	
	$("#foulssortheader").click(function(){
		var sortorder = $(this).attr('value');
		if(sortorder == 1)
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=7" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
		else
			{
				window.location.replace("employees.php?key=" + wsKeyword() + "&sort=8" + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
			}
	});
	
	
	

    $("#showbystatus").change(function () {
        window.location.replace("employees.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
    });
	
	
    $("#rankorder").change(function () {
        window.location.replace("employees.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
    });

    $("#workstationorder").change(function () {
        window.location.replace("employees.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
    });

    $("#clearfilters").click(function () {
        window.location.replace("employees.php?key=&sort=1&show=0&rank=-1&wrks=-1&page=1");
    });

    //seachbutton click funtion
    $("#searchbutton").click(function () {
        window.location.replace("employees.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
    });
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	//get category function
	function getCompanies()
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_company.php",
            data: ({op : 1}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 1)
                {
                    alert("No companies available");
                }
                else
                {
                    populateCompanies(data);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
    }
    
    // fill the category functionl
    function populateCompanies(data)
    {
        $.each(data, function(index, row){
            $("#emp_company").append('<option value="'+row.cmp_id+'">'+row.cmp_name+'</option>');
        });
    }
	
	
	$(document).on("click", "#btn_modal_cusers", function(){
		$("#editadd").text("Add Employee");
		$("#editaddval").val(1);
	});
	
	$(document).on("click", ".btn_edit_employee", function(){

		$("#editadd").text("Edit Employee");
		
		var empSSN = $(this).parent().siblings().eq(0).text();
		var empCompany = $(this).parent().siblings().eq(1).attr("value");
		var empName = $(this).parent().siblings().eq(2).text();
		var empLname = $(this).parent().siblings().eq(3).text();
		var empNumber = $(this).parent().siblings().eq(4).text();
		var empAddress = $(this).parent().siblings().eq(5).text();
		var empWorkstation = $(this).parent().siblings().eq(7).attr("value");
		var empRank = $(this).parent().siblings().eq(8).attr("value");
		var empFouls = $(this).parent().siblings().eq(9).text();
		var empRFID = $(this).parent().siblings().eq(10).text();
		var empID =  $(this).parent().attr("id").substr(3);
		var actionValue = 0;

		$("#emp_ssn").val(empSSN);
		$("#emp_company").val(empCompany);
		$("#emp_name").val(empName);
		$("#emp_lname").val(empLname);
		$("#emp_pnum").val(empNumber);
		$("#emp_address").val(empAddress);
		$("#emp_wrks").val(empWorkstation);
		$("#emp_rank").val(empRank);
		$("#emp_fouls").val(empFouls);
		$("#emp_rfid").val(empRFID);
		$("#emp_id").val(empID);
		$("#editaddval").val(actionValue);
		
	});
	
	$(document).on("click", "#btn_create_emp", function(){
		
		var empSSN = $("#emp_ssn").val();
		var empCompany = $("#emp_company").val();
		var empName = $("#emp_name").val();
		var empLname = $("#emp_lname").val();
		var empNumber = $("#emp_pnum").val();
		var empAddress = $("#emp_address").val();
		var empWorkstation = $("#emp_wrks").val();
		var empRank = $("#emp_rank").val();
		var empFouls = $("#emp_fouls").val();
		var empRFID = $("#emp_rfid").val();
		var empID =  $("#emp_id").val();
		var actionValue = $("#editaddval").val();
		
		
		if(empSSN == "" || empCompany == "" || empName == "" || empLname == "" || empNumber == "" || empAddress == "" || empWorkstation == "" || empRank == "" || empFouls == "" || empRFID == "")
			{
				$(".modal-footer #wrong").show();
                $(".modal-content p").show();
				return;
			}
		
		if(actionValue == 1)
			{
				addEmployee(empSSN, empCompany, empName, empLname, empNumber, empAddress, empWorkstation, empRank, empFouls, empRFID);
			}
		else
			{
				updateEmployee(empID, empSSN, empCompany, empName, empLname, empNumber, empAddress, empWorkstation, empRank, empFouls, empRFID);
			}
	});
	
	$(document).on("click", "#close_add_form", function(){
		clearForm();
	});
	
	$(document).on("click", "#modalXbutt", function(){
		clearForm();
	});
	
	
	function clearForm()
	{
		$("#emp_ssn").val("");
		$("#emp_company").val($("#emp_company option:first").val());
		$("#emp_name").val("");
		$("#emp_lname").val("");
		$("#emp_pnum").val("");
		$("#emp_address").val("");
		$("#emp_wrks").val($("#emp_wrks option:first").val());
		$("#emp_rank").val($("#emp_rank option:first").val());
		$("#emp_fouls").val(0);
		$("#emp_rfid").val("");
		$("#emp_id").val(-1);
		$("#editaddval").val(1);
		$("#editadd").text("ADD");
	}
	

	function addEmployee(empSSN, empCompany, empName, empLname, empPnum, empAddress, empWorkstation, empRank, empFouls, empRFID)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({op : 3, empSSN : empSSN, empCompany: empCompany, empName: empName, empLname: empLname, empPnum: empPnum, empAddress: empAddress, empWorkstation: empWorkstation, empRank: empRank, empFouls: empFouls, empRFID: empRFID}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 1)
                {
                    alert("couldn't add employee");
                }
                else
                {
                    $("#success").show();
                    setTimeout(function(){location.reload()}, 1000);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
    }
	
	

	function updateEmployee(empID, empSSN, empCompany, empName, empLname, empPnum, empAddress, empWorkstation, empRank, empFouls, empRFID)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({op : 4, empID : empID, empSSN : empSSN, empCompany: empCompany, empName: empName, empLname: empLname, empPnum: empPnum, empAddress: empAddress, empWorkstation: empWorkstation, empRank: empRank, empFouls: empFouls, empRFID: empRFID}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't update employee");
                }
                else
                {
                    $("#success").show();
                    setTimeout(function(){location.reload()}, 1000);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
    }
	
	$(document).on("click", ".btn_toogle_active", function(){
		var empID =  $(this).parent().attr("id").substr(3);
		var cell = $(this).parent().siblings().eq(11)
		var empStatus = cell.text();
		var empStatConverted;
		if(empStatus == "Active")
			{
				empStatConverted = 0;
			}
		else
			{
				empStatConverted = 1;
			}
		
		toggleEmployee(empID, empStatConverted, cell);
	});
	
	
	function toggleEmployee(empID, empStatus, cell)
    {
        $.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({op : 5, empID : empID, empStatus : empStatus}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't update employee");
                }
                else
                {
					if(empStatus == 1)
						{
							cell.text("Active");
						}
					else
						{
							cell.text("Banned");
						}
                    
                } 
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
    }


	$("#btn_rank_page").click(function(){
		window.location.href = "ranks.php";
	});
	
	
	
	
	
	//rfid scan functionality///////////////////////////////////////////////////////////////////////
	var canScan = false;
	
	$("#btn_modal_cusers").click(function(){
		if(!canScan)
			{
				canScan = true;
			}
	});
	
	$(document).on("click", ".btn_edit_employee", function(){
		if(!canScan)
			{
				canScan = true;
			}
	});
	
	$("#close_add_form").click(function(){
		if(canScan)
			{
				canScan = false;
			}
	});
	
	$("#modalXbutt").click(function(){
		if(canScan)
			{
				canScan = false;
			}
	});
	
	
	
	
	setInterval(ArduinoCall, 1000);
    
    function ArduinoCall() {
		if(canScan)
			{
			$.ajax({
				type: 'GET',
				url: "./ws/arduino_interface.php",
				data: ({ op : 1}),
				dataType: 'json',
				timeout: 800,
				success: function (data, textStatus, xhr) {
					if (data != 0 && data != "0" && data != "") {
						$("#emp_rfid").val(data);
					}
				},
				error: function (xhr, status, errorThrown) {
					// Do nothing
				}
			});
		}
	}
	
	
	
});