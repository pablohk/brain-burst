/*  Player Object.
    Inherits from Movable and takes the Player's constructor as default
   - id: Player element identifier.
   - img: Background image of this Player.
*/
function Player(x,y,width,height,time) {
  Movable.call(this,x,y,width,height);
  this.img = "./media/img/player.png";
  this.id="Player";
  this.time=time;
}
Player.prototype=Object.create(Movable.prototype);
Player.prototype.constructor=Player;
