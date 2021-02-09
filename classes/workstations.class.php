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
	
	public function getexpwrkst()
	{
		$sql = "SELECT workstation.wrkst_id, workstation.wrkst_name FROM workstation WHERE workstation.wrkst_status = 1";
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
	///////////////////////////////////////////////////////
	
	public $itemsPerPage = 20;
	
	public function getSearchedWorkstations($key, $sort, $show, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT wrkst_id, wrkst_name, wrkst_location, wrkst_mgr_id, wrkst_status, employee.emp_name, employee.emp_lname FROM workstation INNER JOIN user ON workstation.wrkst_mgr_id = user.user_id INNER JOIN employee ON user.user_emp_id = employee.emp_id".$this->ShowStatus($show);
			
            if(! is_null($key))
			{
				$sqlQuery.= " AND (wrkst_name LIKE '%".$key."%' OR employee.emp_name LIKE '%".$key."%' OR employee.emp_lname LIKE '%".$key."%' )";
            }
            
            $offset = ($page -1) * $this->itemsPerPage;

            $sqlQuery.= " ".$this->orderStatus($sort)." LIMIT ".$this->itemsPerPage." OFFSET ".$offset;

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
    public function CountSearchedWorkstations($key, $sort, $show)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM workstation INNER JOIN user ON workstation.wrkst_mgr_id = user.user_id INNER JOIN employee ON user.user_emp_id = employee.emp_id".$this->ShowStatus($show);

            if(! is_null($key))
			{
				$sqlQuery.= " AND (wrkst_name LIKE '%".$key."%' OR employee.emp_name LIKE '%".$key."%' OR employee.emp_lname LIKE '%".$key."%' )";
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
				return " WHERE (1=1)";
				break;
			case 1:
				return " WHERE (workstation.wrkst_status = 1)";
				break;
			case 2:
				return " WHERE (workstation.wrkst_status = 0)";
				break;
			default:
				return " WHERE (1=1)";
				break;
		}
	}
    
    //set sort order
	private function orderStatus($order)
	{
		switch($order)
		{
			case 1:
				return " ORDER BY workstation.wrkst_name ASC";
				break;
			case 2:
				return " ORDER BY workstation.wrkst_name DESC";
				break;
			default:
				return " ORDER BY workstation.wrkst_name ASC";
				break;
		}
	}
	
	
	public function countWorkstationsForStats()
    {
        $sql = "SELECT IFNULL(LFT.wrksNB,0) AS wrksNB, LFT.wrksStat FROM (SELECT COUNT(*) AS wrksNB, workstation.wrkst_status AS wrksStat FROM workstation GROUP BY workstation.wrkst_status) AS LFT RIGHT JOIN (SELECT 0 AS sts UNION SELECT 1 AS sts) AS RT ON LFT.wrksStat = RT.sts";

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
	
		public function countWorkstationWithMostRequests()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) AS cnt, workstation.wrkst_id, workstation.wrkst_name FROM workstation, request WHERE workstation.wrkst_id = request.rqst_wrkst_id GROUP BY workstation.wrkst_id ORDER BY cnt DESC LIMIT 1";

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
}