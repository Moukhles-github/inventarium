<?php

header('Access-Control-Allow-Origin: *');
require_once('../classes/company.class.php');

$company = new company();
$result = 0;


try {
	if (isset($_GET["op"])) //check if op exists
	{
		$op = $_GET["op"];


		switch ($op) { //login
            case 1: {
                    //get the companies list
                    $result = $company->getCompanies();
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
