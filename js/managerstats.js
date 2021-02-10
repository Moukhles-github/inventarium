$(document).ready(function(){
 var managerId=$("#tbmgrid").val();
	
	getItemsCount(managerId);

	function getItemsCount(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({op : 8, mgr_id : whmid}), 
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
                    $("#qs1").text("Items: "+ data[0]["cnt"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	
	getItemsByStat(managerId);

	function getItemsByStat(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({op : 9, mgr_id : whmid}), 
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
                    $("#qs2").text("Taken Items: "+ data[0]["cnt"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getBrokenItemsByStat(managerId);

	function getBrokenItemsByStat(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_item.php",
            data: ({op : 10, mgr_id : whmid}), 
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
                    $("#qs3").text("Broken Items: "+ data[0]["cnt"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}

	
	

	
	
	getHanledRequests(managerId);

	function getHanledRequests(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 17, mgr_id : whmid}), 
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
                    $("#act2").text("Handled Requests: " + data[0]["cnt"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getHanledRequestsbyWorkstation(managerId);

	function getHanledRequestsbyWorkstation(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 18, mgr_id : whmid}), 
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
                    $("#act3").text("Workstation with most Requests: " + data[0]["wrkst_name"]);
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	getAverageDailyRequests(managerId);

	function getAverageDailyRequests(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 19, mgr_id : whmid}), 
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
					if(! isNaN(avg))
						{
                    		$("#act4").text("Average Daily Requests: " + avg.toFixed(1) );
						}
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	
	getAverageDailyAcceptedRequests(managerId);

	function getAverageDailyAcceptedRequests(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 20, mgr_id : whmid}), 
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
					if(! isNaN(avg))
						{
                    		$("#act5").text("Average Monthly Approved Request: " + avg.toFixed(1));
						}
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}
	
	
	
	getAverageDailyDeniedRequests(managerId);

	function getAverageDailyDeniedRequests(whmid)
	{
		$.ajax({
            type: 'GET',
            url: "ws/ws_request.php",
            data: ({op : 21, mgr_id : whmid}), 
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
					if(! isNaN(avg))
						{
                    		$("#act6").text("Average Monthly Denied Requests: " + avg.toFixed(1));
						}
                }  
            },
            error: function(xhr, status, errorThrown) 
            {				  
                alert("Error" + status + errorThrown);				  
            }
        });
	}

});