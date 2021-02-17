<?php
require("DAL.class.php");
require_once('utilities.class.php');
class users
{
	//Constructors
	public
	function __construct()
	{
		$this->db = new DAL();
	}

	public
	function __destruct()
	{

		$this->db = null;
	}

	//

	/////////////////////////////////////////////////////////////Methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	//check if username and pass
	public function getLogin($username,$password)
	{
		$sqlQuery="SELECT * FROM inventarium.user WHERE user_name='$username'";
		
		try
		{
			//execute the query and get back the data
			$data=$this->db->getData($sqlQuery);
			
			//check if the status of the user is active
			if(count($data) >= 1)
			{
				//get the hashed password for verification before sending the data to the web service
				$hashed = $data[0]["user_pwd"];

				//check if the there is data and the password = to the hashed one in the db
				if(password_verify($password, $hashed))
				{
					//$user = new user();
					//create a new array that contains the needed data for session
					$userValues = array(
						"user_id" => $data[0]["user_id"],
						"user_name" => $data[0]["user_name"],
						"user_type" => $data[0]["user_type"],
						);

					//return the array of data
					return $userValues;
				}
				else
				{
					//in case the user wasn't active
					return 0;
				}
			}
			else
			{
				//return -1 if the username wasn't available or the hashed pass didn't match the stored pass
				return 0;
			}
			
		//catch the exeption if the query wasn't executed properly and throw it back
		}
		catch(Exception $e)
		{	
			throw $e;
		}
	}
	
	

//	//login
//	public
//	function getLogin($username, $password)
//	{
//		$sql = "select * from user where user_name='$username' and user_pwd='$password' and user_status=1";
//
//		try {
//			$data = $this->db->getData($sql);
//
//			//user credentials are not valid or user is not active
//			if (is_null($data))
//				return 0;
//			else //user credentials are valid and user is active
//			{
//				$user = array(
//
//					"user_id" => $data[0]["user_id"],
//					"user_name" => $data[0]["user_name"],
//					"user_type" => $data[0]["user_type"],
//
//				);
//
//				return $user;
//			}
//		} catch (Exception $e) {
//			throw $e;
//		}
//	}

	//get users 
	public
	function getusers()
	{

		$sql = "SELECT user_id, user_name, user_status, employee.emp_name, user_type_id, user_type.user_type_name FROM user INNER JOIN employee ON user.user_emp_id = employee.emp_id INNER JOIN user_type ON user_type.user_type_id = user.user_type WHERE user.user_type != 0";

		try {
			$data = $this->db->getData($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}
	}


	//check if username exists in DB
	public
	function checkUsername($username)
	{
		try {
			$sql = "select * from users where u_uname='$username'";

			$data = $this->db->getData($sql);

			if (is_null($data))
				$result = 0;
			else
				$result = 1;


			return $result;
		} catch (Exception $e) {
			throw $e;
		}
	}

	//add an user
	public
	function createUser($u_emp_id, $username, $user_pwd, $user_type)
	{
		try {
			//hash the password before storing it
			$hashedPass = password_hash($user_pwd, PASSWORD_DEFAULT);
			$sql = "insert into user (user_emp_id, user_name, user_pwd, user_type, user_status, user_date) values ('$u_emp_id','$username','$hashedPass','$user_type','1',CURRENT_TIMESTAMP)";


			$result = $this->db->ExecuteidQuery($sql);

			return $result;
		} catch (Exception $e) {
			throw $e;
		}
	}

	//update an user
	public
	function updateUser($id, $username, $utype)
	{
		try {
			$sql = "UPDATE `user` SET `user_name` = '$username' , `user_type` = '$utype' WHERE `user`.`user_id` = $id;";

			$result = $this->db->ExecuteQuery($sql);

			return $result;
		} catch (Exception $e) {
			throw $e;
		}
	}
	// reset user password 
	public function resetpwd($newpwd, $userid)
	{
			try {
				$hashedPass = password_hash($newpwd, PASSWORD_DEFAULT);
				$sql = "UPDATE user SET user_pwd = '$hashedPass' WHERE user.user_id = $userid";
	
				$result = $this->db->ExecuteQuery($sql);
	
				return $result;
			} catch (Exception $e) {
				throw $e;
			}
	}

	//deactivate user
	public
	function toggleUser($id, $val)
	{
		try {
			$sql = "UPDATE `user` SET `user_status` = $val WHERE `user`.`user_id` = $id;";

			$result = $this->db->ExecuteQuery($sql);

			return $result;
		} catch (Exception $e) {
			throw $e;
		}
	}

	//promote user 
	public
	function promuser($uid)
	{
		$sql = "update users set u_type_id=2 where u_id=$uid";
		try {

			$result = $this->db->ExecuteQuery($sql);

			return $result;
		} catch (Exception $e) {
			throw $e;
		}
	}

	//get available managers 
	public
	function getmngs()
	{
		$sql = "Select users.u_id, users.u_name from users where users.u_type_id=2 AND users.u_active = 1 AND users.u_id NOT IN (SELECT users.u_id FROM users, warehouse WHERE users.u_id = warehouse.wa_mid AND users.u_type_id = 2) ";

		try {
			$data = $this->db->getData($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}
	}


	public function popEmployees()
	{

		$sql = "SELECT emp_id, emp_name, emp_lname FROM employee WHERE emp_id NOT IN(Select emp_id FROM employee, user where user.user_emp_id = employee.emp_id)";

		try {
			$data = $this->db->getData($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}
	}


	public function popUsertype()
	{

		$sql = "SELECT user_type_id, user_type_name FROM user_type WHERE user_type.user_type_active = 1 AND user_type_id != 0";

		try {
			$data = $this->db->getData($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	public $itemsPerPage = 20;
	
		public function getSearchedUsers($key, $sort, $show, $rank, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT user_id, user_name, user_status, employee.emp_name, user_type_id, user_type.user_type_name FROM user INNER JOIN employee ON user.user_emp_id = employee.emp_id INNER JOIN user_type ON user_type.user_type_id = user.user_type WHERE user.user_type != 0".$this->ShowStatus($show);

            if($rank != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND user_type_id =".$rank;
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (employee.emp_name LIKE '%".$key."%' OR user.user_name LIKE '%".$key."%')";
            }
            
            $offset = ($page -1) * $this->itemsPerPage;

            $sqlQuery.= " ".$this->orderStatus($sort)." LIMIT ".$this->itemsPerPage." OFFSET ".$offset;
			UTILITIES::writeToLog($sqlQuery);
			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	
    public function CountSearchedUsers($key, $sort, $show, $rank)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM `user`, `employee`, user_type WHERE user.user_emp_id = employee.emp_id AND user.user_type = user_type.user_type_id".$this->ShowStatus($show);

			
            if($rank != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND user_type_id =".$rank;
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (employee.emp_name LIKE '%".$key."%' OR user.user_name LIKE '%".$key."%')";
            }
			
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return ceil($data[0]["COUNT(*)"] / $this->itemsPerPage);
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
    }
    
    //set option
	private function ShowStatus($status)
	{
		switch($status)
		{
			case 0:
				return " AND (1=1)";
				break;
			case 1:
				return " AND (user_status = 1)";
				break;
			case 2:
				return " AND (user_status = 0)";
				break;
			default:
				return " AND (1=1)";
				break;
		}
	}
    
    //set sort order
	private function orderStatus($order)
	{
		switch($order)
		{
			case 1:
				return " ORDER BY user_name ASC";
				break;
			case 2:
				return " ORDER BY user_name DESC";
				break;
			case 3:
				return " ORDER BY emp_name ASC";
				break;
			case 4:
				return " ORDER BY emp_name DESC";
				break;
			default:
				return " ORDER BY user_name ASC";
				break;
		}
	}
	
	
	
	public function countUsersForStats()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT IFNULL(LFT.usrNB,0) AS usrNB, LFT.usrStat FROM (SELECT COUNT(*) AS usrNB, user.user_status AS usrStat FROM user GROUP BY user.user_status) AS LFT RIGHT JOIN (SELECT 0 AS sts UNION SELECT 1 AS sts) AS RT ON LFT.usrStat = RT.sts";
			
			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	public function getManagerWithMostRequests()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT final.Fname FROM (SELECT * FROM (SELECT COUNT(*) AS cnt, request.rqst_user_id AS uid FROM request GROUP BY request.rqst_user_id ORDER BY cnt DESC LIMIT 1) AS topUSR, (SELECT user.user_name, user.user_id AS uidd, CONCAT(employee.emp_name, ' ', employee.emp_lname) AS Fname FROM user, employee WHERE user.user_emp_id = employee.emp_id) AS emps WHERE emps.uidd = topUSR.uid) AS final";
			
			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	
	public function getFullOperatorInfo($id)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT user.user_name AS userName, employee.emp_ssn AS SSN, employee.emp_name AS firstName, employee.emp_lname AS lastName, employee.emp_ph_nb AS phoneNumber, employee.emp_address AS address, employee.emp_join_date AS joinDate, workstation.wrkst_name AS workstationName, workstation.wrkst_id AS workstationID, employee.emp_fouls AS fouls, employee.emp_rfid AS RFID, company.cmp_name AS companyName FROM user, employee, company, workstation WHERE user.user_emp_id = employee.emp_id AND company.cmp_id = employee.emp_cmp_id AND employee.emp_wrkst_id = workstation.wrkst_id AND user.user_id = ".$id;
			
			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
}
