<?php
require("DAL.class.php");

class workstaions
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


    public function getWorkstations()
    {
        $sql = "select * from workstation";

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