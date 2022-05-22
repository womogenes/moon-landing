export class Cam {
  constructor(x, y, zoom, dPan, dZoom) {
    this.x = x;
    this.y = y;
    this.toX = x;
    this.toY = y;

    this.zoom = zoom;
    this.toZoom = zoom;
  }

  mousePressed(mouseX, mouseY) {
    return;

    this.xOffset = mouseX - this.x;
    this.yOffset = mouseY - this.y;
  }

  mouseDragged(mouseX, mouseY) {
    return;

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

  update() {}
}
