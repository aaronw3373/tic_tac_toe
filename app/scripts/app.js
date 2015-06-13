$(document).ready(function(){
  //toggle play and chat
  $('#toggleChatBox').on('click', function(){
    $('#chatbox').toggle(500,'swing');
    $('#playbox').toggle(500,'swing');
  });

  // chat functions
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      Chat.messageRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });
  Chat.messageRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    Chat.displayChatMessage(message.name, message.text);
  });
  $('#clear').on('click',function(){
    Chat.messageRef.set(null);
    $('#messagesDiv').html('');
  });

  //click which game mode
  $('#login').on('click', function(event){
    $('#login').toggle(500, 'swing');
    $('#playbox').toggle(500,'swing');
    $('#foot').toggle(500, 'swing');

    if (event.target.id=== 'onlinePlay'){
      Online.playOnline();
    }
    else if (event.target.id=== 'localPlay'){
      Local.playLocal();
    }
    else if (event.target.id=== 'computerPlay'){
      Computer.playComputer();
    };
  });

});
