import p5 from "p5";

const WIDTH = 720;
const HEIGHT = 720;
const NODE_OFFSET = 10;
const NOISE_FAC = 0.006;
const ZOFF = 0.001;
const TIERS = [0.2, 0.4, 0.6, 0.8];
const MAX_VAL = 0.05;
const MAX_RADIUS = 10;

/** @type {(p: p5) => void} */
export default (p) => {
  let zoff = 0;
  let nodes = [];

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = null;
    }

    update() {
      let val = p.noise(this.x * NOISE_FAC, this.y * NOISE_FAC, zoff);
      let min = Math.min(...TIERS.map((t) => Math.abs(val - t)));
      if (min > MAX_VAL) {
        return this.r = 0;
      }
      let closest = p.constrain(
        MAX_VAL - min,
        0,
        MAX_VAL
      );
      this.r = p.map(closest, 0, MAX_VAL, 0, MAX_RADIUS);
    }

    draw() {
      p.noStroke();
      p.fill(245);
      p.circle(this.x, this.y, this.r);
    }
  }

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background(10);

    for (let x = 0; x < WIDTH + NODE_OFFSET; x += NODE_OFFSET) {
      for (let y = 0; y < HEIGHT + NODE_OFFSET; y += NODE_OFFSET) {
        nodes.push(new Node(x, y));
      }
    }
  };

  p.draw = () => {
    p.background(p.color(10, 100))

    for (let node of nodes) {
      node.update();
      node.draw();
    }

    zoff += ZOFF;
  };
};
