let balls
let gap = 40;

let lastMoveframe = 0;
let timeBeforeReset = 10

function setup() {
  createCanvas(600,700)
  resetBalls()
  stroke(0, 120)
  // pixelDensity(10.0)
}

function draw() {
  // background(255, 10)
  for (let i=0; i<balls.length; i++) {
    let ball = balls[i]
    ball.update()
    ball.draw()
  }

  if (lastMoveframe) {
    let delta = frameCount-lastMoveframe
    if (delta>(30*timeBeforeReset)) {
      resetBalls()
      clear()
      timeBeforeReset = random(10, 20)
      lastMoveframe = 0
    }
  }
}

function mouseMoved(event) {
  lastMoveframe = frameCount
  let {movementX, movementY} = event
  for (let i=0; i<balls.length; i++) {
    let ball = balls[i]
    let d = dist(mouseX, mouseY, ball.x, ball.y)
    if (d < 100) {
      let factor = 30/d
      factor *= factor
      factor = Math.min(Math.max(factor, 0), 1)
      ball.applyMovement(-movementX*factor, -movementY*factor)
    }
  }
}

function resetBalls() {
  let id = 0
  balls = []
  for (let i=0; i<10; i++) {
    for (let j=0; j<15.; j++) {
      balls.push(new Ball(getX(i), getY(j), id))
      id++
    }
  }
}

function getX(i) {
  return i*gap+110
}

function getY(i) {
  return i*gap+60
}

function keyTyped(event) {
  if (key === 'S' && event.shiftKey) {
    console.log("happened");
    saveCanvas('myCanvas', 'png');
  } else if (key === 'P' && event.shiftKey) {
    console.log("timeBeforeReset");
    timeBeforeReset = 600
  }
}
