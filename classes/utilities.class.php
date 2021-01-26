<?php

class UTILITIES {
	
	// This function writes errors into a log file; the log file is checked when errors occur.
	public static function writeToLog($message) {
		
		$myFile = fopen("../log/log.txt", "a") or die("Unable to open file!");
		$log = date("d/m/Y > H:i:s A") . ": " . $message;
		fwrite($myFile, $log."\n");
		fclose($myFile);
		
	}
	
}
?>