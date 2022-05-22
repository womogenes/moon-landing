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

    /*
      Orbit analysis!
      This is super haphazard, will improve later
        - https://space.stackexchange.com/questions/1904/how-to-programmatically-calculate-orbital-elements-using-position-velocity-vecto
        https://space.stackexchange.com/questions/8911/determining-orbital-position-at-a-future-point-in-time
    */
    let rVec = Vector.sub(this.pos, moon.pos);
    let vVec = this.vel;

    let v = vVec.mag();
    let r = Vector.sub(this.pos, moon.pos).mag();

    let eVec = Vector.sub(
      Vector.mult(rVec, v * v - moon.mu / r),
      Vector.mult(vVec, rVec.dot(vVec))
    ).div(moon.mu);

    let e = eVec.mag();
    let E = (v * v) / 2 - moon.mu / r; // Specific mechanical energy
    let a = -moon.mu / (2 * E); // Semi-major axis
    let b = a * Math.sqrt(1 - e * e); // Semi-minor axis

    if (e >= 1) {
      // Weird parabolic or hyperbolic orbits; can't deal with this now
      return;
    }

    let nu = Math.acos(eVec.dot(rVec) / (e * r));
    if (rVec.dot(vVec) < 0) {
      nu = Math.PI * 2 - nu;
    }

    // Find the periapsis ig
    let apsis = Vector.sub(this.pos, moon.pos).rotate(-nu).normalize();
    this.periapsis = Vector.mult(apsis, a * (1 - e));
    this.apoapsis = Vector.mult(apsis, -a * (1 + e));

    // Now integrate to find flight path
    // Use velocity Verlet (non-reversible)
    let curPos = this.pos.copy();
    let curVel = this.vel.copy();

    this.path = [this.pos.copy()];
    for (let i = 0; i < 210; i++) {
      verletStep(curPos, curVel, moon.accOn(curPos), 50);
      this.path.push(curPos.copy());
    }
  }
}
