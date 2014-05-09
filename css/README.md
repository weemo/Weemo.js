# Implement a custom CSS for the call window

### 1. Disable the default stylesheet download
In order to implement your own style and apply it to your call window using WebRTC you will have to disable the default stylesheet download by passing false as a value of the property ```defaultStyle``` when you instantiate your Weemo object:

```JavaScript
var options = {
    defaultStyle : false
};

var weemo = new Weemo("YOUR_APP_ID", "YOUR_UID", "internal", options);
```

### 2. Include your own css 

Once you disable the default stylesheet download, you will have to include your own stylesheet using a regular link tag:

```html
<link rel="stylesheet" type="text/css" href="YOUR_PATH/YOUR_CSS_FILENAME.css">
```
Where ```YOUR_PATH``` is the path to your custom css file and ```YOUR_CSS_FILENAME``` is the name of your css file.

You can find an example of an implementation using a cutom css [here](https://github.com/weemo/Weemo.js_beta/tree/master/examples/Call%201to1%20WD%20and%20WebRTC%20-%20Drag%20%26%20Drop%20-%20Custom%20Style)
