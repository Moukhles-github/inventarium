<?php
require("DAL.class.php");

class request
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


	public function getrqst()
	{
        $sql = "SELECT request.rqst_id, user.user_name, item.item_label, workstation.wrkst_name, request.rqst_status, request.rqst_date FROM request INNER JOIN user on request.rqst_user_id = user.user_id INNER JOIN item on request.rqst_item_id = item.item_id INNER JOIN workstation on request.rqst_wrkst_id = workstation.wrkst_id";
        

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

	public function getmorerqst($rqst_id)
	{
		$sql = "SELECT request.rqst_id, request.rqst_res, request.rqst_ret, request.rqst_status, request.rqst_date, request.rqst_acc_date, request.rqst_handled_date, request.rqst_denied_date, request.rqst_returned_date, request.rqst_handler_id, request.rqst_returner_id, item.item_label, warehouse.whs_label, employee.emp_name, employee.emp_lname, workstation.wrkst_name FROM request INNER JOIN item on request.rqst_item_id = item.item_id INNER JOIN warehouse on item.item_whs_id = warehouse.whs_id INNER JOIN user on request.rqst_user_id = user.user_id INNER JOIN employee on user.user_emp_id = employee.emp_id INNER JOIN workstation on request.rqst_wrkst_id = workstation.wrkst_id where request.rqst_id = $rqst_id ";

		try {

			//execute and put result in a variable
			$result = $this->db->getData($sql);

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
