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
    <title>My Request</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
    <link rel="stylesheet" href="css/mgr.rqst.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="./js/mgr.rqst.js"></script>
    <!-- <script src="./ws/ardhandler.js"></script> -->
    <script src="./ws/jquery.min.js"></script>



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
                <a href="whsmgr.dash.php"><i class="fas fa-chart-line"></i><span class="nav-label"> Dashboard</span></a>
                <a href="whsmgr.rqst.php"><i class="fab fa-buffer"></i><span class="nav-label"> Requests</span></a>
                <a href="whsmgr.warehouse.php"><i class="fas fa-warehouse"></i><span class="nav-label"> My Warehouse</span></a>


            </li>
        </ul>
    </nav>


    <div class="main-content">
        <h1> My Requests</h1>
        <input type="text" hidden="" id="rqstmgrid" value="<?php echo $_SESSION['uid'] ?>"></input>

        <button type="button" id='exprqst' class='btn_modal_exprqst btn btn-primary' type='button' style='margin-right: 4px;' data-toggle='modal' data-target='#exprqstmodal'>Express Request <i class="fas fa-fast-forward"></i>   </button>

        <?php

        //get initial values
        $sort = "1";
        $show = "0";
        $rank = "-1";
        $workstation = "-1";
        $keyy = "";
        //check if sort order is set
        if (isset($_GET["sort"]) && ($_GET["sort"] != "")) {
            $sort = $_GET["sort"];
        }

        //check if show option is set
        if (isset($_GET["show"]) && ($_GET["show"] != "")) {
            $show = $_GET["show"];
        }

        //initial date values
        $startdate = "";
        $enddate = "";

        //check if start date is set
        if (isset($_GET["sdate"]) && ($_GET["sdate"] != "")) {
            $startdate = $_GET["sdate"];
        }
        //check if end date is set
        if (isset($_GET["edate"]) && ($_GET["edate"] != "")) {
            $enddate = $_GET["edate"];
        }


        //check if workstation option is set
        if (isset($_GET["key"]) && ($_GET["key"] != "")) {
            $keyy = $_GET["key"];
        }

        //create 2 hidden inputs to hold the selected order because the selected value cannot be set directly from the pphp function
        echo ('<input type="hidden" class="sortlisthidden" id="sort' . $sort . '"><input type="hidden" class="showlisthidden" id="show' . $show . '"><input type="hidden" class="rankhidden" id="rank' . $rank . '"><input type="hidden" class="workstationlisthidden" id="workstation' . $workstation . '">');

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
                            <option value="-1">Cancelled</option>
                            <option value="1">Waiting</option>
                            <option value="2">Accepted</option>
                            <option value="3">Handled</option>
                            <option value="4">Returned</option>
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

            <div style="float: left; margin-left: 20px">
                <div class='form-group' style="float: left; margin-right: 5px;">
                    <label for="order" style='margin-right: 10px'>From:</label>
                    <?php
                    echo ('<input class="form-control datepicker" type="date" id="startdate" value="' . $startdate . '">');
                    ?>
                </div>
                <div class='form-group' style="float: left">
                    <label for="order" style='margin-right: 10px'>To:</label>
                    <?php
                    echo ('<input class="form-control datepicker" type="date" id="enddate" value="' . $enddate . '">');
                    ?>
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
        <!-- express request!!      express request           express request -->
        
        
        <div class="modal fade" id="exprqstmodal" tabindex="-1" role="dialog" aria-labelledby="rqstinfomodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                   
                    <div class="modal-body">
                    <p>Express Request</p>
                        <label>Item type</label>
                        <select id='crt_exp_itemtype'></select></br>

                        <label>Item</label>
                        <Select id='crt_exp_item'><option selected disabled style="color:crimson !important"> Select an item type first! </option></Select></br>
                        <label> Employee ID</label>
                        <input type="text" class="emp_rfid"></input><button class="getemp"><i class="fas fa-money-check"></i></button></br>

                        <ul class='empinfo'></ul>
                     
                        </br> 


                        
                        <input type="text" id="exp_item" placeholder="item_id" style="display:none" ></input>
                        <input type="text" id="exp_fields" placeholder="fields" style="display:none"></input>
                        <input type="text" id="exp_ret" placeholder="returnable" style="display:none"></input>
                   


                        <p id="wrongmsg">Fill All Fields!</p>


                        
                    </div>
                    <div class="modal-footer">
                    <i id="success" class="fas fa-check-circle"></i>
                    <i id="wrong" class="fas fa-times-circle"></i>
                        <button id='close_exp_form' type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_exp_rqst" type="button" class="btn btn-primary">Express it!</button>
                    </div>
                </div>
            </div>
        </div>



<!-- Handle Modal -->
        <div class="modal fade" id="handlemodal" tabindex="" role="dialog" aria-labelledby="rqstinfomodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                   
                    <div class="modal-body">
                    <p>Handle Item</p></br>
                        
                        <label> Employee ID</label>
                        <input type="text" class="emp_rfid"></input><button class="getemp"><i class="fas fa-money-check"></i></button></br>
                        <input type="text" id='hndrqstid' hidden></input>

                        <ul class='empinfo'></ul>
                        <p id="wrongmsg">Fill All Fields!</p>
                    </div>
                    <div class="modal-footer">
                    <i id="success" class="fas fa-check-circle"></i>
                    <i id="wrong" class="fas fa-times-circle"></i>
                        <button id='close_hnd_close' type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_hnd_rqst" type="button" class="btn btn-primary">Handle Item</button>
                    </div>
                </div>
            </div>
        </div>


<!-- return modal -->
        <div class="modal fade" id="returnmodal" tabindex="-1" role="dialog" aria-labelledby="rqstinfomodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                   
                <div class="modal-body">
                    <p>Return Item</p></br>
                        
                        <label> Employee ID</label>
                        <input type="text" class="emp_rfid"></input><button class="getemp"><i class="fas fa-money-check"></i></button></br>
                        <input type="text" id='rtrqstid' hidden></input>

                        <ul class='empinfo'></ul>
                        <p id="wrongmsg">Fill All Fields!</p>
                    </div>
                    <div class="modal-footer">
                    <i id="success" class="fas fa-check-circle"></i>
                    <i id="wrong" class="fas fa-times-circle"></i>
                        <button id='close_rt_form' type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_rt_rqst" type="button" class="btn btn-primary">Return item</button>
                    </div>
                </div>
            </div>
        </div>







        <!-- /////////////////////////////////////////////////////////////////////////// -->

        
        <div class="modal fade" id="rqstinfomodal" tabindex="-1" role="dialog" aria-labelledby="rqstinfomodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    
                    <div class="modal-body">
                    <p>Request Detailed Information</p>
                        <ul id="rqstinfoul"></ul>


                        <button type='button' class='btn btn-primary' id='btnaccept'>Accept</button>
                        <button id='btncancel' type='button' class='btn btn-primary'>Cancel</button>
                        <button type='button' id='hndrqstbtn' class='btn_modal_exprqst btn btn-primary' style='margin-right: 4px;' data-toggle='modal' data-target='#handlemodal'>handle</button>
                        <button type='button' id='returnbtn' class='btn_modal_exprqst btn btn-primary'  data-toggle='modal' data-target='#returnmodal'>Return</button>
                        
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