<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pyramid Login</title>

    <link rel="stylesheet" href="css/company.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/company.js"></script>


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
                <a href="company.php"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Company</span></a>
                <a href="users.php"><span class="glyphicon glyphicon-envelope"></span><span class="nav-label">Users</span></a>
                <a href="employees.php"><span class="glyphicon glyphicon-cog"></span><span class="nav-label">Employees</span></a>
                <a href="warehouse.php"><span class="glyphicon glyphicon-film"></span><span class="nav-label">Warehouse</span></a>
                <a href="workstation.php"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Workstations</span></a>
                <a href="request.php"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Requests</span></a>
            </li>
        </ul>
    </nav>
    <div class="main-content">
        <h1> Manage Companies</h1>

        <!-- Create users button -->
        <button id="btn_modal_crt_cmp" type="button" class="btn btn-primary" data-toggle="modal" data-target="#create_cmp_modal">
            Create company
        </button>


        <?php
			
			//get initial values
			$sort = "1";
			$show = "0";
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
                        
			//check if workstation option is set
			if(isset($_GET["key"]) && ($_GET["key"] != ""))
			{
				$keyy = $_GET["key"];
            }

			//create 2 hidden inputs to hold the selected order because the selected value cannot be set directly from the pphp function
			echo('<input type="hidden" class="sortlisthidden" id="sort'.$sort.'"><input type="hidden" class="showlisthidden" id="show'.$show.'">');

        ?>

        <div class="sortandfilterhead" style="height: 90px; margin-top: 30px;" >
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
                        <label for="order" style='margin-right: 10px'>Show Companies:</label>
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
					<div class="form-group" style="width: 200px;">
					  <label for="order" style='margin-right: 10px'>Search:</label>
					  
						<input type="text" class="searchbar form-control" placeholder="Search.." value="<?php echo $keyy ?>"></input>
						         		
            		</div>
            		
            	</div>
            </div>
            
            <div style="float: left; height: 74px; margin-left: 20px">
            	<div class='form-group' >
					 <div class="form-group">
					 	<button id="searchbutton" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;">Search</button>
						<button id="clearfilters" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;">Clear</button>
					</div>
           		</div>
			</div>
        </div>



        <!-- create users Modal -->
        <div class="modal fade" id="create_cmp_modal" tabindex="-1" role="dialog" aria-labelledby="createcmpmodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createcmpmodalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Create a new company</p> </br>

                        <label for="username">Company name:</label>
                        <input type="text" id="crt_cmp_name" placeholder="e.g. Mycompany"></input></br>
                        <label>Company address:</label>
                        <input type="text" id="crt_cmp_address" placeholder="e.g. Mycompany"></input></br>
                        <label>Company Subsidiary</label>
                        <input type="text" id="crt_cmp_sbusidiary" placeholder="e.g. Mycompany"></input></br>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_create_cmp" type="button" class="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- edit users Modal -->
        <div class="modal fade" id="editcmpmodal" tabindex="-1" role="dialog" aria-labelledby="edit_cmp_modalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="edit_cmp_modalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <label for="cmpname"> Company name:</label>
                        <input type="text" id="updt_cmp_name" placeholder="e.g. Shell Company"></input></br>

                        <label for="cmpaddress"> Company address</label>
                        <input type="text" id="updt_cmp_address" placeholder="e.g. 6580 santona st."></input></br>

                        <label for="cmp_subsidiary"> Company Subsidiary </label>
                        <input type="text" id="updt_cmp_subsidiary" placeholder="e.g. Goe Michel"></input> </br>

                        <input type="text" id="updt_cmp_id" placeholder="cmp_id">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_edit_cmp" type="button" class="btn btn-primary">Edit User</button>
                    </div>
                </div>
            </div>
        </div>




        <table class="table" style="margin-top: 10px; margin-left: 20px; margin-right: 20px; width: 100%">

            <thead>
                <tr>
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
                    " id="namesortheader" scope="col">Name<img style="height: 12px; width: 10px; float: left; margin-top: 4px; margin-right: 4px;" src="media/Images/arrows.png"></th>
                    <th scope="col">Address</th>
                    <th scope="col">Subsidiary</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody id="tbody_company">

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