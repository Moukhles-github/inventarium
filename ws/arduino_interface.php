<?php

    $result = 0;

    if(isset($_GET["op"]))
    {
        $operation = $_GET["op"];

        switch($operation)
        {
            case 1:
                {
					try
					{
//						$valueFile = fopen("./value.txt", "r") or die("Unable to open file!");
//						$output = fread($valueFile,filesize("./value.txt"));
//						fclose($valueFile);
						
						$output = file_get_contents("./value.txt");

						$result = str_replace(" ", "", $output);
					}
					catch(Exception $e)
					{
						$result = 0;
					}
                }
            break;
            default:
            {
                $result = 0;
            }
            break;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($result);



    //python D:\wamp64\www\inventarium\ws\communicator.py