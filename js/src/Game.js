const LEVELS = 4;

function Game(level) {
  this.level = level;
  this.ctx = document.getElementById('one-player').getContext('2d');
  this.width = $('#one-player').width();
  this.height = $('#one-player').height();
  this.player = new Player("IronHack");
  this.grid;
  this.board;
  this.zombie;
  this.brains;
  this.trashes;
  this.intervalID;
}

Game.prototype = Object.create(Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.startGame = function() {
  this.player.clock.reset();
  this.loadLevelsElements();
  this.player.clock.start();
  this.player.movements = 0;
};

Game.prototype.paintCanvas = function() {
  this.clearCanvas();
  this.prepareBoard(); // Must be the first in paint
  this.paintElement(this.trashes); // Must be the second in paint
  this.paintElement(this.zombie); // Must be the thirth in paint
  this.paintElement(this.brains); // Must be the fourth in paint
};

Game.prototype.prepareBoard = function() {
  var img;
  this.board.grid.pattern.forEach(function(eY, indexY) {
    eY.forEach(function(eX, indexX) {
      if (eX) {
        img = new Image();
        img.src = this.board.img;
        this.ctx.drawImage(img, indexX * this.board.gapX(), indexY * this.board.gapY(), this.board.gapX(), this.board.gapY());
      }
    }, this);
  }, this);
};

Game.prototype.paintElement = function(element) {
  var img;
  if (Array.isArray(element)) {
    element.forEach(function(e) {
      img = new Image();
      img.src = e.img;
      this.ctx.drawImage(img, e.x * this.board.gapX(), e.y * this.board.gapY(), e.width, e.height);
    }, this);
  } else {
    img = new Image();
    img.src = element.img;
    this.ctx.drawImage(img, element.x * this.board.gapX(), element.y * this.board.gapY(), element.width, element.height);
  }
};

Game.prototype.clearCanvas = function() {
  this.ctx.fillStyle = '#000';
  this.ctx.fillRect(0, 0, this.width, this.height);
};

// Eval if all the brains are places in the trashes and then the game finsih
Game.prototype.win = function() {
  var success = true;
  this.trashes.forEach(function(trash) {
    trash.isFull(this.brains);
    success *= trash.status;
  }, this);

  if (success) {
    if (this.level < LEVELS) {
      this.level++;
      this.startGame();
    } else {
      clearInterval(this.intervalID);
      this.player.clock.stop();
      console.log("WIIIINN");
      $('#win').addClass("win-image");
    }
  }
};

Game.prototype.loadLevelsElements = function() {
  this.grid = new Grid(this.level);
  this.board = new Board(this.width, this.height, "#000", this.grid);
  switch (this.level) {
    case 1:
      this.zombie = new Zombie(2, 2, this.board.gapX(), this.board.gapY());
      this.brains = [new Brain(3, 2, this.board.gapX(), this.board.gapY()),
        new Brain(3, 5, this.board.gapX(), this.board.gapY()),
        new Brain(5, 6, this.board.gapX(), this.board.gapY())
      ];
      this.trashes = [new Trash(1, 4, this.board.gapX(), this.board.gapY()),
        new Trash(1, 5, this.board.gapX(), this.board.gapY()),
        new Trash(1, 6, this.board.gapX(), this.board.gapY())
      ];
      break;

    case 2:
      this.zombie = new Zombie(4, 4, this.board.gapX(), this.board.gapY());
      this.brains = [new Brain(3, 3, this.board.gapX(), this.board.gapY()),
        new Brain(3, 4, this.board.gapX(), this.board.gapY()),
        new Brain(4, 5, this.board.gapX(), this.board.gapY()),
        new Brain(5, 3, this.board.gapX(), this.board.gapY())
      ];
      this.trashes = [new Trash(1, 4, this.board.gapX(), this.board.gapY()),
        new Trash(3, 1, this.board.gapX(), this.board.gapY()),
        new Trash(4, 6, this.board.gapX(), this.board.gapY()),
        new Trash(6, 3, this.board.gapX(), this.board.gapY())
      ];
      break;
    case 3:
      this.zombie = new Zombie(8, 2, this.board.gapX(), this.board.gapY());
      this.brains = [new Brain(3, 4, this.board.gapX(), this.board.gapY()),
        new Brain(5, 4, this.board.gapX(), this.board.gapY()),
        new Brain(7, 4, this.board.gapX(), this.board.gapY()),
        new Brain(4, 4, this.board.gapX(), this.board.gapY()),
        new Brain(4, 6, this.board.gapX(), this.board.gapY())
      ];
      this.trashes = [new Trash(1, 7, this.board.gapX(), this.board.gapY()),
        new Trash(2, 7, this.board.gapX(), this.board.gapY()),
        new Trash(3, 7, this.board.gapX(), this.board.gapY()),
        new Trash(4, 7, this.board.gapX(), this.board.gapY()),
        new Trash(5, 7, this.board.gapX(), this.board.gapY())
      ];
      break;
    case 4:
      this.zombie = new Zombie(2, 4, this.board.gapX(), this.board.gapY());
      this.brains = [new Brain(2, 3, this.board.gapX(), this.board.gapY()),
        new Brain(4, 4, this.board.gapX(), this.board.gapY()),
        new Brain(7, 4, this.board.gapX(), this.board.gapY()),
        new Brain(6, 5, this.board.gapX(), this.board.gapY())
      ];
      this.trashes = [new Trash(2, 5, this.board.gapX(), this.board.gapY()),
        new Trash(3, 5, this.board.gapX(), this.board.gapY()),
        new Trash(2, 6, this.board.gapX(), this.board.gapY()),
        new Trash(3, 6, this.board.gapX(), this.board.gapY())
      ];
  }
};
