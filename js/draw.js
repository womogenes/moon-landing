import { keys } from './keys.js';
import { labelAroundMoon, screenToSpace, spaceToScreen } from './utils.js';

const draw = () => {
  // Camera and input updates

  cam.update();
  keys();

  // Draw world
  background(0);

  // Update some numbers
  rocket.update(timewarp);

  push();
  translate(width / 2, height / 2);
  scale(cam.zoom);
  translate(-cam.x, -cam.y);

  // Draw rocket flight path
  beginShape('lines');
  noFill();
  stroke('#ffffff80');
  strokeWeight(3 / cam.zoom);
  curveVertex(rocket.pos.x, rocket.pos.y);
  for (let p of rocket.path) {
    curveVertex(p.x, p.y);
  }
  endShape();

  fill('#fff');
  noStroke();
  moon.display();
  fill('#ffffff30');
  ellipse(0, 0, moon.radius, moon.radius);

  push();
  translate(rocket.pos.x, rocket.pos.y);
  scale(1 / cam.zoom);
  rotate(rocket.heading);
  rocket.display();
  pop();

  ellipse(rocket.pos.x, rocket.pos.y, 10, 10);

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

  // Apses
  if (cam.zoom > 3e-5 && rocket.periapsis) {
    point(rocket.periapsis.x, rocket.periapsis.y);
    point(rocket.apoapsis.x, rocket.apoapsis.y);

    labelAroundMoon(
      `${nf(moon.altitude(rocket.periapsis), 0, 1)} m`,
      rocket.periapsis
    );
    labelAroundMoon(
      `${nf(moon.altitude(rocket.apoapsis), 0, 1)} m`,
      rocket.apoapsis
    );
  }

  // Draw text and other info
  textAlign('left', 'top');
  fill('#fff');
  noStroke();
  textSize(24);
  text(`Zoom: ${nf(cam.zoom, 0, 10)}`, 20, 20);
  text(`Timewarp: ${timewarp}x`, 20, 50);
  text(
    `Position: ${nf(rocket.pos.x, 0, 3)}, ${nf(rocket.pos.y, 0, 3)}`,
    20,
    80
  );
  text(
    `Altitude: ${nf(rocket.pos.dist(moon.pos) - moon.radius, 0, 2)} m`,
    20,
    110
  );

  textAlign('right', 'top');
  text(`Throttle: ${nf(rocket.throttle * 100, 0, 1)}%`, width - 20, 20);
  text(`Engine ${rocket.engineOn ? 'on' : 'off'}`, width - 20, 50);
};

export { draw };
