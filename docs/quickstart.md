# Javascript API Quick-start

## Overview

This quick tutorial is a sum-up of the very mandatory milestones to follow in order to implement Weemo API into your Web Applications.

### Step 1 - Identifiers

As a pre-requisite, you should be aware of your  ```Web App Identifier``` and the kind of ```Token``` used with the AUTH API.

For POC, [Token](naming.md#token) must be filled with the [UID](naming.md#uid) of the connected User. 

### Step 2 - Get weemo.js

The Weemo API is JavaScript based. It is packaged in a class named: weemo.js, to be embedded in the front-end of your web-server.

To Get the Weemo Javascript API from the Weemo Cloud with your ```Web App Identifier```:

```
<script type="text/javascript" src="https://download.weemo.com/js/webappid/Your_Web_App_Identifier"></script>
```

### Step 3 - Weemo Object Instanciation

Create an instance of a Weemo Object using your ```Web Application Identifier```, ```Token``` and ```type```:

```
var weemo = new Weemo("YOUR_WEB_APP_IDENTIFIER", "USER_TOKEN", "internal");
```

By default, ```type```="internal"

### Step 4 - Weemo Driver detection

Initialize the connection between the Weemo Object and the Weemo Driver:

```
weemo.initialize();
```

If the Weemo Driver is not running on the computer, _6 seconds_ after sending the weemo.initialize(), 
this callback  will be sent by the Weemo Object JS:
 * [onWeemoDriverNotStarted(downloadUrl)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a1e45abe53255b2188177d2174243959daze)

### Step 5 - Download the Weemo Driver

If the Weemo Driver is not detected, then download it using ```downloadURL``` variable.

This download URL could be used in a website button or popup to obtain the Weemo video driver locally.
A popup example is available [here](https://github.com/weemo/Release-4.0/blob/WeemoDriver/js/Modal.js). 


### Step 6 - Authentication to the Weemo Cloud

1. As soon as the Weemo video driver is locally detected by the JS, 
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

### Step 7 - Make a Call

Now you can make a call, using the ```createCall()``` method:

```
weemo.createCall("CALLEE_UID", "internal", "CALLEE_DISPLAYNAME")
```

For more information about createCall() see our reference [here](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a7).

### _Optional 1 - Set Display Name_

For a better user experience, it is recommended to set the display name of the user, usually just after receiving [onConnectionHandler(sipOk)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a9758a08760cfbb0f5ddc42af7ed87a20123) following a [weemo.initialize()](http://docs.weemo.com/release/4.2/js/interface_weemo.html#a019f570d9832a43250b28e4de3dee4fe) command.

```
weemo.setDisplayName("DISPLAY_NAME");
```

The callback will be:
* [onGetHandler('displayname'=value)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)


### _Optional 2 - Get Status_

Before creating a one to one call, the best practice is to get the status of the callee by calling:

```
weemo.getStatus("CALLEE_UID");
```

The callback will be:
* [onGetHandler('status'= '0' or '1',UID)](http://docs.weemo.com/release/4.2/js/interface_weemo.html#ad053bf044f03d9edd544a75ee95c55a765)

 '1' if the callee is online, 
 '0' if the callee is not connected.

### _Make a call_ - code sample

You can view a complete sample code allowing to make a simple call [here](https://github.com/weemo/JavaScript-API/blob/WeemoDriver/examples/tiny_sample.html).