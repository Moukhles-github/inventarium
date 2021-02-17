<?php


header('Access-Control-Allow-Origin: *');
require_once('../classes/request.class.php');

$request = new request();
$result = 0;


try {
	if (isset($_GET["op"])) //check if op exists
	{
		$op = $_GET["op"];


		switch ($op) { //get all ranks
			case 1: {
					$result = $request->getrqst();
				}
				break;
			case 2: {
					$result = $request->getmorerqst($_GET["rqst_id"]);
				}
				break;
			case 3: {
					$result = $request->getmgr_rqst($_GET["mgr_id"]);
				}
				break;
			case 4: {
					// $result = $request->allrqstinfo_mgr($_GET[]);
				}
				break;
			case 5: {


					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->CountSearchedResquests($key, $_GET["sort"], $_GET["show"], $_GET["sdate"], $_GET["edate"]);
				}
				break;
			case 6: {
					//check if keyword exist
					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->getSearchedResquests($key, $_GET["sort"], $_GET["show"], $_GET["sdate"], $_GET["edate"], $_GET["page"]);
				}
				break;
			case 7: {
					$result = $request->handlerqstitem($_GET["rqst_id"], $_GET["emp_id"]);
				}
				break;
			case 8: {
					$result = $request->acceptrqstitem($_GET["rqst_id"]);
				}
				break;
			case 9: {
					$result = $request->cancelrqstitem($_GET["rqst_id"]);
				}
				break;
			case 10: {
					$result = $request->returnrqstitem($_GET["rqst_id"], $_GET["emp_id"]);
				}
				break;
			case 11: {
					$result = $request->countActiveRequests();
				}
				break;
			case 12: {
					$result = $request->getDailyRequestsAVG();
				}
				break;
			case 13: {
					$result = $request->getMonthlyApprovedRequestsAVG();
				}
				break;
			case 14: {
					$result = $request->getMonthlyDeniedRequestsAVG();
				}
				break;
			case 15: {
					$result = $request->getMonthlyRequests();
				}
				break;

			case 16: {
					$result = $request->expresrqst($_GET["user_id"], $_GET["rqst_item"], $_GET["wrkst_id"], $_GET["ret"], $_GET["rqst_emp"]);
				}
				break;

			case 17: {
					$result = $request->countHandledRequestsByWarehoue($_GET["mgr_id"]);
				}
				break;

			case 18: {
					$result = $request->countHandledRequestsByWorkstation($_GET["mgr_id"]);
				}
				break;

			case 19: {
					$result = $request->getDailyRequestsAVGByWarehouse($_GET["mgr_id"]);
				}
				break;

			case 20: {
					$result = $request->getMonthlyApprovedRequestsAVGByWarehouse($_GET["mgr_id"]);
				}
				break;

			case 21: {
					$result = $request->getMonthlyDeniedRequestsAVGByWarehouse($_GET["mgr_id"]);
				}
				break;

			case 22: {
					$result = $request->getMonthlyRequestsByWorkstation($_GET["mgr_id"]);
				}
				break;


			case 23: {
					//count all items for admin 
					//GET items for admin
					//check if keyword exist
					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->CountSearchedResquestsForManager($key, $_GET["sort"], $_GET["show"], $_GET["sdate"], $_GET["edate"], $_GET["mgrID"]);
				}
				break;
			case 24: {
					//get all items for admin 
					//GET items for admin
					//check if keyword exist
					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->getSearchedResquestsForManager($key, $_GET["sort"], $_GET["show"], $_GET["sdate"], $_GET["edate"], $_GET["page"], $_GET["mgrID"]);
				}
				break;
			case 25: {
					$result = $request->getemphndrt($_GET["emp_id"]);
				}
				break;

			case 26: {
					//count all items for admin 
					//GET items for admin
					//check if keyword exist
					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->CountSearchedResquestsForOperator($key, $_GET["sort"], $_GET["show"], $_GET["oprid"]);
				}
				break;
			case 27: {
					//get all items for admin 
					//GET items for admin
					//check if keyword exist
					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->getSearchedResquestsForOperator($key, $_GET["sort"], $_GET["show"], $_GET["page"], $_GET["oprid"]);
				}
				break;
			case 28:
				{
					$result = $request->placeRequest($_GET["user_id"], $_GET["rqst_item"], $_GET["wrkst_id"], $_GET["ret"], $_GET["rqst_emp"]);
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
