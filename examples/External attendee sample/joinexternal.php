<?
// Start PHP session
session_start();
// Enter Application Identifier
$APPLICATION_ID = "abcdefghij";
// Enter your platform, let empty if you are in Production stage
$PLATFORM = "/env/ppr";  
// Set Debug Level
$DEBUG = "1";

$OBJ_PLATFORM = "";
if ($PLATFORM == "/env/ppr") $OBJ_PLATFORM = "ppr/";

$invit_url = $BASE_URL."joinexternal.php?hostuid=".$_GET['hostuid'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>My Weemo Application: Attendee</title>
<!-- Call the WeemoDriver API-->
    <script type="text/javascript" src="https://download.weemo.com/js/webappid/<?php echo $APPLICATION_ID.$PLATFORM; ?>"></script>
</head>
<style type="text/css">
    body{
        font-family: Helvetica;
    }
</style>
<body>
    <script type="text/javascript">
        // Initialize the Main Object with WebAppIdentifier, Token, Debug and DisplayName
        <?
        echo 'var weemo = new Weemo("'.$APPLICATION_ID.'", "'.$_GET["hostuid"].'", "external", "'.$OBJ_PLATFORM.'", "'.$DEBUG.'", "'.$_GET["displayname"].'");';
        ?>
        weemo.initialize();
        weemo.onWeemoDriverNotStarted = function(downloadUrl) {
                    alert('WeemoDriver not detected, copy and paste this following url on your browser: '+downloadUrl);
            };

        // Get the Connection Handler callback when the JavaScript is connected to WeempoDriver
        weemo.onConnectionHandler = function(message, code) {
            if(window.console)
                console.log("Connection Handler : " + message + ' ' + code);
            switch(message) {
/* Quick-Start: Step 7 */      
                // Authenticate token and webappId
                case 'connectedWeemoDriver':
                    weemo.authenticate();
                break; 
                case 'sipOk':
                    document.getElementById('connecting').style.color = "#CCCCCC";
                    document.getElementById('stat').innerHTML = "Connected as <?php echo $_GET["displayname"]; ?> using WeemoDriver";
                    document.getElementById('buttonCall').style.display = "block";
                break;
                case 'loggedasotheruser':
                // force connection, kick other logged users
                    weemo.authenticate(1);
                break;
            }
        }
        // Call Object is created by callback, this function permits to catch events comming from the call object
        weemo.onCallHandler = function(callObj, args) {
            if (args.type == "call" && args.status == "terminated") {
                document.getElementById('call').innerHTML = "";
            } else if (args.type == "call" && args.status == "proceeding") {
                document.getElementById('call').innerHTML = "Joining Conference call...";
            } else if (args.type == "call" && args.status == "active") {
                document.getElementById('call').innerHTML = "";
            } 

        }       
    </script>
    <h3>Welcome to Weemo external attendee page</h3>
    <h4 id="connecting">Connecting to <?php echo $_GET["hostuid"]; ?> room as <?php echo $_GET["displayname"]; ?>...</h4>
    <h4 id="stat"></h4>
<button style="display:none;" id="buttonCall" onclick="<?php echo 'weemo.createCall(\''.$_GET["hostuid"].'\', \'attendee\', \''.$_GET["displayname"].'\');';?>">Click to join the host video room</button>

    <h4 id="call"></h4>
</body>
</html>
