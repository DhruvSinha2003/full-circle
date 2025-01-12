const canvas = document.getElementById("world");
canvas.width = 800;
canvas.height = 600;

const world = new World(canvas);

world.addBody(new Body(400, 100, 20));
let b2 = new Body(300, 200, 15);
b2.vel = new Vector(5, -2);
world.addBody(b2);

function gameLoop() {
  world.update();
  world.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
