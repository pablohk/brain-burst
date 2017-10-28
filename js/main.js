$(document).ready(function() {
  var canvas = document.getElementById('player-one');
  var ctx = canvas.getContext('2d');
  var width = $('#player-one').width();
  var height = $('#player-one').height();
  var board = new Board(width, height, "black");
  board.fillGrid();
  document.getElementById("start-game").onclick = function() {
    startGame();
  };

  window.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        //player.moveLeft();
        console.log("move left");
        break;
      case 38:
        //player.moveTop();
        console.log("move top");
        break;
      case 39:
        //player.moveRigth();
        console.log("move right");
        break;

      case 40:
        //player.moveDown();
        console.log("move down");
        break;
      default:
    }
    //updateCanvas();
  };


  function startGame() {

    drawBoard();
  }

  function drawBoard() {
    ctx.fillStile = board.color;
    ctx.fillRect(0, 0, board.width, board.height);
    drawWall();
    //drawObstacle();
  }

  function drawWall() {
      _.forEach(board.grid, function(row) {
      _.forEach(row, function(colum) {
        if (colum) {
          var brick = new Image();
          brick.onload = function() {
            ctx.drawImage(brick, colum.x, colum.y, colum.width, colum.height);
          };
          brick.src = colum.img;
        }
      });
    });
  }





  //END
});
