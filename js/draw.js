import { keys } from './keys.js';
import { screenToSpace, spaceToScreen } from './utils.js';

const draw = () => {
  // Camera and input updates

  // Update some numbers _after_ drawing
  rocket.update(timewarp);

  cam.update();
  keys();

  // Draw world
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(cam.zoom);
  translate(-cam.x, -cam.y);

  fill('#fff');
  noStroke();
  moon.display();
  fill('#ffffff20');
  ellipse(0, 0, moon.radius, moon.radius);

  push();
  translate(rocket.pos.x, rocket.pos.y);
  scale(1 / cam.zoom);
  rocket.display();
  pop();

  ellipse(rocket.pos.x, rocket.pos.y, 1, 1);

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

  // Draw rocket path
  beginShape('lines');
  noFill();
  stroke('#ffffff80');
  strokeWeight(3);
  let curRocketPos = spaceToScreen(rocket.pos);
  curveVertex(curRocketPos.x, curRocketPos.y);
  for (let point of rocket.path) {
    point = spaceToScreen(point);
    curveVertex(point.x, point.y);
  }
  endShape();

  // Apses
  strokeWeight(6);

  let periapsis = spaceToScreen(rocket.periapsis);
  point(periapsis.x, periapsis.y);

  // Draw text and other info
  textAlign('left', 'top');
  fill('#fff');
  noStroke();
  textSize(24);
  text(`Zoom: ${cam.zoom}`, 10, 10);
  text(`Timewarp: ${timewarp}`, 10, 40);
};

export { draw };
