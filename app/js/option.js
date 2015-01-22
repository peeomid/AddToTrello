var APP_KEY = '0ff4272dd113f69153b34e35fb8e5918';
Trello.setKey(APP_KEY);

function init() {

    // Check if page load is a redirect back from the auth procedure
    if (HashSearch.keyExists('token')) {
        Trello.authorize(
            {
                name: "Trello Helper Extension",
                expiration: "never",
                interactive: false,
                scope: {read: true, write: false},
                success: function () {
                    chrome.extension.sendMessage({
                        command: 'saveToken',
                        token: localStorage.getItem('trello_token')
                    }, function(data) {
                        // chrome.tabs.getCurrent(function (tab) {
                        //     chrome.tabs.remove(tab.id)
                        // });
                    });
                },
                error: function () {
                    alert("Failed to authorize with Trello.")
                }
            });
    }

    $("#clickhere").click(function () {
        // Trello.setKey(APP_KEY);
        Trello.authorize(
            {
                name: "Add To Trello chrome extension",
                type: "redirect",
                expiration: "never",
                interactive: true,
                scope: {read: true, write: false},
                success: function () {
                    // Can't do nothing, we've left the page
                },
                error: function () {
                    alert("Failed to authorize with Trello.")
                }
            });
    });

    $("#getlist").click(function() {
        // alert('hehe');
        getBoardList();
    });

    $("#logout").click(function () {
        Trello.deauthorize();
        location.reload();
    });

    if (!localStorage.trello_token) {
    } else {
        $('#showhere').text(localStorage.trello_token);
    }

    function getBoardList() {
        Trello.get("members/me/boards", function(boards) {
            console.log(boards);
        });
    };

}
$(document).ready(init);