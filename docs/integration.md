# Javascript API Integration

## Overview

This quick tutorial summarizes the major steps to follow in order to implement Weemo real-time video in your Web Applications.

## General Architecture

For minimal integration, you only need two things:<br/> 
* A webserver to host Javascript files (not necessary if you link to an external site)
* Installed and started multi-platform real-time video driver on the client side
* For production deployments, you will need to work with Weemo to choose your authentication method between your backend servers and the Weemo cloud. Weemo provides an authentication client as well as an API to perform backend outbound authentication. Weemo can also support your inbound authentication services using your Auth API. In this case, Weemo will develop the client side API based on your client code. <a href="https://github.com/weemo/Auth-API"> See more about Authentication</a>.

<p align="center">
<img src="http://docs.weemo.com/img/general_arch_wdonly.png" width="500px"/>
</p>


### Step 1 - Identifiers

As a pre-requisite, you should be aware of your  ```Web App Identifier``` and the kind of ```Token``` used with the AUTH API.

> Note: Proof of concept integrations not requiring back-end authentication can replace the [Token](naming.md#token) with the [UID](naming.md#uid) of the connected user. 

### Step 2 - Get Weemo.js

The Weemo API is JavaScript based. It is packaged in a class named: weemo.js, to be embedded in the front-end of your web-server.

To Get the Weemo Javascript API from the Weemo Cloud with your ```Web App Identifier```:

```
<script type="text/javascript" src="https://download.weemo.com/js/webappid/Your_Web_App_Identifier"></script>
```

This mechanism also allows keeping the JavaScript library up to date and in sync with the WeemoDriver version in use with your domain.

### Step 3 - Weemo Object Instantiation

Weemo Object can be initialized using a number of parameters. [See reference](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a63d42d58d2f36203a958bf63e3b69173).

At a minimum, the following code allows you to create an instance of a Weemo Object using your ```Web Application Identifier```, ```Token``` and ```type```:

```
var weemo = new Weemo("YOUR_WEB_APP_IDENTIFIER", "USER_TOKEN", "internal");
```

By default, ```type```="internal"

> Token value to identify the session, it will be auto filed by Auth process. <br />
If you are in POC process, please enter UID of the user. <br />
If Type = 'external', please enter the UID of the host user.


### Step 4 - Weemo Driver Detection

Initializing the connection between the Browser and WeemoDriver permits to see if WeemoDriver is running on your system, and to connect your Web Application with the Weemo Cloud. If the initialization process completes correctly you should catch two callbacks:

<p align="center">
<img src="http://docs.weemo.com/img/initialize_cf.png" width="750px" />
</p>

```
weemo.initialize();
```

If the WeemoDriver is not running on the computer, _6 seconds_ after sending the ```weemo.initialize()```, 
this callback  will be sent by the Weemo Object JS:

 * [onWeemoDriverNotStarted(downloadUrl)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a1e45abe53255b2188177d2174243959daze)

```
weemo.onWeemoDriverNotStarted = function(downloadUrl) {
	modal = new Modal(downloadUrl);
        modal.show();
};
```

### Step 5 - Download the Weemo Driver

If the Weemo Driver is not detected, then download it using ```downloadURL``` variable.

This download URL could be used in a website button or popup to obtain the Weemo video driver locally.
A popup example is available [here](https://github.com/weemo/Release-4.0/blob/WeemoDriver/js/Modal.js). 


### Step 6 - Authentication with the Weemo Cloud

After initialization you will authenticate your user to the Weemo Cloud, this call flow represents a generic connection exchange between the WeemoDriver and the JavaScript:

<p align="center">
<img src="http://docs.weemo.com/img/authenticate_cf.png" width="750px" />
</p>

1. As soon as the Weemo video driver is detected locally by the JS, 
this callback will be sent by the Weemo Object JS:
 * [onConnectionHandler(connectedWeemoDriver)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

2. Now, you can ask to the Weemo Driver to authenticate and register to the Weemo Cloud. 
```
weemo.authenticate()
```

3. As soon as the Weemo video driver succeeds in connecting to the Weemo Cloud,
this callback will be sent by the Weemo Object JS:
 * [onConnectionHandler(connectedCloud)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)


Callbacks will be in this order:
 * [onConnectionHandler(authenticated)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(audioOk)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(sipOk)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

#### Full code

```
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_WEB_APP_IDENTIFIER">
<script type="text/javascript">
```
```
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_WEB_APP_IDENTIFIER", "USER_TOKEN", "internal");
weemo.setDebugLevel(1);  // Activate debug in JavaScript console
weemo.initialize();  // Initialize WeemoDriver

// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
		case 'connectedWeemoDriver':
// When the WeemoDriver connects, you can send credentials to the Weemo Cloud
			weemo.authenticate();
		break;
	}
}
```
```
</script>
```

After the connection succeeds, a notification message from WeemoDriver should appear after a few seconds:

![connect_notif.png](http://docs.weemo.com/img/connect_notif.png)

> Note: The WeemoDriver is designed to reset its connection to the cloud automatically after 60 seconds if there is no active websocket connection from your web application. If you have a call in progress and you close your browser, the WeemoDriver will reset only when the call ends.

### Step 7 - Make a Call

Now you can make a call, using the ```createCall()``` method.

When the “Call button” is pressed in the web page, it should generate the following command where the URI and the display_name are the distant URI to call and the distant display_name.

<p align="center">
<img src="http://docs.weemo.com/img/call_cf.png" width="750px"/>
</p>

> “Call button” is a generic term used to design the GUI object displayed in the web page which allows the user to call their contacts; this could be a button next to a contact name, in an IM window, in a conversation field, a combo box, a list, etc.

"Call button" should use a [Create Call Method](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7):

```
createCall(uidToCall, type, displaynameToCall);
```

**Description:**<br/>
This command is used to handle a call process, regardless the type of the call.

Type of call Variable could take four values:

<table>
<tr><td>"internal"</td><td>Creates a one to one call to a Weemo UID</td></tr>
<tr><td>"external"</td><td>Creates a one to one call to a external number (such as: PSTN / SIP / VCS Room / MCU /...)</td></tr>
<tr><td>"host"</td><td>Creates a conference room as a host</td></tr>
<tr><td>"attendee"</td><td>Joins a conference room as an attendee</td></tr>
</table>

If the call creation succeeds, the following screen will appear for the caller:

<p align="center">
<img src="http://docs.weemo.com/img/wd40_1.png" />
</p>

... A few seconds later, the callee will receive this screen when the call arrives:

<p align="center">
<img src="http://docs.weemo.com/img/wd40_3.png" />
</p>

#### STEP 7.1 - 1:1 call

Syntax for a one to one call:

```
weemo.createCall("CALLEE_UID", "internal", "CALLEE_DISPLAYNAME")
```
Value of uidToCall is the destination uid (the callee)<br>
Value of type is "internal"<br>
Value of displayNameToCall is the destination Display Name (the callee)<br>

#### STEP 7.2 - Create a conference room

Syntax to create a conference room:

```
weemo.createCall("YOUR_UID", "host", "YOUR_DISPLAYNAME")
```
Value of uidToCall is you uid (conference host)<br>
Value of type is "host"<br>
Value of displayNameToCall is your Display Name (conference host)<br>

#### STEP 7.3 - Join a conference room

Syntax to join a conference as attendee

```
weemo.createCall("HOST_UID", "attendee", "YOUR_DISPLAYNAME")
```
Value of uidToCall is the host of the conference<br>
Value of type is "attendee"<br>
Value of displayNameToCall is your Display Name (attendee)<br>


> For more information about createCall() see our reference [here](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7).

#### Sample code to join a conference call (as internal attendee)

```
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_WEB_APP_IDENTIFIER">
<script type="text/javascript">
```
```
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_WEB_APP_IDENTIFIER", "USER_TOKEN", "internal");
weemo.setDebugLevel(1);  // Activate debug in JavaScript console
weemo.initialize();  // Initialize WeemoDriver

// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
		case 'connectedWeemoDriver':
// When the WeemoDriver connects, you can send credentials to the Weemo Cloud
			weemo.authenticate();
		break;

// Create a test call just after receiving sipOk (the best practice is to develop a call button) but its just for testing 
                case 'sipOk':
// Create an outgoing 1 to 1 call
                weemo.createCall("CALLEE_UID", "internal", "CALLEE_DISPLAYNAME");
                break;
	}
}
```
```
</script>
```

#### Sample code to join a conference call (as external attendee (guest))

The difference between internal and external user is on Weemo Object declaration, the guest have to know host UID, and host have to be connected to Weemo Cloud.

```
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_WEB_APP_IDENTIFIER">
<script type="text/javascript">
```
```
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_WEB_APP_IDENTIFIER", "HOST_UID", "external");
weemo.setDebugLevel(1);  // Activate debug in JavaScript console
weemo.initialize();  // Initialize WeemoDriver

// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
		case 'connectedWeemoDriver':
// When the WeemoDriver connects, you can send credentials to the Weemo Cloud
			weemo.authenticate();
		break;

// Create a test call just after receiving sipOk (the best practice is to develop a call button) but its just for testing 
                case 'sipOk':
// Create an outgoing 1 to 1 call
                weemo.createCall("CALLEE_UID", "internal", "CALLEE_DISPLAYNAME");
                break;
	}
}
```
```
</script>
```

### _Optional 1 - Set Display Name_

For a better user experience, it is recommended to set the display name of the user, usually just after receiving [onConnectionHandler(sipOk)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123) following a [weemo.initialize()](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe) command.

<p align="center">
<img src="http://docs.weemo.com/img/setdisplayname_cf.png" width="650px"/>   
</p>

```
weemo.setDisplayName("Your_DisplayName");
```

The callback will be:
* [onGetHandler('displayname'=value)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)


### _Optional 2 - Get Status_

Before creating a one to one call, the best practice is to get the status of the callee by calling getStatus method.

<p align="center">
<img src="http://docs.weemo.com/img/getstatus_cf.png" width="650px"/>   
</p>

```
weemo.getStatus("CALLEE_UID");
```

The callback will be:
[onGetHandler('status'= '0' or '1',UID)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)

* status = '1' if the callee is online
* status = '0' if the callee is not connected

### _Make a call_ - code sample

You can view complete sample code allowing to make a simple call [here](https://github.com/weemo/JavaScript-API/blob/WeemoDriver/examples/tiny_sample.html).

### Call Controls

When the call is initialized, a [weemoCall](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html) object is created and returned by [weemo.CallHandler](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123) callback. This object contain methods to control the call.

This code accesses the call object:

```
var current_call = null;

weemo.onCallHandler = function(callObj, args) {
            current_call = callObj;
}

// Interact with the call object, show the self-view picture-in-picture
current_call.noPip();
```

For more details see a little page sample [here](https://github.com/weemo/JavaScript-API/blob/WeemoDriver/examples/tiny_sample.html)

Weemo Call Object contains methods to control the current call, you can see all methods in our [reference](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)

### Error Codes

These are error codes which may be visible on the Javascript console of your browser. The ```OnConnectionHandler()``` callback method can be used to handle these error codes.

<table>
<tr><td><b>Code</b></td><td><b>Message</b></td><td><b>How to resolve</b></td></tr>  
<tr><td>'5'</td><td>WebService verify syntax error</td><td>Check naming rules of your values</td></tr>
<tr><td>'6'</td><td>Wrong credentials</td><td>Check your credentials and restart authentication proccess</td></tr>      
<tr><td>'7'</td><td>Cloud connection: Can't connect to the Cloud</td><td>Check your connection, restart connection process</td></tr>
<tr><td>'8'</td><td>Cloud connection: Disconnected from the Cloud</td><td>Check your connection, restart connection process</td></tr>        
               
<tr><td>'9'</td><td>Allocation: Provider not recognized</td><td>Restart connection with correct Provider Identifier</td></tr>                   
<tr><td>'10'</td><td>Allocation: Domain not recognized</td><td>Restart connection with correct Domain Identifier</td></tr>
<tr><td>'11'</td><td>Allocation: Provider not enabled</td><td>Contact Weemo support team</td></tr>
<tr><td>'12'</td><td>Allocation: Domain not enabled</td><td>Contact your domain administrator</td></tr>
<tr><td>'13'</td><td>Allocation: No such user</td><td>Restart connection with a good credential</td></tr>
<tr><td>'14'</td><td>Token: token is too short</td><td>Your Token must have at least 6 characters</td></tr>
<tr><td>'15'</td><td>WeemoDriver: Internal error</td><td>Please contact Weemo support team</td></tr>
<tr><td>'16'</td><td>WeemoDriver: Display name error</td><td>Please set a display name before starting a call</td></tr>
</table>

### Javascript reference

For more information, you can consult our official [Full API documentation](http://docs.weemo.com/release/4.2/js/index.html).