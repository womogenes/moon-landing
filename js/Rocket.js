/*
  Some arbitrary rocket
  This is where physics stuff comes in!
 */

import { labelAroundMoon, spaceToScreen, verletStep } from './utils.js';

export class Rocket {
  constructor(pos, vel, heading, mass, fuel) {
    this.pos = pos;
    this.vel = vel;

    this.heading = heading;
    this.mass = mass;
    this.fuel = fuel;

    this.throttle = 0.5;
    this.engineOn = false;

    this.path = [];
    this.periapsis = null;
    this.apoapsis = null;
  }

  display() {
    if (this.engineOn && this.throttle > 0) {
      beginShape('lines');
      noStroke();
      fill('#ff0000');
      vertex(-12, 0);
      vertex(-5, 4);
      vertex(-5, -4);
      endShape('close');
    }

    beginShape('lines');
    noStroke();
    fill('#fff');
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
    let engineAcc = this.engineOn
      ? Vector.fromAngle(this.heading).mult(0.01 * this.throttle * dt)
      : new Vector(0, 0);

    verletStep(
      this.pos,
      this.vel,
      function (pos) {
        return moon.accOn(pos).add(engineAcc);
      },
      dt
    );

    /*
      Orbit analysis!
      This is super haphazard, will improve later
        - https://space.stackexchange.com/questions/1904/how-to-programmatically-calculate-orbital-elements-using-position-velocity-vecto
        - https://space.stackexchange.com/questions/8911/determining-orbital-position-at-a-future-point-in-time
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
    let b = a * Math.s;

    let nu = Math.acos(eVec.dot(rVec) / (e * r)); // True anomaly
    if (rVec.dot(vVec) < 0) {
      nu = Math.PI * 2 - nu;
    }
    let direction = Math.sign(vVec.cross(rVec).z); // -1 for clockwise, 1 for counterclockwise
    let apsis = Vector.sub(this.pos, moon.pos)
      .rotate(direction * nu)
      .normalize();

    // Integrate to find flight path
    // Use velocity Verlet (non-reversible)
    let curPos = this.pos.copy();
    let curVel = this.vel.copy();
    let prevPos = this.pos.copy();

    this.path = [this.pos.copy()];
    let i = 0;
    let angle = 0;
    let terminateNext = false;

    while (i < 2e5) {
      // Limit is to prevent an infinite loop
      // i < 2e4 && (i < 10 || this.pos.dist(curPos) > 2000)) {
      verletStep(
        curPos,
        curVel,
        function (pos) {
          return moon.accOn(pos);
        },
        100
      );
      this.path.push(curPos.copy());

      if (terminateNext) {
        break;
      }

      angle += Math.abs(
        Vector.sub(curPos, moon.pos).angleBetween(Vector.sub(prevPos, moon.pos))
      );
      if (angle >= Math.PI * 2) {
        this.path.pop();
        this.path.push(this.pos.copy());
        break;
      }

      prevPos = curPos.copy();
      i++;

      // Into the moon
      if (moon.pos.dist(curPos) < moon.radius) {
        terminateNext = true;
      }
    }

    if (e >= 1) {
      // Weird parabolic or hyperbolic orbits; can't deal with this now
      this.periapsis = null;
      this.apoapsis = null;
      return;
    }

    // Find the periapsis
    this.periapsis = Vector.mult(apsis, a * (1 - e));
    this.apoapsis = Vector.mult(apsis, -a * (1 + e));
  }
}
