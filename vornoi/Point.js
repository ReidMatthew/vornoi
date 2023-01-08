class Point {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.color = [random(255), random(255), random(255)];
  }  

  show() {
    stroke(this.color)
    fill(this.color)
    circle(this.x, this.y, this.r)
  }
}