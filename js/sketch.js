import { draw } from './draw.js';
import { Cam } from './Cam.js';
import { Moon } from './Moon.js';
import { Rocket } from './Rocket.js';
import './mouse.js';

// Globals
window.Vector = p5.Vector;
window.G = 6.6743e-11;
window.timewarp = 1;

window.setup = () => {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('#sketch-container'));
  pixelDensity(1);
  smooth();
  ellipseMode('center');
  ellipseMode('radius');
  textFont('Inconsolata');

  window.moon = new Moon(2e4, 1e16, '#888');
  window.cam = new Cam(0, 0, (width / moon.radius) * 0.2, 0.5, 0.5); // Probably want to move this into config file later

  let initRocketPos = new Vector(moon.radius + 10e3, 0);
  let rocketVel = Math.sqrt(
    moon.accOn(initRocketPos).mag() * Vector.sub(moon.pos, initRocketPos).mag()
  );
  window.rocket = new Rocket(
    initRocketPos,
    new Vector(0, -rocketVel),
    Math.PI / 2,
    25000,
    20000
  );
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
