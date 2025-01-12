class Body {
  constructor(x, y, radius) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.radius = radius;
    this.mass = radius;
    this.bounce = 0.8;
  }

  update() {
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);
    this.acc = new Vector(0, 0);
  }

  checkBounds(width, height) {
    if (this.pos.y + this.radius > height) {
      this.pos.y = height - this.radius;
      this.vel.y = -this.vel.y * this.bounce;
    }
    if (this.pos.y - this.radius < 0) {
      this.pos.y = this.radius;
      this.vel.y = -this.vel.y * this.bounce;
    }
    if (this.pos.x + this.radius > width) {
      this.pos.x = width - this.radius;
      this.vel.x = -this.vel.x * this.bounce;
    }
    if (this.pos.x - this.radius < 0) {
      this.pos.x = this.radius;
      this.vel.x = -this.vel.x * this.bounce;
    }
  }
}
