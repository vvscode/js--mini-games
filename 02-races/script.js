var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');

var canvasHeight = canvas.height;
var canvasWidth = canvas.width;
var carHeight = 40;
var carWidth = 10;
var carBottomGap = 10;
var carColor = 'green';

var boxColor = 'blue';
var boxHeight = 10;
var boxWidth = 10;

function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function Car(x, y) { this.x = x; this.y = y; }
Car.prototype.draw = function(x, y) {
  x = x === undefined ? this.x : x;
  y = y === undefined ? this.y : y;
  return drawRect(x, y, carWidth, carHeight, carColor);
};

function Box(x, y) { this.x = x; this.y = y; }
Box.prototype.draw = function(x, y) {
  x = x === undefined ? this.x : x;
  y = y === undefined ? this.y : y;
  return drawRect(x, y, boxWidth, boxHeight, boxColor);
};

var car = new Car(canvasWidth / 2, canvasHeight - carHeight - carBottomGap);
car.draw();

var boxes = "x".repeat(40).split('').map(() => new Box(Math.random()*canvasWidth - boxWidth, Math.random()*canvasHeight - boxHeight));
boxes.forEach((box) => box.draw());