export class Cam {
  constructor(x, y, zoom, dPan, dZoom) {
    this.x = x;
    this.y = y;
    this.toX = x;
    this.toY = y;
    this.dPan = dPan;

    this.zoom = zoom;
    this.toZoom = zoom;
    this.dZoom = dZoom;
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
      this.toX -= speed * (mouseX - this.toX);
      this.toY -= speed * (mouseY - this.toY);
      this.toZoom *= speed + 1;
    } else {
      this.toX += (speed / (speed + 1)) * (mouseX - this.toX);
      this.toY += (speed / (speed + 1)) * (mouseY - this.toY);
      this.toZoom /= speed + 1;
    }
  }

  update() {
    this.x = lerp(this.x, this.toX, 0.1);
    this.y = lerp(this.y, this.toY, 0.1);
    this.zoom = lerp(this.zoom, this.toZoom, 0.1);
  }
}
