var Computer = (function(){

  function playComputer() {
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

  var board = ["","","","","","","","",""];
  var playSingle = [];
  var playPairs = [];
  var compSingle = [];
  var compPairs = [];
  var victor;
  var person = "X";
  var play = "X";
  var computer = "O";
  var comp = "O"
  var count = 0;
  var xscore = 0;
  var oscore = 0;

  //magic square win function
  function magicSquareTest(test,who,turn){
    var single;
    var pair;
    if (who===play){
      single = playSingle;
      pair = playPairs;
    }else if (who===comp){
      single = compSingle;
      pair = compPairs;
    }
    var tester = function(){
      for (var i = 0; i < pair.length; i++) {
        if (Number(pair[i]) + Number(test) === 15){
          return true;
        }
      }
    };
    if (turn === person){
      if(tester()){
        return true;
      }else{
        for (var i = 0; i < single.length ;i++) {
          pair.push(Number(single[i])+Number(test));
        }
        single.push(Number(test));
      }
    }
    else if(turn === computer){
      if (tester()){
        return true;
      }else {
        return false;
      }
    }
  };

  //tie functin
  function isTie(){
    if (count === 8){
      victor = "tie";
      return true;
    }
    count++;
  }

  //computer play functions
  function canWin(){
    for (var i = 1; i < 10; i++) {
      if (board[i-1]===""){
        if (magicSquareTest((i),comp,computer)){
          console.log("compWin " + (i));
          board[i-1]="O"
          var local = '#' + (i);
          $(local).html(computer);
          return true;
        }
      }
    }
  }
  function canBlock(){
    for (var i = 1; i < 10; i++) {
      if (board[i-1]===""){
        if (magicSquareTest(i,play,computer)){
          board[i-1]="O"
          var local = '#' + i;
          $(local).html(computer);
          for (var j = 0; j < compSingle.length ;j++) {
            compPairs.push(Number(compSingle[j]) + i);
          }
          compSingle.push(i);
          return true;
        }
      }
    }
  }

  function canMiddle(){
    if(board[4]===""){
      board[4]="O"
      var local = '#5';
      $(local).html(computer);
      for (var i = 0; i < compSingle.length ;i++) {
        compPairs.push(Number(compSingle[i])+5);
      }
      compSingle.push(5);
      return true;
    }
  }

  function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max));
  }

  function canForce(){
    var length = playSingle.length;
    if (playSingle[length-1]+playSingle[length-2]===10){
      for (key in board){
        if ((key%2 === 0) && (board[key]==="")){
          board[key] = "O";
          var local = '#' + (Number(key)+1);
          $(local).html(computer);
          for (var i = 0; i < compSingle.length ;i++) {
            compPairs.push(Number(compSingle[i])+(Number(key)+1));
          }
          compSingle.push(Number(key)+1);
          return true;
        }
      }
    }
  }

  function canCorner(){
    var length = playSingle.length;
    var array = [];
    for (key in board){
      if ((key%2 === 1) && (board[key]==="")){
        array.push(key)
      }
    }
    if (array !== []){
      var spot = randomIntFromInterval(0,(array.length))
      board[array[spot]] = "O";
      var local = '#' + (Number(array[spot])+1);
      $(local).html(computer);
      for (var i = 0; i < compSingle.length ;i++) {
        compPairs.push(Number(compSingle[i])+(Number(array[spot])+1));
      }
      compSingle.push(Number(array[spot])+1);
      return true;
    }
  }

  function mustRandom(){
    var emptySpace = [];
    for (key in board){
      if (board[key]===""){
        emptySpace.push(key);
      }
    }
    var rando = randomIntFromInterval(0,(emptySpace.length))
    board[emptySpace[rando]] = "O";
    var local = '#' + (Number(emptySpace[rando])+1);
    $(local).html(computer);
    for (var i = 0; i < compSingle.length ;i++) {
      compPairs.push( Number(compSingle[i]) + (Number(emptySpace[rando])+1) );
    }
    compSingle.push( (Number(emptySpace[rando])+1) );
  }



  //click handler
  function onGameClick(event) {
    if (!victor){
      var local = '#' + (event.target.id);
      if(!$(local).html()){
        $(local).html(person);
        board[event.target.id-1] = person;
        if (magicSquareTest(event.target.id,play,person)){
          victor = person;
          $('h1').html(person + " WINS");
          xscore++;
          $('#xscore').html("X Score: "+ xscore);

        }else if(isTie()){
          $('h1').html("Tie");
        }else{
          //computer turns
          setTimeout(function(){
            if(canWin()){
              victor = computer;
              $('h1').html(victor + " WINS");
              oscore++;
              $('#oscore').html("O Score: "+ oscore);

            }
            else if(canBlock()){
            }
            else if(canMiddle()){
            }
            else if(canForce()){
            }
            else if (canCorner()){
            }
            else {
              mustRandom();
            }
            count++;
          },500);
        }
      }
    }
  };

  function newGame() {
    console.log("New Game");
    for (var i = 1; i < 10; i++) {
      var reset = '#' + (i);
      $(reset).html('');
    };
    $('h1').html("Tic Tac Toe");

    board = ["","","","","","","","",""];
    playSingle = [];
    playPairs = [];
    compSingle = [];
    compPairs = [];
    victor = undefined;
    person = "X";
    play = "X";
    computer = "O";
    comp = "O"
    count = 0;
  };

  function resetMatch() {
    console.log("Reset");
    for (var i = 1; i < 10; i++) {
      var reset = '#' + (i);
      $(reset).html('');
    };
    $('h1').html("Tic Tac Toe");
    $('#xscore').html('X Score: 0');
    $('#oscore').html('O Score: 0');

    board = ["","","","","","","","",""];
    playSingle = [];
    playPairs = [];
    compSingle = [];
    compPairs = [];
    victor = undefined;
    person = "X";
    play = "X";
    computer = "O";
    comp = "O"
    count = 0;
    xscore = 0;
    oscore = 0;
  };


  return {
    playComputer: playComputer
  }

})();


