class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.bodies = [];
    this.gravity = new Vector(0, 0.5);
    this.mousePos = new Vector(0, 0);
    this.isDragging = false;
    this.dragBody = null;

    this.setupMouseEvents();
  }

  update() {
    for (let body of this.bodies) {
      body.acc = body.acc.add(this.gravity);
      body.update();
      body.checkBounds(this.canvas.width, this.canvas.height);
    }

    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        this.bodies[i].collideWith(this.bodies[j]);
      }
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

  setupMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);

      if (e.shiftKey) {
        // Create new body on shift+click
        const body = new Body(
          this.mousePos.x,
          this.mousePos.y,
          10 + Math.random() * 20
        );
        body.vel = new Vector(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        this.addBody(body);
      } else {
        // Start dragging closest body
        this.startDragging();
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const newMousePos = new Vector(
        e.clientX - rect.left,
        e.clientY - rect.top
      );

      if (this.isDragging && this.dragBody) {
        const delta = newMousePos.sub(this.mousePos);
        this.dragBody.pos = this.dragBody.pos.add(delta);
        this.dragBody.vel = delta;
      }

      this.mousePos = newMousePos;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.dragBody = null;
    });
  }

  startDragging() {
    let closestBody = null;
    let closestDist = Infinity;

    for (let body of this.bodies) {
      const dist = body.pos.sub(this.mousePos).mag();
      if (dist < closestDist) {
        closestDist = dist;
        closestBody = body;
      }
    }

    if (closestDist < 50) {
      this.isDragging = true;
      this.dragBody = closestBody;
    }
  }
}
