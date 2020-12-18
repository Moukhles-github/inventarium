<?php
require( "DAL.class.php" );

class users {
	//Constructors
	public
	function __construct() {
		$this->db = new DAL();
	}

	public
	function __destruct() {

		$this->db = null;
	}

	//

	/////////////////////////////////////////////////////////////Methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


	//get users 
	public
	function getemps() {

		$sql = "SELECT * FROM `user` where user_status" ;

		try {
			$data = $this->db->getData( $sql );


			//No data
			if ( is_null( $data ) )
				return 0;
			else
				return $data;
		} catch ( Exception $e ) {
			throw $e;
		}
	}
	//login
	public
	function getLogin( $username, $password ) {
		$sql = "select * from user where user_name='$username' and user_pwd='$password' and user_status=1";

		try {
			$data = $this->db->getData( $sql );

			//user credentials are not valid or user is not active
			if ( is_null( $data ) )
				return 0;
			else //user credentials are valid and user is active
			{
				$user = array(
					
					"user_id" => $data[ 0 ][ "user_id" ],
					"user_name" => $data[ 0 ][ "user_name" ],
					"user_type" => $data[ 0 ][ "user_type" ],
					
				);

				return $user;
			}
		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//check if username exists in DB
	public
	function checkUsername( $username ) {
		try {
			$sql = "select * from users where u_uname='$username'";

			$data = $this->db->getData( $sql );

			if ( is_null( $data ) )
				$result = 0;
			else
				$result = 1;


			return $result;

		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//add an user
	public
	function addUser( $ssn, $rank, $name, $lname, $uname, $upwd ) {
		try {
			$sql = "insert into users (u_ssn,u_rank_id,u_name,u_lname,u_uname,u_psw,u_type_id,u_active) values ('$ssn','$rank','$name','$lname','$uname','$upwd',3,1)";


			$result = $this->db->ExecuteidQuery( $sql );

			return $result;

		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//update an user
	public
	function updateUser( $id, $ssn, $rank, $name, $lname, $uname, $upwd, $type, $active ) {
		try {
			$sql = "update users set u_ssn=$ssn,u_rank_id=$rank,u_name='$name',u_lname='$lname',u_uname='$uname',u_psw='$upwd',u_type_id=$type, u_active=$active where u_id=$id";

			$result = $this->db->ExecuteQuery( $sql );

			return $result;

		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//deactivate user
	public
	function deactivateUser( $id, $val ) {
		try {
			$sql = "update users set u_active=$val where u_id=$id";

			$result = $this->db->ExecuteQuery( $sql );

			return $result;

		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//promote user 
	public
	function promuser( $uid ) {
		$sql = "update users set u_type_id=2 where u_id=$uid";
		try {

			$result = $this->db->ExecuteQuery( $sql );

			return $result;

		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//get employees
	public
	function getuser() {
		$sql = "SELECT u_ssn,u_name FROM `users` WHERE users.u_type_id = 3  ";

		try {
			$data = $this->db->getData( $sql );


			//No data
			if ( is_null( $data ) )
				return 0;
			else
				return $data;
		} catch ( Exception $e ) {
			throw $e;
		}
	}

	//get available managers 
	public
	function getmngs() {
		$sql = "Select users.u_id, users.u_name from users where users.u_type_id=2 AND users.u_active = 1 AND users.u_id NOT IN (SELECT users.u_id FROM users, warehouse WHERE users.u_id = warehouse.wa_mid AND users.u_type_id = 2) ";

		try {
			$data = $this->db->getData( $sql );


			//No data
			if ( is_null( $data ) )
				return 0;
			else
				return $data;
		} catch ( Exception $e ) {
			throw $e;
		}


	}

}

?>