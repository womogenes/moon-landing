import { keys } from './keys.js';

const draw = () => {
  // Camera and input updates
  cam.update();
  keys();

  cam.x = -rocket.pos.x * cam.zoom + width / 2;
  cam.y = -rocket.pos.y * cam.zoom + width / 2;

  // Update some numbers
  rocket.update(1000);

  // Draw world
  background(16);
  push();
  translate(cam.x, cam.y);
  scale(cam.zoom);

  moon.display();

  // Draw the rocket's path
  noFill();
  strokeWeight(2 / cam.zoom);
  stroke('#ffffff');
  beginShape('lines');
  for (let point of rocket.path) {
    vertex(point.x, point.y);
  }
  endShape();

  // Draw the rocket
  push();
  translate(rocket.pos.x, rocket.pos.y);
  scale(1 / cam.zoom);
  rotate(rocket.heading);
  rocket.display();
  pop();

  pop();

  // Draw text and other info
  textAlign('left', 'top');
  fill('#fff');
  noStroke();
  textSize(24);
  text(`Zoom: ${nf(cam.zoom, 1, 10)}`, 10, 10);
};

export { draw };
