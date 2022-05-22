// Keyboard inputs

// Camera panning
export const keys = () => {
  if (!keyIsPressed) return;
  let panSpeed = 5;
  let zoomSpeed = 0.05;

  switch (keyCode) {
    case 87: // W
      cam.toY += panSpeed;
      return;
    case 65: // A
      rocket.toX -= panSpeed;
      return;
    case 83: // S
      cam.toY -= panSpeed;
      return;
    case 68: // D
      rocket.toX += panSpeed;
      return;

    case 90: // Z
      cam.toZoom /= zoomSpeed + 1;
      return;
    case 88: // X
      cam.toZoom *= zoomSpeed + 1;
      return;
  }
};
