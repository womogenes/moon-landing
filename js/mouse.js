// Remember to import this file!

window.mouseDragged = () => {
  cam.mouseDragged(mouseX, mouseY);
};

window.mousePressed = () => {
  cam.mousePressed(mouseX, mouseY);
};

window.mouseWheel = (event) => {
  cam.mouseWheel(mouseX, mouseY, event.delta, 0.5);
};
