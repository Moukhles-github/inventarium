$(document).ready(function(){

	getCompaniesCount();

	function getCompaniesCount()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_company.php",
            data: ({op : 7}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#qs1").text("Companies: Active "+ data[1]["cmpNB"] + " | Inactive " + data[0]["cmpNB"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	
	getEmployeesByStat();

	function getEmployeesByStat()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_employees.php",
            data: ({op : 7}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#qs3").text("Employees: Active "+ data[1]["empNB"] + " | Inactive " + data[0]["empNB"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getUsersByStat();

	function getUsersByStat()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_users.php",
            data: ({op : 13}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#qs2").text("Users: Active "+ data[1]["usrNB"] + " | Inactive " + data[0]["usrNB"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getWorkstationsByStat();

	function getWorkstationsByStat()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({op : 9}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#qs4").text("Workstations: Active "+ data[1]["wrksNB"] + " | Inactive " + data[0]["wrksNB"]);

                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getWarehousesByStat();

	function getWarehousesByStat()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_warehouse.php",
            data: ({op : 10}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#qs5").text("Warehouses: Active "+ data[1]["whrNB"] + " | Inactive " + data[0]["whrNB"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getMostRequestedUser();

	function getMostRequestedUser()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_users.php",
            data: ({op : 14}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#act1").text("Manager with most reqests: " + data[0]["Fname"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}

	
	
	getActiveRequests();

	function getActiveRequests()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 11}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#act2").text("Active Requests: " + data[0]["cnt"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getWorkstationWithMostRequests();

	function getWorkstationWithMostRequests()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_workstations.php",
            data: ({op : 10}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
                    $("#act3").text("Workstation with most Requests: " + data[0]["cnt"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getAverageDailyRequests();

	function getAverageDailyRequests()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 12}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
					var avg = parseFloat(data[0]["avgCnt"]);
                    $("#act4").text("Average Daily Requests: " + avg.toFixed(1));
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	
	getAverageDailyAcceptedRequests();

	function getAverageDailyAcceptedRequests()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 13}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
					var avg = parseFloat(data[0]["avgCnt"]);
                    $("#act5").text("Average Monthly Approved Request: " + avg.toFixed(1));
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	
	getAverageDailyDeniedRequests();

	function getAverageDailyDeniedRequests()
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 14}), 
            dataType: 'json',
            timeout: 5000,
            success: function(data, textStatus, xhr) 
            {
                if(data < 0)
                {
                    alert("couldn't get data");
                }
                else
                {
					var avg = parseFloat(data[0]["avgCnt"]);
                    $("#act6").text("Average Monthly Denied Requests: " + avg.toFixed(1));
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}

});