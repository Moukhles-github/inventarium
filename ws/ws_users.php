<?php

//this web service can handle 7 types of requets based on a parameter op
/*
	 op=1 (login)
	 op=2 (check if username)
	 op=3 (add user) 
	 op=4 (update user)
	 op=5 (deactivate user)
	 op=6 (logout)
	 op=7 (get all users)
	 op=8 (promote user)
	 op=9 (get managers)
	 
*/

header( 'Access-Control-Allow-Origin: *' );
require_once( '../classes/users.class.php' );

$user = new users();
$result = 0;


try {
	if ( isset( $_GET[ "op" ] ) ) //check if op exists
	{
		$op = $_GET[ "op" ];


		switch ( $op ) { //login
			case 1:
				{
					$result = $user->getLogin( $_GET[ "uname" ], $_GET[ "upwd" ] );

					if ( is_array( $result ) ) {
						session_start();

						//store id, uname, type in session, so it can be accessible in any php file
						// $_SESSION[ "uid" ] = $result[ "u_id" ];
						// $_SESSION[ "uname" ] = $result[ "u_name" ];
						// $_SESSION[ "utype" ] = $result[ "u_type" ];
						// $_SESSION[ "u_uname" ] = $result[ "u_uname" ];

						//store the type in result so to return it
						//$result=$result->getType();
						$result = $result[ "user_type" ];
					}
				}

				break;

			case 2: //check if username exists
				$result = $user->checkUsername( $_GET[ "uname" ] );
				break;

			case 3: //add user
				$result = $user->addUser( $_GET[ "u_ssn" ], $_GET[ "u_rankid" ], $_GET[ "u_name" ], $_GET[ "u_lname" ], $_GET[ "u_uname" ], $_GET[ "u_psw" ] );
				break;

			case 4: //update user
				$result = $user->updateUser( $_GET[ "id" ], $_GET[ "u_ssn" ], $_GET[ "u_rankid" ], $_GET[ "u_name" ], $_GET[ "u_lname" ], $_GET[ "u_uname" ], $_GET[ "u_psw" ], $_GET[ "u_typeid" ], $_GET[ "active" ] );
				break;

			case 5: //deactivate user
				$result = $user->deactivateUser( $_GET[ "u_id" ], $_GET[ "val" ] );
				break;

			case 6: //Logout
				session_start();
				session_unset();

				// destroy the session 
				session_destroy();

				$result = 1;
				break;

			case 7: //get users
				$result = $user->getemps();
				break;

			case 8:
				$result = $user->promuser( $_GET[ 'eid' ] );
				break;

			case 9:
				$result = $user->getmngs();
				break;

			default:
				return 0;
				break;
		}

	}

	header( "Content-type:application/json" );
	echo json_encode( $result );
} catch ( Exception $e ) {

	echo - 1;
}



?>