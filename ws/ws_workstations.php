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
