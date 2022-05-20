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
      cam.toX += panSpeed;
      return;
    case 83: // S
      cam.toY -= panSpeed;
      return;
    case 68: // D
      cam.toX -= panSpeed;
      return;

    case 90: // Z
      cam.mouseWheel(mouseX, mouseY, 1, zoomSpeed);
      return;
    case 88:
      cam.mouseWheel(mouseX, mouseY, -1, zoomSpeed);
      return;
  }
};
