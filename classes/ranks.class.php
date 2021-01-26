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
}
