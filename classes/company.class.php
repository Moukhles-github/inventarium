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
    


}
