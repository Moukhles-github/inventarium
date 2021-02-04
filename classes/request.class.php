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

////////////////////////////////////////////////// WAREHOUSE MANAGER METHODS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	public function  getmgr_rqst($mgrid)
	{
		$sql = "SELECT request.rqst_id, employee.emp_name, employee.emp_lname,warehouse.whs_label, workstation.wrkst_name, item.item_label, request.rqst_status, request.rqst_date FROM request INNER JOIN user ON request.rqst_user_id = user.user_id INNER JOIN employee ON user.user_emp_id = employee.emp_id INNER JOIN workstation ON request.rqst_wrkst_id = workstation.wrkst_id INNER JOIN item ON request.rqst_item_id = item.item_id INNER JOIN warehouse on item.item_whs_id = warehouse.whs_id where item.item_id IN (SELECT item.item_id FROM item INNER JOIN warehouse ON item.item_whs_id = warehouse.whs_id WHERE warehouse.whs_mgr_id = $mgrid)";
		try {

			//execute and put result in a variable
			$result = $this->db->getData($sql);

			//return the values
			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	
	}

	
	
	/////////////////////////////////////////////////////////////Methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	public $itemsPerPage = 20;

	public function getSearchedResquests($key, $sort, $show, $startdate, $enddate, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT request.rqst_id, user.user_name, item.item_label, workstation.wrkst_name, request.rqst_status, request.rqst_date FROM request INNER JOIN user on request.rqst_user_id = user.user_id INNER JOIN item on request.rqst_item_id = item.item_id INNER JOIN workstation on request.rqst_wrkst_id = workstation.wrkst_id ".$this->ShowStatus($show);
			
			//check if start and end date exist
			if($startdate != "")
			{
				$sqlQuery .= " AND (request.rqst_date > '".$startdate."')";
			}
			if($enddate != "")
			{
				$sqlQuery.= " AND (request.rqst_date < '".$enddate."')";
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (user.user_name LIKE '%".$key."%' OR request.rqst_id = '".$key."')";
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
    public function CountSearchedResquests($key, $sort, $show, $startdate, $enddate)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM request INNER JOIN user on request.rqst_user_id = user.user_id INNER JOIN item on request.rqst_item_id = item.item_id INNER JOIN workstation on request.rqst_wrkst_id = workstation.wrkst_id ".$this->ShowStatus($show);

            //check if start and end date exist
			if($startdate != "")
			{
				$sqlQuery .= " AND (request.rqst_date > '".$startdate."')";
			}
			if($enddate != "")
			{
				$sqlQuery.= " AND (request.rqst_date < '".$enddate."')";
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (user.user_name LIKE '%".$key."%' OR request.rqst_id = '".$key."')";
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
				return " WHERE (request.rqst_status = 0)";
				break;
			case 2:
				return " WHERE (request.rqst_status = 1)";
				break;
			case 3:
				return " WHERE (request.rqst_status = 2)";
				break;
			case 4:
				return " WHERE (request.rqst_status = 3)";
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
				return " ORDER BY request.rqst_date ASC";
				break;
			case 2:
				return " ORDER BY request.rqst_date DESC";
				break;
			default:
				return " ORDER BY request.rqst_date DESC";
				break;
		}
	}
/////////////////////////////////////////////// Request manager \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public function acceptrqstitem($rqstid)
	{
		$sql = "UPDATE request SET request.rqst_status = 1, request.rqst_acc_date = CURRENT_DATE WHERE rqst_id = $rqstid";
		try {

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sql);

			//return the values
			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	
	}

	public function handlerqstitem($rqst_id, $emp_id)
	{
		$sql = "UPDATE request SET request.rqst_status = 2, request.rqst_handled_date = CURRENT_DATE, request.rqst_handler_id = $emp_id WHERE rqst_id = $rqst_id";
		try {

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sql);

			//return the values
			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	}

	public function returnrqstitem($rqst_id, $emp_id)
	{
		$sql = "UPDATE request SET request.rqst_status = 3, request.rqst_handled_date = CURRENT_DATE, request.rqst_handler_id = $emp_id WHERE rqst_id = $rqst_id";
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
