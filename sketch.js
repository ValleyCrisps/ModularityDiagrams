const width = 800
const height = 800
const radius = 300
const modulus = 700
const factor = 11

let points, path, loops

function setup() {
  createCanvas(width, height)
  points = computePointCoordinates(modulus, radius)
  loops = computeLoops(modulus, factor)
  // console.log(loops)
}

function draw() {
  // move origin to center
  translate(width / 2, height / 2)
  // flip y-axis so it points upwards
  // scale(1, -1);
  rotate(-PI / 2)
  circle(0, 0, 2 * radius)

  // draw points on circle
  for (let i = 0; i < modulus; i++) {
    // point(x, y)
    circle(points[i].x, points[i].y, 5)
    // text(`${i}`, points[i].x, points[i].y)
  }
  // draw lines
  loops.forEach((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      const start = points[path[i]]
      const end = points[path[i + 1]]
      arrow(start, end)
    }
  })
}

function computePointCoordinates(modulus, radius) {
  const points = {}
  for (let i = 0; i < modulus; i++) {
    const x = radius * Math.cos((2 * Math.PI * i) / modulus)
    const y = radius * Math.sin((2 * Math.PI * i) / modulus)
    points[i] = { x, y }
  }
  return points
}

function computeLoops(modulus, factor) {
  let loops = [[0]]
  let visited = [0]
  let start = 1
  function computeSingleLoop(modulus, start, factor) {
    // throw if factor is 1 or 0
    let loop = [start]
    let next = (start * factor) % modulus
    while (!loop.includes(next)) {
      loop.push(next)
      next = (next * factor) % modulus
    }
    visited = visited.concat(loop)
    loop.push(next)
    return loop
  }
  while (visited.length < modulus) {
    if (!visited.includes(start)) {
      const loop = computeSingleLoop(modulus, start, factor)
      loops.push(loop)
    }
    start++
  }
  return loops
}

function arrow(start, end) {
  // start, end  of type {x, y}
  line(start.x, start.y, end.x, end.y)
  // ???
}
