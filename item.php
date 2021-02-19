<!DOCTYPE html>
<html lang="en">
<?php

$pageUserType = 0;
require_once("security.php");


?>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Items</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />

    <link rel="stylesheet" href="css/items.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/item.js"></script>


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
        <h1> Manage items</h1>

        <input type="text" hidden="" id="whs_id" value="<?php
                                                        if (isset($_GET["whs_id"])) {
                                                            echo $_GET["whs_id"];
                                                        } else
                                                            echo "-1" ?>"></input>
        <!-- Create users button -->
        <button id="btn_modal_item_whs" type="button" class="btn btn-primary" data-toggle="modal" data-target="#create_item_modal">
            Create item <i id="crt_sign" class="fas fa-plus-square"></i>
        </button>

        <button id="itemtype" type="button" class="gotoitemtype btn btn-primary">Item Types</button>


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
        if (isset($_GET["type"]) && ($_GET["type"] != "")) {
            $rank = $_GET["type"];
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
                        <label for="order" style='margin-right: 10px'>Show Items:</label>
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



        <!-- create warehouse Modal -->
        <div class="modal fade" id="create_item_modal" tabindex="-1" role="dialog" aria-labelledby="createitemmodalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    
                    <div class="modal-body">
                        <p>Add Item</p> 

                        <label for="itemName"> item name :</label>
                        <input type="text" id="crt_item_name" placeholder="e.g. main warehouse"></input></br>
                        <label for="item_type"> item label </label>
                        <input type="text" id="crt_item_label" placeholder="e.g dl-10"></input></br>
                        <label for='itemtype'> item type</label>
                        <select id='crt_item_type'></select></br>
                        <label for="item_reservation"> Reservation: </label>

                        <input type="radio" id="crt_rb_resyes" name="reservation" value="1">
                        <label for="yes">Yes</label>
                        <input type="radio" id="crt_rb_resno" name="reservation" value="0">
                        <label for="no">No</label> </br>

                        <label for="item_returnable">item returnable:</label>
                        <input type="radio" id="crt_rt_yes" name="returnable" value="1">
                        <label for="yes">Yes</label>
                        <input type="radio" id="crt_rt_no" name="returnable" value="0">
                        <label for="no">No</label> </br>

                        <label for="lifespan">lifespan</label>
                        <input type="number" id="crt_item_life"> </input> </br>

                        <input type="text" style="display: none" id="crt_whs_id" placeholder="whs_id"></input>
                        <input type="text" style="display: none" id="crt_res_id" placeholder="whs_res_id"></input>
                        <input type="text" style="display: none" id="crt_ret_id" placeholder="whs_ret_id"></input>
                        <input type="text" style="display: none" id="crt_type_id" placeholder="item_type_id"></input>

                        <p id="wrongmsg">Fill All Fields!</p>
                    </div>
                    <div class="modal-footer">
                        <i id="success" class="fas fa-check-circle"></i>
                        <i id="wrong" class="fas fa-times-circle"></i>

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_item_crt" type="button" class="btn btn-primary"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </div>
        </div>


        <!-- edit warehouse Modal -->
        <div class="modal fade" id="editwhousemodal" tabindex="-1" role="dialog" aria-labelledby="edit_rank_modalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    
                    <div class="modal-body">
                        <p> Edit Item</p> 


                        <label for="itemName"> Name:</label>
                        <input type="text" id="edt_item_name" placeholder="e.g. main warehouse"></input></br>
                        <label for="item_type">Label:</label>
                        <input type="text" id="edt_item_label" placeholder="e.g dl-10"></input></br>
                        <label for='itemtype'>Type:</label>
                        <select id='edt_item_type'></select></br>

                        <label for="item_reservation"> Reservation: </label>

                        <input type="radio" id="edt_rb_resyes" name="edtreservation" value="1">
                        <label for="yes">Yes</label>
                        <input type="radio" id="edt_rb_resno" name="edtreservation" value="0">
                        <label for="no">No</label> </br>

                        


                        <label for="item_returnable">Returnable:</label>
                        <input type="radio" id="edt_rt_yes" name="edtreturnable" value="1">
                        <label for="yes">yes</label>
                        <input type="radio" id="edt_rt_no" name="edtreturnable" value="0">
                        <label for="no">no</label> </br>

                        <label for="lifespan">Lifespan:</label>
                        <input type="number" id="edt_item_life"> </input> </br></br>

                        <input type="text" hidden="" id="edt_item_id" placeholder="whs_id"></input>
                        <input type="text" hidden="" id="edt_whs_id" placeholder="whs_id"></input>
                        <input type="text" hidden="" id="edt_res_id" placeholder="whs_res_id"></input>
                        <input type="text" hidden="" id="edt_ret_id" placeholder="whs_ret_id"></input>
                        <input type="text" hidden="" id="edt_type_id" placeholder="item_type_id"></input>

                        <p id="wrongmsg">Fill All Fields!</p>

                        <div class="modal-footer">
                            <i id="success" class="fas fa-check-circle"></i>
                            <i id="wrong" class="fas fa-times-circle"></i>

                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button id="btn_item_edt" type="button" class="btn btn-primary"><i class="fas fa-check"></i></button>
                        </div>
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
                    " id="itemnamesortheader" scope="col">Name<img style="height: 12px; width: 10px; float: left; margin-top: 4px; margin-right: 5px;" src="media/Images/arrows.png"></th>
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
                    " id="labelsortheader" scope="col">Label<img style="height: 12px; width: 10px; float: left; margin-top: 4px; margin-right: 5px;" src="media/Images/arrows.png"></th>
                    <th scope="col">type</th>
                    <th scope="col">reservation</th>
                    <th scope="col">warehouse</th>
                    <th scope="col">returnable</th>
                    <th scope="col">lifespan</th>
                    <th scope="col">entry date</th>
                    <th scope="col">status</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody id="tbody_item">

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