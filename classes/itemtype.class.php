<?php
require("DAL.class.php");

class itemtype
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


	public function getitemtype()
	{
		$sql = "SELECT item_type.item_type_id, item_type.item_type_name FROM item_type WHERE item_type.item_type_status = 1";

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

}