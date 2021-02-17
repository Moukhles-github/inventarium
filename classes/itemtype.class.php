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

	public function toggletype($type_id, $liveval)
	{
		$sql = "UPDATE `item_type` SET `item_type_status` = '$liveval' WHERE `item_type`.`item_type_id` = $type_id ";

		try {

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sql);

			//return the values
			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	}

	public function getalltypes(){
		$sql = "select * from item_type";

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

	public function createtype($name)
	{
		$sql = "INSERT INTO `item_type` (`item_type_id`, `item_type_name`, `item_type_status`) VALUES (NULL, '$name', '1')";

		try {

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sql);

			//return the values
			return ($result);
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	public function updatetype($typeid,  $name)
	{
		$sql = "UPDATE `item_type` SET `item_type_name` = '$name' WHERE `item_type`.`item_type_id` = $typeid";

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
?>	