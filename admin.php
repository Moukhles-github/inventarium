<!DOCTYPE html>
<html lang="en">
<!-- Set Session -->
<?php
$pageUserType = 0;
require_once("security.php");
?>

<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>My Dashboard</title>
	<!-- CSS -->
	<link rel="stylesheet" href="css/admin.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
	
	<!-- JS -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="./js/admin.js"></script>


	<script type="text/javascript">
		$(document).ready(function() {

			MonthlyEmployees();
			//add month chart
			function MonthlyEmployees() {
				$.ajax({
					type: 'GET',
					url: "ws/ws_employees.php",
					data: ({
						op: 8
					}),
					dataType: 'json',
					timeout: 5000,
					success: function(data, textStatus, xhr) {
						if (data < 0) {
							alert("Something went wrong!");
						} else if (data == 0) {
							$("#curve_chart").append('<h5>No Data!</h5>')
						} else {
							var counter = 1;

							var arrayOfData = [
								['Month', 'Total']
							];


							$.each(data, function(index, row) {

								arrayOfData[counter] = ([row.MNTH, parseInt(row.total)]);
								counter++;
							});

							google.charts.load('current', {
								'packages': ['corechart']
							});
							google.charts.setOnLoadCallback(drawChart);

							function drawChart() {

								var data = google.visualization.arrayToDataTable(arrayOfData);

								var options = {
									title: 'Total employees joined per month:',
									curveType: 'function',
									legend: {
										position: 'bottom'
									},
									colors: ['red', '#004411', 'Black'],
									backgroundColor: '#f6f7f9',
									is3D: true
								};

								var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

								chart.draw(data, options);
							}

						}
					},
					error: function(xhr, status, errorThrown) {
						alert(status + " " + errorThrown); //JSON.parse(data)  [{"Sales":"7","Date":"2018-12-16 16:23:14"},{"Sales":"7","Date":"2018-12-19 15:40:24"}]
					}
				});
			}

			MonthlyRequests();
			//add get year chart
			function MonthlyRequests() {
				$.ajax({
					type: 'GET',
					url: "ws/ws_request.php",
					data: ({
						op: 15
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


			employeesPerComp();
			//add users subscription per year
			function employeesPerComp() {
				$.ajax({
					type: 'GET',
					url: "ws/ws_employees.php",
					data: ({
						op: 9
					}),
					dataType: 'json',
					timeout: 5000,
					success: function(data, textStatus, xhr) {
						if (data < 0) {
							alert("Something went wrong!");
						} else if (data == 0) {
							$("#piechart").append('<h5>No Data!</h5>')
						} else {
							var counter = 1;

							var arrayOfData = [
								['Company Name', 'Employees']
							];

							$.each(data, function(index, row) {

								arrayOfData[counter] = ([row.cmp_name, parseInt(row.total)]);

								counter++;
							});

							google.charts.load("current", {
								packages: ["corechart"]
							});
							google.charts.setOnLoadCallback(drawChart);

							function drawChart() {
								var data = google.visualization.arrayToDataTable(arrayOfData);

								var options = {
									title: 'Company Employment',
									pieHole: 0.4,
									backgroundColor: '#f6f7f9'
								};

								var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
								chart.draw(data, options);
							}


						}
					},
					error: function(xhr, status, errorThrown) {
						alert(status + " " + errorThrown);
					}
				});
			}


			employeesPerYear();
			//add users subscription per year
			function employeesPerYear() {
				$.ajax({
					type: 'GET',
					url: "ws/ws_employees.php",
					data: ({
						op: 10
					}),
					dataType: 'json',
					timeout: 5000,
					success: function(data, textStatus, xhr) {
						if (data < 0) {
							alert("Something went wrong!");
						} else if (data == 0) {
							$("#piechart1").append('<h5>No Data!</h5>')
						} else {
							var counter = 1;

							var arrayOfData = [
								['Year', 'Employees']
							];

							$.each(data, function(index, row) {

								arrayOfData[counter] = ([row.joinyear, parseInt(row.total)]);

								counter++;
							});

							google.charts.load("current", {
								packages: ["corechart"]
							});
							google.charts.setOnLoadCallback(drawChart);

							function drawChart() {
								var data = google.visualization.arrayToDataTable(arrayOfData);

								var options = {
									title: 'Yearly Employment',
									colors: ['#004080', '#778899', 'Blue'],

									backgroundColor: '#f6f7f9'
								};

								var chart = new google.visualization.PieChart(document.getElementById('donutchart1'));
								chart.draw(data, options);
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
	<!-- Nav bar -->
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
					<li><a href="#"><span class="glyphicon glyphicon-user"></span> <?php if (isset($_SESSION['uname'])) echo $_SESSION['uname'] ?></a></li>
					<li><a href="./ws/ws_users.php?op=6"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</nav>
	<nav class="navbar-primary">
		
		<ul class="navbar-primary-menu">
			<li>
				<a href="admin.php" class='active'><i class="fas fa-chart-line "></i><span class="nav-label">  Dashboard</span></a>
				<a href="company.php"><i class="fas fa-industry"></i></span><span class="nav-label">  Company</span></a>
				<a href="users.php"><i class="fas fa-users"></i></span><span class="nav-label">  Users</span></a>
				<a href="employees.php"><i class="fas fa-people-carry"></i></i></span><span class="nav-label">  Employees</span></a>
				<a href="warehouse.php"><i class="fas fa-warehouse"></i></span><span class="nav-label">  Warehouse</span></a>
				<a href="workstation.php"><i class="far fa-building"></i></span><span class="nav-label">  Workstations</span></a>
				<a href="request.php"><i class="fab fa-buffer"></i></span><span class="nav-label">  Requests</span></a>

			</li>
		</ul>
	</nav>
	<div class="main-content">
		<!-- Body Content -->
		<h1> Statistics </h1>

		<div class="grid-container">
			<div class="grid-item item1">
				<h3>Quick Stats</h3>
				<br />
				<ul>
				<li><p id="qs1">Company:</p></li>
				<li><p id="qs2">Users:</p></li>
				<li><p id="qs3">Employees:</p></li>
				<li><p id="qs4">Workstations:</p></li>
				<li><p id="qs5">Warehouses:</p></li>
	</ul>
			</div>

			<div class="grid-item item2">
				<h3>Activities</h3>
				<br />
				<ul>
				<li><p id="act1">Manager with most reqests:</p></li>
				<li><p id="act2">Active Requests:</p></li>
				<li><p id="act3">Workstation with most Requests: </p></li>
				<li><p id="act4">Average Daily Requests:</p></li>
				<li><p id="act5">Average Monthly Approved Request:</p></li>	
				<li><p id="act6">Average Monthly Denied Requests:</p></li>
				</ul>
			</div>

			<div class="grid-item item3">
				<h3>Monthly joining employees for the current Year</h3>
				<div id="curve_chart" style="height: 400px;"></div>
			</div>
			<div class="grid-item item4">
				<h3>Monthly Requests for the current year</h3>
				<div id="columnchart_values" style="height: 400px;"></div>
			</div>
			<div class="grid-item item5">
				<h3>Employee joined Yearly</h3>
				<div id="donutchart1" style="height: 400px;"></div>
			</div>
			<div class="grid-item item6">
				<h3>Employees joined by company</h3>
				<div id="donutchart" style="height: 400px;"></div>
			</div>
		</div>

	</div>
</body>

</html>