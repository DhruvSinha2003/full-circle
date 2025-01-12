class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  sub(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }
  div(n) {
    return new Vector(this.x / n, this.y / n);
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
