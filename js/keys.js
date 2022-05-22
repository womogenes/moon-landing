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

    case 188: // ,
      if (timewarp > 1 / 1024) timewarp *= 0.5;
      break;

    case 190: // .
      if (timewarp < 128) timewarp *= 2;
      break;

    case 48:
    case 27: // 0
      cam.toX = 0;
      cam.toY = 0;
      cam.toZoom = (width / moon.radius) * 0.2;
      cam.following = null;
      break;

    case 32: // Space
      rocket.engineOn = !rocket.engineOn;
      break;
  }
};

// Camera panning
export const keys = () => {
  if (!keyIsPressed) return;
  let panSpeed = 5 / cam.zoom;
  let zoomSpeed = 0.05;

  // Camera controls
  if (keyIsDown(87)) {
    // W
    cam.toY -= panSpeed;
  }
  if (keyIsDown(65)) {
    // A
    cam.toX -= panSpeed;
  }
  if (keyIsDown(83)) {
    // S
    cam.toY += panSpeed;
  }
  if (keyIsDown(68)) {
    // D
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

  let turnSpeed = 0.01;

  // Rocket controls
  if (keyIsDown(38)) {
    // Up arrow
    rocket.throttle = min(1, rocket.throttle + turnSpeed);
  }

  if (keyIsDown(40)) {
    // Down arrow
    rocket.throttle = max(0, rocket.throttle - turnSpeed);
  }

  if (keyIsDown(37)) {
    // Left arrow
    rocket.heading -= 0.01;
  }

  if (keyIsDown(39)) {
    // Right arrow
    rocket.heading += 0.01;
  }
};
