<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pyramid Login</title>

<link rel="stylesheet" href="css/login.css">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
<script src="js/login.js"></script>

</head>



<body>
    <!-- Navbar  -->
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        
        <div class="container-fluid">
            
            <div class="navbar-header">
                
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-main" >
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                
                </button>
                <a class="navbar-brand" href="#home" id="logo1"><img id="logo"  src="MEDIA/Images/stock.png" ></a> 
            </div>
            
            
            <div id="navattributes" class="collapse navbar-collapse" id="navbar-collapse-main">
            
                <ul  class="nav navbar-nav navbar-right"> 
                    
                    <li id="navlinks"> <a href="index.php">Home</a></li>
                    
                    <li id="navlinks" class="active"  ><a href="login.php" class="">Login</a></li>
            
                </ul>
            </div>        
        </div>
    
    
    </nav>

<!-- Logn div -->
<div class="login-box">
        <img id="logolog" src="./media/Images/login.png">
        <div class="textbox">
        <i class="fas fa-user"></i>
            <input type="text" id="username" placeholder="username" name="" value=""></input>
        </div>

        <div class="textbox">
        <i class="fas fa-key"></i>
            <input type="password" id="pwd" placeholder="Password" name="" value=""></input>

        </div>
        <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
        <input class="btn" id="btnlogin" type="button" name="" value="Log In"></input>

        <img id="loading" src="./media/images/waiting1.gif" alt="be patient">
        
        
        <p id="wrong" >Wrong Credentials!</p>
        <p id="empty" >You missed some information!</p>
        <p id="field" >Field Operators use mobile app please</p> 
    </div>
</body>
</html>       
  
</html>