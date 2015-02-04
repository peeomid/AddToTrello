var APP_KEY = '0ff4272dd113f69153b34e35fb8e5918';
Trello.setKey(APP_KEY);

// Handler for context menu click
var menuClicked = function(info, tab){
    Trello.authorize(
            {
                name: "Add to Trello extension",
                type: "popup",
                expiration: "never",
                interactive: true,
                scope: {read: true, write: false},
                success: function () {
                    console.log('success');
                    // Can't do nothing, we've left the page
                },
                error: function () {
                    alert("Failed to authorize with Trello.")
                }
            });
    getBoardList();
    console.log("trello this: " + info.pageUrl);
    // chrome.tabs.sendMessage(tab.id, {ATTaction: "exist"}, function(response) {
    //     // Send message to check whether the script has been injected or not
    //     if (response) {
    //         // Already there
    //         chrome.tabs.sendMessage(tab.id, {ATTaction: "showTime"})
    //     }
    //     else {
    //         // Not yet injected
    //         chrome.tabs.insertCSS({file: "css/inject.css"}, function(){
    //             // chrome.tabs.executeScript({file: "js/inject.js"});
    //             chrome.tabs.executeScript({file: "js/lib/jquery-2.0.3.min.js"}, function(){
    //                 chrome.tabs.executeScript({file: "js/inject.js"});
    //             });
    //         });
    //     }
    // });
};


// add context menu
var contexts = ["page","selection","link","editable","image","video",
                "audio"];
var storage = localStorage;

chrome.contextMenus.create({"title": "Add to Trello",
                            "contexts": contexts,
                            "onclick": menuClicked});


// Listen to action from page
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){

    console.log(request, sender);
    if (request.action === "ATTaddTrello") {
        console.log(request.data);
        console.log(request.url);
    };
    // if (request.action === "showNotification") {
    //     chrome.notifications.create(request.link, {
    //         'type' : 'basic',
    //         'title': 'Trello card created',
    //         'message': request.text,
    //         'iconUrl': 'img/trello-48.png'}, function(){
    //             console.log('notification sent: ' + message);
    //         });
    //     chrome.notifications.onClicked.addListener(function(notification_id){
    //         chrome.tabs.create({url:notification_id});
    //     });

    // } else if (request.action === "getTrelloToken") {
    //     if (storage.trello_token) {
    //         sendResponse(storage.trello_token);
    //     } else{
    //         sendResponse("");
    //     }
    // } else if(request.action === "setTrelloToken") {
    //     if (request.trello_token) {
    //         storage["trello_token"] = request.trello_token;
    //     };
    // }
});

// Hanlde message from content script
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        // chrome.pageAction.show(sender.tab.id);

        // Now we have a token saved locally, as fetched from the settings page after authorization.
        if (request.message == 'saveToken') {
            localStorage.setItem('trello_token', request.token);
            // sendResponse();
            console.log('background: '+ localStorage.getItem('trello_token'));
            Trello.setToken(request.token);
            return true;
        }

    });

var background = {
    tell: function(tab, message, data) {
        var data = data || {};

        chrome.tabs.sendMessage(tab.id, {
            message : message,
            data : data
        });
    }
}