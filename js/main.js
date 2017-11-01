$(document).ready(function() {
  (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
  })();

  // Prepare the canvas layout
  var canvas = document.getElementById('one-player');
  var ctx = canvas.getContext('2d');

  // Get the canvas width and eight declared in the html tag
  var width = $('#one-player').width();
  var height = $('#one-player').height();

  // Instancie  new pattern object
  var grid = new Grid();

  // Instance new broad object
  var board = new Board(width, height, "#000", grid);

  // Instance new Zombie object
  var zombie = new Zombie(2, 1, board.gapX(), board.gapY(), "time");

  // Instance new brains
  var brains = [new Brain(3, 2, board.gapX(), board.gapY(), 1),
    new Brain(2, 5, board.gapX(), board.gapY(), 2),
    new Brain(5, 6, board.gapX(), board.gapY(), 2),
  ];

  // Instance new Trashes
  var trashes = [new Trash(1, 4, board.gapX(), board.gapY()),
    new Trash(1, 5, board.gapX(), board.gapY()),
    new Trash(1, 6, board.gapX(), board.gapY())
  ];

  function startGame() {
    //console.log("---In startGame");
    window.requestAnimationFrame(paintCanvas);
    listenKeyDown();
  }

  function paintCanvas() {
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
          img.onload=function(){
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
    var img;
    if (Array.isArray(element)) {
      element.forEach(function(e) {
        img = new Image();
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
      window.requestAnimationFrame(paintCanvas);
    };
  };

  // Call the win() function continuously
  var intervalID = setInterval(function(){
      //window.requestAnimationFrame(paintCanvas);
      win();
  }, 0.5 * 1000);

  // Eval if all the brains are places in the trashes and then the game finsih
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

// Start the game when the user press the star button
/*document.getElementById("start-game").onclick = function() {
  startGame();
};*/
startGame();

  //-----------------------------------------------------
  //END
});
