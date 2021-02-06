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
					//count all items for admin 
					//GET items for admin
					//check if keyword exist
					if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
						$key = NULL;
					} else {
						$key = $_GET["key"];
					}
					$result = $request->CountSearchedResquests($key, $_GET["sort"], $_GET["show"], $_GET["sdate"], $_GET["edate"]);
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
