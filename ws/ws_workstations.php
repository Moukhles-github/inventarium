<?php

header('Access-Control-Allow-Origin: *');
require_once('../classes/workstations.class.php');

$workstation = new workstaions();
$result = 0;


try {
    if (isset($_GET["op"])) //check if op exists
    {
        $op = $_GET["op"];


        switch ($op) { //get all workstations
            case 1: {
                    $result = $workstation->getWorkstations();
                }
                break;
            case 2: {
                    $result = $workstation->popWrkst();
                }
                break;
            case 3: {
                    $result = $workstation->togglewrkst($_GET["wrkst_id"], $_GET["status"]);
                }
                break;
            case 4: {
                    $result = $workstation->createwrkst($_GET["wrkst_name"], $_GET["wrkst_address"], $_GET["wrkst_mgr_id"]);
                }
                break;
            case 5: {
                    $result = $workstation->updatewrkst($_GET["wrkst_id"], $_GET["wrkst_name"], $_GET["wrkst_address"], $_GET["wrkst_mgr_id"]);
            }
            break;
            case 6: 
                {
                    $result =$workstation->popwrkstmgr();
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
