<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pyramid Employees</title>

    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="./js/employees.js"></script>
</head>



<body>
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
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span> admin user name</a></li>
                    <li><a href="#about"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </nav>
    <nav class="navbar-primary">
        <a href="#" class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
        <ul class="navbar-primary-menu">
            <li>
                <a href="admin.php"><span class="glyphicon glyphicon-list-alt"></span><span class="nav-label">Dashboard</span></a>
                <a href="admin.users.php"><span class="glyphicon glyphicon-envelope"></span><span class="nav-label">Users</span></a>
                <a href="employees.php"><span class="glyphicon glyphicon-cog"></span><span class="nav-label">Employees</span></a>
                <a href="#"><span class="glyphicon glyphicon-film"></span><span class="nav-label">Items</span></a>
                <a href="#"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Workstations</span></a>
                <a href="#"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Requests</span></a>
            </li>
        </ul>
    </nav>
    <div class="main-content">
        <h1> Employees </h1>

        <!-- Button trigger modal -->
        <button id="btn_modal_cusers" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Create Employee
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
        
        <div class="sortandfilterhead" style="height: 90px;">
			<div style="float: left">
				<div class='form-group' >
					 <div class="form-group">
					  <label for="order" style='margin-right: 10px'>Sort By:</label>
					  <select class="form-control" id="sortorder" style='width: 180px; margin-right: 20px;'>
						<option value="1">Name Asc</option>
                        <option value="2">Name Desc</option>
                        <option value="3">Last Name Asc</option>
						<option value="4">Last Name Desc</option>
						<option value="5">Join Date Asc</option>
						<option value="6">Join Date Desc</option>
						<option value="7">Fouls Asc</option>
						<option value="8">Fouls Desc</option>
					  </select>
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

        

            <input type="text" class="searchbar" placeholder="Search.." value="<?php echo $keyy ?>"><button id="searchbutton" style="height: 30px; width:30px;"></button>
            <button id="clearfilters" style="height: 30px; width:30px;"></button>
        </div>
        <!-- Modal -->
        <!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Create a new User</p> </br>
                        <label>Select An Employee</label>
                        <Select id="emp_id">
                            
                        </Select></br>
                        <label for="username">Create Username:</label>
                        <input type="text" id="new_usrname" placeholder="e.g. Myusername"></input></br>
                        <label>Create a password:</label>
                        <input type="password" id="new_password" placeholder="Password"></input></br>
                        <label>Confirm password:</label>
                        <input type="password" id="confirm_password" placeholder="Password"></input></br>
                        <label>Assign the user's Type:</label>
                        <Select id="user_type"> 
                           
                        </Select></br>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_create_user" type="button" class="btn btn-primary">Create User</button>
                    </div>
                </div>
            </div>
        </div> -->



        <table class="table" style="margin-top: 100px; margin-left: 100px; margin-right: 100px; width: 90%">
            <caption>List of Employees</caption>

            <thead>
                <tr>
                    <th scope="col">SSN</th>
                    <th scope="col">Company ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Join Date</th>
                    <th scope="col">WorkStation ID</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Fouls</th>
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