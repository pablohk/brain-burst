$(document).ready(function() {
  // Prepare the canvas layout
  var canvas = document.getElementById('player-one');
  var ctx = canvas.getContext('2d');

  // Get the canvas width and height declared in the html tag
  var width = $('#player-one').width();
  var height = $('#player-one').height();

  // Instancie  new pattern object
  var grid = new Grid();

  // Instance anew broad object
  var board = new Board(width, height, "black", grid);

  // Instance  new player object
  var player = new Player(2, 5, board.gapX(), board.gapY(), "time", "peper");
  // Instance  new brain
  var brain = new Brain(5, 5, board.gapX(), board.gapY(), "brain");

  // Start the game when the user press the star button
  document.getElementById("start-game").onclick = function() {
    startGame();
  };

  // Listen key arrow action
  window.onkeydown = function(e) {
    switch (e.keyCode) {

      case 37:
        console.log("move left");
        player.moveLeft(grid.pattern);
        break;

      case 38:
        console.log("move top");
        player.moveTop(grid.pattern);
        break;

      case 39:
        console.log("move right");
        player.moveRight(grid.pattern);
        break;

      case 40:
        console.log("move bottom");
        player.moveBottom(grid.pattern);
        break;
      default:
    }
    updateCanvas();
  };


  function startGame() {
    updateCanvas();
  }

  function drawBoard() {
    ctx.fillStile = board.color;
    ctx.fillRect(0, 0, board.width, board.height);
    //drawObstacle();
  }

  function drawWall() {
    var imgBrick = new Image();
    var brick=new Brick();
    imgBrick.src = brick.img;
    imgBrick.onload = function() {
      for (var y = 0; y < grid.cellsY(); y++) {
        for (var x = 0; x < grid.cellsX(); x++) {
          var bricka = new Brick(x * board.gapX(), y * board.gapY(), board.gapX(), board.gapY(), "brick[" + y + "," + x);
          if (grid.pattern[y][x]) {
            ctx.drawImage(imgBrick, bricka.x, bricka.y, bricka.width, bricka.height);
          }
        }
      }
    };

  }

  function drawPlayer() {
    var imgPlayer = new Image();
    imgPlayer.onload = function() {
      ctx.drawImage(imgPlayer, player.x * board.gapX(), player.y * board.gapY(), player.width, player.height);
    };
    imgPlayer.src = player.img;
  }

  function drawBrain() {
    var imgBrain = new Image();
    imgBrain.onload = function() {
      ctx.drawImage(imgBrain, brain.x * board.gapX(), brain.y * board.gapY(), brain.width, brain.height);
    };
    imgBrain.src = brain.img;
  }


  function clearCanvas() {}

  function updateCanvas() {
    drawBoard();
    drawWall();
    drawBrain();
    drawPlayer();

  }

  //END
});
