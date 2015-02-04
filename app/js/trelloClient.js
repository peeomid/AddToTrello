var TrelloClient = {
    boardList: [],
    listsOfBoard: {},
    getBoardList: function(callback) {
        var client = this;
        Trello.get("members/me/boards", function(boards) {
            this.boardList = boards;
            callback(boards);
            // return boards;
        });
    },
    sortBoardByName: function(boards){
        return boards.sort(function(bA, bB){
            return bA.name.localeCompare(bB.name);
        })
    },
    buildBoardListOptions: function(boards) {
        // param: boards => array of board objects returned by Trello
        var html = "";
        boards.forEach(function(board){
            html += '<option value="' + board.id + '">' + board.name + '</option>' + "\n";
        });

        // console.log(html);
        return html;
    },


    // Lists
    getListFromBoard: function(boardId, callback) {
        var url = "boards/" + boardId + "/lists";

        Trello.get(url, function(lists) {
            callback(lists);
            // return boards;
        });
    },

    getListOfBoards: function(boards) {
        // get lists of given board list
        var client = this;
        boards.forEach(function(board){
            client.getListFromBoard(board.id, function(lists){
                client.listsOfBoard[board.id] = lists;
            })
        })
    },

    getFullListOfBoard: function() {
        var client = this;
        this.getBoardList(function(boards) {
            client.getListOfBoards(boards);
        });
    },

    buildListOptions: function(lists) {
        var html = "";
        lists.forEach(function(list){
            html += '<option value="' + list.id + '">' + list.name + '</option>' + "\n";
        });

        return html;
    },
    // Cards
    createCard: function(listId, card) {
        // param:
        // card => object {
        //    name:
        //    desc:
        // }
        Trello.post("lists/" + listId + "/cards", {
            name: card.name,
            desc: card.desc
          }, function(card){
            // Display a desktop notification with a link to the card
            // that was just created
            chrome.extension.sendRequest({action: "showNotification", text: card.url, link:card.url});
          });
    }


}