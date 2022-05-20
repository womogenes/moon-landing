export const verletStep = (pos, prevPos, acc, dt) => {
  let vel = Vector.add(Vector.sub(pos, prevPos), Vector.mult(acc, dt * dt));

  prevPos.x = pos.x;
  prevPos.y = pos.y;
  pos.add(vel);
};
