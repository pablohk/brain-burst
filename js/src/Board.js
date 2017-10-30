function Board(width, height,img,grid) {
Fixed.call(this,null,null,width,height);
  this.img = img;
  this.grid=grid;
}
Board.prototype=Object.create(Fixed.prototype);
Board.prototype.constructor=Board;

Board.prototype.gapX=function(){
  return Math.round(this.width/this.grid.cellsX());
};

Board.prototype.gapY=function(){
  return Math.round(this.height/this.grid.cellsY());
};
