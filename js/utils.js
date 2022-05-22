// From https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet
export const verletStep = (pos, vel, acc, dt) => {
  pos.add(Vector.mult(vel, dt));
  pos.add(Vector.mult(acc, Math.pow(dt, 2) * 0.5));

  let nextAcc = moon.accOn(pos);

  vel.add(Vector.mult(Vector.add(acc, nextAcc), dt * 0.5));
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
