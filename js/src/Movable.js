function Movable(x,y,width,height){
  GameElements.call(this,x,y,width,height);
}

Movable.prototype.constructor=Object.create(GameElements.prototype);
Movable.prototype.constructor= Movable;

Movable.prototype.moveLeft = function(pattern) {
  if (this.canMoveLeft(pattern)) {
    this.x--;
  }
};

Movable.prototype.moveRight = function(pattern) {
  if (this.canMoveRight(pattern)) {
    this.x++;
  }
};

Movable.prototype.moveTop = function(pattern) {
  if (this.canMoveTop(pattern)) {
    this.y--;
  }
};

Movable.prototype.moveBottom = function(pattern) {
  if (this.canMoveBottom(pattern)) {
    this.y++;
  }
};

Movable.prototype.canMoveLeft = function(pattern) {
  return !pattern[this.y][this.x - 1] ? true : false;
};

Movable.prototype.canMoveRight = function(pattern) {
  return !pattern[this.y][this.x + 1] ? true : false;
};

Movable.prototype.canMoveTop = function(pattern) {
  return !pattern[this.y-1][this.x] ? true : false;
};

Movable.prototype.canMoveBottom = function(pattern) {
  return !pattern[this.y+1][this.x] ? true : false;
};
