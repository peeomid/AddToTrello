// $('button.close').click(function(event) {
//     parent.ATTcloseModel();
// });
$(function(){
    $('button.close-md').click(function(event) {
        frame.tellContent('ATTcloseIframe');
        // parent.postMessage({'message':'ATTcloseIframe'}, '*');
    });

    $('#addTrello').click(function(event) {
        frame.tellContent('ATTaddTrello', {
            'board': $('#board-list').val(),
            'list': $('#list-list').val(),
            'title': $('#card-title').val(),
            'description': $('#card-description').val()
        });
    });

    // receive messages from background
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse){

    });
})

var frame = {
    tellContent = function(message, data) {
        var data = data || {};
        data.source = _view;

        window.parent.postMessage({
            message   : message,
            data : data
        }, '*');
    }
}