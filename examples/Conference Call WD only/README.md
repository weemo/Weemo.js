# Weemo JavaScript API examples 


In this repository, you will find examples describing how to implement Weemo Video.

### How to deploy the examples

##### Requirements

- It is important that the project is served from a webserver and not from the file system when using WebRTC.
- Be aware of your AppId, and understand what is a ```UID```, a ```TOKEN``` and a ```Display Name```.
- You will need to run an authentication server from Weemo in order to get a token. Please note the ip address of the authentication server. You will use this address in the AUTH_URL variable.
- To run a multi-party call, all your users need to be connected using the WeemoDriver

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
To do so, for each of the Javascript examples you want to use, you must edit the .html file and replace the placeholder "YOUR_AUTH_URL" by your authentication server url in the following lines:

```JavaScript
AUTH_URL = 'http://YOUR_AUTH_URL/gettoken?uid='
```

So for example, if you are running an authentication localy on your computer and that this authentication server is running on port 8000, you will need to replace the placeholder "YOUR_AUTH_URL" by your authentication server url as follows:

```JavaScript
AUTH_URL = 'http://localhost:8000/gettoken?uid='
```

Now that you have setup the AppId and the authentication server url you can upload the examples on a webserver and start using them.

In this example, the ```UID``` and ```Display Name``` are already set. 
In the **host.html**, you will be connected using **host_uid** as a ```UID``` and **Host** as a ```Display Name```, if you are using **attendeeInternal.html** , you will be connected using **attendee_internal_uid** as a ```UID``` and **Attendee Internal** as a ```Display Name```. If you are using **attendeExternal.html** you won't have a ```UID``` because as an external user, you will just be able to join the conference of the host (in this case, you can see in the example that instead of getting a token and authenticate to the Weemo Cloud, you will use the ```UID``` of the internal user as a token).

>You can find more details about ```AppID```, ```UID``` and ```Display Name``` [here](https://github.com/weemo/Weemo.js/blob/master/docs/start.md)


### How to use the examples

The multi party example is composed of three html files. One called **host.html** and the other ones are named ```attendeeInternal.html``` and ```attendeeExternal.html```. In order to initiate a call between these three pages here are the steps you have to follow:

- Open ```host.html``` in one computer and wait te be connected. You will know that you are connected when you will see these sentences appear in your browswer as well as a button labeled **'Click to Host a video conference'**:

```JavaScript
Connected as Host using WeemoDriver.
```

- At this moment open the ```attendeeInternal.html``` and  ```attendeeExternal.html``` in two other computers and wait to be connected. You will know that you are connected when you will see the following sentence appears in your browser as well as a button labeled **'Click to join the Host video conference'**:

```JavaScript
Connected as Attendee using WeemoDriver
```

- Click the button in your 3 pages. The calls will be initiated and everybody will be part of the same conference room.
