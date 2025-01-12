const canvas = document.getElementById("world");
canvas.width = 800;
canvas.height = 600;

const world = new World(canvas);

for (let i = 0; i < 10; i++) {
  let body = new Body(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    10 + Math.random() * 20
  );
  body.vel = new Vector((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
  world.addBody(body);
}
function gameLoop() {
  world.update();
  world.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
