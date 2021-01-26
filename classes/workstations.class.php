<?php
require("DAL.class.php");

class workstaions
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


    public function getWorkstations()
    {
        $sql = "select * from workstation";

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
	
	public function popWrkst()
	{
		$sql = "SELECT wrkst_id, wrkst_name, wrkst_location, wrkst_mgr_id, wrkst_status, employee.emp_name, employee.emp_lname FROM workstation INNER JOIN user ON workstation.wrkst_mgr_id = user.user_id INNER JOIN employee ON user.user_emp_id = employee.emp_id";
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

	public function togglewrkst($wrkst_id, $status)
	{	
		$sql= "UPDATE `workstation` SET `wrkst_status` = '$status' WHERE `workstation`.`wrkst_id` = $wrkst_id;";
		try {
			$data = $this->db->ExecuteQuery($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}


	}

	public function createwrkst($wrkst_name, $wrkst_location, $wrkst_mgr_id)
	{
		$sql = "INSERT INTO `workstation` (`wrkst_id`, `wrkst_name`, `wrkst_location`, `wrkst_mgr_id`, `wrkst_status`) VALUES (NULL, '$wrkst_name', '$wrkst_location', '$wrkst_mgr_id', '1')";
		try {
			$data = $this->db->ExecuteQuery($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}

	}

	public function updatewrkst($wrkst_id, $wrkst_name, $wrkst_location, $wrkst_mgr_id)
	{
		$sql ="UPDATE `workstation` SET `wrkst_name` = '$wrkst_name', `wrkst_location` = '$wrkst_location', `wrkst_mgr_id` = '$wrkst_mgr_id'  WHERE `workstation`.`wrkst_id` = $wrkst_id;";
		try {
			$data = $this->db->ExecuteQuery($sql);


			//No data
			if (is_null($data))
				return 0;
			else
				return $data;
		} catch (Exception $e) {
			throw $e;
		}
	}

	public function popwrkstmgr ()
	{
		$sql = "SELECT user.user_id, employee.emp_name, employee.emp_lname FROM user INNER JOIN employee ON user.user_emp_id = employee.emp_id where user.user_id NOT IN (SELECT user_id FROM user INNER JOIN workstation ON user.user_id = workstation.wrkst_mgr_id)";
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
	
}