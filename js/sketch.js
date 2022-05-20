import { draw } from './draw.js';
import { Cam } from './Cam.js';
import { Moon } from './Moon.js';
import { Rocket } from './Rocket.js';
import './mouse.js';

// Globals
window.Vector = p5.Vector;
window.G = 6e5;

window.setup = () => {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('#sketch-container'));
  pixelDensity(1);
  ellipseMode('center');

  window.moon = new Moon(1.73734e6, 7.3459e22, '#888888');
  window.cam = new Cam(0, 0, (width / moon.radius) * 0.2, 0.5, 0.5); // Probably want to move this into config file later

  window.rocket = new Rocket(
    new Vector(moon.radius + 2000e3, 0),
    new Vector(0, -60),
    -Math.PI / 2,
    25000,
    20000
  );
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
