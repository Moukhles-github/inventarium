<?php

//this web service can handle 7 types of requets based on a parameter op
/*
	 op=1 (login)
	 op=2 (check if username)
	 op=3 (add user) 
	 op=4 (update user)
	 op=5 (deactivate user)
	 op=6 (logout)
	 op=7 (get users)
	 op=8 (update user)
	 op=9 (get active users)
	 op=10 (get type 1 users)
	 op=11(get type 2 users)
	 
*/

header('Access-Control-Allow-Origin: *');
require_once('../classes/employees.class.php');

$employees = new employees();
$result = 0;


try {
	if (isset($_GET["op"])) //check if op exists
	{
		$op = $_GET["op"];


		switch ($op) { //login
            case 1: {
                    //count all items for admin 
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $employees->CountSearchedEmployees($key, $_GET["sort"], $_GET["show"], $_GET["rank"], $_GET["wrks"]);
                }
                break;
            case 2: {
                    //get all items for admin 
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $employees->getSearchedEmployees($key, $_GET["sort"], $_GET["show"], $_GET["rank"], $_GET["wrks"], $_GET["page"]);
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
