// $('button.close').click(function(event) {
//     parent.ATTcloseModel();
// });
$(function(){
    $('button.close-md').click(function(event) {
        parent.postMessage({'message':'ATTcloseIframe'}, '*');
        // alert('hello');
    });

    $('#addTrello').click(function(event) {
        parent.postMessage(
            {
                'message':'ATTaddTrello',
                'data': {
                    'board': $('#board-list').val(),
                    'list': $('#list-list').val(),
                    'title': $('#card-title').val(),
                    'description': $('#card-description').val()
                }
            }, '*'
        )
    });
})