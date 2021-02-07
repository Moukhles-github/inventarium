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
require_once('../classes/warehouse.class.php');

$warehouse = new warehouse();
$result = 0;


try {
	if (isset($_GET["op"])) //check if op exists
	{
		$op = $_GET["op"];


		switch ($op) { //get all ranks
			case 1: {
					$result = $warehouse->getwhs();
				}
				break;
			case 2: {
					$result = $warehouse->togglewhs($_GET["whs_id"], $_GET["val"]);
				}
				break;
			case 4: {
					$result = $warehouse->getwhsmgr();
				}
				break;
			case 5: {
					$result = $warehouse->createwhs($_GET["whs_name"],$_GET["whs_mgr"], $_GET["whs_address"]);
				}
				break;
			case 6: {
				$result = $warehouse->updatewhs($_GET["whs_id"], $_GET["whs_label"],$_GET["whs_mngr"],$_GET["whs_address"]);
			}
			break;
			case 7: {
				$result = $warehouse->getitemwhs();
			}

			break;
			case 8: {
                    //count all items for admin 
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $warehouse->CountSearchedWarehouses($key, $_GET["sort"], $_GET["show"]);
                }
                break;
            case 9: {
                    //get all items for admin 
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $warehouse->getSearchedWarehouses($key, $_GET["sort"], $_GET["show"], $_GET["page"]);
                }
                break;
            case 10: {
                    
                    $result = $warehouse->countWarehousesForStats();
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
