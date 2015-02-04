var ID = {
        CONTAINER       : 'ATT-trello-container',
        IFRAME_PREFIX   : 'iheart-iframe-'
    };
var _this       = {},
    _views      = {},
    _container  = null;

if ($('#'+ID.CONTAINER).length > 0) {
    _container = $('#'+ID.CONTAINER)
    _container.show();
} else {
    _container = $('<div />', {id:ID.CONTAINER});
    _container.appendTo(document.body);
    getView('trello', _container);
}


// private functions --------------------------------------------------------
function getView (id){
    // This function is originally from https://github.com/ffto/iHeart-Chrome-Extension
    // return the view if it's already created
    if (_views[id]) return _views[id];

    // iframe initial details
    var src     = chrome.extension.getURL('html/frame/'+id+'.html?view='+id+'&_'+(new Date().getTime())),
        iframe  = $('<iframe />', {id:ID.IFRAME_PREFIX+id, src:src, scrolling:false});

    // view
    _views[id] = {
        isLoaded    : false,
        iframe      : iframe
    };

    // add to the container
    _container.append(iframe);

    return _views[id];
};

// Handle message from frame
addEventListener('message', function(ev) {
    switch (ev.data.message) {
        case 'ATTcloseIframe':
            ATTcloseModal();
            break;
        case 'ATTaddTrello':
            add2Trello(ev.data.data);
            // $('#ATT-trello-container').fadeOut();
            ATTcloseModal();
            break;
    }
});

// handle message from background js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.ATTaction) {
            case 'exist':
                sendResponse({message: "yeap"});
                break;
            case 'showTime':
                alert('showTime');
                break;
        }
 });


// Close modal
function ATTcloseModal(){
    $('#ATT-trello-container').fadeOut();
}

function add2Trello(data){
    alert('log');
    console.log(data);
    chrome.extension.sendRequest({action: "ATTaddTrello", data: data, url: window.location.href});
}

// Utils

var contentScript = {
    // Adapted from: http://www.sitepoint.com/chrome-extensions-bridging-the-gap-between-layers/
    tellBackGround: function(message, data){
        var data = data || {};
        // send a message to "background.js"
        chrome.extension.sendRequest({
            message : message,
            data : data
        });
    }
}