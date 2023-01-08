class Vector {
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = [random(255), random(255), random(255)];
  }

  show(f = this.color, s = "black", r = this.r) {
    fill(f);
    stroke(s);
    if (f === "noFill") noFill();
    circle(this.x, this.y, r);
  }

  lerp(v, split = .5) {
    return new Vector((this.x + v.x) * split, (this.y + v.y) * split);
  }

  distanceTo(v) {
    return Vector.distance(this, v);
  }

  slopeWith(v) {
    return Vector.slope(this, v);
  }

  static distance(v1, v2) {
    return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2))
  }

  static slope(v1, v2) {
    return (v2.y - v1.y) / (v2.x - v1.x)
  }

  static invertSlope(m) {
    return -1 / m;
  }
}