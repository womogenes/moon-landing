// From https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet
export const verletStep = (pos, vel, accOf, dt) => {
  // accOf should be a function of position
  let ogAcc = accOf(pos);
  pos.add(Vector.mult(vel, dt));
  pos.add(Vector.mult(ogAcc, Math.pow(dt, 2) * 0.5));

  let nextAcc = accOf(pos);
  vel.add(Vector.mult(Vector.add(ogAcc, nextAcc), dt * 0.5));
};

export const labelAroundMoon = (label, loc) => {
  // Don't draw points in the moon
  if (loc.dist(moon.pos) < moon.radius) return;

  const screenPoint = spaceToScreen(loc);
  let screenX = screenPoint.x;
  let screenY = screenPoint.y;
  const { x, y } = loc;

  let xOffset, yOffset;
  let hAlign, vAlign;

  hAlign = x < moon.pos.x ? 'right' : 'left';
  vAlign = y < moon.pos.y ? 'bottom' : 'top';
  xOffset = -20 * Math.sign(moon.pos.x - x);
  yOffset = -20 * Math.sign(moon.pos.y - y);

  stroke('#fff');
  strokeWeight(6);
  point(screenX, screenY);

  fill('#fff');
  noStroke();
  textAlign(hAlign, vAlign);
  textSize(18);
  text(label, screenX + xOffset, screenY + yOffset);
};

export const screenToSpace = (arg1, arg2) => {
  let x, y;
  if (!arg2) {
    x = arg1.x;
    y = arg1.y;
  } else {
    x = arg1;
    y = arg2;
  }

  return {
    x: cam.x + (mouseX - width / 2) / cam.zoom,
    y: cam.y + (mouseY - height / 2) / cam.zoom,
  };
};

export const spaceToScreen = (arg1, arg2) => {
  let spaceX, spaceY;
  if (!arg2) {
    spaceX = arg1.x;
    spaceY = arg1.y;
  } else {
    spaceX = arg1;
    spaceY = arg2;
  }

  return {
    x: (spaceX - cam.x) * cam.zoom + width / 2,
    y: (spaceY - cam.y) * cam.zoom + height / 2,
  };
};
