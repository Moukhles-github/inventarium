<?php
require("DAL.class.php");

class warehouse
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


    public function getwhs()
    {
        $sql = "SELECT warehouse.whs_id, warehouse.whs_label, warehouse.whs_mgr_id, warehouse.whs_address, warehouse.whs_date, warehouse.whs_status, employee.emp_name, employee.emp_lname FROM `warehouse` INNER JOIN user on warehouse.whs_mgr_id = user.user_id INNER JOIN employee ON employee.emp_id = user.user_emp_id";

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

    public function togglewhs($whs_id, $liveval)
    {
        $sql = "UPDATE `warehouse` SET `whs_status` = '$liveval' WHERE `warehouse`.`whs_id` = $whs_id";

        try {

            //execute and put result in a variable
            $result = $this->db->ExecuteQuery($sql);

            //return the values
            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getwhsmgr()
    {
        $sql = "SELECT user.user_id, employee.emp_name, emp_lname FROM user INNER JOIN employee ON user.user_emp_id = employee.emp_id WHERE user.user_type = 1 AND user.user_status = 1 AND user.user_id NOT IN (SELECT user.user_id FROM user INNER JOIN employee ON employee.emp_id = user.user_emp_id INNER JOIN warehouse on user.user_id = warehouse.whs_mgr_id)";

        try {
            $result = $this->db->getData($sql);

            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function createwhs($whs_name,$whsmgr, $whsaddress)
    {
        $sql = "INSERT INTO `warehouse` (`whs_id`, `whs_label`, `whs_mgr_id`, `whs_address`, `whs_date`, `whs_status`) VALUES (NULL, '$whs_name', '$whsmgr', '$whsaddress', CURRENT_TIMESTAMP, '1');";

        try {
            $result = $this->db->ExecuteQuery($sql);

            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function updatewhs($whs_id, $whs_name, $whs_mgr, $whs_address )
    {
        $sql = "UPDATE `warehouse` SET `whs_label` = '$whs_name', `whs_mgr_id` = $whs_mgr, `whs_address` = '$whs_address' WHERE `warehouse`.`whs_id` = $whs_id";
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

    public function getitemwhs()
    {
        $sql = "SELECT warehouse.whs_id, warehouse.whs_label FROM warehouse";
        try {
            $result = $this->db->getData($sql);

            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }
	
	
	///////////////////////////////////////////////////////
	
	public $itemsPerPage = 20;
	
	public function getSearchedWarehouses($key, $sort, $show, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT warehouse.whs_id, warehouse.whs_label, warehouse.whs_mgr_id, warehouse.whs_address, warehouse.whs_date, warehouse.whs_status, employee.emp_name, employee.emp_lname FROM `warehouse` INNER JOIN user on warehouse.whs_mgr_id = user.user_id INNER JOIN employee ON employee.emp_id = user.user_emp_id ".$this->ShowStatus($show);
			
            if(! is_null($key))
			{
				$sqlQuery.= " AND (warehouse.whs_label LIKE '%".$key."%' OR employee.emp_name LIKE '%".$key."%' OR employee.emp_lname LIKE '%".$key."%' )";
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
	
    public function CountSearchedWarehouses($key, $sort, $show)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM `warehouse` INNER JOIN user on warehouse.whs_mgr_id = user.user_id INNER JOIN employee ON employee.emp_id = user.user_emp_id".$this->ShowStatus($show);

            if(! is_null($key))
			{
				$sqlQuery.= " AND (warehouse.whs_label LIKE '%".$key."%' OR employee.emp_name LIKE '%".$key."%' OR employee.emp_lname LIKE '%".$key."%' )";
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
				return " WHERE (warehouse.whs_status = 1)";
				break;
			case 2:
				return " WHERE (warehouse.whs_status = 0)";
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
				return " ORDER BY warehouse.whs_label ASC";
				break;
			case 2:
				return " ORDER BY warehouse.whs_label DESC";
				break;
			case 3:
				return " ORDER BY warehouse.whs_date ASC";
				break;
			case 4:
				return " ORDER BY warehouse.whs_date DESC";
				break;
			default:
				return " ORDER BY warehouse.whs_label ASC";
				break;
		}
	}
	
	
	
	public function countWarehousesForStats()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT IFNULL(LFT.whrNB,0) AS whrNB, LFT.whrStat FROM (SELECT COUNT(*) AS whrNB, warehouse.whs_status AS whrStat FROM warehouse GROUP BY warehouse.whs_status) AS LFT RIGHT JOIN (SELECT 0 AS sts UNION SELECT 1 AS sts) AS RT ON LFT.whrStat = RT.sts";

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
}
