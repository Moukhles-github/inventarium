<!DOCTYPE html>
<html lang="en">
<?php 

$pageUserType = 0;
require_once ("security.php");


?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Requests</title>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />

    <link rel="stylesheet" href="css/request.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/request.js"></script>


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
		<a href="#" class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
		<ul class="navbar-primary-menu">
			<li>
				<a href="admin.php"><i class="fas fa-chart-line"></i><span class="nav-label">  Dashboard</span></a>
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
        <h1> Requests</h1>


        <?php
			
			//get initial values
			$sort = "1";
			$show = "0";
			$rank = "-1";
			$workstation = "-1";
            $keyy = "";
			//check if sort order is set
			if(isset($_GET["sort"]) && ($_GET["sort"] != ""))
			{
				$sort = $_GET["sort"];
            }
            
			//check if show option is set
			if(isset($_GET["show"]) && ($_GET["show"] != ""))
			{
				$show = $_GET["show"];
            }
		
			//initial date values
			$startdate = "";
			$enddate = "";

			//check if start date is set
			if(isset($_GET["sdate"]) && ($_GET["sdate"] != ""))
			{
				$startdate = $_GET["sdate"];
			}
			//check if end date is set
			if(isset($_GET["edate"]) && ($_GET["edate"] != ""))
			{
				$enddate = $_GET["edate"];
			}

                        
			//check if workstation option is set
			if(isset($_GET["key"]) && ($_GET["key"] != ""))
			{
				$keyy = $_GET["key"];
            }

			//create 2 hidden inputs to hold the selected order because the selected value cannot be set directly from the pphp function
			echo('<input type="hidden" class="sortlisthidden" id="sort'.$sort.'"><input type="hidden" class="showlisthidden" id="show'.$show.'"><input type="hidden" class="rankhidden" id="rank'.$rank.'"><input type="hidden" class="workstationlisthidden" id="workstation'.$workstation.'">');

        ?>

        <div class="sortandfilterhead" style="height: 90px;">
            <div style="float: left">
                <div class='form-group'>
                    <div class="form-group">
<!--
                        <label for="order" style='margin-right: 10px'>Sort By:</label>
                        <select class="form-control" id="sortorder" style='width: 180px; margin-right: 20px;'>
                            <option value="1">UserName Asc</option>
                            <option value="2">UserName Desc</option>
                            <option value="3">Name Asc</option>
                            <option value="4">Name Desc</option>
                        </select>
-->
                    </div>
                </div>
            </div>

            <div style="float: left">
                <div class='form-group'>
                    <div class="form-group">
                        <label for="order" style='margin-right: 10px'>Show Requests:</label>
                        <select class="form-control" id="showbystatus" style='width: 180px; margin-right: 20px;'>
                            <option value="0">All</option>
                            <option value="1">Waiting</option>
                            <option value="2">Accepted</option>
                            <option value="3">Handled</option>
                            <option value="4">Returned</option>
                        </select>
                    </div>
                </div>
            </div>


            <div style="float: left">
				<div class='form-group' >
					<div class="form-group" style="width: 200px;">
					  <label for="order" style='margin-right: 10px'>Search:</label>
					  
						<input type="text" class="searchbar form-control" placeholder="Search.." value="<?php echo $keyy ?>"></input>
						         		
            		</div>
            		
            	</div>
            </div>
            
            <div style="float: left; margin-left: 20px">
				<div class='form-group' style="float: left; margin-right: 5px;">
					<label for="order" style='margin-right: 10px'>From:</label>		
					<?php
						echo('<input class="form-control datepicker" type="date" id="startdate" value="'.$startdate.'">');
					?>
				</div>
				<div class='form-group' style="float: left">
					<label for="order" style='margin-right: 10px'>To:</label>
					<?php
						echo('<input class="form-control datepicker" type="date" id="enddate" value="'.$enddate.'">');
					?>
				</div>
			</div>
            
            <div style="float: left; height: 74px; margin-left: 20px">
            	<div class='form-group' >
					 <div class="form-group">
					 	<button id="searchbutton" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;"><i class="fas fa-search"></i></button>
						<button id="clearfilters" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;">Clear</button>
					</div>
           		</div>
			</div>
       
        </div>


        <!-- more info request modal  -->
       <div class="modal fade" id="rqstinfomodal" tabindex="-1" role="dialog" aria-labelledby="rqstinfomodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
			
                    <div class="modal-body">
                     <ul id="rqstinfoul"></ul>
                     

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>

        <table class="table" style="margin-top: 10px; margin-left: 20px; margin-right: 20px; width: 100%">


            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">item</th>
                    <th scope="col">Facility</th>
                    <th  value="
                    <?php 
					if($sort == 1)
					{
						echo 0;
					}
					else if ($sort == 2)
					{
						echo 1;
					}
					else
					{
						echo 1;
					}
					?>
                    " id="datesortheader" scope="col">Date<img style="height: 12px; width: 10px; float: left; margin-top: 4px; margin-right: 4px;" src="media/Images/arrows.png"></th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody id="tbody_rqst">

            </tbody>

        </table>
        <?php
        /////////////////////pagination//////////////////////

        //check if the on the first page
        if (isset($_GET["page"])) {
            $page = $_GET["page"];
        } else {
            $page = 1;
        }
        //display the pages
        echo ("<br/><br/>
				<div class='pages' style='width: 100%;text-align: center;'>
					 <div style='display: inline-block;'>
						<ul class='pagination'>
							<li class='page-item' style='display: none;' id='" . $page . "'></li>
						</ul>
					</div>
				</div>
			");
        /////////////////////pagination//////////////////////
        ?>
    </div>

</body>

</html>