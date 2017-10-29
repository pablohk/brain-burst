function Fixed(x,y,width,height){
  GameElements.call(this,x,y,width,height);
}
Fixed.prototype=Object.create(GameElements.prototype);
Fixed.prototype.constructor=Fixed;
