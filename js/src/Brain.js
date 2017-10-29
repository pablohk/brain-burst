function Brain(x,y,width, height,id){
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;
  this.img= "./media/img/brain.jpg";
  this.id=id;
}

Brain.prototype.moveLeft = function(pattern) {
  if (this.canMoveLeft(pattern)) {
    this.x--;
  }
};

Brain.prototype.moveRight = function(pattern) {
  if (this.canMoveRight(pattern)) {
    this.x++;
  }
};

Brain.prototype.moveTop = function(pattern) {
  if (this.canMoveTop(pattern)) {
    this.y--;
  }
};

Brain.prototype.moveBottom = function(pattern) {
  if (this.canMoveBottom(pattern)) {
    this.y++;
  }
};

Brain.prototype.canMoveLeft = function(pattern) {
  return !pattern[this.y][this.x - 1] ? true : false;
};

Brain.prototype.canMoveRight = function(pattern) {
  return !pattern[this.y][this.x + 1] ? true : false;
};

Brain.prototype.canMoveTop = function(pattern) {
  return !pattern[this.y-1][this.x] ? true : false;
};

Brain.prototype.canMoveBottom = function(pattern) {
  return !pattern[this.y+1][this.x] ? true : false;
};
