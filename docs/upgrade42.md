# Upgrading from 4.2 to 5.1

## Overview

This section describes how to implement the new JavaScript API 5.1 when you already integrated the 4.2 in your Web Application.

## Contents

* [What has changed ?](#what-has-changed)
    * [New Features](#new-features)
    * [Limitations](#limitations)
* [API updates : upgrade from 4.2 to 5.1](#api-updates--upgrade-from-42-to-51)
    * [Download Weemo.js](#download-weemojs)
    * [Weemo Object instantiation](#weemo-object-instantiation)
    * [Initialization](#initialization)
    * [Authentication](#authentication)
    * [Call creation](#call-creation)
    * [Call controls](#call-controls)
    * [Methods](#methods)
    * [Callbacks](#callbacks)
    * [Error handling](#error-handling)

## What has changed?

The JavaScript API 5.1 development comes with some new features and optimizations such as:

### New Features

- WebRTC Support on Google Chrome on Windows, Mac and Android
- WebRTC Interoperability with WeemoDriver 5 on Internet Explorer, Safari, Chrome and Firefox
- WebRTC Interoperability with iOS SDK 5 and Android SDK 5
- WeemoDriver 5 Support on Internet Explorer 11

### Limitations

- Multi-Party with WebRTC is not currently ready for beta testing
- WebRTC implementation does not currently support screen sharing
- WebRTC implementation does not currently support file transfer

## API updates: upgrade from 4.2 to 5.1

This chapter describes what changed in the implementation syntax.

### Download Weemo.js

To get Weemo.js JavaScript API release 5.1, nothing has changed:

```html
<script src="https://download.weemo.com/js/webappid/Your_App_Identifier"></script>
```

### Weemo Object instantiation

##### Instantiate the Weemo Object

Weemo Object initialization changed and adds optional parameters in release 5.1. You will have to use a ```options``` object in order to defined your optional parameters. Here is the ```options``` object with the full list of the optional parameters.

```JavaScript
var options = {
    debugLevel : 1, 
    displayName : 'Your Display Name', 
    useJquery : false,
    defaultStyle : true,
    container : 'myContainer'
};
```

>Be aware that if you don't set defaultStyle to false, the default stylesheet will be loaded in your environment and apply to the webRTC call window.

Your final instantiation of the Weemo object should change from the old 4.2:

```JavaScript
var weemo = new Weemo(webAppId, uid, weemoType, hap, debugLevel, displayName);
``` 

To the New 5.1 Weemo instantiation:
```JavaScript
var options = {
    hap : '',
    debugLevel : 1, 
    displayName : 'Your Display Name', 
    useJquery : false,
    defaultStyle : true,
    container : 'myContainer'
};
var weemo = new Weemo(webAppId, uid, weemoType, options);
```

You can find more details about Weemo Object instantiation [here](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a63d42d58d2f36203a958bf63e3b69173).

### Initialization

After instantiating the Weemo Object, it must be initialized.
The Weemo initialization does not change from 4.2 to 5.1.

4.2/5.1 instantiation:

```JavaScript
weemo.initialize();
```

### Authentication

In the old 4.2 JavaScript release, after the initialize() method you had to send your credentials to the Weemo cloud by using an ```authenticate()```. This step is now done **automatically** by the real time client in the Javascript API release 5.1.

The ```authenticate()``` method is **deprecated in 5.1**, but you can still use ```authenticate(1)``` which is a ```Force Authenticate```. This form is used if you want to connect while someone else is connecting with the same credential. 
You can find more details about ```Force Authenticate``` [here](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20)

Old authentication step (4.2):

```JavaScript
// Get the Connection Handler callback when the JavaScript is connected to WeemoDriver
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

The new authenticate step (5.1):

```JavaScript
// Get the Connection Handler callback when the JavaScript is connected to the real time client
weemo.onConnectionHandler = function(message, code) {
	if(window.console)
		console.log("Connection Handler : " + message + ' ' + code);
	switch(message) {
		case 'connectedWeemoDriver':
                      console.log('real time client is WeemoDriver');
 			break;
		case 'connectedWebRTC':
                      console.log('real time client is WebRTC');
 			break;
                case 'sipOk':
                      console.log('Authenticated');
 			break;
	}
}
```

As you can see the ```authenticate()``` method is not used anymore in the JavaScript API release 5.1.
You can also see that the ```connectedWebRTC``` message returned by the onConnectionHandler is new. You can find the entire list of messages returned by the onConnectionHandler [here](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

### Call creation

Nothing has changed in the call creation method: all of the processes are the same for one to one and conference calls. Wait for ```onConnectionHandler (sipOk)``` before launching a [```weemo.createCall()```](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7) method with the same arguments as the JavaScript API release 4.2.

```JavaScript
var uidToCall = "johnsmith@weemo.com";
var displaynameToCall = "John Smith";
var type = "internal";
weemo.createCall(uidToCall, type, displaynameToCall);
```

### Call controls

With the Javascript API release 4.2, you were able to control the current calls directly within your Web Application. All of these controls are available in the release 5.1 of our JavaScript API .

Call control methods are available by accessing the [```WeemoCall```](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html) Object in the [```onCallHandler```](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123) callback.
This sample code demonstrates how:

```JavaScript
// Create a null variable to point the object
var current_call = null;

// Get the callback onCallHandler
weemo.onCallHandler = function(callObj, args) {
// assign your variable with the created weemoCall Object
            current_call = callObj;
}
// Now you can interact simply with the Weemo
call object
current_call.hangup();
```

List of methods: (click on the method name to go on our function reference)

* [accept();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a9758a08760cfbb0f5ddc42jhgfr)
* [hangup();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b28azert)
* [videoStart();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b29azert)
* [videoStop();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b30azert)
* [audioMute();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b31azert)
* [audioUnMute();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b32azert)
* [pip();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b35azert)
* [noPip();](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b36azert)
* [settings(); - (WeemoDriver only)](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b33azert)
* [shareStart(); - (WeemoDriver only)](http://docs.weemo.com/release/5.1/js/interface_weemo_call.html#a019f570d9832a43250b34azert)

### Methods

Some API methods changed from 4.2 to 5.1.
The ```disconnect()``` is also deprecated in the release 5.1 of the JavaScript API and replaced by a [```reset()```](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03erasd9edd544a75ee95c55a7)
We also add a method which is available while using the **WeemoDriver only** and named [```getWDVersion()```](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a028ecf765e24e2057d21c38d395arhg1)

### Callbacks

The callbacks available in release 5.1 are the same in release 4.2, but some return values have changed. Details for each callback and the complete list of return values are available by clicking in one of the following:

- [ onCallHandler(callObject, infoObj)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123)
- [onConnectionHandler(message, code)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
- [onGetHandler(name, obj)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)
- [onWeemoDriverNotStarted(downloadUrl)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a1e45abe53255b2188177d2174243959daze)

### Error handling

The error codes changed as well : [see code ref](integration.md#error-codes) 