<?php

header('Access-Control-Allow-Origin: *');
require_once('../classes/user_type.class.php');

$user_type = new user_type();
$result = 0;


try {
    if (isset($_GET["op"])) //check if op exists
    {
        $op = $_GET["op"];


        switch ($op) { //get all tyors
            case 1: {
                    $result = $user_type->getUserType();
                }
                break;
            default:
                return 0;
                break;
        }
    }

    header("Content-type:application/json");
    echo json_encode($result);
} catch (Exception $e) {

    echo -1;
}
