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
require_once('../classes/item.class.php');

$item = new item();
$result = 0;


try {
	if (isset($_GET["op"])) //check if op exists
	{
		$op = $_GET["op"];


		switch ($op) { //get all ranks
			case 1: {
					$result = $item->getitem($_GET["whs_id"]);
				}
				break;
			case 2: {
					$result = $item->toggleitem($_GET["item_id"], $_GET["val"]);
				}
				break;
			case 3: {
					$result = $item->createitem($_GET["item_name"], $_GET["item_label"],$_GET["item_type"] , $_GET["item_res"], $_GET["item_whs"], $_GET["item_ret"], $_GET["item_life"]);
				}
				break;
			case 4: {
				$result = $item->updateitem($_GET["item_id"], $_GET["item_name"], $_GET["item_label"], $_GET["item_type"], $_GET["item_reserve"], $_GET["item_whs"], $_GET["item_returnable"], $_GET["item_lifespan"]);
				}
				break;
			case 5: {
					$result = $item->updateitem($_GET["item_id"], $_GET["item_name"], $_GET["item_label"], $_GET["item_type"], $_GET["item_reserve"], $_GET["item_whs"], $_GET["item_returnable"], $_GET["item_lifespan"]);
				}
				break;
			case 6: {
				$result = $warehouse->updatewhs($_GET["whs_id"], $_GET["whs_label"],$_GET["whs_type"],$_GET["whs_mngr"],$_GET["whs_address"]);
			}
			case 7: {
				
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