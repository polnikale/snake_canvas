const canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d');

let Snake = function(length, heightBlock, startPos) {
  this.snakeLength = length;
  this.heightBlock = heightBlock;
  this.x = startPos.x;
  this.y = startPos.y;
};
Snake.prototype.draw = function() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  for (let counter = 0; counter < this.snakeLength; counter++) {
    ctx.fillStyle = 'red';
    ctx.fillRect(counter*this.heightBlock+this.x,this.y,this.heightBlock,this.heightBlock);
  }
}
Snake.prototype.init = function() {
  this.draw();
  setInterval(() => {
    this.moveSnake(); //arrow function in order to protect scope
  }, 100);
};
Snake.prototype.moveSnake = function() {
  this.x += this.heightBlock;
  this.draw();
};

let snake = new Snake(4,25, {x: 100, y: 100});
snake.init();
