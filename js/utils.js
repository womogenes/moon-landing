// From https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet
export const verletStep = (pos, vel, acc, dt) => {
  pos.add(Vector.mult(vel, dt));
  pos.add(Vector.mult(acc, Math.pow(dt, 2) * 0.5));

  let nextAcc = moon.accOn(pos);

  vel.add(Vector.mult(Vector.add(acc, nextAcc), dt * 0.5));
};

export const screenToSpace = (x, y) => {
  return {
    x: cam.x + (mouseX - width / 2) / cam.zoom,
    y: cam.y + (mouseY - height / 2) / cam.zoom,
  };
};
