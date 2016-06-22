(function(d,i){
    var iFrame = d.createElement(i);
    iFrame.setAttribute('frameborder',0);
    iFrame.setAttribute('allowtransparency','true');
    iFrame.setAttribute('src','chat.html');
    iFrame.setAttribute('width',305);
    iFrame.setAttribute('height',355);
    iFrame.style.position = 'fixed';
    iFrame.style.bottom = '0px';
    iFrame.style.right  = '0px';
    d.body.appendChild(iFrame);
})(document,"iframe");