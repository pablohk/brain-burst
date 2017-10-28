function Player (x,y,width,height,time,id){
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;
  this.img="./media/img/player.png";
  this.time=time;
  this.id=id;
}

Player.prototype.moveLeft =function (gap){
  this.x-=gap.x;
};
Player.prototype.moveRight =function (gap){
  this.x+=gap.x;
};

Player.prototype.moveTop =function (gap){
  this.y-=gap.y;
};
Player.prototype.moveBottom =function (gap){
  this.y+=gap.y;
};
