var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');

var canvasBackgroundColor = document.querySelector('canvas').style.backgroundColor;
var canvasHeight = canvas.height;
var canvasWidth = canvas.width;
var carHeight = 40;
var carWidth = 10;
var carBottomGap = 10;
var carColor = 'green';

var boxColor = 'blue';
var boxHeight = 10;
var boxWidth = 10;

var boxes = [];
var car;
var level;
var steps = 1;
var interval;

function Car(x, y) { this.x = x; this.y = y; }
Car.prototype.draw = function(x, y) {
  x = x === undefined ? this.x : x;
  y = y === undefined ? this.y : y;
  return drawRect(x, y, carWidth, carHeight, carColor);
};

Car.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
};

Car.prototype.isInside = function(box) {
  const boxLeft = box.x;
  const boxTop = box.y;
  return (boxLeft > (this.x - boxWidth) && boxLeft < (this.x + carWidth))
      && (boxTop  > (this.y - boxHeight) && boxTop < (this.y + carHeight));
};

function Box(x, y) { this.x = x; this.y = y; this.stepSize = boxHeight / 2; }
Box.prototype.draw = function(x, y) {
  x = x === undefined ? this.x : x;
  y = y === undefined ? this.y : y;
  drawRect(x, y, boxWidth, boxHeight, boxColor);
  return this;
};
Box.prototype.moveDown = function() {
  this.y = this.y + this.stepSize;
  return this;
};

function clearCanvas() {
  context.fillStyle = canvasBackgroundColor;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

car = new Car(canvasWidth / 2, canvasHeight - carHeight - carBottomGap);

function addBox() {
  boxes.push(new Box(Math.random()*canvasWidth - boxWidth, -boxHeight));
}

function nextStep() {
  clearCanvas();
  car.draw();
  boxes.forEach((item) => item.moveDown().draw());
}

function stopInterval() {
  clearInterval(interval);
}

function isCrash(car, boxes) {
  return boxes.some((box) => car.isInside(box));
}

function startInterval() {
  stopInterval();
  interval = setInterval(() => {
    steps++;
    if((Math.random() * 1000) < steps) {
      addBox();
    }
    nextStep();
    boxes = boxes.filter((item) => item.y < canvasHeight);
    if(isCrash(car, boxes)) {
      stopInterval();
      alert(`You are crashed. You pass ${steps} iterations`);
    }
  }, 50);
}

document.querySelector('#stop').addEventListener('click', stopInterval);
document.querySelector('#start').addEventListener('click', () => {
  boxes = [];
  steps = 0;
  startInterval();
});
document.querySelector('canvas').addEventListener('mousemove', (ev) => {
  const newX = ev.offsetX - carWidth / 2;
  const moveToX = newX < 0 ? 0 : (newX > (canvasWidth - carWidth)) ? (canvasWidth - carWidth) : newX;
  car.move(moveToX, car.y);
});