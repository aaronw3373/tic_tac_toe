var Local = (function() {

  function playLocal() {
    resetMatch();

    $('.box').on('click', function(event){
      onGameClick(event);
    });

    $('#newGame').on('click', function(){
      newGame();
    });

    $('#resetMatch').on('click', function(){
      resetMatch();
    });
  }

  var user = 0;
  var users = ["O","X"];
  var count = 0;
  var winner = undefined;
  var singleX = [];
  var sumsX = [];
  var singleO = [];
  var sumsO = [];
  var xscore = 0;
  var oscore = 0;

  function whosTurn(){
    user = 1-user;
    return user;
  }

  function canWin(location){
    local = parseInt(location.charAt(1));
    if (user){
      for (var i = 0; i < sumsX.length; i++) {
        if (sumsX[i] + local === 15){
          xscore++;
          $('#xscore').html('X Score: ' + xscore);
          return true;
        }
      }
      for (var j = 0; j < singleX.length; j++) {
        sumsX.push(singleX[j]+local);
      }
      singleX.push(local);
    } else {
        for (var k = 0; k < sumsO.length; k++) {
          if (sumsO[k] + local === 15){
            oscore++;
            $('#oscore').html('O Score: ' + oscore);
            return true;
          }
        }
        for (var l = 0; l < singleO.length; l++) {
          sumsO.push(singleO[l]+local);
        }
        singleO.push(local);
      }
  }

  function isTie(){
    if (count === 8){
      winner = "tie";
      return true;
    }
    count++;
  }

    function onGameClick(event) {
      if(!winner){
        var location = '#' + (event.target.id);
        if(!$(location).html()){
          whosTurn();
          $(location).html(user?"X":"O");
          if (canWin(location)){
            winner = users[user];
            console.log("The Winner Is: " + winner);
            $('h1').html(winner + " WINS");
          }else if (isTie()){
            console.log("It was Tie");
            $('h1').html("Tie");
          }
        }
      }
    }

    function newGame() {
      console.log("New Game");
      for (var i = 1; i < 10; i++) {
        var reset = '#' + (i);
        $(reset).html('');
      };
      $('h1').html("Tic Tac Toe");
      user = 0;
      winner = undefined;
      singleX = [];
      sumsX = [];
      singleO = [];
      sumsO = [];
      count = 0;
    }

    function resetMatch() {
      console.log("Reset Match");
      for (var i = 1; i < 10; i++) {
        var reset = '#' + (i);
        $(reset).html('');
      };
      $('h1').html("Tic Tac Toe");
      $('#xscore').html('X Score: 0');
      $('#oscore').html('O Score: 0');
      user = 0;
      winner = undefined;
      singleX = [];
      sumsX = [];
      singleO = [];
      sumsO = [];
      count = 0;
      xscore = 0;
      oscore = 0
    }


  return {
    playLocal: playLocal
  }

})();
