<!doctype html>
<html>
    <head>
                                            <!-- CSS references --> 
    
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- for the icons -->
        
            <link rel="stylesheet" href="CSS/index.css">
    
                                                <!-- end css --> 
    
                                            <!-- JS references --> 
    
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
                                                <!-- end JS -->
    
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <title>Inventarium portal</title>
    
    
        
        <!-- Move to Javascript -->
        
        
        
<script> 
        
    $(document).ready(function(){
        
       $('.nav li').click(function(e) {

        $('.nav li.active').removeClass('active');

        var $parent = $(this);
        $parent.addClass('active');
        e.preventDefault();
           
    var myurl = $(this).children().attr('href');
      window.location.replace(myurl);
    });
})
        

        
        
</script>        
        
        
    <!-- ######## -->     
        
        
</head>
    
<body>
<!-- Nav bar --> 
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
                    
                    <li id="navlinks" class="active"> <a href="#home">Home</a></li>
                    <li id="navlinks"  ><a href="#portalbutton" class="" >About Us</a></li>
                    <li id="navlinks" ><a href="#services" class="">Services</a></li>
                    <li id="navlinks" ><a href="#address" class="">Contact</a></li>
                    <li id="navlinks"  ><a href="login.php" class="">Login</a></li>
            
                </ul>
            </div>        
        </div>
    
    
    </nav>
<!-- end Nav Bar --> 
    
    
<!-- Page #1 -->
    
<div id="home">
   
    <div class="landing-text">
        
        <h1>Pyramid Engineering</h1>
        
        <h3 id="homepage">Powered by Inventarium.</h3>
        
<!--        <a id="portalbutton" href="#" class="btn btn-default btn-lg">Get Started <img id="getstartedbtn" src="MEDIA/Images/enter2.png" ></a>-->
        
    </div>  
</div>
    
<!-- End Page #1 --> 
    
    
<!-- Page #2 --> 
    <div  class="padding">
        
        <div class="container">
            
            <div class="row">
                
                <div class="col-sm-6">
                    
                    <img id ="aboutus" src="MEDIA/Images/aboutus.png">
                    
                </div>
                        <div  class="col-sm-6 text-center">
                            
                            <h2>Using Inventarium </h2>
                            
                                <p class="lead">Inventarium is an Inventory Management System that stores all your items in a database, and is designed to track your items in a simple way. </p>
                            
                                <p class="lead">We have developed an unique system to support your company growth and keeping you under control at the same time.</p>
                        </div>
            </div>
        </div>
    </div>
    
<!-- End Page #2 --> 
    
    
  <!-- Page #3 -->
    <div class="padding">
        <a id="servicespage"></a>
        <div class="container">
            
            <div class="row">
            
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                
                <h4> Own your website </h4>
                    <p> No need to download any external application, the web application is complete and full responsive, full interaction and full support from us.  </p>
            </div> 
                
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                
               <img src="MEDIA/Images/pc.png" class="img-responsive">
                
            </div>
                
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                
                <h4> Keep it simple in your device </h4>
                
                 <p> A person can't carry a pc everywhere, but a mobile we think he can and that's why we have developed a responsive website that adapts to your mobile phone, or you can download our application from the play store. Available in android for the moment!!</p>
                
            </div>
                
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                
                <img src="MEDIA/Images/mobile.png" class="img-reponsive">
                
            </div>
                
            </div>
        </div>
    </div>
    <!-- End Page #3 -->
     

    
    <!-- Page #4 -->
    <div id="fixed"></div>
    <a id="services"></a>
        <div class="padding">
            
            <div class="container">
                
                <div class="row">
                    
                <div class="col-sm-6">
                    
                <h4> We provide for everyone! </h4>
                    
                    <p> We provide services to everyone that requires managing his own items, we have created a system for everyone from personal use to start ups even for big companies that have a complex storage procedure! Our goal is to improve inventory management and reach to everyone who needs us! and for that we also provide support 24/7, What are you waiting to join us!!.  </p>
                
                    
                </div>
                    
            <div class="col-sm-6">
                
                <img id="services" src="MEDIA/Images/Services.png" class="responsive">
                
            </div> 
                    
                </div>
                
            </div>
            
        </div>
    <!-- End page #4 --> 
    
    <!-- footer -->
    <footer class="container-fluid text-center">
        
        <div class="row">
            
            <div class="col-sm-4">
                
                <h3>Contact us!</h3>
                
                <br> 
                
                <div>
                
                <p><img id="address" src="MEDIA/Images/address.png" >6580 Santona st. Coral Gables, Miami, US. 33146  </p>
                
                <p><img id="address" src="MEDIA/Images/phone.png" >+1 (7 8 6) 6 0 3 - 8 7 2 5 </p>
                
                </div>
                
            </div>
            
           
            
            <div class="col-sm-4">
                
                
                 <h3>Follow us!</h3>
                
                <a href="#" class="fa fa-facebook"></a>
                
                <a href="#" class="fa fa-twitter"></a>
                
                <a href="#" class="fa fa-google"></a>
                
                <a href="#" class="fa fa-linkedin"></a>
                
                <a href="#" class="fa fa-instagram"></a>
                
            </div>
        
             <div class="col-sm-4">
                 
                <img id="imginve"src="MEDIA/Images/inventory.png">
                 
               <p id="copyright"> All rights are reserved for webofuck company &#169;  </p>
                
            </div>
            
            
        </div>
    
    </footer>
    <!-- End Footer -->
    
    </body>
</html>