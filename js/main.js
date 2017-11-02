$(document).ready(function() {
  (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  var game =new Game();
  game.startGame();

  document.getElementById("reset").addEventListener("click", function() {
  location.reload();
  });

  document.getElementById("back").addEventListener("click", function() {
  location.href = "../index.html";
  });


  window.onkeydown = function(e) {
    var nextTo = false; // Use to eval if the zombie is next to brain or no
    switch (e.keyCode) {
      case 37: // left
        console.log("move left");
        game.brains.forEach(function(brain) {
          if (game.zombie.x - 1 == brain.x && game.zombie.y == brain.y) {
            nextTo = true;
            if (brain.moveLeft(game.grid.pattern, game.brains)) {
              if (game.zombie.moveLeft(game.grid.pattern)) {
                game.player.movements++;
              }
            }
          }
        });
        if (!nextTo) {
          if (game.zombie.moveLeft(game.grid.pattern)) {
            game.player.movements++;
          }
        }
        break;

      case 38: // top
        console.log("move top");
        game.brains.forEach(function(brain) {
          if (game.zombie.y - 1 == brain.y && game.zombie.x == brain.x) {
            nextTo = true;
            if (brain.moveTop(game.grid.pattern, game.brains)) {
              if(game.zombie.moveTop(game.grid.pattern)){
                game.player.movements++;
              };
            }
          }
        });
        if (!nextTo) {
          if(game.zombie.moveTop(game.grid.pattern)){
            game.player.movements++;
          };
        }
        break;

      case 39: // rright
        console.log("move right");
        game.brains.forEach(function(brain) {
          if (game.zombie.x + 1 == brain.x && game.zombie.y == brain.y) {
            nextTo = true;
            if (brain.moveRight(game.grid.pattern, game.brains)) {
              if(game.zombie.moveRight(game.grid.pattern)){
                game.player.movements++;
              };
            }
          }
        });
        if (!nextTo) {
          if(game.zombie.moveRight(game.grid.pattern)){
            game.player.movements++;
          };
        }
        break;

      case 40: // bottom
        console.log("move bottom");
        game.brains.forEach(function(brain) {
          if (game.zombie.y + 1 == brain.y && game.zombie.x == brain.x) {
            nextTo = true;
            if (brain.moveBottom(game.grid.pattern, game.brains)) {
              if(game.zombie.moveBottom(game.grid.pattern)){
                game.player.movements++;
              };
            }
          }
        });
        if (!nextTo) {
          if(game.zombie.moveBottom(game.grid.pattern)){
            game.player.movements++;
          };
        }
        break;
      default:
    }
    window.requestAnimationFrame(game.paintCanvas.bind(game));
  };

  // Update the number of movements and check if the player win
  game.intervalID = setInterval(function() {
    $('#movement').text(game.player.movements);
    game.win();
  } ,0.02 * 1000);

  //-----------------------------------------------------
  //END
});
