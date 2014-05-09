# Javascript API Quick Start Guide

## Overview

This quick tutorial is a summary of the required milestones to follow in order to implement Weemo API into your Applications using WeemoDriver and WebRTC.

When in a POC mode, your should replace the TOKEN directly by a UID.

## Requirement
It is important that the project is served from a webserver and not from the file system when using WebRTC.

### Step 1 - Identifiers

As a pre-requisite, you should be aware of your  ```App Identifier``` 

### Step 2 - Include Weemo Javascript

The Weemo API is Javascript based.  You should include the Javascript
library with a script tag that references the Weemo download path and
includes your ```App Identifier```.

```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/Your_App_Identifier"></script>
```


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

For more information about WEEMO_TYPE, see [here](https://github.com/weemo/Weemo.js_beta/wiki/Getting-Started#wiki-weemo-call-type).

### Step 4 - WeemoDriver or WebRTC detection

Initialize the connection between the Weemo Object and the real-time client.

```JavaScript
weemo.initialize();
```

**WebRTC**
As soon as the WebRTC capability is locally detected by the Javascript, 
this callback will be sent by the Weemo Object Javascript:
 * [onConnectionHandler(connectedWebRTC)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

As soon as the real-time client succeeds in connecting to the Weemo Cloud,
this callback will be sent by the Weemo Object Javascript:
 * [onConnectionHandler(connectedCLoud)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

Callbacks will be in this order:
 * [onConnectionHandler(authenticated)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(sipOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)


**WeemoDriver**

As soon as the WeemoDriver is locally detected by the Javascript, 
this callback will be sent by the Weemo Object Javascript:
 * [onConnectionHandler(connectedWeemoDriver)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)

As soon as the WeemoDriver succeeds in connecting to the Weemo Cloud,
this callback will be sent by the Weemo Object Javascript:
 * [onConnectionHandler(connectedCloud)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)


Callbacks will be in this order:
 * [onConnectionHandler(authenticated)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(audioOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)
 * [onConnectionHandler(sipOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234)


If the WeemoDriver is not running on the computer and WebRTC is not available, _6 seconds_ after sending the weemo.initialize(), 
this callback  will be sent by the Weemo Object Javascript:
 * [onWeemoDriverNotStarted(downloadUrl)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a1e45abe53255b2188177d2174243959daze)


### Step 5 - Download the WeemoDriver

If the WeemoDriver is not detected and WebRTC is not available, then download the WeemoDriver using the ```downloadURL``` variable.

This download URL could be used in a website button or popup to obtain the Weemo video driver locally.

### Step 6 - Make a Call

Now you can make a call, using the ```createCall()``` method:

```JavaScript
weemo.createCall("CALLEE_UID", "CALL_TYPE", "CALLEE_DISPLAYNAME")
```

For more information about createCall() see our reference [here](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7).

For more information about CALL_TYPE, see [here](https://github.com/weemo/Weemo.js_beta/wiki/Getting-Started#wiki-weemo-call-type).

### _Optional 1 - Set Display Name_

For a better user experience, it is recommended to set the display name of the user, usually just after receiving [onConnectionHandler(sipOk)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe1234) following a [weemo.initialize()](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe) command.

```JavaScript
weemo.setDisplayName("DISPLAY_NAME");
```

The callback will be:
* [onGetHandler('displayname', obj)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)


### _Optional 2 - Get Status_

Before creating a one to one call, the best practice is to get the status of the callee by calling:

```JavaScript
weemo.getStatus("CALLEE_UID");
```

* [getStatus("CALLEE_UID")](http://docs.weemo.com/release/5.1/js/interface_weemo.html#a6410cd7eed972d113cd0c94401df77c7)

The callback will be:
* [onGetHandler('status', obj)](http://docs.weemo.com/release/5.1/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)

When obj.value = 1 if the callee is online, 
or obj.value = 0 if the callee is not connected.

### _Make a call_ - code sample

You can view a complete sample code allowing to make a simple call [here](/examples).


## Javascript reference

For more information, you can consult our official [Full JS API documentation](http://docs.weemo.com/release/5.1/js).