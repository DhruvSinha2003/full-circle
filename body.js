class Body {
  constructor(x, y, radius) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.radius = radius;
    this.mass = radius;
    this.bounce = 0.8;
  }

  collideWith(other) {
    const distance = this.pos.sub(other.pos).mag();
    const minDist = this.radius + other.radius;

    if (distance < minDist) {
      const normal = this.pos.sub(other.pos).normalize();

      const relativeVel = this.vel.sub(other.vel);

      const restitution = 0.8;
      const impulseMag =
        (-(1 + restitution) * relativeVel.dot(normal)) /
        (1 / this.mass + 1 / other.mass);

      this.vel = this.vel.add(normal.mult(impulseMag / this.mass));
      other.vel = other.vel.sub(normal.mult(impulseMag / other.mass));

      // Separate the circles
      const correction = normal.mult((minDist - distance) * 0.5);
      this.pos = this.pos.add(correction);
      other.pos = other.pos.sub(correction);
    }
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
