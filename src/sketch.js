import p5 from "p5";

const WIDTH = 720;
const HEIGHT = 720;
const NODE_OFFSET = 90;
const NOISE_FAC = 0.001;
const ZOFF = 0.005;
const TIERS = [0.4, 0.6, 0.8];
const MAX_VAL = 0.05;
const MAX_RADIUS = 90;

/** @type {(p: p5) => void} */
export default (p) => {
  let zoff = 0;
  let nodes = [];

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = null;
      this.val = null;
    }

    update() {
      this.val = p.noise(this.x * NOISE_FAC, this.y * NOISE_FAC, zoff);
      let min = Math.min(...TIERS.map((t) => Math.abs(this.val - t)));
      if (min > MAX_VAL) {
        return (this.r = 0);
      }
      let closest = p.constrain(Math.abs(MAX_VAL - min), 0, MAX_VAL);
      this.r = p.map(closest, 0, MAX_VAL, 0, MAX_RADIUS);
    }

    draw() {
      if (!this.r) { return; }
      p.colorMode(p5.RGB);
      p.noFill();
      let max = 1 - TIERS[0];
      let diff = p.constrain(this.val - TIERS[0], 0, max);
      p.stroke(
        p.map(diff, 0, max, 30, 240),
        p.map(diff, 0, max, 240, 240),
        p.map(diff, 0, max, 80, 240)
      );
      p.circle(this.x, this.y, this.r);
    }
  }

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background(10, 50, 90);

    for (let x = 0; x < WIDTH + NODE_OFFSET; x += NODE_OFFSET) {
      for (let y = 0; y < HEIGHT + NODE_OFFSET; y += NODE_OFFSET) {
        nodes.push(new Node(x, y));
      }
    }
  };

  p.draw = () => {
    if (p.frameCount % 2 === 0) {
      p.background(10, 50, 90, 140);
    }

    for (let node of nodes) {
      node.update();
      if (p.frameCount % 2 === 0) {
        node.draw();
      }
    }

    zoff += ZOFF;
  };
};
