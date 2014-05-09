WeemoDragNDrop = function (prop) {
  var videobox,
      buttonsbar,
      selfviewbox,
      remotevideo;
  if(prop != undefined && prop != null){
    videobox = (prop.videobox != undefined && prop.videobox != '') ? prop.videobox : 'weemo-videobox';
    buttonsbar = (prop.buttonsbar != undefined && prop.buttonsbar != '') ? prop.buttonsbar : 'weemo-buttonsbar';
    selfviewbox = (prop.selfviewbox != undefined && prop.selfviewbox != '') ? prop.selfviewbox : 'weemo-selfviewbox';
    remotevideo = (prop.remotevideo != undefined && prop.remotevideo != '') ? prop.remotevideo : 'weemo-remotevideo';
  } else {
    videobox = 'weemo-videobox';
    buttonsbar = 'weemo-buttonsbar';
    selfviewbox = 'weemo-selfviewbox';
    remotevideo = 'weemo-remotevideo';
  }
  var el = function(id){
      return document.getElementById(id);
  };
  var move = function(divid, xpos, ypos) {
    var a = el(divid),
        vid = el(videobox),
        vidStyle = getComputedStyle(vid),
        minX = (2 * (vid.getBoundingClientRect().width / 3)),
        miny = (2 * vid.getBoundingClientRect().height / 3),
        maxX = (window.innerWidth - (minX / 2)),
        maxy = (window.innerHeight - (miny / 2)),
        moveX,
        moveY;
    if(vidStyle.position == 'fixed'){
        moveX = Math.max(-minX, Math.min(xpos, maxX));
        moveY = Math.max(-miny, Math.min(ypos, maxy));    
    } else {
        moveX = xpos;
        moveY = ypos;    
    }
    a.style.left = moveX + 'px';
    a.style.top = moveY + 'px';
  };
  var movePIP = function(divid, xpos, ypos, boxWidth, boxHeight) {
    var offsets = getPos(divid),
        Xmove = Math.max(0, Math.min(xpos, (offsets.remoteWidth - offsets.pipWidth))),
        Ymove = Math.max(0, Math.min(ypos, (offsets.remoteHeight - offsets.pipHeight))),
        moveX = ((boxWidth) - (Xmove + offsets.pipWidth)),
        moveY = ((boxHeight) - (Ymove + offsets.pipHeight));
    el(divid).style.right = moveX + 'px';
    el(divid).style.bottom =  moveY + 'px';
  };
  var getPos = function(elem) {
    var divOffsets = el(elem).getBoundingClientRect(),
        parentOffsets = el(videobox).getBoundingClientRect();
    return { pipWidth : divOffsets.width, pipHeight : divOffsets.height, remoteWidth : parentOffsets.width, remoteHeight : parentOffsets.height };
  };
  var removeClass = function(node, cls) {
    if(node && node.className && node.className.indexOf(cls) >= 0) {
        var pattern = new RegExp('\\s*' + cls + '\\s*');
        node.className = node.className.replace(pattern, '');
    }
  };
  var hasClass = function(node, cls) {
    if(node && node.className){
        return (' ' + node.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  };

  var startMoving = function(evt) {
    if(el(buttonsbar).className == 'active'){
        removeClass(el(buttonsbar),"active");
    };
    document.body.className += ' userSelectNone';
    evt = evt || window.event;
    var posX = evt.clientX,
        posY = evt.clientY,
        a = el(videobox),
        divTop = a.style.top.replace('px', ''),
        divLeft = a.style.left.replace('px', ''),
        diffX,
        diffY;
    diffX = posX - divLeft;
    diffY = posY - divTop;
    document.onmousemove = function (evt) {
        evt = evt || window.event;
        posX = evt.clientX;
        posY = evt.clientY;
        var aX = posX - diffX,
            aY = posY - diffY;
        move(videobox, aX, aY);
    };
  };

  var startMovingPIP = function(evt) {
    if(el(buttonsbar).className == 'active'){
        removeClass(el(buttonsbar),"active");
    };
    document.body.className += ' userSelectNone';
    evt = evt || window.event;
    var posX = evt.clientX,
        posY = evt.clientY,
        a = el(selfviewbox),
        divHeight = a.offsetHeight,
        divWidth = a.offsetWidth,
        divTop,
        divLeft,
        diffX,
        diffY,                     
        style = window.getComputedStyle(a),
        divBottom = style.getPropertyValue('bottom').replace('px', ''),
        divRight = style.getPropertyValue('right').replace('px', ''),
        boxWidth = el(videobox).offsetWidth,
        boxHeight = el(videobox).offsetHeight;
    divTop = (parseInt(boxHeight) - (parseInt(divHeight) + parseInt(divBottom)));
    divLeft = (parseInt(boxWidth) - (parseInt(divWidth) + parseInt(divRight)));
    diffX = posX - divLeft;
    diffY = posY - divTop;
    document.onmousemove = function (evt) {
      evt = evt || window.event;
      posX = evt.clientX;
      posY = evt.clientY;
      var aX = posX - diffX,
          aY = posY - diffY;
      movePIP(selfviewbox, aX, aY, boxWidth, boxHeight);
    };
  };

  var stopMoving = function() {
    if (el(buttonsbar)) {
        if(hasClass(el(buttonsbar),'active')){
        } else {
            el(buttonsbar).className += " active";
        }
    }
    removeClass(document.body, 'userSelectNone');
    document.onmousemove = function () { };
  };

  return {
    init: function(){
        var rv = el(remotevideo);
        rv.addEventListener('mousedown', startMoving, false);
        var sv = el(selfviewbox);
        sv.addEventListener('mousedown', startMovingPIP, false);
        window.addEventListener('mouseup', stopMoving, false);
    },
    destroy: function(){
        window.removeEventListener('mouseup', stopMoving, false);
    }
  }
};