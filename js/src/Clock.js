function Clock() {
  this.minDec = 0;
  this.minCen = 0;
  this.secDec = 0;
  this.secCen = 0;
  this.status = 0;
};

Clock.prototype.start = function() {
  this.status = setInterval(function() {
    this.runCount();
    this.paintingNumbers();
  }.bind(this), 1 * 1000);

};

Clock.prototype.stop = function() {
  clearInterval(this.status);
};

Clock.prototype.runCount = function() {
  this.secCen++;

  if (this.secCen > 9) {
    this.secDec++;
    this.secCen = 0;
  }
  if (this.secDec >= 6) {
    this.minCen++;
    this.secDec = 0;
  }
  if (this.minCen > 9) {
    this.minDec++;
    this.minCen = 0;
  }
  if (this.minDec >= 6) {
    this.minDec = 0;
    this.minCen = 0;
    this.secDec = 0;
    this.secCen = 0;
  }
};

Clock.prototype.paintingNumbers = function() {
  document.getElementById("clock-minDec").innerHTML = this.minDec;
  document.getElementById("clock-minCen").innerHTML = this.minCen;
  document.getElementById("clock-secDec").innerHTML = this.secDec;
  document.getElementById("clock-secCen").innerHTML = this.secCen;
};

Clock.prototype.reset = function() {
  this.nimDec = 0;
  this.minCen = 0;
  this.secDec = 0;
  this.secCen = 0;
};
