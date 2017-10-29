// x and y are the index of grid, not pixels of canvas
function Player(x, y, width, height, time, id) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.time = time;
  this.id = id;
  this.img = "./media/img/player.png";
}

Player.prototype.moveLeft = function(pattern) {
  if (this.canMoveLeft(pattern)) {
    this.x--;
  }
};

Player.prototype.moveRight = function(pattern) {
  if (this.canMoveRight(pattern)) {
    this.x++;
  }
};

Player.prototype.moveTop = function(pattern) {
  if (this.canMoveTop(pattern)) {
    this.y--;
  }
};

Player.prototype.moveBottom = function(pattern) {
  if (this.canMoveBottom(pattern)) {
    this.y++;
  }
};

Player.prototype.canMoveLeft = function(pattern) {
  return !pattern[this.y][this.x - 1] ? true : false;
};

Player.prototype.canMoveRight = function(pattern) {
  return !pattern[this.y][this.x + 1] ? true : false;
};

Player.prototype.canMoveTop = function(pattern) {
  return !pattern[this.y-1][this.x] ? true : false;
};

Player.prototype.canMoveBottom = function(pattern) {
  return !pattern[this.y+1][this.x] ? true : false;
};
