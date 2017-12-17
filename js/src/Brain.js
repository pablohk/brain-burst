/*  Brain Object.
    Inherits from Movable and takes the Brain's constructor as default
   - id: Brain element identifier.
   - img: Background image of this brain. All Brains have same image.
*/
function Brain(x, y, width, height,level) {
  Movable.call(this, x, y, width, height,level);
  this.img = "../media/img/brain.jpg";
}

Brain.prototype = Object.create(Movable.prototype);
Brain.prototype.constructor = Brain;

Brain.prototype.moveLeft = function(pattern,brains) {
  if (this.canMoveLeft(pattern, brains)) {
    this.x--;
    return true;
  } else return false;
};

Brain.prototype.moveRight = function(pattern,brains) {
  if (this.canMoveRight(pattern,brains)) {
    this.x++;
    return true;
  } else return false;
};

Brain.prototype.moveTop = function(pattern,brains) {
  if (this.canMoveTop(pattern,brains)) {
    this.y--;
    return true;
  } else return false;
};

Brain.prototype.moveBottom = function(pattern,brains) {
  if (this.canMoveBottom(pattern,brains)) {
    this.y++;
    return true;
  } else return false;
};


Brain.prototype.canMoveLeft = function(pattern,brains) {
  var nextTo = false; // Eval if this brain is next to(left) other brain;
  brains.forEach(function(brain) {
    if(this!= brain && this.x - 1 == brain.x && this.y == brain.y){
      console.log("-----");
      nextTo = true;
    }
  },this);
  if (nextTo) {
    return false;
  } else
    return !pattern[this.y][this.x - 1] ? true : false;
};

Brain.prototype.canMoveRight = function(pattern,brains) {
  var nextTo = false; // Eval if this brain is next to(Right) other brain;
  brains.forEach(function(brain) {
    if(this!= brain && this.x + 1 == brain.x && this.y == brain.y){
      nextTo = true;
    }
  },this);
  if (nextTo) {
    return false;
  } else
  return !pattern[this.y][this.x + 1] ? true : false;
};

Brain.prototype.canMoveTop = function(pattern,brains) {
  var nextTo = false; // Eval if this brain is next to(Top) other brain;
  brains.forEach(function(brain) {
    if(this!= brain && this.y - 1 == brain.y && this.x == brain.x){
      nextTo = true;
    }
  },this);
  if (nextTo) {
    return false;
  } else
    return !pattern[this.y - 1][this.x] ? true : false;
};

Brain.prototype.canMoveBottom = function(pattern,brains) {
  var nextTo = false; // Eval if this brain is next to(Bottom) other brain;
  brains.forEach(function(brain) {
    if(this!= brain && this.y + 1 == brain.y && this.x == brain.x){
      nextTo = true;
    }
  },this);
  if (nextTo) {
    return false;
  } else
  return !pattern[this.y + 1][this.x] ? true : false;
};
