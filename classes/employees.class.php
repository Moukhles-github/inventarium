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

	public $itemsPerPage = 20;

	public function getSearchedEmployees($key, $sort, $show, $rank, $workstation, $page)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT * FROM employee, workstation, company, employee_rank".$this->ShowStatus($show)."AND workstation.wrkst_id = employee.emp_wrkst_id AND employee.emp_cmp_id = company.cmp_id AND employee_rank.emp_rank_id = employee.emp_rank_id ";

            if($rank != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND employee.emp_rank_id =".$rank;
			}
            
            if($workstation != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND employee.emp_wrkst_id =".$workstation;
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (emp_ssn LIKE '%".$key."%' OR emp_cmp_id = '".$key."' OR emp_name LIKE '%".$key."%' OR emp_lname LIKE '%".$key."%' OR emp_ph_nb LIKE '%".$key."%' OR emp_address LIKE '%".$key."%' OR  emp_join_date LIKE '%".$key."%' OR emp_rfid LIKE '%".$key."%')";
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
    public function CountSearchedEmployees($key, $sort, $show, $rank, $workstation)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) FROM employee".$this->ShowStatus($show);

            if($rank != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND employee.emp_rank_id =".$rank;
			}
            
            if($workstation != -1)
			{
				//check if all cat is selected
				$sqlQuery .= " AND employee.emp_wrkst_id =".$workstation;
			}

            if(! is_null($key))
			{
				$sqlQuery.= " AND (emp_ssn LIKE '%".$key."%' OR emp_cmp_id = '".$key."' OR emp_name LIKE '%".$key."%' OR emp_lname LIKE '%".$key."%' OR emp_ph_nb LIKE '%".$key."%' OR emp_address LIKE '%".$key."%' OR  emp_join_date LIKE '%".$key."%' OR emp_rfid LIKE '%".$key."%')";
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
	
	public function addEmployee($empSSN, $empCompany, $empName, $empLname, $empPnum, $empAddress, $empWorkstation, $empRank, $empFouls, $empRFID)
	{
		try
		{
			//create sql query
            $sqlQuery = "INSERT INTO employee (emp_id, emp_ssn, emp_cmp_id, emp_name, emp_lname, emp_ph_nb, emp_address, emp_join_date, emp_wrkst_id, emp_rank_id, emp_fouls, emp_rfid, emp_status) ";
			$sqlQuery .= " VALUES (NULL, '$empSSN', $empCompany, '$empName', '$empLname', '$empPnum', '$empAddress', '".date("Y-m-d")."', $empWorkstation, $empRank, $empFouls, '$empRFID', 1)";
			//execute and put result in a variable
			$data = $this->db->ExecuteidQuery($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
    }
	
	public function updateEmployee($empID, $empSSN, $empCompany, $empName, $empLname, $empPnum, $empAddress, $empWorkstation, $empRank, $empFouls, $empRFID)
	{
		try
		{	
			//create sql query
            $sqlQuery = "UPDATE employee SET emp_ssn='$empSSN', emp_cmp_id=$empCompany, emp_name = '$empName', emp_lname = '$empLname', emp_ph_nb = '$empPnum', emp_address = '$empAddress', emp_wrkst_id = $empWorkstation, emp_rank_id = $empRank, emp_fouls = $empFouls, emp_rfid = '$empRFID' WHERE emp_id=$empID";
			//execute and put result in a variable
			$data = $this->db->ExecuteidQuery($sqlQuery);
			
			//return the values
			return $data ;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
    }
	
	public function toggleEmploye($empID, $status)
	{
		try
		{	
			//create sql query
            $sqlQuery = "UPDATE employee SET emp_status = $status WHERE emp_id=$empID";
			//execute and put result in a variable
			$data = $this->db->ExecuteidQuery($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
	
	public function getemprfid($rfid)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT employee.emp_id, employee.emp_name, employee.emp_lname, company.cmp_name, workstation.wrkst_id, workstation.wrkst_name, employee_rank.emp_rank_name FROM employee INNER JOIN company ON employee.emp_cmp_id = company.cmp_id INNER JOIN workstation ON employee.emp_wrkst_id = workstation.wrkst_id INNER JOIN employee_rank ON employee.emp_rank_id = employee_rank.emp_rank_id WHERE employee.emp_rfid = '$rfid'";
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
	
	public function getWorkstationEmployees($wrksid)
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT employee.emp_id, employee.emp_name FROM employee WHERE employee.emp_wrkst_id = '$wrksid'";
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
	
	public function countEmployeesForStats()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT IFNULL(LFT.empNB,0) AS empNB, LFT.empStat FROM (SELECT COUNT(*) AS empNB, employee.emp_status AS empStat FROM employee GROUP BY employee.emp_status) AS LFT RIGHT JOIN (SELECT 0 AS sts UNION SELECT 1 AS sts) AS RT ON LFT.empStat = RT.sts";
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
	
	public function countJoinedEmployeesPerMonth()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT month.month_name AS MNTH, month.month_id AS MnthID, IFNULL(lft.cnt,0) AS total FROM (SELECT COUNT(*) AS cnt, MONTH(employee.emp_join_date) AS mnth FROM employee WHERE YEAR(employee.emp_join_date) = YEAR(CURRENT_DATE) GROUP BY MONTH(employee.emp_join_date)) AS lft RIGHT JOIN month ON month.month_id = lft.mnth";
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
	
	public function countEmployeesPerCompany()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT IFNULL(lft.cnt,0) AS total, company.cmp_name FROM (SELECT COUNT(*) AS cnt, employee.emp_cmp_id AS cmpID FROM employee GROUP BY employee.emp_cmp_id) AS lft RIGHT JOIN company ON company.cmp_id = lft.cmpID";
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
	
	public function countEmployeesPerYear()
	{
		try
		{
			//create sql query
            $sqlQuery = "SELECT COUNT(*) AS total, YEAR(employee.emp_join_date) AS joinyear  FROM employee GROUP BY YEAR(employee.emp_join_date)";
			//execute and put result in a variable
			$data = $this->db->getData($sqlQuery);
			
			//return the values
			return $data;
		}
		//catch the execption and throw it back to the ws
		catch(Exception $e)
		{
			throw $e;
		}
	}
}
