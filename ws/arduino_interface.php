<?php

    $result = 0;

    if(isset($_GET["op"]))
    {
        $operation = $_GET["op"];

        switch($operation)
        {
            case 1:
                {
                    $valueFile = fopen("./value.txt", "r") or die("Unable to open file!");
                    $output = fread($valueFile,filesize("./value.txt"));
                    fclose($valueFile);
                    
                    $result = trim($output);      
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