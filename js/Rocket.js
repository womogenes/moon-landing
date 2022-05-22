/*
  Some arbitrary rocket
  This is where physics stuff comes in!
 */

import { verletStep } from './utils.js';

export class Rocket {
  constructor(pos, vel, heading, mass, fuel) {
    this.pos = pos;
    this.vel = vel;

    this.heading = heading;
    this.mass = mass;
    this.fuel = fuel;

    this.accelerating = false;
  }

  display() {
    fill('#fff');
    noStroke();
    beginShape('lines');
    vertex(8, 0);
    vertex(-5, 5);
    vertex(-5, -5);
    endShape('close');
  }

  getAcc() {
    // Get current acceleration
    return moon.accOn(this.pos); // Just gravity for now; will include engines and stuff later
  }

  update(dt) {
    // Small timesteps
    verletStep(this.pos, this.vel, this.getAcc(), dt);
  }
}
