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
    <script src="js/users.js"></script>


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
                <a href="users.php"><span class="glyphicon glyphicon-envelope"></span><span class="nav-label">Users</span></a>
                <a href="employees.php"><span class="glyphicon glyphicon-cog"></span><span class="nav-label">Employees</span></a>
                <a href="#"><span class="glyphicon glyphicon-film"></span><span class="nav-label">Items</span></a>
                <a href="#"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Workstations</span></a>
                <a href="#"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Requests</span></a>
            </li>
        </ul>
    </nav>
    <div class="main-content">
        <h1> users </h1>

        <!-- Button trigger modal -->
        <button id="btn_modal_cusers" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Create User
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        </div>



        <table class="table" style="margin-top: 100px; margin-left: 100px; margin-right: 100px; width: 90%">



            <caption>List of Users</caption>

            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody id="tbody_users">

            </tbody>


    </div>

</body>

</html>