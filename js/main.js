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
        if (player.x - 1 == brain.x && player.y == brain.y) {
          if (brain.canMoveLeft(grid.pattern)) {
            brain.moveLeft(grid.pattern);
            player.moveLeft(grid.pattern);
          }
        } else {
          player.moveLeft(grid.pattern);
        }
        break;

      case 38:
        console.log("move top");
        if (player.y -1 == brain.y && player.x == brain.x) {
          if (brain.canMoveTop(grid.pattern)) {
            brain.moveTop(grid.pattern);
            player.moveTop(grid.pattern);
          }
        } else {
          player.moveTop(grid.pattern);
        }
        break;

      case 39:
        console.log("move right");
        if (player.x + 1 == brain.x && player.y == brain.y) {
          if (brain.canMoveRight(grid.pattern)) {
            brain.moveRight(grid.pattern);
            player.moveRight(grid.pattern);
          }
        } else {
          player.moveRight(grid.pattern);
        }
        break;

      case 40:
        console.log("move bottom");
        if (player.y + 1 == brain.y && player.x == brain.x) {
          if (brain.canMoveBottom(grid.pattern)) {
            brain.moveBottom(grid.pattern);
            player.moveBottom(grid.pattern);
          }
        } else {
          player.moveBottom(grid.pattern);
        }
        break;
      default:
    }
  };


  function startGame() {
    var intervalID = setInterval(updateCanvas, 0.1 * 1000);
    //updateCanvas();
  }

  function drawBoard() {
    ctx.fillStile = board.color;
    ctx.fillRect(0, 0, board.width, board.height);
    //drawObstacle();
  }

  function drawWall() {
    var imgBrick = new Image();
    var brick = new Brick();
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
    $('#x').html(player.x);
    $('#y').html(player.y);
    drawBoard();
    drawWall();
    drawBrain();
    drawPlayer();

  }

  //END
});
