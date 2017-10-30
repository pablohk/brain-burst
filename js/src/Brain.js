/*  Brain Object.
    Inherits from Movable and takes the Brain's constructor as default
   - id: Brain element identifier.
   - img: Background image of this brain. All Brains have same image.
*/
function Brain(x,y,width,height,id) {
  Movable.call(this,x,y,width,height);
  this.img = "./media/img/brain.jpg";
  this.id=id;
}

Brain.prototype = Object.create(Movable.prototype);
Brain.prototype.constructor = Brain;
