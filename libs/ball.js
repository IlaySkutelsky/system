class Ball {
  constructor(x, y, id) {
    this.id = id
    this.x = x
    this.ogX = x
    this.y = y
    this.ogY = y
    this.sizeX = 20
    this.size = 20
    this.xController = new Controller({
      k_p: random(0.05, 0.15),
      k_i: random(0.005, 0.015),
      k_d: random(0.025, 0.075),
      dt: 1
    });
    this.xController.setTarget(this.ogX)
    this.yController = new Controller({
      k_p: random(0.05, 0.15),
      k_i: random(0.005, 0.015),
      k_d: random(0.025, 0.075),
      dt: 1
    });
    this.yController.setTarget(this.ogY)
    this.alive = true
  }

  update() {
    this.size += sin(this.id + frameCount*0.01)*0.1
    let xCorrection = this.xController.update(this.x);
    let yCorrection = this.yController.update(this.y);
    this.x += xCorrection + yCorrection*0.5
    this.y += yCorrection + xCorrection*0.5
    // if ((Math.abs(this.x)+Math.abs(this.y))<0.1) {
    //   this.alive = false
    // }
  }

  mouseIsInBall() {
    let d = dist(mouseX, mouseY, this.x, this.y)
    return d < this.size  
  }

  applyMovement(x, y) {
    this.x += x
    this.y += y
  }

  draw() {
    circle(this.x, this.y, this.size)
  }
}