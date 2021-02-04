<!DOCTYPE html>
<html lang="en">
<?php 

$pageUserType = 1;
require_once ("security.php");


?>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pyramid Login</title>

  <link rel="stylesheet" href="css/admin.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

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
          <li><a href="#"><span class="glyphicon glyphicon-user"></span> Manager user name</a></li>
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
        <a href="whsmgr.rqst.php"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Requests</span></a>
        <a href="whsmgr.warehouse.php"><span class="glyphicon glyphicon-envelope"></span><span class="nav-label">My Warehouse</span></a>
        
    
      </li>
    </ul>
  </nav>
  <div class="main-content">
    <h1> warehouse Manager </h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem sint assumenda quae aliquid voluptatibus quia, ea, ad natus magni repellat earum, culpa iure tempore. Enim dolor eaque minima voluptas ducimus?</p>
  </div>
</body>

</html>