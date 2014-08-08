# Weemo JavaScript API examples 


In this repository, you will find examples describing how to implement Weemo Video.

### How to deploy the examples

##### Requirements

- It is important that the project is served from a webserver and not from the file system when using WebRTC.
- Be aware of your AppId, and understand what is a ```UID```, a ```TOKEN``` and a ```Display Name```.
- You will need to run an authentication server from Weemo in order to get a token. Please note the ip address of the authentication server. You will use this address in the AUTH_URL variable.

You can find more details about AppID, UID and Display Name [here](https://github.com/weemo/Weemo.js/blob/master/docs/start.md)

##### Setting up the AppID

Once you have received your ```AppID``` provided by Weemo, you can setup these examples with your AppId in order to test the API. 
To do so, for each of the Javascript examples you want to use, you must edit the .html file and
replace the placeholder "YOUR_APP_IDENTIFIER" by your AppID in the following lines

```html
<script type="text/javascript" src="https://download.weemo.com/js/webappid/YOUR_APP_IDENTIFIER"></script>
```

and 

```JavaScript
var weemo = new Weemo("YOUR_APP_IDENTIFIER", token, "internal", options);
```

##### Setting up the authentication url

Once your AppId is setup, you will have to setup your authentication url.
To do so, for each of the Javascript examples you want to use, you must edit the .html file. First uncomment the line that apply to you (it will depend of which server SDK you will be using) and replace the placeholder "YOUR_AUTH_URL" by your authentication server url in the following lines:

```JavaScript
// If you are using our Java, Ruby or Node.js server-SDK uncomment the following line and replace the placeholder YOUR_AUTH_URL wuth your authentication client url
// AUTH_URL = 'http://YOUR_AUTH_URL/gettoken?uid=',
// If you are using our PHP server-SDK uncomment the following line and replace the placeholder YOUR_AUTH_URL wuth your authentication client url
// AUTH_URL = 'http://YOUR_AUTH_URL/gettoken.php?uid=',
```

So for example, if you are running our Java, Ruby or Node.js authentication client localy on your computer and that this authentication client is running on port 8000, you will need to replace the placeholder "YOUR_AUTH_URL" by your authentication server url as follows:

```JavaScript
AUTH_URL = 'http://localhost:8000/gettoken?uid='
```

But if you are running our PHP authentication client localy on your computer and that this authentication client is running on port 8000, you will need to replace the placeholder "YOUR_AUTH_URL" by your authentication server url as follows:

```JavaScript
AUTH_URL = 'http://localhost:8000/gettoken.php?uid='
```

Now that you have setup the AppId and the authentication server url you can upload the examples on a webserver and start using them.

In these examples, the ```UID``` and ```Display Name``` are already set. 
In the **caller.html**, you will be connected using **caller_uid** as a ```UID``` and **Caller** as a ```Display Name```, and if you are using **callee.html**, you will be connected using **callee_uid** as a ```UID``` and **Callee** as a ```Display Name```.

>You can find more details about ```AppID```, ```UID``` and ```Display Name``` [here](https://github.com/weemo/Weemo.js/blob/master/docs/start.md)


### How to use the examples

Each one-to-one call example is composed of two html files. One called **caller.html** and the other one named ```callee.html```. In order to initiate a call between these two pages here a the steps you have to follow:

- Open ```callee.html``` in one computer and wait te be connected. You will know that you are connected when you will see these sentences appear in your browswer:

```JavaScript
Connected as Callee using (WeemoDriver|WebRTC).
Waiting for a call.
```

- At this moment open the ```caller.html``` in another computer and wait  to be connected. You will know that you are connected when you will see the following sentence appears in your browser as well as a button labeled **'Click to call Callee'**:

```JavaScript
Connected as Caller using (WeemoDriver|WebRTC)
```

- Click the button **'Click to call Callee'** in the ```caller.html``` page in your browser. The call is initiated.
- Answer the call in the ```callee.html``` page and the Video Chat starts.

>Warning: If using WebRTC, you will be ask to allow access to your microphone and camera when initiating a call and when accepting a call. Click ```Allow``` in order to give WebRTC access to these peripherics. 