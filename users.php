<!DOCTYPE html>
<?php

$pageUserType = 0;
require_once("security.php");


?>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Users</title>

    <!-- CSS -->
    <link rel="stylesheet" href="css/users.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/admin.users.js"></script>

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
                <a href="admin.php"><i class="fas fa-chart-line"></i><span class="nav-label"> Dashboard</span></a>
                <a href="company.php"><i class="fas fa-industry"></i></span><span class="nav-label"> Company</span></a>
                <a href="users.php"><i class="fas fa-users"></i></span><span class="nav-label"> Users</span></a>
                <a href="employees.php"><i class="fas fa-people-carry"></i></i></span><span class="nav-label"> Employees</span></a>
                <a href="warehouse.php"><i class="fas fa-warehouse"></i></span><span class="nav-label"> Warehouse</span></a>
                <a href="workstation.php"><i class="far fa-building"></i></span><span class="nav-label"> Workstations</span></a>
                <a href="request.php"><i class="fab fa-buffer"></i></span><span class="nav-label"> Requests</span></a>

            </li>
        </ul>
    </nav>
    <div class="main-content">
        <h1> Users </h1>

        <!-- Create users button -->
        <button id="btn_modal_cusers" type="button" class="btn btn-primary" data-toggle="modal" data-target="#createusermodal">
            Create User <i id="crt_sign" class="fas fa-plus-square"></i>
        </button>


        <?php

        //get initial values
        $sort = "1";
        $show = "0";
        $rank = "-1";
        $keyy = "";
        //check if sort order is set
        if (isset($_GET["sort"]) && ($_GET["sort"] != "")) {
            $sort = $_GET["sort"];
        }

        //check if show option is set
        if (isset($_GET["show"]) && ($_GET["show"] != "")) {
            $show = $_GET["show"];
        }

        //check if rank option is set
        if (isset($_GET["rank"]) && ($_GET["rank"] != "")) {
            $rank = $_GET["rank"];
        }

        //check if workstation option is set
        if (isset($_GET["key"]) && ($_GET["key"] != "")) {
            $keyy = $_GET["key"];
        }

        //create 2 hidden inputs to hold the selected order because the selected value cannot be set directly from the pphp function
        echo ('<input type="hidden" class="sortlisthidden" id="sort' . $sort . '"><input type="hidden" class="showlisthidden" id="show' . $show . '"><input type="hidden" class="rankhidden" id="rank' . $rank . '">');

        ?>

        <div class="sortandfilterhead" style="height: 90px; margin-top: 30px;">
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
                        <label for="order" style='margin-right: 10px'>Show User:</label>
                        <select class="form-control" id="showbystatus" style='width: 180px; margin-right: 20px;'>
                            <option value="0">All</option>
                            <option value="1">Active</option>
                            <option value="2">Not Active</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style="float: left">
                <div class='form-group'>
                    <div class="form-group">
                        <label for="order" style='margin-right: 10px'>Type:</label>
                        <select class="form-control" id="rankorder" style='width: 180px; margin-right: 20px;'>
                            <option value="-1">All</option>
                        </select>
                    </div>
                </div>
            </div>


            <div style="float: left">
                <div class='form-group'>
                    <div class="form-group" style="width: 200px;">
                        <label for="order" style='margin-right: 10px'>Search:</label>

                        <input type="text" class="searchbar form-control" placeholder="Search.." value="<?php echo $keyy ?>"></input>

                    </div>

                </div>
            </div>

            <div style="float: left; height: 74px; margin-left: 20px">
                <div class='form-group'>
                    <div class="form-group">
                        <button id="searchbutton" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;"><i class="fas fa-search"></i></button>
                        <button id="clearfilters" class="btn btn-primary" style="height: 30px; margin-top: 26px; width:auto;">Clear</button>
                    </div>
                </div>
            </div>
        </div>



        <!-- create users Modal -->
        <div class="modal fade" id="createusermodal" tabindex="-1" role="dialog" aria-labelledby="createusermodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">

                    <div class="modal-body">
                        <p>Add User</p> </br>
                        
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

                        <input type="text" hidden="" id="cuser_emp_id" placeholder="u_emp_id"></input>
                        <input type="text" hidden="" id="cuser_type" placeholder="user_type"></input>
                        <p id="wrongmsg">Fill All Fields!</p>
                    </div>
                    <div class="modal-footer">
                        <i id="success" class="fas fa-check-circle"></i>
                        <i id="wrong" class="fas fa-times-circle"></i>

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_create_user" type="button" class="btn btn-primary"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </div>
        </div>



        <!-- edit users Modal -->
        <div class="modal fade" id="editusermodal" tabindex="-1" role="dialog" aria-labelledby="editusermodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">

                    <div class="modal-body">
                        <p>Edit User</p> </br>

                        <label for="username">Update Username:</label>
                        <input type="text" id="updt_usrname" placeholder="e.g. Myusername"></input></br>

                        <label for="usertype">Change User's type:</label>
                        <Select id="updt_user_type">

                        </Select></br>

                        <input type="text" hidden="" id="updt_user_id" placeholder="user_type"></input>
                        <input type="text" hidden="" id="updt_user_type_tb" placeholder="user_type"></input>
                        <p id="wrongmsg">Fill All Fields!</p>
                    </div>
                    <div class="modal-footer">
                        <i id="success" class="fas fa-check-circle"></i>
                        <i id="wrong" class="fas fa-times-circle"></i>

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_edit_user" type="button" class="btn btn-primary"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reset password -->

        <div class="modal fade" id="resetpwd" tabindex="-1" role="dialog" aria-labelledby="createusermodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">

                    <div class="modal-body">
                    <p> Reset Password </p>
                    <label>New Password:</label>
                        <input type="password" id="rstpwd" placeholder="New password" ></input>
                        
                    <label>Confirm Password:</label>
                    <input type="password" id="cnfresetpwd" placeholder="New password" ></input>

                    </br> 
                    <input type="text" id="rstuserid" hidden></input>



                        <p id="notmatch" hidden>Passwords dont match!</p>
                        <p id="wrongmsg">Fill All Fields!</p>
                    </div>
                    <div class="modal-footer">
                        <i id="success" class="fas fa-check-circle"></i>
                        <i id="wrong" class="fas fa-times-circle"></i>

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_reset_pwd" type="button" class="btn btn-primary"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </div>
        </div>


        <table class="table" style="margin-top: 10px; margin-left: 20px; margin-right: 20px; width: 100%">

            <thead>
                <tr>
                    <th value="
                    <?php
                    if ($sort == 1) {
                        echo 0;
                    } else if ($sort == 2) {
                        echo 1;
                    } else {
                        echo 1;
                    }

                    ?>
                    " id="usernamesortheader" scope="col">Username<img style="height: 12px; width: 10px; float: left; margin-top: 4px; margin-right: 5px;" src="media/Images/arrows.png"></th>
                    <th value="
                    <?php
                    if ($sort == 3) {
                        echo 0;
                    } else if ($sort == 4) {
                        echo 1;
                    } else {
                        echo 1;
                    }
                    ?>
                    " id="namesortheader" scope="col">Employee<img style="height: 12px; width: 10px; float: left; margin-top: 4px; margin-right: 5px;" src="media/Images/arrows.png"></th>
                    <th scope="col">Type</th>
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