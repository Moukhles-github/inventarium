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
            case 3: {
					//add employee
                    $result = $employees->addEmployee($_GET["empSSN"], $_GET["empCompany"], $_GET["empName"], $_GET["empLname"], $_GET["empPnum"], $_GET["empAddress"], $_GET["empWorkstation"], $_GET["empRank"], $_GET["empFouls"], $_GET["empRFID"]);
                }
				break;
            case 4: {
					//editemployee
                    $result = $employees->updateEmployee($_GET["empID"], $_GET["empSSN"], $_GET["empCompany"], $_GET["empName"], $_GET["empLname"], $_GET["empPnum"], $_GET["empAddress"], $_GET["empWorkstation"], $_GET["empRank"], $_GET["empFouls"], $_GET["empRFID"]);
                }
                break;
            case 5: {
					//add employee
                    $result = $employees->toggleEmploye($_GET["empID"], $_GET["empStatus"]);
                }
                break;
            case 6: {
                $result = $employees->getemprfid($_GET["emp_rfid"]);
            }
            break;
            case 7: {
                $result = $employees->countEmployeesForStats();
            }
            break;
            case 8: {
                $result = $employees->countJoinedEmployeesPerMonth();
            }
            break;
            case 9: {
                $result = $employees->countEmployeesPerCompany();
            }
            break;
            case 10: {
                $result = $employees->countEmployeesPerYear();
            }
            break;
            case 11: {
                $result = $employees->getWorkstationEmployees($_GET["wrksid"]);
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
