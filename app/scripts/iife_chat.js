var Chat = (function(){
  var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/globalChat');
  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  }


  return {
    messageRef: messageRef,
    displayChatMessage: displayChatMessage
  }
})();
