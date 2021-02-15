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
				$result = $item->getwhsmgritems($_GET["mgr_id"]);
			}
			break;
			case 7: {
				$result = $item->getexpitem($_GET["mgr_id"], $_GET["type_id"]);
			}
			break;
			case 8: {
				$result = $item->countWhsmgrItems($_GET["mgr_id"]);
			}
			break;
			case 9: {
				$result = $item->countWhsmgrItemsTaken($_GET["mgr_id"]);
			}
			break;
			case 10: {
				$result = $item->countWhsmgrItemsBroken($_GET["mgr_id"]);
			}
			break;
			case 11: {
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $item->CountSearchedItems($key, $_GET["sort"], $_GET["show"], $_GET["type"], $_GET["whsid"] );
                }
                break;
			case 12: {
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $item->getSearchedItems($key, $_GET["sort"], $_GET["show"], $_GET["type"], $_GET["whsid"],  $_GET["page"] );
                }
                break;
			case 13: {
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $item->CountSearchedItemsByManager($key, $_GET["sort"], $_GET["show"], $_GET["type"], $_GET["mgrid"] );
                }
                break;
			case 14: {
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $item->getSearchedItemsByManager($key, $_GET["sort"], $_GET["show"], $_GET["type"], $_GET["mgrid"],  $_GET["page"] );
                }
                break;
			case 15: {
                    $result = $item->getItems($_GET["typeID"]);
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
