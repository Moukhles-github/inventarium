<?php
require("DAL.class.php");
require_once('utilities.class.php');
class company
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


	public function getCompanies()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT * FROM company";

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}

	public function togglecmp($cmp_id, $status)
	{
		try
		{
			//create sql query
            $sqlQuery = "UPDATE company SET cmp_status = $status WHERE cmp_id=$cmp_id";

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}

	public function createcmp($cmp_name, $cmp_address, $cmp_subsidiary)
	{
		try
		{
			//create sql query
            $sqlQuery = "INSERT INTO `company` (`cmp_id`, `cmp_name`, `cmp_address`, `cmp_subsidiary`, `cmp_status`) VALUES (NULL, '$cmp_name', '$cmp_address', '$cmp_subsidiary', '1');";

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
	
	public function updatecmp($cmp_id, $cmp_name, $cmp_address, $cmp_subsidiary)
	{
		try
		{
			//create sql query
            $sqlQuery = "UPDATE `company` SET `cmp_name`= '$cmp_name' , `cmp_address`= '$cmp_address' , `cmp_subsidiary` = '$cmp_subsidiary' WHERE `company`.`cmp_id` = $cmp_id;";

			//execute and put result in a variable
			$result = $this->db->ExecuteQuery($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}


}
