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
    <title>My Employees</title>

    <link rel="stylesheet" href="./css/employees.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="./js/employees.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />

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
        <h1> Employees </h1>

        <!-- Button trigger modal -->
        <button id="btn_modal_cusers" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Create Employee <i id="crt_sign" class="fas fa-plus-square"></i>
        </button>
        
        <button id="btn_rank_page" type="button" class="btn btn-primary" data-toggle="modal">
            Rank
        </button>


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
            
			//check if rank option is set
			if(isset($_GET["rank"]) && ($_GET["rank"] != ""))
			{
				$rank = $_GET["rank"];
			}
            
			//check if workstation option is set
			if(isset($_GET["wrks"]) && ($_GET["wrks"] != ""))
			{
				$workstation = $_GET["wrks"];
            }

                        
			//check if workstation option is set
			if(isset($_GET["key"]) && ($_GET["key"] != ""))
			{
				$keyy = $_GET["key"];
            }

			//create 2 hidden inputs to hold the selected order because the selected value cannot be set directly from the pphp function
			echo('<input type="hidden" class="sortlisthidden" id="sort'.$sort.'"><input type="hidden" class="showlisthidden" id="show'.$show.'"><input type="hidden" class="rankhidden" id="rank'.$rank.'"><input type="hidden" class="workstationlisthidden" id="workstation'.$workstation.'">');

        ?>
        
        <div class="sortandfilterhead" style="height: 90px; margin-top: 30px;" >
			<div style="float: left">
				<div class='form-group' >
					 <div class="form-group">
<!--
					  <label hidden="true" for="order" style='margin-right: 10px'>Sort By:</label>
					  <select  class="form-control"  id="sortorder" style='width: 180px; margin-right: 20px;'>
						<option value="1">Name Asc</option>
                        <option value="2">Name Desc</option>
                        <option value="3">Last Name Asc</option>
						<option value="4">Last Name Desc</option>
						<option value="5">Join Date Asc</option>
						<option value="6">Join Date Desc</option>
						<option value="7">Fouls Asc</option>
						<option value="8">Fouls Desc</option>
					  </select>
-->
					</div> 
				</div>
			</div>
			
			<div style="float: left">
				<div class='form-group' >
					 <div class="form-group">
					  <label for="order" style='margin-right: 10px'>Show Employees:</label>
					  <select class="form-control" id="showbystatus" style='width: 180px; margin-right: 20px;'>
					  	<option value="0">All</option>
						<option value="1">Active</option>
						<option value="2">Not Active</option>
					  </select>
					</div>
				</div>
            </div>
            
            <div style="float: left">
				<div class='form-group' >
					 <div class="form-group">
					  <label for="order" style='margin-right: 10px'>Rank:</label>
					  <select class="form-control" id="rankorder" style='width: 180px; margin-right: 20px;'>
					  	<option value="-1">All</option>
					  </select>
					</div>
				</div>
            </div>
            
            <div style="float: left">
				<div class='form-group' >
					 <div class="form-group">
					  <label for="order" style='margin-right: 10px'>From Workstation:</label>
					  <select class="form-control" id="workstationorder" style='width: 180px; margin-right: 20px;'>
					  	<option value="-1">All</option>
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
            
            <div style="float: left; height: 74px; margin-left: 20px">
            	<div class='form-group' >
					 <div class="form-group">
					 	<button id="searchbutton" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;"><i class="fas fa-search"></i></button>
						<button id="clearfilters" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;">Clear</button>
					</div>
           		</div>
			</div>
            
            
            
        </div>
        <!-- Modal -->
         <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    
                    <div class="modal-body">
						<h4 id="editadd">Add</h4>
                        <label>Social Security Number:</label>
                        <input type="text" id="emp_ssn" placeholder="e.g. 000000000"></input></br>
                        <label>Company:</label>
                        <select id="emp_company"></select></br>
                        <label>Employee Name:</label>
                        <input type="text" id="emp_name" placeholder="e.g Moukhles"></input></br>
                        <label>Employee Last Name:</label>
						<input type="text" id="emp_lname" placeholder="e.g Nicolas"></input></br>
                        <label>Phone Number:</label>
						<input type="text" id="emp_pnum" placeholder="e.g 71000000"></input></br>
                        <label>Address:</label>
						<input type="text" id="emp_address" placeholder="e.g Zgharta, Besebel..."></input></br>
						<label>Workstation:</label>
						<select id="emp_wrks"></select></br>
						<label>Rank:</label>
						<select id="emp_rank"></select></br>
						<label hidden>Fouls:</label>
						<input type="number" id="emp_fouls" value="0" hidden></input></br>
						<label>RFID:</label>
						<input type="text" id="emp_rfid" ></input></br>
						<input type="number" hidden="" id="emp_id">
						<input type="number" hidden="" id="editaddval">
						<p id="wrongmsg">Fill All Fields!</p>
						



                    </div>
                    <div class="modal-footer">
					<i id="success" class="fas fa-check-circle"></i>
                   		<i id="wrong" class="fas fa-times-circle"></i>
                        <button type="button" id="close_add_form"  class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_create_emp" type="button" class="btn btn-primary"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </div>
        </div> 



        <table class="table" style="margin-top: 10px; margin-left: 20px; margin-right: 20px; width: 100%">

            <thead>
                <tr>
                    <th scope="col">SSN</th>
                    <th scope="col">Company</th>
                    <th value="
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
                    " id="namesortheader" scope="col">Name<img style="height: 12px; width: 10px; float: right; margin-top: 4px;" src="media/Images/arrows.png"></th>
                    <th value="
                    <?php 
					if($sort == 3)
					{
						echo 0;
					}
					else if ($sort == 4)
					{
						echo 1;
					}
					else
					{
						echo 1;
					}
					?>
                    " id="lastnamesortheader" scope="col">Last Name<img style="height: 12px; width: 10px; float: right; margin-top: 4px;" src="media/Images/arrows.png"></th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    <th  value="
                    <?php 
					if($sort == 5)
					{
						echo 0;
					}
					else if ($sort == 6)
					{
						echo 1;
					}
					else
					{
						echo 1;
					}
					?>
                    " id="datesortheader" scope="col">Join Date<img style="height: 12px; width: 10px; float: right; margin-top: 4px;" src="media/Images/arrows.png"></th>
                    <th scope="col">WorkStation</th>
                    <th scope="col">Rank</th>
                    <th value="
                    <?php 
					if($sort == 7)
					{
						echo 0;
					}
					else if ($sort == 8)
					{
						echo 1;
					}
					else
					{
						echo 1;
					}
					?>
                    " id="foulssortheader" scope="col">Fouls<img style="height: 12px; width: 10px; float: right; margin-top: 4px;" src="media/Images/arrows.png"></th>
                    <th scope="col">Card ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody id="tbody_users">

            </tbody>
        </table>

    

        <?php
			/////////////////////pagination//////////////////////
			
			//check if the on the first page
			if(isset($_GET["page"]))
			{
				$page = $_GET["page"];
			}
			else
			{
				$page = 1;
			}
			//display the pages
			echo("<br/><br/>
				<div class='pages' style='width: 100%;text-align: center;'>
					 <div style='display: inline-block;'>
						<ul class='pagination'>
							<li class='page-item' style='display: none;' id='".$page."'></li>
						</ul>
					</div>
				</div>
			");
			/////////////////////pagination//////////////////////
        ?>
        
    </div>
</body>

</html>