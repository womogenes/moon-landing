import { draw } from './draw.js';
import { Cam } from './Cam.js';
import { Moon } from './Moon.js';
import { Rocket } from './Rocket.js';
import './mouse.js';

// Globals
window.Vector = p5.Vector;
window.G = 6e-11;

window.setup = () => {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('#sketch-container'));
  pixelDensity(1);
  ellipseMode('center');
  textFont('Inconsolata');

  window.moon = new Moon(1.73734e6, 7.3459e22, '#888888');
  window.cam = new Cam(0, 0, (width / moon.radius) * 0.2, 0.5, 0.5); // Probably want to move this into config file later

  let initRocketPos = new Vector(moon.radius, 0);
  let rocketVel = Math.sqrt(moon.accOn(initRocketPos).mag() * moon.radius);
  window.rocket = new Rocket(
    initRocketPos,
    new Vector(0, -rocketVel),
    -Math.PI / 2,
    25000,
    20000
  );
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
