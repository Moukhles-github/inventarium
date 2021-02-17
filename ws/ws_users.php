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
require_once('../classes/users.class.php');

$user = new users();
$result = 0;


try {
	if (isset($_GET["op"])) //check if op exists
	{
		$op = $_GET["op"];


		switch ($op) { //login
			case 1: {
					$result = $user->getLogin($_GET["uname"], $_GET["upwd"]);

					if (is_array($result)) {
						session_start();

						//store id, uname, type in session, so it can be accessible in any php file
						$_SESSION[ "uid" ] = $result[ "user_id" ];
						$_SESSION[ "uname" ] = $result[ "user_name" ];
						$_SESSION[ "utype" ] = $result[ "user_type" ];

						//store the type in result so to return it
						$result = $result["user_type"];
					}
				}

				break;
				
//				
//				case 4:
//					//validate login
//					$result = $user->getLogin($_GET["uname"], $_GET["pass"]);
//					//check if the result returned is array of data
//					if(is_array($result))
//					{
//						//start a session for the logged in user
//						$_SESSION["ID"] = $result ["id"];
//						$_SESSION["UNAME"] = $result ["uname"];
//						$_SESSION["TYPE"] = $result ["type"];
//						$_SESSION["EMAIL"] = $result ["mail"];
//					}
//					sleep(1); //just to see the animations
//				break;

			case 2: //check if username exists
				$result = $user->checkUsername($_GET["user_name"]);
				break;

			case 3: //add user
				$result = $user->createUser($_GET["user_emp_id"], $_GET["user_name"], $_GET["user_pwd"], $_GET["user_type"]);
				break;

			case 4: //update user
				$result = $user->updateUser($_GET["user_id"], $_GET["user_name"], $_GET["user_type"]);
				break;

			case 5: //deactivate user
				$result = $user->toggleUser($_GET["u_id"], $_GET["val"]);
				break;

			case 6: //Logout
				session_start();
				session_unset();

				// destroy the session 
				session_destroy();
				
				header("location:../login.php");

				$result = 1;
				break;

			case 7: //get users
				$result = $user->getusers();
				break;

			case 8:
				$result = $user->promuser($_GET['eid']);
				break;

			case 9:
				$result = $user->popEmployees(); //populate elegible employees to users. 
				break;

			case 10:
				$result = $user->popUsertype();
				break;
			case 11: {
                    //GET items for admin
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $user->CountSearchedUsers($key, $_GET["sort"], $_GET["show"], $_GET["rank"]);
                }
                break;
			case 12: {
                    //check if keyword exist
                    if ((!isset($_GET["key"])) || ($_GET["key"] == "")) {
                        $key = NULL;
                    } else {
                        $key = $_GET["key"];
                    }
                    $result = $user->getSearchedUsers($key, $_GET["sort"], $_GET["show"], $_GET["rank"], $_GET["page"]);
                }
                break;
				

			case 13:
				$result = $user->countUsersForStats();
			break;
				

			case 14:
				$result = $user->getManagerWithMostRequests();
			break;
				case 15: {
					$result = $user->getLogin($_GET["uname"], $_GET["upwd"]);

					if (is_array($result)) {
						session_start();

						//store id, uname, type in session, so it can be accessible in any php file
						$_SESSION[ "uid" ] = $result[ "user_id" ];
						$_SESSION[ "uname" ] = $result[ "user_name" ];
						$_SESSION[ "utype" ] = $result[ "user_type" ];
						sleep(2);

						//store the type in result so to return it
					}
				}

				break;
				case 16: {
					$result = $user->getFullOperatorInfo($_GET["oprid"]);
					}
				

				break;
			case 17: 
				{
					$result = $user->resetpwd($_GET['pwd'], $_GET['user_id']);
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
