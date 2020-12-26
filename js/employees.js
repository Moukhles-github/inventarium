$(document).ready(function(){
	
	//call the set values function to automaticaly select values
	setValues();
	
	//set sort and sow values from pre set values
	function setValues()
	{
		var sortOrderId = $(".sortlisthidden").attr('id');
		var sortOrder = sortOrderId.substring(4);
		//set selected
		$("#sortorder option[value="+sortOrder+"]").attr('selected', 'selected');
		
		
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
		return $("#sortorder").val();
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
                    $("#tbody_users").append('<tr><td>'+row.emp_ssn+'</td><td>'+row.emp_cmp_id+'</td><td>'+row.emp_name+'</td><td>'+row.emp_lname+'</td><td>'+row.emp_ph_nb+'</td><td>'+row.emp_address+'</td><td>'+row.emp_join_date+'</td><td>'+row.emp_wrkst_id+'</td><td>'+row.emp_rank_id+'</td><td>'+row.emp_fouls+'</td><td>'+row.emp_rfid+'</td><td>'+row.emp_status+'</td><td><button>1</button><button>2</button></td></tr>');
                });
            }
    }


//////////////////////////////////////////////////////////////////////////pagination///////////////////////////////////////////////////////////////



    $("#sortorder").change(function () {
        window.location.replace("employees.php?key=" + wsKeyword() + "&sort=" + wsOrder() + "&show=" + wsShowOrders() + "&rank=" + wsRank() + "&wrks=" + wsWorkstation() + "&page=1");
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

});