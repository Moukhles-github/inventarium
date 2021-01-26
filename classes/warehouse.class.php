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
}
