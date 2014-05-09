# Implement Weemo WebRTC Drag and Drop

### 1. Inlcude the WeemoDragNDrop.js
In order to implement the drag and drop and apply it on your call window using WebRTC you will have to add a reference to ```WeemoDragNDrop.js``` in your project as follows:

```html
<script type="text/javascript" src="YOUR_PATH/WeemoDragNDrop.js" ></script>
```

Where ```YOUR_PATH``` is the path to the ```WeemoDragNDrop.js``` file in your application.

### 2. Apply drag and drop into your call window 

You will first have to declare a new global variable that you will use to instantiate your drag and drop object.

```JavaScript
var weemodragndrop;
```

In order to apply the drag and drop on your WebRTC call window, you will have to add the following code in your ```onCallHandler```, when receiving a type ```webRTCCall``` and a status ```active```:

```JavaScript
weemodragndrop = WeemoDragNDrop();
weemodragndrop.init();
```

And the following code when receiving a type ```webRTCCall``` and a status ```terminated``` in your ```onCallHandler```:

```JavaScript
if(weemodragndrop !== undefined && weemodragndrop.hasOwnProperty('destroy'))
    weemodragndrop.destroy();
```


Your final code should look like the following:

```JavaScript
var weemodragndrop;
weemo.onCallHandler = function(callObj, args) {
    if(args.type == 'webRTCcall' && args.status == 'active') {
        weemodragndrop = WeemoDragNDrop();
        weemodragndrop.init();
    } else if (args.type == "webRTCcall" && args.status == "terminated") {       
        if(weemodragndrop !== undefined && weemodragndrop.hasOwnProperty('destroy'))
            weemodragndrop.destroy();
    }
};
```

You can find an example of an implementation using the drag and drop [here](https://github.com/weemo/Weemo.js_beta/tree/master/examples/Call%201to1%20WD%20and%20WebRTC%20-%20Drag%20%26%20Drop%20-%20Custom%20Style)
