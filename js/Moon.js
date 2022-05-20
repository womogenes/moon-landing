// Here's a moon ig

export class Moon {
  constructor(radius, mass, color) {
    this.radius = radius;
    this.mass = mass;
    this.color = color;
    this.pos = new Vector(0, 0);

    // Generate some boundary
    noiseDetail(10, 0.6);
    this.vertices = [];
    let n = 10000;
    let detail = 1;

    for (let i = 0; i < n; i++) {
      let angle = (2 * Math.PI * i) / n;

      let x = Math.cos(angle) * this.radius;
      let y = Math.sin(angle) * this.radius;
      let z = Math.sin(2 * angle) * this.radius;

      let curRad =
        this.radius * 0.9 +
        noise(
          Math.cos(angle) * detail + 1000,
          Math.sin(angle) * detail + 1000,
          0
        ) *
          this.radius *
          0.1;

      this.vertices.push([Math.cos(angle) * curRad, Math.sin(angle) * curRad]);
    }
  }

  display() {
    fill(this.color);

    beginShape('lines');
    for (let point of this.vertices) {
      vertex(this.pos.x + point[0], this.pos.y + point[1]);
    }
    endShape('close');
  }

  accOn(pos, mass) {
    // Calculate the acceleration exerted on another body
    let mag = (G * mass) / Vector.sub(this.pos, pos).magSq();
    return Vector.mult(Vector.sub(this.pos, pos).normalize(), mag);
  }
}
