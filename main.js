const canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d');

let Snake = function(length, heightBlock, startPos) {
  this.snakeLength = length;
  this.heightBlock = heightBlock;
  this.snake = [];
  this.x = startPos.x;
  this.y = startPos.y;
  this.xVector = 1;
  this.yVector = 0;
};
Snake.prototype.draw = function() {
  ctx.fillStyle = 'black';
  for (let i = 0; i < this.snakeLength; i++) {
    let blockXPos = this.x + this.xVector*this.heightBlock*i;
    let blockYPos = this.y + this.yVector*this.heightBlock*i;
    ctx.fillStyle = 'red';
    ctx.fillRect(blockXPos,blockYPos,this.heightBlock,this.heightBlock);
    this.snake.push({x: blockXPos, y: blockYPos});
    console.log(this.snake);
  }
}
Snake.prototype.init = function() {
  this.draw();
  let neededSnake = this;
  setInterval(() => {
    this.moveSnake(); //arrow function in order to protect scope
  }, 100);
  document.onkeydown = function(event) {
    console.log(neededSnake);
    switch(event.keyCode) {
      case 37: // left
        neededSnake.xVector = -1;
        neededSnake.yVector = 0;
        break;
      case 38: // up 
        neededSnake.xVector = 0;
        neededSnake.yVector = -1;
        break;
      case 39: // right
        neededSnake.xVector = 1;
        neededSnake.yVector = 0;
        break;
      case 40: // down
        neededSnake.xVector = 0;
        neededSnake.yVector = 1;
        break;
    }
  };
};
Snake.prototype.moveSnake = function() {
  const xBlockPos = this.snake[0].x;
  const yBlockPos = this.snake[0].y;
  ctx.fillStyle = 'black';
  ctx.fillRect(xBlockPos, yBlockPos, this.heightBlock, this.heightBlock);
  const newXBlockPos = this.snake[this.snakeLength-1].x + this.heightBlock*this.xVector;
  const newYBlockPos = this.snake[this.snakeLength-1].y + this.heightBlock*this.yVector;
  this.snake.shift();
  this.snake.push({x: newXBlockPos, y: newYBlockPos});
  ctx.fillStyle = 'red';
  ctx.fillRect(newXBlockPos, newYBlockPos, this.heightBlock, this.heightBlock);
};


let snake = new Snake(4,25, {x: 100, y: 100});
snake.init();
