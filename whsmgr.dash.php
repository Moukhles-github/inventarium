<!DOCTYPE html>
<html lang="en">
<?php

$pageUserType = 1;
require_once("security.php");


?>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>My Dashboard</title>

	<link rel="stylesheet" href="./css/whs.mgr.dash.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="./js/managerstats.js"></script>


	<script type="text/javascript">
		$(document).ready(function() {


			MonthlyRequests($("#tbmgrid").val());
			//add get year chart
			function MonthlyRequests(whmid) {
				$.ajax({
					type: 'GET',
					url: "ws/ws_request.php",
					data: ({
						op: 22,
						mgr_id: whmid
					}),
					dataType: 'json',
					timeout: 5000,
					success: function(data, textStatus, xhr) {

						if (data < 0) {
							alert("Something went wrong!");
						} else if (data == 0) {
							$("#columnchart_values").append('<h5>No Data!</h5>')
						} else {
							var counter = 1;

							var arrayOfData = [
								['Month', 'Successful', 'Denied']
							];

							$.each(data, function(index, row) {

								arrayOfData[counter] = ([row.mnthName, parseInt(row.totalReturned), parseInt(row.totalDenied)]);

								counter++;
							});


							google.charts.load('current', {
								'packages': ['bar']
							});
							google.charts.setOnLoadCallback(drawChart);

							function drawChart() {
								var data = google.visualization.arrayToDataTable(arrayOfData);

								var options = {
									chart: {
										title: 'Requests Statistics',
										subtitle: 'Finished, and denied requests',
									},
									backgroundColor: '#f6f7f9'

								};

								var chart = new google.charts.Bar(document.getElementById('columnchart_values'));

								chart.draw(data, google.charts.Bar.convertOptions(options));
							}



						}
					},
					error: function(xhr, status, errorThrown) {
						alert(status + " " + errorThrown);
					}
				});
			}




		});
	</script>

</head>



<body>
	<input type="text" id="tbmgrid" value="<?php echo $_SESSION['uid'] ?>"></input>
	<nav class="navbar navbar-inverse navbar-global navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Pyramid Engineering</a>
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-user navbar-right">
					<li><a href=""><span class="glyphicon glyphicon-user"></span> Manager user name</a></li>
					<li><a href="./ws/ws_users.php?op=6"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</nav>
	<nav class="navbar-primary">
		<ul class="navbar-primary-menu">
			<li>
				<a href="whsmgr.dash.php"><i class="fas fa-chart-line"></i><span class="nav-label">  Dashboard</span></a>
				<a href="whsmgr.rqst.php"><i class="fab fa-buffer"></i><span class="nav-label">  Requests</span></a>
				<a href="whsmgr.warehouse.php"><i class="fas fa-warehouse"></i><span class="nav-label">  My Warehouse</span></a>


			</li>
		</ul>
	</nav>
	<div class="main-content">

		<h1> Statistics </h1>

		<div class="grid-container">
			<div class="grid-item item1">
				<h3>Quick Stats</h3>
				<br />
				<ul>
					<li>
						<p id="qs1">Items:</p></li>
					<li>
						<p id="qs2">Taken item:</p></li>
					<li>
						<p id="qs3">Broken items:</p></li>
				</ul>
			</div>

			<div class="grid-item item2">
				<h3>Activities</h3>
				<br />
				<ul>
				<li><p id="act2">Handled Requests:</p></li>
				<li><p id="act3">Workstation with most Requests: </p></li>
				<li><p id="act4">Average Daily Requests:</p></li>
				<li><p id="act5">Average Monthly Approved Request:</p></li>
				<li><p id="act6">Average Monthly Denied Requests:</p></li>
			</div>

			<div class="grid-item item4">
				<h3>Monthly Requests for the current year</h3>
				<div id="columnchart_values" style="height: 400px;"></div>
			</div>


		</div>

	</div>
</body>

</html>