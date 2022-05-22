/*
  Some arbitrary rocket
  This is where physics stuff comes in!
 */

import { Cam } from './Cam.js';
import { spaceToScreen, verletStep } from './utils.js';

export class Rocket {
  constructor(pos, vel, heading, mass, fuel) {
    this.pos = pos;
    this.vel = vel;

    this.heading = heading;
    this.mass = mass;
    this.fuel = fuel;

    this.accelerating = false;

    this.path = [];
    this.periapsis = null;
    this.apoapsis = null;
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

    // Don't do orbit analysis :P
    // Just integrate!
    let curPos = this.pos.copy();
    let curVel = this.vel.copy();

    this.path = [this.pos.copy()];
    for (let i = 0; i < 210; i++) {
      verletStep(curPos, curVel, moon.accOn(curPos), 50);
      this.path.push(curPos.copy());
    }

    // Find apses
    let minAlt = Infinity;
    let maxAlt = 0;
    for (let point of this.path) {
      let curAlt = point.dist(moon.pos);
      if (curAlt < minAlt) {
        minAlt = curAlt;
        this.periapsis = point;
      } else if (curAlt > maxAlt) {
        maxAlt = curAlt;
        this.apoapsis = point;
      }
    }
  }
}
