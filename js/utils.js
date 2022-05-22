export const verletStep = (pos, prevPos, acc, dt) => {
  let vel = Vector.add(Vector.sub(pos, prevPos), Vector.mult(acc, dt * dt));

  prevPos.x = pos.x;
  prevPos.y = pos.y;
  pos.add(vel);
};

export const screenToSpace = (x, y) => {
  return {
    x: cam.x + (mouseX - width / 2) / cam.zoom,
    y: cam.y + (mouseY - height / 2) / cam.zoom,
  };
};
