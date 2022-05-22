// Keyboard inputs

window.keyPressed = () => {
  switch (keyCode) {
    case 70: // F
      if (cam.following) {
        cam.following = null;
      } else {
        cam.following = rocket.pos;
      }
      break;

    case 37: // Left arrow
      if (timewarp > 1) timewarp *= 0.5;
      break;

    case 39: // Right arrow
      if (timewarp < 128) timewarp *= 2;
      break;

    case 48: // 0
      cam.toX = 0;
      cam.toY = 0;
      cam.toZoom = (width / moon.radius) * 0.2;
  }
};

// Camera panning
export const keys = () => {
  if (!keyIsPressed) return;
  let panSpeed = 5 / cam.zoom;
  let zoomSpeed = 0.05;

  if (keyIsDown(87)) {
    // W
    cam.toY -= panSpeed;
  }
  if (keyIsDown(65)) {
    // A
    cam.toX -= panSpeed;
  }
  if (keyIsDown(83)) {
    //S
    cam.toY += panSpeed;
  }
  if (keyIsDown(68)) {
    //D
    cam.toX += panSpeed;
  }

  if (keyIsDown(90)) {
    // Z
    cam.toZoom /= zoomSpeed + 1;
  }
  if (keyIsDown(88)) {
    // X
    cam.toZoom *= zoomSpeed + 1;
  }
};
