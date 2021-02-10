<?php
require("DAL.class.php");

class item
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


    public function getitem($whsid)
    {
        $sql = "SELECT item.item_id, item.item_name, item.item_label, item.item_type_id, item.item_reserve, item.item_whs_id, item.item_returnable, item.item_lifespan, item.item_entry_date, item.item_status, item_type.item_type_id, item_type.item_type_name, warehouse.whs_id, warehouse.whs_label FROM item INNER JOIN item_type ON item.item_type_id = item_type.item_type_id INNER JOIN warehouse ON item.item_whs_id = warehouse.whs_id WHERE warehouse.whs_id = $whsid";

        try {
            $result = $this->db->getData($sql);

            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function toggleitem($itemid, $liveval)
    {
        $sql = "UPDATE `item` SET `item_status` = '$liveval' WHERE `item`.`item_id` = $itemid;"; 
        try {
            $result = $this->db->ExecuteQuery($sql);

            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    public function createitem($itemname, $itemlabel, $itemtype, $itemres, $itemwhs, $itemret, $itemlife)
    {
        $sql = "INSERT INTO `item` (`item_id`, `item_name`, `item_label`, `item_type_id`, `item_reserve`, `item_whs_id`, `item_returnable`, `item_lifespan`, `item_entry_date`, `item_status`) VALUES (NULL, '$itemname', '$itemlabel', '$itemtype', '$itemres', '$itemwhs', '$itemret', '$itemlife', CURRENT_TIMESTAMP, '1');";

        try {
            $result = $this->db->ExecuteQuery($sql);

            return ($result);
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function updateitem($item_id, $item_name, $item_label, $item_type, $item_reserve, $item_whs, $item_returnable, $item_lifespan )
    {
        $sql = "UPDATE `item` SET `item_name` = '$item_name', `item_label` = '$item_label', `item_type_id` = $item_type, `item_reserve` = '$item_reserve', `item_whs_id` = '$item_whs', `item_returnable` = '$item_returnable', `item_lifespan` = '$item_lifespan' WHERE `item`.`item_id` = $item_id";
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

    public function getwhsmgritems($mgrid)
    {
        $sql = "SELECT item.item_id, item.item_name, item.item_label, item.item_reserve, item.item_returnable, item.item_lifespan, item.item_entry_date, item.item_status, item_type.item_type_name FROM item INNER JOIN item_type ON item.item_type_id = item_type.item_type_id INNER JOIN warehouse ON warehouse.whs_id = item.item_whs_id WHERE warehouse.whs_mgr_id = $mgrid";
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

    public function getexpitemtype()
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


    public function getexpitem($mgrid, $type)
    {
        $sql = "SELECT item.item_id, item.item_name, item.item_label, item.item_returnable FROM item INNER JOIN warehouse ON item.item_whs_id = warehouse.whs_id INNER JOIN item_type ON item.item_type_id = item_type.item_type_id WHERE warehouse.whs_mgr_id = '$mgrid' AND item_type.item_type_id = '$type' AND item.item_status = 1 AND item.item_reserve = 0";
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
	
	
    public function countWhsmgrItems($mgrid)
    {
        $sql = "SELECT COUNT(*) AS cnt FROM item INNER JOIN item_type ON item.item_type_id = item_type.item_type_id INNER JOIN warehouse ON warehouse.whs_id = item.item_whs_id WHERE warehouse.whs_mgr_id = $mgrid";
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
	
	
    public function countWhsmgrItemsTaken($mgrid)
    {
        $sql = "SELECT COUNT(*) AS cnt FROM item INNER JOIN item_type ON item.item_type_id = item_type.item_type_id INNER JOIN warehouse ON warehouse.whs_id = item.item_whs_id WHERE item_status=0 and warehouse.whs_mgr_id = $mgrid";
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
	
	
    public function countWhsmgrItemsBroken($mgrid)
    {
        $sql = "SELECT COUNT(*) AS cnt FROM item INNER JOIN item_type ON item.item_type_id = item_type.item_type_id INNER JOIN warehouse ON warehouse.whs_id = item.item_whs_id WHERE item_lifespan=0 and warehouse.whs_mgr_id = $mgrid";
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
