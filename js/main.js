$(document).ready(function() {

  // Prepare the canvas layout
  var canvas = document.getElementById('player-one');
  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // Get the canvas width and height declared in the html tag
  var width = $('#player-one').width();
  var height = $('#player-one').height();

  // Instancie  new pattern object
  var grid = new Grid();

  // Instance new broad object
  var board = new Board(width, height, "#000", grid);

  // Instance new Zombie object
  var zombie = new Zombie(6, 4, board.gapX(), board.gapY(), "time");

  // Instance new brains
  var brains = [new Brain(6, 5, board.gapX(), board.gapY(), 1),
    new Brain(7, 5, board.gapX(), board.gapY(), 2)
  ];

  // Instance new Trashes
  var trashes = [new Trash(6, 8, board.gapX(), board.gapY()),
    new Trash(7, 8, board.gapX(), board.gapY())
  ];

  // Start the game when the user press the star button
  /*document.getElementById("start-game").onclick = function() {
    startGame();
  };*/
  startGame();

  function startGame() {
    //console.log("---In startGame");
    //clearCanvas();
    paintCanvas();
    listenKeyDown();
  }

  function paintCanvas() {
    //console.log("---In paintCanvas");
    $('#x').html("Coordenada Zombie X: " + zombie.x);
    $('#y').html("Coordenada Zombie Y: " + zombie.y);
    prepareBoard(); // Must be the first in paint
    paintElement(trashes); // Must be the second in paint
    paintElement(zombie); // Must be the thirth in paint
    paintElement(brains); // Must be the fourth in paint
  }

  function prepareBoard() {
    var img;
    grid.pattern.forEach(function(eY, indexY) {
      eY.forEach(function(eX, indexX) {
        if (eX) {
          img = new Image();
          var brick = new Brick(indexX * board.gapX(), indexY * board.gapY(), board.gapX(), board.gapY());
          img.onload = function() {
            ctx.drawImage(img, brick.x, brick.y, brick.width, brick.height);
          };
          img.src = brick.img;
        } else {
          ctx.fillStyle = 'black';
          ctx.fillRect(indexX * board.gapX(), indexY * board.gapY(), board.gapX(), board.gapY());
        }
      });
    });
  }

  function paintElement(element) {
    //console.log("---In prepareElement");
    //console.log(element);
    var img;
    if (Array.isArray(element)) {
      element.forEach(function(e) {
        img = new Image();
        //console.log("--prepareElement: forEach");
        //console.log(e);
        img.onload = function() {
          ctx.drawImage(img, e.x * board.gapX(), e.y * board.gapY(), e.width, e.height);
        };
        img.src = e.img;
      });
    } else {
      img = new Image();
      img.onload = function() {
        ctx.drawImage(img, element.x * board.gapX(), element.y * board.gapY(), element.width, element.height);
      };
      img.src = element.img;
    }
  }

  function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
  }

  // Listen key arrow action.
  function listenKeyDown() {
    window.onkeydown = function(e) {
      window.requestAnimationFrame(paintCanvas);
      var nextTo = false; // Use to eval if the zombie is next to brain or no
      switch (e.keyCode) {
        case 37: // left
          console.log("move left");
          brains.forEach(function(brain) {
            if (zombie.x - 1 == brain.x && zombie.y == brain.y) {
              nextTo = true;
              if (brain.moveLeft(grid.pattern, brains)) {
                zombie.moveLeft(grid.pattern);
              }
            }
          });
          if (!nextTo) {
            zombie.moveLeft(grid.pattern);
          }
          break;

        case 38: // top
          console.log("move top");
          brains.forEach(function(brain) {
            if (zombie.y - 1 == brain.y && zombie.x == brain.x) {
              nextTo = true;
              if (brain.moveTop(grid.pattern, brains)) {
                zombie.moveTop(grid.pattern);
              }
            }
          });
          if (!nextTo) {
            zombie.moveTop(grid.pattern);
          }
          break;

        case 39: // rright
          console.log("move right");
          brains.forEach(function(brain) {
            if (zombie.x + 1 == brain.x && zombie.y == brain.y) {
              nextTo = true;
              if (brain.moveRight(grid.pattern, brains)) {
                zombie.moveRight(grid.pattern);
              }
            }
          });
          if (!nextTo) {
            zombie.moveRight(grid.pattern);
          }
          break;

        case 40: // bottom
          console.log("move bottom");
          brains.forEach(function(brain) {
            if (zombie.y + 1 == brain.y && zombie.x == brain.x) {
              nextTo = true;
              if (brain.moveBottom(grid.pattern, brains)) {
                zombie.moveBottom(grid.pattern);
              }
            }
          });
          if (!nextTo) {
            zombie.moveBottom(grid.pattern);
          }
          break;
        default:
      }
    };
  };
  var intervalID = setInterval(win, 1 * 1000);

  function win() {
    var success=true;
    trashes.forEach(function (trash){
      trash.isFull(brains);
      success*=trash.status;
    });
    if (success){
    alert("FINN");
    clearInterval(intervalID);
    }
  }
  /*window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1*1000);
      };
  })();*/
  //-----------------------------------------------------
  //END
});
