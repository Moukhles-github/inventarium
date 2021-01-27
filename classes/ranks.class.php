<?php
require("DAL.class.php");

class ranks
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


	public function getRanks()
	{
		$sql = "select * from employee_rank";

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

	public function toggleRanks($rank_id, $liveval)
	{
		$sql = "UPDATE `employee_rank` SET `emp_rank_status` = '$liveval' WHERE `employee_rank`.`emp_rank_id` = $rank_id";

		try {

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sql);

			//return the values
			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	}

	public function createranks($rank_name)
	{
		$sql = "INSERT INTO `employee_rank` (`emp_rank_id`, `emp_rank_name`, `emp_rank_status`) VALUES (NULL, '$rank_name', '1');";

		try {
			$result = $this->db->ExecuteQuery($sql);

			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	}
	public function updateranks($rank_id, $rank_name)
	{
		$sql = "UPDATE `employee_rank` SET `emp_rank_name` = '$rank_name' WHERE `employee_rank`.`emp_rank_id` = $rank_id;";
		try {
			$result = $this->db->ExecuteQuery($sql);

			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	
	
	//////////////////////////item per page///////////////////////
	public $itemPerPage = 8;
	
	public function getSearchedRanks($key, $sort, $show, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT * FROM employee_rank".$this->ShowStatus($show);

            if(! is_null($key))
			{
				$sqlQuery.= " AND (emp_rank_name LIKE '%".$key."%')";
            }
            
            $offset = ($page -1) * $this->itemPerPage ;

            $sqlQuery.= " ".$this->orderStatus($sort)." LIMIT ".$this->itemPerPage." OFFSET ".$offset;

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	public function CountSearchedRanks($key, $sort, $show)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM employee_rank".$this->ShowStatus($show);

            if(! is_null($key))
			{
				$sqlQuery.= " AND (emp_rank_name LIKE '%".$key."%')";
            }

			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return ceil($data[0]["COUNT(*)"] / $this->itemPerPage);
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
				return " WHERE (emp_rank_status = 1)";
				break;
			case 2:
				return " WHERE (emp_rank_status = 0)";
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
				return " ORDER BY emp_rank_name ASC";
				break;
			case 2:
				return " ORDER BY emp_rank_name DESC";
				break;
			default:
				return " ORDER BY emp_name ASC";
				break;
		}
	}
	
	
}
