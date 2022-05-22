export class Cam {
  constructor(x, y, zoom, dPan, dZoom) {
    this.x = x;
    this.y = y;
    this.toX = x;
    this.toY = y;

    this.zoom = zoom;
    this.toZoom = zoom;

    this.following = null;
  }

  mousePressed(mouseX, mouseY) {
    this.xOffset = mouseX - this.x;
    this.yOffset = mouseY - this.y;
  }

  mouseDragged(mouseX, mouseY) {
    this.toX = mouseX - this.xOffset;
    this.toY = mouseY - this.yOffset;
  }

  mouseWheel(mouseX, mouseY, delta, speed) {
    if (delta < 0) {
      this.toZoom *= speed + 1;
    } else {
      this.toZoom /= speed + 1;
    }
  }

  update() {
    if (this.following !== null) {
      this.x = this.following.x;
      this.y = this.following.y;
      this.toX = this.x;
      this.toY = this.y;
    } else {
      this.x = lerp(this.x, this.toX, 0.1);
      this.y = lerp(this.y, this.toY, 0.1);
    }
    this.zoom = lerp(this.zoom, this.toZoom, 0.1);
  }
}
