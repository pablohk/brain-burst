$(document).ready(function() {
  // Prepare the canvas layout
  var canvas = document.getElementById('player-one');
  var ctx = canvas.getContext('2d');

  // Get the canvas width and height declared in the html tag
  var width = $('#player-one').width();
  var height = $('#player-one').height();

  // Instance a new broad object
  var board = new Board(width, height, "black");

  // fill the board with brick to define the map
  var gap = board.fillGrid();

  // Instance a new player object
  var player = new Player(2 * gap.x, 5 * gap.y, gap.x, gap.y, "time", "peper");

  console.log(gap);
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
    drawPlayer();
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
          var imgBrick = new Image();
          imgBrick.onload = function() {
            ctx.drawImage(imgBrick, colum.x, colum.y, colum.width, colum.height);
          };
          imgBrick.src = colum.img;
        }
      });
    });
  }

  function drawPlayer() {
    var imgPlayer = new Image();
    imgPlayer.onload = function() {
      ctx.drawImage(imgPlayer, player.x, player.y, player.width, player.height);
    };
    imgPlayer.src = player.img;
  }

  console.log(board.grid);


  //END
});
