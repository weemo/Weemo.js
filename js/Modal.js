(function (window, html, body) {
    if (!window.innerWidth) Object.defineProperty(window, 'innerWidth', {
        get: function () { return html.clientWidth }
    });

    if (!window.innerHeight) Object.defineProperty(window, 'innerHeight', {
        get: function () { return html.clientHeight }
    });


    if (!document.width) Object.defineProperty(document, 'width', {
        get: function () { return Math.max(html.clientWidth, html.scrollWidth, body.scrollWidth) }
    });

    if (!document.height) Object.defineProperty(document, 'height', {
        get: function () { return Math.max(html.clientHeight, html.scrollHeight, body.scrollHeight) }
    });


    if (!window.scrollY) Object.defineProperty(window, 'scrollY', {
        get: function () { return html.scrollTop || body.scrollTop }
    });

    if (!window.scrollX) Object.defineProperty(window, 'scrollX', {
        get: function () { return html.scrollLeft || body.scrollLeft }
    });
}(this, document.documentElement, document.body));

var Modal = function(html) {
    var self = this;

    this.options = {
        height : "210",
        width : "400",
        html: html,
        top: "center",
        left: "center"
    };
    var defaultStyles = function() {
    	var browser; 
    	var browserVersion;
    	
    	if (navigator.userAgent.search("MSIE") >= 0){
		    browser = 'Explorer';
		    var position = navigator.userAgent.search("MSIE") + 5;
		    var end = navigator.userAgent.search("; Windows");
		    browserVersion = parseInt(navigator.userAgent.substring(position,end));
		}
    	
	    var pageHeight = window.innerHeight;
	    var pageWidth = window.innerWidth;
	
	    if(self.options.top == "center") {
	        self.options.top = (pageHeight / 2) - (self.options.height/2);
	    }
	
	    if(self.options.left == "center") {
	        self.options.left = (pageWidth / 2) - (self.options.width/2);
	    }
	    
	    
	    var overlay = document.getElementById('weemo_overlay');
	    overlay.style.position = 'fixed';
	    overlay.style.top = '0';
	    overlay.style.left = '0';
	    
	    if(browser != undefined && browserVersion <= 8) {
	    	overlay.style.backgroundColor = 'rgb(0,0,0)';
	    } else {
	    	overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
	    }
	    
	    overlay.style.height = pageHeight+'px';
	    overlay.style.width = pageWidth+'px';
	    overlay.style.zIndex = '1000';
	    overlay.style.filter = 'alpha(opacity = 60)';
	    //overlay.style.-ms-filter = 'alpha(opacity = 60)';
	    
	    var modalBox = document.getElementById('weemo_modal_box');
	    modalBox.style.backgroundClip = 'padding-box';
	    modalBox.style.backgroundColor = '#FFFFFF';
	    
	    if(browser != undefined && browserVersion <= 8) {
	    	modalBox.style.border = '1px solid rgb(0, 0, 0)';
	    	modalBox.style.boxShadow = '0 3px 7px rgb(0, 0, 0)';
	    } else {
	    	modalBox.style.border = '1px solid rgba(0, 0, 0, 0.3)';
	    	modalBox.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.3)';
	    }
	    
	    modalBox.style.borderRadius = '6px 6px 6px 6px';
	    modalBox.style.outline = 'medium none';
	    modalBox.style.zIndex = '1050';
	    modalBox.style.position = 'fixed';
	    modalBox.style.left = self.options.left+'px';
	    modalBox.style.top = self.options.top+'px';
	    modalBox.style.display = 'none';
	    modalBox.style.height = 'auto';
	    modalBox.style.width = self.options.width + 'px';
	
	  
	    var closeBtn = document.getElementById('weemo_modal_close');
	    closeBtn.style.background = '#FFF';
	    closeBtn.style.fontFamily = '\"Helvetica Neue\",Helvetica,Arial,sans-serif';
	    closeBtn.style.color = '#000000';
	    closeBtn.style.float = 'right';
	    closeBtn.style.fontSize = '20px';
	    closeBtn.style.fontWeight = 'bold';
	    closeBtn.style.lineHeight = '20px';
	    closeBtn.style.opacity = '0.2';
	    closeBtn.style.textShadow = '0 1px 0 #FFFFFF';
	    closeBtn.style.marginTop = '2px';
	    closeBtn.style.border = '0 none';
	    closeBtn.style.padding = '0';
	    closeBtn.style.textDecoration = 'none';
	    
	    var title = document.getElementById('weemo_modal_header_title');
	    title.style.fontSize = '23px';
	    title.style.textAlign = 'left';
	    
	    var header = document.getElementById('weemo_modal_header');
	    header.style.borderBottom = '1px solid #EEEEEE';
	    header.style.padding = '9px 15px';
	    header.style.color = '#333333';
	    header.style.fontFamily = '\"Helvetica Neue\",Helvetica,Arial,sans-serif';
	    header.style.lineHeight = '20px';
	    
	    var inner = document.getElementById('weemo_inner_modal_box');
	    inner.style.padding = '15px';
	    inner.style.position = 'relative';
	    inner.style.backgroundColor = '#fff';
	    inner.style.color ='#333';
	    inner.style.fontFamily = '\"Helvetica Neue\",Helvetica,Arial,sans-serif';
	    inner.style.fontSize = '15px';
	    inner.style.lineHeight = '20px';
	    inner.style.textAlign = 'left';
	};


	var weemo_box = function() {
        var weemoModalClose = document.getElementById('weemo_modal_close');
        var btnClose = document.getElementById('btnClose');
        weemoModalClose.onclick = function() {
        	document.getElementById('weemo_overlay').style.display = 'none';
        	document.getElementById('weemo_modal_box').style.display = 'none';
        };
    };

    this.show = function() {
        weemo_box();
        defaultStyles();
        
        document.getElementById('weemo_overlay').style.display = 'block';
        document.getElementById('weemo_modal_box').style.display = 'block';
    };

    this.close = function() {
    	document.getElementById('weemo_overlay').style.display = 'none';
        document.getElementById('weemo_modal_box').style.display = 'none';
    };
};
