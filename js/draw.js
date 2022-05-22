import { keys } from './keys.js';

const draw = () => {
  // Camera and input updates
  cam.update();
  keys();

  // Update some numbers
  rocket.update(10);

  cam.x = rocket.pos.x;
  cam.y = rocket.pos.y;

  // Draw world
  background(0);
  translate(width / 2, height / 2);

  push();

  scale(cam.zoom);
  translate(-cam.x, -cam.y);

  fill('#fff');
  stroke('#888');

  moon.display();

  push();
  translate(rocket.pos.x, rocket.pos.y);
  scale(1 / cam.zoom);
  rocket.display();
  pop();

  /*
  Draw a grid

  strokeWeight(10);
  line(0, -height / 2, 0, height / 2);
  strokeWeight(1);
  for (let x = 50; x <= width / 2; x += 50) {
    line(x, -height / 2, x, height / 2);
  }
  for (let x = -50; x >= -width / 2; x -= 50) {
    line(x, -height / 2, x, height / 2);
  }

  strokeWeight(10);
  line(-width / 2, 0, width / 2, 0);
  strokeWeight(1);
  for (let y = 50; y <= height / 2; y += 50) {
    line(-width / 2, y, width / 2, y);
  }
  for (let y = -50; y >= -height / 2; y -= 50) {
    line(-width / 2, y, width / 2, y);
  } */

  pop();

  // Draw text and other info
  textAlign('left', 'top');
  fill('#fff');
  noStroke();
  textSize(24);
  text(`Zoom: ${cam.zoom}`, -width / 2 + 10, -height / 2 + 10);
};

export { draw };
