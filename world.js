class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.bodies = [];
    this.gravity = new Vector(0, 0.5);
  }

  update() {
    for (let body of this.bodies) {
      body.acc = body.acc.add(this.gravity);
      body.update();
      body.checkBounds(this.canvas.width, this.canvas.height);
    }
  }

  addBody(body) {
    this.bodies.push(body);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let body of this.bodies) {
      this.ctx.beginPath();
      this.ctx.arc(body.pos.x, body.pos.y, body.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}
