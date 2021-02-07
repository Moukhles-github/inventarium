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
			case 2: {
				//toggle cmp status
				$result = $company->togglecmp($_GET["cmp_id"], $_GET["val"]);
				break;
			}
			case 3: {
				//create company 
				$result = $company->createcmp($_GET["cmp_name"], $_GET["cmp_address"], $_GET["cmp_subsidiary"]);
				break;
			}
			case 4: 
				// update company
				$result = $company->updatecmp($_GET["cmp_id"],$_GET["cmp_name"],$_GET["cmp_address"],$_GET["cmp_subsidiary"]);
				break;
			case 5: {
                    //count all items for admin 
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $company->CountSearchedCompanies($key, $_GET["sort"], $_GET["show"]);
                }
                break;
            case 6: {
                    //get all items for admin 
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $company->getSearchedCompanies($key, $_GET["sort"], $_GET["show"], $_GET["page"]);
                }
                break;
            case 7: {
                    $result = $company->countCompanies();
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
