$(document).ready(function(){

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
        interval = 1;
       if(interval == !null)
       {
           interval = setInterval(ArduinoCall, 1000);
       }
        
    })

    $('.close').click(function(){
        window.clearInterval(interval);
        interval = null;
    })

});