/*  Zombie Object.
    Inherits from Movable and takes the Zombie's constructor as default
   - id: Zombie element identifier.
   - img: Background image of this Zombie.
*/
function Zombie(x,y,width,height) {
  Movable.call(this,x,y,width,height);
  this.img = "./media/img/player.png";
  this.id="Zombie";
}
Zombie.prototype=Object.create(Movable.prototype);
Zombie.prototype.constructor=Zombie;
