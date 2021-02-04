<!DOCTYPE html>
<html>

<head>
    <script src="./jquery.min.js"></script>
    <script src="./ardhandler.js"></script>

    <style>

        #masteralert
        {
            width: 100%;
            position: fixed;
            align-content: center;
        }
        
        #alertdiv {
            width: 200px;
            height: 40px;

            color: white;
            background-color: rgba(51, 51, 51, 0.5);
            border-radius: 3px;

            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;

            display: table;

            align-self: center;

            z-index: 9999;
        }

        .alerttext {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

    </style>

</head>

<body>

    <div id="masteralert" hidden>
        <div id="alertdiv">
            <p class="alerttext">RFID Fetched!</p>
        </div>
    </div>
    <p id="ppp"></p>
    <input type="text" id="rfidinput">

</body>

</html>