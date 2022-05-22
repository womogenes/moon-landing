// Here's a moon ig

export class Moon {
  constructor(radius, mass, color) {
    this.radius = radius;
    this.mass = mass;
    this.color = color;
    this.pos = new Vector(0, 0);
    this.mu = G * this.mass;

    // Generate some boundary
    let octaves = 10;
    let falloff = 0.7;
    let scale = (1 - Math.pow(falloff, octaves)) / (1 - falloff);

    noiseDetail(octaves, falloff);
    this.vertices = [];
    let n = 10000;
    let detail = 10;

    for (let i = 0; i < n; i++) {
      let angle = (2 * Math.PI * i) / n;

      let sample =
        noise(
          Math.cos(angle) * detail + 1e9,
          Math.sin(angle) * detail + 1e9,
          0
        ) / scale;
      let curRad = this.radius + (sample - 0.5) * this.radius * 0.01;

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

  accOn(pos) {
    // Calculate the acceleration exerted on another body
    let mag = (G * this.mass) / Vector.sub(this.pos, pos).magSq();
    return Vector.mult(Vector.sub(this.pos, pos).normalize(), mag);
  }
}
