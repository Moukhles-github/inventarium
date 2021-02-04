<?php 
session_start();

if(!isset($_SESSION['utype']) || $_SESSION['utype'] != $pageUserType )
{
    header('location: login.php');
    exit();
}





?>