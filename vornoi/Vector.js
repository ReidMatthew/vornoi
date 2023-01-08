class Vector {
  constructor(x, y, r = 5) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = [random(255), random(255), random(255)];
  }

  show() {
    stroke(this.color);
    fill(this.color);
    circle(this.x, this.y, this.r);
  }

  lerp(v, split = .5) {
    return new Vector((this.x + v.x) * split, (this.y + v.y) * split);
  }

  distanceTo(v) {
    return Math.sqrt(Math.pow(v.x - this.x, 2) + Math.pow(v.y - this.y, 2));
  }

  slopeWith(v) {
    return (v.y - this.y) / (v.x - this.x);
  }

  static invertSlope(m) {
    return -1 / m;
  }
}