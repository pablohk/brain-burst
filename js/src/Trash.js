function Trash(x,y,width,height){
  Fixed.call(this,x,y,width,height);
  this.img='./media/img/trash.png';
  this.id="Trash";
}
Trash.prototype=Object.create(Fixed.prototype);
Trash.prototype.constructor=Trash;
