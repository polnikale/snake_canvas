const canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d');

let Snake = function(length, heightBlock, startPos) {
  this.snakeLength = length;
  this.heightBlock = heightBlock;
  this.x = startPos.x;
  this.y = startPos.y;
  this.xVector = 1;
  this.yVector = 0;
};
Snake.prototype.draw = function() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  for (let counter = 0; counter < this.snakeLength; counter++) {
    let blockXPos = this.x - counter*this.xVector*this.heightBlock;
    let blockYPos = this.y - counter*this.yVector*this.heightBlock;
    if (blockXPos >= 500) {
      blockXPos %= 500;
    }
    if (blockXPos < 0) {
      blockXPos += 500;
    }
    if (blockYPos >= 500) {
      blockYPos %= 500;
    }
    if (blockYPos < 0) {
      blockYPos += 500;
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(blockXPos,blockYPos,this.heightBlock,this.heightBlock);
  }
}
Snake.prototype.init = function() {
  this.draw();
  let neededSnake = this;
  setInterval(() => {
    this.moveSnake(); //arrow function in order to protect scope
  }, 1000);
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
  this.x = (this.x + this.xVector*this.heightBlock) % 500;
  this.y = (this.y + this.yVector*this.heightBlock) % 500;
  console.log(this.x,'x+x',this.xVector);
  console.log(this.y,'x+x',this.yVector);
  this.draw();
};


let snake = new Snake(4,25, {x: 100, y: 100});
snake.init();
