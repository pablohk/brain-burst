function Trash(x, y, width, height) {
  Fixed.call(this, x, y, width, height);
  this.img = '../media/img/trash.jpg';
  this.id = "Trash";
  this.status = false; // if a brain is on this trash, status change to true
}
Trash.prototype = Object.create(Fixed.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.isFull = function(brains) {
  for (var i = 0; i < brains.length; i++) {
    if (this.x == brains[i].x && this.y == brains[i].y) {
      this.status = true;break;
    } else {
      this.status = false;
    }
  }
};
