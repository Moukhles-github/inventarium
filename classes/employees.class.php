<?php
require("DAL.class.php");
require_once('utilities.class.php');
class employees
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


	public function getSearchedEmployees($key, $sort, $show, $rank, $workstation, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT * FROM employee".$this->ShowStatus($show);

            if($rank != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND emp_rank_id =".$rank;
			}
            
            if($workstation != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND emp_wrkst_id =".$workstation;
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (emp_ssn LIKE '%".$key."%' OR emp_cmp_id = '".$key."' OR emp_name LIKE '%".$key."%' OR emp_lname LIKE '%".$key."%' OR emp_ph_nb LIKE '%".$key."%' OR emp_address LIKE '%".$key."%' OR  emp_join_date LIKE '%".$key."%' OR emp_rfid LIKE '%".$key."%')";
            }
            
            $offset = ($page -1) * 20;

            $sqlQuery.= " ".$this->orderStatus($sort)." LIMIT 20 OFFSET ".$offset;

			//execute and put result in a variable
			$result = $this->db->getData($sqlQuery);
			
			//return the values
            return($result);
            
		} catch (Exception $e) {
			throw $e;
		}
	}
    public function CountSearchedEmployees($key, $sort, $show, $rank, $workstation)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM employee".$this->ShowStatus($show);

            if($rank != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND emp_rank_id =".$rank;
			}
            
            if($workstation != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND emp_wrkst_id =".$workstation;
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (emp_ssn LIKE '%".$key."%' OR emp_cmp_id = '".$key."' OR emp_name LIKE '%".$key."%' OR emp_lname LIKE '%".$key."%' OR emp_ph_nb LIKE '%".$key."%' OR emp_address LIKE '%".$key."%' OR  emp_join_date LIKE '%".$key."%' OR emp_rfid LIKE '%".$key."%')";
            }

			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return ceil($data[0]["COUNT(*)"] / 20);
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
				return " WHERE (emp_status = 1)";
				break;
			case 2:
				return " WHERE (emp_status = 0)";
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
				return " ORDER BY emp_name ASC";
				break;
			case 2:
				return " ORDER BY emp_name DESC";
				break;
			case 3:
				return " ORDER BY emp_lname ASC";
				break;
			case 4:
				return " ORDER BY emp_lname DESC";
				break;
			case 5:
				return " ORDER BY emp_join_date ASC";
				break;
			case 6:
				return " ORDER BY emp_join_date DESC";
				break;
			case 7:
				return " ORDER BY emp_fouls ASC";
				break;
			case 8:
				return " ORDER BY emp_fouls DESC";
				break;
			default:
				return " ORDER BY emp_name ASC";
				break;
		}
	}
}
