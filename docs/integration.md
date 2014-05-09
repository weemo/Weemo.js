# Javascript API Integration

## Overview

This quick tutorial summarizes the major steps to follow in order to implement Weemo real-time video in your Web Applications using WeemoDriver and WebRTC.

When in a POC mode, your should replace the TOKEN directly by a UID.

## Requirement
It is important that the project is served from a webserver and not fromn the file system when using WebRTC.

## General Architecture

For minimal integration, you only need two things:<br/> 
* A webserver to host Javascript files (not necessary if you link to an external site)
* Installed and started multi-platform real-time video driver on the client side or used a WebRTC-enabled browser
* For production deployments, you will need to work with Weemo to choose your authentication method between your backend servers and the Weemo cloud. 

For production deployment, Weemo provides an authentication client as well as an API to perform backend outbound authentication. Weemo can also support your inbound authentication services using your Auth API. In this case, Weemo will develop the client side API based on your client code.

<p align="center">
<img src="http://docs.weemo.com/img/general_arch_2.png" width="500px"/>
</p>


### Step 1 - Identifiers

As a pre-requisite, you should be aware of your  ```App Identifier``` 

### Step 2 - Include Weemo Javascript

The Weemo API is Javascript based.  You should include the Javascript
library with a script tag that references the Weemo download path and
includes your ```App Identifier```.

```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/Your_App_Identifier"></script>
```

This mechanism also allows keeping the JavaScript library up to date a with the version in use with your domain.

### Step 3 - Weemo Object Instantiation

Create an instance of a Weemo Object using the required parameters ```Application Identifier```, ```TOKEN``` and ```Weemo Type```:

```JavaScript
var weemo = new Weemo("YOUR_APP_IDENTIFIER", "USER_TOKEN", "WEEMO_TYPE");
```

The ```TOKEN``` should respect this [naming](naming.md).
If in a POC mode, replace the TOKEN directly by a UID

The Weemo Object also supports optional parameters.  The complete list of parameters is:

```JavaScript
var weemo = new Weemo("YOUR_APP_IDENTIFIER", "USER_TOKEN", "WEEMO_TYPE", options);
```

When options is an Object that can takes the following properties:
```JavaScript
var options = {
    hap : '',
    debugLevel : 1, 
    displayName : 'Your Display Name', 
    useJquery : false,
    defaultStyle : true,
    container : 'myContainer'
};
```

Refer to the [Javascript API documentation](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a63d42d58d2f36203a958bf63e3b69173) for the complete definitions.

For more information about WEEMO_TYPE, see [here](start#weemo-call-type).

### Step 4 - Intialization and Weemo Driver or WebRTC Detection

```JavaScript
weemo.initialize();
```

##### WebRTC:
Initializing the connection between the Browser and WebRTC permits to see if your browser is WebRTC-enabled and allow you to connect your Web Application with the Weemo Cloud. If the initialization process completes correctly you should catch two callbacks:
<p align="center">
<img src="http://docs.weemo.com/img/wd50_webrtc_init.png" width="750px" />
</p>

After initialization the real-time client will authenticate your user to the Weemo Cloud, this call flow represents a generic connection exchange between the real-time client and the JavaScript:

<p align="center">
<img src="http://docs.weemo.com/img/wd50_webrtc_authenticate.png" width="750px" />
</p>
As soon as the WebRTC capability is locally detected by the JS, 
this callback will be sent by the Weemo Object JS:
 * [onConnectionHandler(connectedWebRTC)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

Now, the real-time client will authenticate and register to the Weemo Cloud. 

As soon as WebRTC succeeds in connecting to the Weemo Cloud,
this callback will be sent by the Weemo Object JS:
 * [onConnectionHandler(connectedCloud)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)


Callbacks will be in this order:
 * [onConnectionHandler(authenticated)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(sipOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

##### Weemo Driver:
Initializing the connection between the Browser and WeemoDriver permits to see if WeemoDriver is running on your system, and to connect your Web Application with the Weemo Cloud. If the initialization process completes correctly you should catch two callbacks:

<p align="center">
<img src="http://docs.weemo.com/img/wd50_weemodriver_init.png" width="750px" />
</p>
After initialization the real-time client will authenticate your user to the Weemo Cloud, this call flow represents a generic connection exchange between the real-time client and the JavaScript:

<p align="center">
<img src="http://docs.weemo.com/img/wd50_wd_authenticate.png" width="750px" />
</p>

As soon as the Weemo video driver is detected locally by the JS, 
this callback will be sent by the Weemo Object JS:
 * [onConnectionHandler(connectedWeemoDriver)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

Now, the WeemoDriver will automatically authenticate and register to the Weemo Cloud. 

As soon as the WeemoDriver succeeds in connecting to the Weemo Cloud,
this callback will be sent by the Weemo Object JS:
 * [onConnectionHandler(connectedCloud)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

Callbacks will be in this order:
 * [onConnectionHandler(authenticated)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(audioOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(sipOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

After the connection succeeds, a notification message from WeemoDriver should appear after a few seconds:

![connect_notif.png](http://docs.weemo.com/img/connect_notif.png)

> Note: The WeemoDriver is designed to reset its connection to the cloud automatically after 60 seconds if there is no active websocket connection from your web application. If you have a call in progress and you close your browser, the WeemoDriver will reset only when the call ends.

#### Sample code

```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_APP_IDENTIFIER"></script>
<script type="text/javascript">
// Set debug in JavaScript console and a display name
var options = {
    debugLevel : 1, 
    displayName : 'User Display Name'
}; 
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_APP_IDENTIFIER", "USER_TOKEN", "internal", options);

// Get the Connection Handler callback when the JavaScript is connected to the real-time client (WeemoDriver or WebRTC)
weemo.onConnectionHandler = function(message, code) {
    if(window.console)
	console.log("Connection Handler : " + message + ' ' + code);
    switch(message) {
        case 'sipOk':
            console.log("authenticate");
        break;
    }
};
weemo.initialize();  // Initialize real-time client (WeemoDriver or WebRTC)
</script>
```


If the WeemoDriver is not running on the computer and WebRTC is not available, _6 seconds_ after sending the ```weemo.initialize()```, 
this callback  will be sent by the Weemo Object JS:

 * [onWeemoDriverNotStarted(downloadUrl)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a1e45abe53255b2188177d2174243959daze)

```JavaScript
weemo.onWeemoDriverNotStarted = function(downloadUrl) {
	console.log(downloadUrl);
};
```
### Step 5 - Download the Weemo Driver

If the Weemo Driver is not detected and WebRTC is not available, then download it using ```downloadURL``` variable.

This download URL could be used in a website button or popup to obtain the Weemo video driver locally.
A popup example is available [here](https://github.com/weemo/Release-4.0/blob/WeemoDriver/js/Modal.js). 


### Step 6 - Make a Call 

Now you can make a call, using the ```createCall()``` method.

When the “Call button” is pressed in the web page, it should generate the following command where the URI and the display_name are the distant URI to call and the distant display_name.

<p align="center">
<img src="http://docs.weemo.com/img/wd50_call_process.png" width="750px"/>
</p>

> “Call button” is a generic term used to design the GUI object displayed in the web page which allows the user to call their contacts; this could be a button next to a contact name, in an IM window, in a conversation field, a combo box, a list, etc.

"Call button" should use a [Create Call Method](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7):

```JavaScript
createCall(uidToCall, type, displaynameToCall);
```

**Description:**<br/>
This command is used to handle a call process, regardless the type of the call.

Type of call Variable could take four values:

<table>
<tr><td>"internal"</td><td>Creates a one to one call to a Weemo UID</td><td> Weemo Driver and WebRTC</td></tr>
<tr><td>"host"</td><td>Creates a conference room as a host</td><td> Weemo Driver only</td></tr>
<tr><td>"attendee"</td><td>Joins a conference room as an attendee</td><td> Weemo Driver only</td></tr>
</table>


####WeemoDriver
If the call creation succeeds, the following screen will appear for the caller:

<p align="center">
<img src="http://docs.weemo.com/img/wd40_1.png" />
</p>

... A few seconds later, if the callee id using the WeemoDriver, he will receive this screen when the call arrives:

<p align="center">
<img src="http://docs.weemo.com/img/wd40_3.png" />
</p>


####WebRTC
You can handle the incoming and outgoing call event notifications using the [onCallHandler](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123) callback, and include the appropriate status for handling. 

#### STEP 6.1 - 1:1 call (Weemo Driver and WebRTC)

Syntax for a one to one call:

```JavaScript
weemo.createCall("CALLEE_UID", "internal", "CALLEE_DISPLAYNAME")
```
Value of CALLEE_UID is the destination uid (the callee)<br>
Value of type is "internal"<br>
Value of CALLEE_DISPLAYNAME is the destination Display Name (the callee)<br>

#### Sample code to initiate a 1:1 call
```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_APP_IDENTIFIER"></script>
<script type="text/javascript">
// Set debug in JavaScript console and a display name
var options = {
    debugLevel : 1, 
    displayName : 'User Display Name'
}; 
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_APP_IDENTIFIER", "YOUR_TOKEN", "internal", options);

// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver or WebRTC
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
// Create a 1:1 call after receiving the sipOk (the best practice is to develop a call button but its just for testing)
                case 'sipOk':
// Create an outgoing 1:1 call
                weemo.createCall("CALLEE_UID", "internal", "CALLEE_DISPLAYNAME");
                break;
	}
};

weemo.initialize();  // Initialize WeemoDriver or WebRTC
</script>
```

#### STEP 6.2 - Host a conference call(Weemo Driver only)

Syntax to host a conference call:

```JavaScript
weemo.createCall("YOUR_UID", "host", "YOUR_DISPLAYNAME")
```
Value of YOUR_UID is you uid (conference host)<br>
Value of type is "host"<br>
Value of YOUR_DISPLAYNAME is your Display Name (conference host)<br>

#### Sample code to host a conference call
```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_APP_IDENTIFIER"></script>
<script type="text/javascript">
// Set debug in JavaScript console and a display name
var options = {
    debugLevel : 1, 
    displayName : 'User Display Name'
}; 
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_APP_IDENTIFIER", "YOUR_TOKEN", "internal", options);

// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
	// Host a conference call after receiving the sipOk (the best practice is to develop a call button but its just for testing)
                case 'sipOk':
// Host a conference call
                weemo.createCall("YOUR_UID", "host", "YOUR_DISPLAYNAME");
                break;
	}
};

weemo.initialize();  // Initialize WeemoDriver
</script>
```

#### STEP 6.3 - Join a conference call (Weemo Driver only)

Syntax to join a conference call as an attendee

```JavaScript
weemo.createCall("HOST_UID", "attendee", "HOST_DISPLAYNAME")
```
Value of HOST_UID is the host user identifier<br>
Value of type is "attendee"<br>
Value of HOST_DISPLAYNAME is the host Display Name<br>


#### Sample code to join a conference call
```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_APP_IDENTIFIER"></script>
<script type="text/javascript">
// Set debug in JavaScript console and a display name
var options = {
    debugLevel : 1, 
    displayName : 'User Display Name'
}; 
// Weemo Object Initialization 
var weemo = new Weemo("YOUR_APP_IDENTIFIER", "YOUR_TOKEN", "internal", options);

// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
// Join a conference call after receiving the sipOk (the best practice is to develop a call button) but its just for testing)
                case 'sipOk':
// Join a conference call
                weemo.createCall("HOST_UID", "attendee", "HOST_DISPLAYNAME");
                break;
	}
};

weemo.initialize();  // Initialize WeemoDriver
</script>
```



> For more information about createCall() see our reference [here](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7).



### _Optional 1 - Set Display Name_

For a better user experience, it is recommended to set the display name of the user, usually just after receiving [onConnectionHandler(sipOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234) following a [weemo.initialize()](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe) command.

<p align="center">
<img src="http://docs.weemo.com/img/wd50_displayname.png" width="650px"/>   
</p>

```JavaScript
weemo.setDisplayName("Your_DisplayName");
```

The callback will be:
* [onGetHandler('displayname', obj)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)


### _Optional 2 - Get Status_ 

Before creating a one to one call, the best practice is to get the status of the callee by calling getStatus method.

<p align="center">
<img src="http://docs.weemo.com/img/wd50_getstatus.png" width="650px"/>   
</p>

```JavaScript
weemo.getStatus("CALLEE_UID");
```

The callback will be:
* [onGetHandler('status', obj)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)

When obj.value = 1 if the callee is online, 
or obj.value = 0 if the callee is not connected.
### _Make a call_ - code sample

You can view complete sample code allowing to make a simple call [here](https://github.com/weemo/Weemo.js_beta/tree/master/examples).

### Call Controls

When the call is initialized, a [weemoCall](http://docs.weemo.com/js/interface_weemo_call.html) object is created and returned by [weemo.onCallHandler](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123) callback. This object contains methods to control the call.

This code accesses the call object:

```JavaScript
var current_call = null;

weemo.onCallHandler = function(callObj, args) {
            current_call = callObj;
}

// Interact with the call object, show the self-view picture-in-picture
current_call.noPip();
```

For more details see a little page sample [here](https://github.com/weemo/Weemo.js_beta/tree/master/examples)

Weemo Call Object contains methods to control the current call, you can see all methods in our [reference](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html)

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
<tr><td>'14'</td><td>UID: UID is too short</td><td>Your UID must have at least 6 characters</td></tr>
<tr><td>'15'</td><td>WeemoDriver: Internal error</td><td>Please contact Weemo support team</td></tr>
<tr><td>'16'</td><td>WeemoDriver: Display name error</td><td>Please set a display name before starting a call</td></tr>
</table>

## Javascript reference

For more information, you can consult our official [Full JS API documentation](http://docs.weemo.com/release/5.1).