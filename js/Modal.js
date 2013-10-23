var Modal = function(downloadUrl) {
    var self = this;

    this.options = {
        height : "210",
        width : "430",
        downloadUrl: downloadUrl,
        top: "center",
        left: "center"
    };

    var overlay= function() {
    var el = $('<div class="weemo_overlay"></div>');
        $(el).appendTo('body');
    };

    var defaultStyles = function() {
        var pageHeight = $(window).height();
        var pageWidth = $(window).width();

        if(self.options.top == "center") {
            self.options.top = (pageHeight / 2) - (self.options.height/2);
        }

        if(self.options.left == "center") {
            self.options.left = (pageWidth / 2) - (self.options.width/2);
        }

        $('.weemo_overlay').css({
            'position':'absolute',
            'top':'0',
            'left':'0',
            'background-color':'rgba(0,0,0,0.6)',
            'height':pageHeight,
            'width':pageWidth,
            'z-index':'9999999',
            'filter':'alpha(opacity = 60)',
            '-ms-filter':'alpha(opacity = 60)'
        });

        $('.weemo_modal_box').css({
            'background-clip': 'padding-box',
            'background-color': '#FFFFFF',
            'border': '1px solid rgba(0, 0, 0, 0.3)',
            'border-radius': '6px 6px 6px 6px',
            'box-shadow': '0 3px 7px rgba(0, 0, 0, 0.3)',
            'outline': 'medium none',
            'z-index': '1050',
            'position':'absolute',
            'left':self.options.left,
            'top':self.options.top,
            'display':'none',
            'height': 'auto',
            'width': self.options.width + 'px'
        });
        $('.weemo_modal_close').css({
            'background':'#FFF',
            'font-family': '\"Helvetica Neue\",Helvetica,Arial,sans-serif',
            'color': '#000000',
            'float': 'right',
            'font-size': '20px',
            'font-weight': 'bold',
            'line-height': '20px',
            'opacity': '0.2',
            'text-shadow': '0 1px 0 #FFFFFF',
            'margin-top': '2px',
            'border': '0 none',
            'padding': '0',
            'text-decoration':'none'
        });
        $('.weemo_modal_header_title').css({
            'font-size' :'23px',
            'text-align':'left'
        });
        $('.weemo_modal_header').css({
            'border-bottom': '1px solid #EEEEEE',
            'padding': '9px 15px',
            'color': '#333333',
            'font-family': '\"Helvetica Neue\",Helvetica,Arial,sans-serif'
        });
        $('.weemo_inner_modal_box').css({
            'padding': '15px',
            'position': 'relative',
            'background-color':'#fff',
            'color': '#333333',
            'font-family': '\"Helvetica Neue\",Helvetica,Arial,sans-serif',
            'font-size': '14px',
            'line-height': '20px',
            'text-align': 'center',
            'margin': '0 15px'
        });
        $('.weemo_download_button').css({
            'text-align':'center'
        });
        $('.weemo_download_button_link').css({
            '-moz-border-bottom-colors': 'none',
            '-moz-border-left-colors': 'none',
            '-moz-border-right-colors': 'none',
            '-moz-border-top-colors': 'none',
            'background-color': '#F5F5F5',
            'background-image': 'linear-gradient(to bottom, #FFFFFF, #E6E6E6)',
            'background-repeat': 'repeat-x',
            'border-color': 'rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #B3B3B3',
            'border-image': 'none',
            'border-radius': '4px 4px 4px 4px',
            'border-style': 'solid',
            'border-width': '1px',
            'box-shadow': '0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05)',
            'color': '#333333',
            'cursor': 'pointer',
            'display': 'inline-block',
            'font-size': '14px',
            'line-height': '20px',
            'margin-bottom': '0',
            'padding': '4px 12px',
            'text-align': 'center',
            'text-shadow': '0 1px 1px rgba(255, 255, 255, 0.75)',
            'vertical-align': 'middle',
            'text-decoration': 'none'
        });
        $('.weemo_footer').css({
            'background-color': '#F5F5F5',
            'border-radius': '0 0 6px 6px',
            'border-top': '1px solid #DDDDDD',
            'box-shadow': '0 1px 0 #FFFFFF inset',
            'margin-bottom': '0',
            'padding': '15px',
            'text-align': 'center',
            'height':'45px'
        });
        $('.btnClose').css({
            'margin-left':'30px'
        });
    };


    var weemo_box = function() {
        var box = $('<div class="weemo_modal_box"><div class="weemo_modal_header"><h3 class="weemo_modal_header_title">Weemo Driver Download</h3></div><div class="weemo_inner_modal_box"><p>WeemoDriver does not respond, please click to download and install the latest version.</p><br/><div style="text-align:center;""><div class="weemo_download_button"><a class="weemo_download_button_link btnDownload" href="'+ self.options.downloadUrl+'" >Download</a><a href="#" class="weemo_download_button_link btnClose">Cancel</a></div></div></div><div class="weemo_footer">This software contains open source libraries, a complete list of these and their associated licenses are available <a target="_blank" href="http://weemo.com/licenses">here</a>.</div></div>');
        $(box).appendTo('.weemo_overlay');
        $('.weemo_modal_close, .btnClose').click(function(){
            $(this).parent().fadeOut().remove();
            $('.weemo_overlay').fadeOut().remove();
        });
    };

    this.show = function() {
        overlay();
        weemo_box();
        defaultStyles();
        $('.weemo_modal_box').fadeIn(500);
    };

    this.close = function() {
        $('.weemo_modal_close, .btnClose').parent().fadeOut().remove();
        $('.weemo_overlay').fadeOut().remove();
    };
};
