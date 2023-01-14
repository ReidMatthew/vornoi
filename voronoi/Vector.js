class Vector {
  /**
   * An ordered pair (x,y)
   * @param {Number} x "x" component of the Vector
   * @param {Number} y "y" component of the Vector
   * @param {Number} r Radius of the displayed point
   */
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = [random(255), random(255), random(255)];
    this.id = Vector.identify(this)
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

  compareWith(v) {
    return Vector.compare(this, v);
  }

  // how close two points' componets have to be to be considered the same point
  static tolerance = .00001;

  static compare(v1, v2) {
    return v1.id === v2.id;
  }

  static identify(v) {
    return `${Math.floor(v.x / Vector.tolerance)}-${Math.round(v.y / Vector.tolerance)}`;
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

  static sort(vArray) {
    return vArray.sort((a, b) => a.x - b.x).sort((a, b) => a.y - b.y);
  }
}