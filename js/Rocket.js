/*
  Some arbitrary rocket
  This is where physics stuff comes in!
 */

import { verletStep } from './utils.js';

export class Rocket {
  constructor(pos, vel, heading, mass, fuel) {
    this.pos = pos;
    this.heading = heading;
    this.mass = mass;
    this.fuel = fuel;

    this.accelerating = false;

    // Verlet stuff
    this.prevPos = Vector.sub(pos, vel);
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

  update(dt) {
    // Small timesteps
    let n = dt;
    for (let i = 0; i < n; i++) {
      let acc = moon.accOn(this.pos, this.mass);
      verletStep(this.pos, this.prevPos, acc, 1);
    }

    // Look into the future
    let original = this.pos.copy();
    let p = this.pos.copy();
    let pp = this.prevPos.copy();
    let steps = 0;

    this.path = [];
    for (let i = 0; i < 10000; i++) {
      let acc = moon.accOn(p, this.mass);
      verletStep(p, pp, acc, 1);
      this.path.push(p.copy());
    }
  }
}
