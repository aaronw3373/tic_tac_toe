var Online = (function(){
  function playOnline() {
    gameRef.set({board:board, player:"X", reset:true});

    $('.box').on('click', function(event){
      onGameClick(event);
    });

    gameRef.on('value', function(snapshot) {
      var snap = snapshot.val();
      displayBoard(snap.board);
      if (snap.newGame){
        newGame();
      }
      if (snap.reset){
        reset();
      }
      disable = false;
      if (gameAuth.uid === snap.waitingPlayer) {
        player = otherPlayer(snap.player);
        disable = true;
      } else {
        player = snap.player;
      }
      if (snap.winner){
        disable = true;
        if (snap.winner === "tie"){
          console.log("twas a tie");
            $('h1').html("Tie");
        }
        else{
          xscore = snap.xscore;
          oscore = snap.oscore;
          $('#oscore').html('O Score: ' + oscore);
          $('#xscore').html('X Score: ' + xscore);
          console.log("the winner is: " + snap.winner);
          $('h1').html(snap.winner + " WINS");
        }
      }
    });

    $('#newGame').on('click', function(){
      board = ["","","","","","","","",""];
      gameRef.set({board:board, player:"X", newGame:true});
    });

    $('#resetMatch').on('click', function(){
      board = ["","","","","","","","",""];
      gameRef.set({board:board, player:"X", reset:true});
    });
  };

  var local;
  var gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');
  var gameAuth;
  var player;
  var board = ["","","","","","","","",""];
  var winner;
  var singleX = [];
  var sumsX = [];
  var singleO = [];
  var sumsO = [];
  var xscore = 0;
  var oscore = 0;
  var count = 0;
  var disable = false;

  //Get a "unique" id for the user
  if (!(gameAuth = gameRef.getAuth())) {
    gameRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        gameAuth = authData;
      }
    });
  }

  var otherPlayer = function(player) {
    return player === 'X' ? 'O' : 'X';
  };

  function canWin(local){
    current = parseInt(local.charAt(1));
    if (player==="X"){
      for (var i = 0; i < sumsX.length; i++) {
        if (sumsX[i] + current === 15){
          return true;
        }
      }
      for (var j = 0; j < singleX.length; j++) {
        sumsX.push(singleX[j]+current);
      }
      singleX.push(current);
    }
    else if(player==="O"){
      for (var k = 0; k < sumsO.length; k++) {
        if (sumsO[k] + current === 15){
          return true;
        }
      }
      for (var l = 0; l < singleO.length; l++) {
        sumsO.push(singleO[l]+current);
      }
      singleO.push(current);
    }
  };

  function canTie(){
    if (count === 8){
      winner = "tie";
      return true;
    }
    count += 1;
  };

  function onGameClick(event){
    if( disable===false && !winner){
      local = '#' + (event.target.id);
      if(!$(local).html()){
        board[(event.target.id)-1]=(player);
        var firebaseData = {
          board: board,
          player: otherPlayer(player),
          waitingPlayer: gameAuth.uid,
          local: local
        };
        if (canWin(local)){
          winner = player;
          if (player === "X"){
            xscore++;
          }else{
            oscore++;
          }
          firebaseData.winner = winner;
          firebaseData.xscore = xscore;
          firebaseData.oscore = oscore;
        }else if (canTie()){
            firebaseData.winner = winner;
          }
        gameRef.set(firebaseData);
        disable = true;
      }
    }
  };

  function displayBoard(setter){
    for (var i = 0; i < setter.length; i++) {
      board[i] = setter[i];
      var spot = '#' + (i+1);
      $(spot).html(board[i]);
    }
  };

  function newGame(){
    $('h1').html("Tic Tac Toe");
    board = ["","","","","","","","",""];
    winner = undefined;
    disable = false;
    singleX = [];
    sumsX = [];
    singleO = [];
    sumsO = [];
    count = 0;
    gameRef.set({board:board, player:"X"});
  };

  function reset(){
    xscore = 0;
    yscore = 0;
    $('#xscore').html('X Score: 0');
    $('#oscore').html('O Score: 0');
    newGame();
  };

  return {
    playOnline: playOnline
  }

})();




