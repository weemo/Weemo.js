## External attendee use case sample

Weemo provide the functionality to invite external users of your domain, this sample website will show you the different steps to implement that capability on your web application.

### Requirements 

This sample uses Weemo Authentication Client, to run this sample on your Web server you need:

- Auth API Client_id
- Auth API Client_secret
- Auth API client.p12 certificate file and his passphrase
- weemo-ca.pem authority file 

You should know a minimal Provider configuration information:

- Application Identifier
- Weemo Auth Client URL (needed to redirect the Weemo.js to the Auth Client; here it's auth.php), if you don't know how to configure it, send a request to Weemo
- Domain Identifier 
- Profile Identifier

A webserver supporting:

- PHP 5.3.x or higher
- PHP cURL extension
- PHP JSON extension

If you don't have it, get a free standalone WebServer on MAMP project page: <a href="http://www.mamp.info/en/index.html">http://www.mamp.info/en/index.html</a>.

Sample files:

- auth.php
- Weemo_Client.php
- joinexternal.php
- hostconference.php

### Installation

#### Step 1 - Copy sample files
Copy all sample files into the same directory of your Web Server, check if all the files are set with the good rights.

Copy your client.p12 and weemo-ca.pem certificate files into the same directory, at the end you must have this directory file list:

```
auth.php
client.p12
hostconference.php
joinexternal.php
weemo-ca.pem
Weemo_Client.php
```

#### Step 2 - Edit Weemo Authentication Client
Edit auth.php file to enter your Weemo Authentication credentials, your domain and profile identifiers:

Fill credentials values:

```
// Weemo Auth client credentials
$CLIENT_ID = "";
$CLIENT_SECRET = "";
$CLIENT_P12 = "client.p12";
$P12_SECRET = "";
$AUTH_SERVER_URL = "https://oauths-ppr.weemo.com/auth/";
```

* For staging plartfom the server auth URL is: 'https://oauths-ppr.weemo.com/auth/'  
* For production platform use: https://oauths.weemo.com/auth/

> See with Weemo support if you have a doubt about the platform your are using.

Fill Domain and Profile values:

```
// Provisioning data
$PROV_DOMAIN = "domain";
$PROV_PROFILE = "power";
```

> The uid is catched by a php session value ```uid``` set in hostconference.php

```
$PROV_UID = $_SESSION['uid'];
```

#### Step 3 - Edit Room Administator page

Edit hostconference.php file to enter your Site Base URL and Application identifier:

Fill following values:

```
// Enter Absolute base URL of your website sample 
$BASE_URL = "http://192.168.0.28/weemodriver4.0/";
// Enter Application Identifier
$APPLICATION_ID = "xabnghtyu42";
// Enter your platform, let empty if you are in Production stage
$PLATFORM = "/env/ppr";  
// Set Debug Level
$DEBUG = "1";
```

At this point you are ready to host a conference by calling hostconference.php on your browser. You must call this page with hostuid value in parameter:

```
http://192.168.0.28/weemodriver4.0/hostconference.php?hostuid=myemail@weemo.com
```

>Enter the hostuid with a minimum of 6 characters. 

<img src="http://docs.weemo.com/img/ext_attendee_1.png" />


#### Step 4 - Edit Attendee Page

Edit joinexternal.html file to enter your Application identifier:

Fill following values:

```
// Enter Application Identifier
$APPLICATION_ID = "xabnghtyu42";
// Enter your platform, let empty if you are in Production stage
$PLATFORM = "/env/ppr";  
// Set Debug Level
$DEBUG = "1";
```

Now you are ready to send generated invitation link to your external invitees.

<img src="http://docs.weemo.com/img/ext_attendee_2.png" />

### Conclusion

We hope you have learned in this exercise the following basic Weemo knowledge:

- Provider information (domain and profile)
- Weemo Auth usage (Client Auth URL)
- Weemo platform change (ppr)
- How to generate a link for external attendee
- How to call Weemo Object for an external user
- How to use createCall method to call your conference room, and to join an external attendee to your conference

More related documentations are available here: 

Weemo JS API reference: <a href="http://docs.weemo.com/release/4.2/interface_weemo.html">http://docs.weemo.com/release/4.2/interface_weemo.html</a><br/>
Weemo Auth API wiki: <a href="https://github.com/weemo/Auth-API/wiki/Weemo-Auth-API">https://github.com/weemo/Auth-API/wiki/Weemo-Auth-API</a><br/>
Weemo Integration tutorial: <a href="https://github.com/weemo/Release-4.x/wiki/Javascript-API-Integration"> https://github.com/weemo/Release-4.x/wiki/Javascript-API-Integration</a><br/>

