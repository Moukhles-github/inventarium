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
	
	
	
	
	///////////////////////////////////////////////////////
	
	public $itemsPerPage = 20;
	
	public function getSearchedCompanies($key, $sort, $show, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT * FROM company".$this->ShowStatus($show);
			
            if(! is_null($key))
			{
				$sqlQuery.= " AND (cmp_name LIKE '%".$key."%' OR cmp_id = '".$key."' )";
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
	
    public function CountSearchedCompanies($key, $sort, $show)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM company".$this->ShowStatus($show);

            if(! is_null($key))
			{
				$sqlQuery.= " AND (cmp_name LIKE '%".$key."%' OR cmp_id = '".$key."' )";
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
				return " WHERE (cmp_status = 1)";
				break;
			case 2:
				return " WHERE (cmp_status = 0)";
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
				return " ORDER BY cmp_name ASC";
				break;
			case 2:
				return " ORDER BY cmp_name DESC";
				break;
			default:
				return " ORDER BY cmp_name ASC";
				break;
		}
	}
	
	
	public function countCompanies()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT IFNULL(LFT.cmpNB,0) AS cmpNB, LFT.cmpStat FROM (SELECT COUNT(*) AS cmpNB, company.cmp_status AS cmpStat FROM company GROUP BY company.cmp_status) AS LFT RIGHT JOIN (SELECT 0 AS sts UNION SELECT 1 AS sts) AS RT ON LFT.cmpStat = RT.sts";

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}

}
