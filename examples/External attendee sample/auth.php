<?php
// Include Weemo Auth Client File
require_once("./Weemo_Client.php");
// Get the uid in the PHP session
session_start();

// Weemo Auth client credentials
$CLIENT_ID = "xxxxxxxxxyyyyyyyyyyyzzzzzzzz";
$CLIENT_SECRET = "xxxxxxxxxyyyyyyyyyyyzzzzzzzz";
$CLIENT_P12 = "client.p12";
$P12_SECRET = "XnyexbUF";
$AUTH_SERVER_URL = "https://oauths-ppr.weemo.com/auth/";
// Provisioning data
$PROV_DOMAIN = "domain";
$PROV_PROFILE = "power";
$PROV_UID = $_SESSION['uid'];

try {
    $a = new Weemo_Client($CLIENT_ID, $CLIENT_SECRET, $CLIENT_P12, $P12_SECRET, $AUTH_SERVER_URL);
    
    // Created KEY file from P12
    $a->createKeyFile();
    
    // Create PEM file from P12
    $a->createCertFile();

    // Init WeemoCurl
    $a->initWCurl();

    // Get token access
    $access_token = $a->sent($my_uid, $PROV_DOMAIN , $PROV_PROFILE); 

    echo $access_token;
}
catch(Exception $e) {
    echo $e->getMessage();
}
?>