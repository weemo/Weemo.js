# Upgrading Release 3.2 to 4.0

## Overview

This section describes how to implement new WeemoDriver Javascript API 4.0 when you already integrated a WeemoDriver 3.2 in your Web Application.

## Contents

* [What has changed ?](#whats-change-)
* [How to get WeemoDriver](upgrade32.md#how-to-get-weemodriver)
    * [JavaScript API](#javascript-api)
    * [WeemoDriver binary](#wemodriver-binaries)
* [API updates](#api-updates)
    * [Initialization](#initialization)
    * [Authentication](#authentication)
    * [Call creation](#call-creation)
    * [Call controls](#call-controls)
    * [Error handling](#error-handling)

## What has changed?

WeemoDriver 4.0 development comes with some new features and optimizations such as:

- New allocation model, UID and API-KEY are changed by Token and Web Application Identifier
- Dynamic Javascript API download
- Rewrite of Javascript API, update Weemo object methods and creation of a objet WeemoCall to manage calls
- New features of Javascript API:
    - getVersion method to see what version of WeemoDriver you are using
    - reset method to restart the WeemoDriver from the Web Application
    - accept and hangup methods to start and stop the call
    - manage video, audio and self-view enable/disable by the Web Application
    - Launch settings and share out window from Javascript

## How to get WeemoDriver

### Javascript API

To get WeemoDriver.js JavaScript API, you need insert this code:

```
<script src="https://download.weemo.com/js/webappid/Your_Web_App_Identifier"></script>
```

This mechanism also permits keeping the JavaScript API up to date with the WeemoDriver version in use on your domain.

## API updates

This chapter describes what changed in the implementation syntax.

### Initialization 

All WeemoDriver 3.2 initialization methods are deprecated in 4.0:

- Environment, Platform and Domain resources do not exist on 4.0.
- setApiKey method is replaced by [setWebAppId()](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a028ecf765e24e2057d21c38d395aae11123) method
- setMode("debug) is now [setDebugLevel()](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a028ecf765e24e2057d21c38d395aae11543)

Old 3.2 initialization:

```
var weemo = new Weemo(); // Creating a Weemo object instance
weemo.setMode("debug"); // Activate debugging in browser's log console
weemo.setEnvironment("production"); // Set environment
weemo.setPlatform("p1.weemo.com"); // Set connection platform (by default: "p1.weemo.com")
weemo.setDomain("weemo-poc.com"); // Set the Domain of your user's group (by default: "weemo-poc.com")
weemo.setApikey("apikey"); // Configure your Api Key
weemo.setUid("billmoses"); // Configure your UID
weemo.connectToWeemoDriver(); // Launches the connection between WeemoDriver and Javascript
```

New 4.0 initialization:

```
var weemo = new Weemo(); // Initialize the Main Object
weemo.setDebugLevel(1); // Activate debug in JavaScript console
weemo.setWebAppId("abcdefg0123456789"); // Configure your Web App Identifier (For POC use your Web Application Identifier provided by Weeemo)
weemo.setToken("billmoses@weemo.com"); // Set user unique identifier
weemo.initialize(); // Launches the connection between WeemoDriver and Javascript 

```

After initialize method (old connectToWeemoDriver), you can send credentials to the Weemo cloud. This step is called 'Authentication' in 4.0. 

### Authentication

The only change in this step is the name of the [weemo](http://docs.weemo.com/release/4.2/js/interface_weemo.html) object method to call. The weemo.connectToTheCloud() is now [weemo.authenticate()](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20)

Old authentication step (3.2):

```
// Set your Displayname
weemo.setDisplayName("Bill Moses");
// Get the Connection Handler callback when the JavaScript is connected to WeempoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
		case 'connectedWeemoDriver':
// if the WeemoDriver is connected, you can send credentials to the Weemo Cloud
			weemo.connectToTheCloud();
			break;
	}
}
```

The new authenticate step (4.0):

```
// Set your Displayname
weemo.setDisplayName("Bill Moses");
// Get the Connection Handler callback when the JavaScript is connected to WeempoDriver
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
		case 'connectedWeemoDriver':
// if the WeemoDriver is connected, you can send credentials to the Weemo Cloud
			weemo.authenticate();
			break;
	}
}
```

### Call creation

Nothing changed in call creation method, all the processes are still the same for one to one and conference calls: wait for connectionHandler (sipOk) before launching a [weemo.createCall](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7) method with the same arguments as a WeemoDriver 3.2.

```
// Get the Connection Handler callback when the JavaScript is connected to WeempoDriver
weemo.onConnectionHandler = function(message, code) {
if(window.console)
    console.log("Connection Handler : " + message + ' ' + code);
switch(message) {
    // Create a test call just after receiving sipOk (the best practice is to develop a call button who is getting getstatus before a call) but its just for testing... 
    case 'sipOk':
    // Create an outgoing 1 to 1 call
        var uidToCall = "johnsmith@weemo.com";
        var displaynameToCall="John Smith";
        var type="internal";
        weemo.createCall(uidToCall, type, displaynameToCall);
        break;
    }
}
```

### Call controls

With WeemoDriver 4.0 and Weemo Javascript API 4.0 you are now able to control current calls by your Web Application. All these controls are methods of [weemoCall](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html) object, this object is created each time you receive or send a call.

The only thing to do to access these methods is to catch by a callback the [weemoCall](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html) object, this sample code demonstrates how:

```
// Create a null variable to point the object
var current_call = null;

// Get the callback onCallHandler
weemo.onCallHandler = function(callObj, args) {
// assign your variable to created weeCall Object
            current_call = callObj;
}
// Now you can interact simply with the call object
current_call.hangup();
```

List of methods: (click on the method name to go on our function reference)

* [accept();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [hangup();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [videoStart();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [videoStop();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [audioMute();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [audioUnMute();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [pip();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [noPip();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [settings();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)
* [shareStart();](http://docs.weemo.com/release/4.2/js/interface_weemo_call.html)


### Error handling

Be careful error codes change: [see code ref](integration.md#error-codes) 