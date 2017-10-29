function Board(width, height,img,grid) {
  this.width = width;
  this.height = height;
  this.img = img;
  this.grid=grid;
}

Board.prototype.gapX=function(){
  return Math.round(this.width/this.grid.cellsX());
};

Board.prototype.gapY=function(){
  return Math.round(this.height/this.grid.cellsY());
};
