<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pyramid Login</title>

  <link rel="stylesheet" href="css/admin.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="./js/mgr.rqst.js"></script>

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
      <a href="whsmgr.dash.php"><span class="glyphicon glyphicon-list-alt"></span><span class="nav-label">Dashboard</span></a>
        <a href="#"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Requests</span></a>
        <a href="whsmgr.warehouse.php"><span class="glyphicon glyphicon-envelope"></span><span class="nav-label">My Warehouse</span></a>
        
    
      </li>
    </ul>
  </nav>


  <div class="main-content">
        <h1> My warehouse</h1>

        <a>New request</a> <span> || </span> <a> accepted request </a> <span> || </span> <a>Handled request</a> <span> || </span> <a>denied request</a> <span> || </span> <a>returned request</a>
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

        <div class="sortandfilterhead" style="height: 90px;">
            <div style="float: left">
                <div class='form-group'>
                    <div class="form-group">
                        <label for="order" style='margin-right: 10px'>Sort By:</label>
                        <select class="form-control" id="sortorder" style='width: 180px; margin-right: 20px;'>
                            <option value="1">UserName Asc</option>
                            <option value="2">UserName Desc</option>
                            <option value="3">Name Asc</option>
                            <option value="4">Name Desc</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style="float: left">
                <div class='form-group'>
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
                <div class='form-group'>
                    <div class="form-group">
                        <label for="order" style='margin-right: 10px'>Rank:</label>
                        <select class="form-control" id="rankorder" style='width: 180px; margin-right: 20px;'>
                            <option value="-1">All</option>
                        </select>
                    </div>
                </div>
            </div>


            <div style="float: left">
                <div class='form-group'>
                    <div class="form-group">
                        <label for="order" style='margin-right: 10px'>Search:</label>
                        <input type="text" class="searchbar form-control" placeholder="Search.." value="<?php echo $keyy ?>"><button id="searchbutton" class="btn btn-primary" style="height: 30px; width:auto;">Search</button><button id="clearfilters" class="btn btn-primary" style="height: 30px; width:auto;">Clear</button>

                    </div>
                </div>
            </div>
        </div>



        <!-- edit users Modal -->
        <div class="modal fade" id="editrankmodal" tabindex="-1" role="dialog" aria-labelledby="edit_rank_modalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="edit_rank_modalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <label for="cmpname"> Rank name:</label>
                        <input type="text" id="updt_rank_name" placeholder="e.g. Shell Company"></input></br>

                        <input type="text" id="updt_rank_id" placeholder="cmp_rank">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btn_edit_rank" type="button" class="btn btn-primary">Edit User</button>
                    </div>
                </div>
            </div>
        </div>




        <table class="table" style="margin-top: 100px; margin-left: 100px; margin-right: 100px; width: 90%">



            <caption>List of my request</caption>

            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Requester Name</th>
                    <th scope="col">Item</th>
                    <th scope="col">Warehouse</th>
                    <th scope="col">Workstation</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="tbody_mgr_rqst">

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