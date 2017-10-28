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

  // Instance a new brain
  var brain=new Brain(5*gap.x, 5*gap.y, gap.x,gap.y, "brain");

  document.getElementById("start-game").onclick = function() {
    startGame();
  };

  window.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        player.moveLeft(gap);
        console.log("move left");
        break;
      case 38:
        player.moveTop(gap);
        console.log("move top");
        break;
      case 39:
        player.moveRight(gap);
        console.log("move right");
        break;

      case 40:
        player.moveBottom(gap);
        console.log("move bottom");
        break;
      default:
    }
    updateCanvas();
  };


  function startGame() {
  drawBoard();
  drawPlayer();
  drawBrain();
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

  function drawBrain() {
    var imgBrain = new Image();
    imgBrain.onload = function() {
      ctx.drawImage(imgBrain, brain.x, brain.y, brain.width, brain.height);
    };
    imgBrain.src = brain.img;
  }


  function clearCanvas() {}

  function updateCanvas() {
    drawBoard();
    drawPlayer();
    drawBrain();
  }
  console.log(board.grid);


  //END
});
