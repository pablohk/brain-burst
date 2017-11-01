/*  Brick Object.
    Inherits from GameElements and takes the Brick's constructor as default
   - id: Brick element identifier.
   - img: Background image of this brick. All bricks have same image.
*/
function Brick(x,y,width,height) {
  Fixed.call(this,x,y,width,height);
  this.img = "../media/img/brick.jpg";
  this.id="Brick";
}

Brick.prototype = Object.create(Fixed.prototype);
Brick.prototype.constructor = Brick;
