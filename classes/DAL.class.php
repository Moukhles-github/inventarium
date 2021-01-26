<?php
require_once('utilities.class.php');

class DAL{

	//private members for configurations
	 private $servername = "localhost";
	 private $username="root";
	 private $password="";
	 public $dbname="inventarium";

	
	//retreive data by sql
	public function getData($sql)
	{	

		$conn = new mysqli($this->servername,$this->username,$this->password,$this->dbname);		

		// Works as of PHP 5.2.9 and 5.3.0.
		if ($conn->connect_error) {
		   // die('Connect Error: ' . $mysqli->connect_error);		    
			UTILITIES::writeToLog(mysqli_connect_error());
		   throw new Exception("");
		}
		else{
	
				$result =$conn->query($sql);
				if(!$result)
				{
					 UTILITIES::writeToLog("SQL ($sql)");
					
					throw new Exception("");
				}
				else{					
					
					$rows = array();
				
					if($result->num_rows > 0) {
					
						while($row = mysqli_fetch_assoc($result)) {
							//$rows[] = array('row'=>$row);
							$rows[] = $row;
						}
						
						return $rows;
					}
				
				}
				
		}
   
	}

/////////////////////////////////////////////////////////////////////////

	//execute query insert/update/delete
	function ExecuteQuery($sql)
	{
		$conn = new mysqli($this->servername,$this->username,$this->password,$this->dbname);
	
		// Works as of PHP 5.2.9 and 5.3.0.
		if ($conn->connect_error)
		{
		   // die('Connect Error: ' . $mysqli->connect_error);
		   UTILITIES::writeToLog(mysqli_connect_error());
		   throw new Exception("");
		}
		else{
			$result =$conn->query($sql);
	
			if(!$result){
   			    UTILITIES::writeToLog("SQL ($sql)");
				throw new Exception("");
			
			}else
				return  $conn->insert_id; 
		}
   
	}
	
	
	function ExecuteidQuery($sql)
	{
		$conn = new mysqli($this->servername,$this->username,$this->password,$this->dbname);
	
		// Works as of PHP 5.2.9 and 5.3.0.
		if ($conn->connect_error)
		{
		   // die('Connect Error: ' . $mysqli->connect_error);
		   UTILITIES::writeToLog(mysqli_connect_error());
		   throw new Exception("error");
		}
		else{
			$result =$conn->query($sql);
			$lastid = $conn->insert_id;
			if(!$result){
   			    UTILITIES::writeToLog("SQL ($sql)"."L");
				throw new Exception("sadsad");
			
			}else
//				echo $lastid . "";
				return  $lastid;
		}
   
	}


}
?>