const width = 800
const height = 800
const radius = 300
const n = 7
const factor = 11

let points, path

const computePoints = (n, radius) => {
  const points ={}
  for(let i= 0; i< n; i++){
    const x = radius * Math.cos(2* Math.PI *i/n)
    const y = radius * Math.sin(2* Math.PI*i/n)
    points[i] ={x,y}
  }
  return points
}

const computePathArray = (n, factor) =>{
  // throw if factor is 1 or 0
  let path = [1]
  let next = factor % n 
  while (!path.includes(next)) {
    path.push(next)
    next = (next * factor ) % n
  }
  path.push(next)
  return path
}


function setup() {
  createCanvas(width, height)
  // setCenter(width/2, height/2)
  points = computePoints(n, radius)
  path = computePathArray(n, factor)
}

function draw() {
  // move origin to center
  translate(width/2, height/2)
  // flip y-axis so it points upwards
  // scale(1, -1);
  rotate(-PI/2)
  circle(0, 0, 2*radius)
  
  // draw points on circle
  for(let i= 0; i< n; i++){
    // point(x, y)
    circle(points[i].x, points[i].y, 5)
    text(`${i}`,  points[i].x, points[i].y)
  }
  // draw lines
  for (let i = 0; i<path.length -1; i ++) {
    const start = points[path[i]]
    const end = points[path[i+1]]
    line(start.x, start.y, end.x, end.y)
  }
}






