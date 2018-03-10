const canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d');

let Snake = function(length, heightBlock, startPos) {
  this.snakeLength = length;
  this.heightBlock = heightBlock;
  this.snake = [];
  this.food = [];
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
  setInterval(() => {
    this.createFood(); //arrow function in order to protect scope
  }, (Math.random()*5000));
  document.onkeydown = function(event) {
    console.log(neededSnake);
    switch(event.keyCode) {
      case 37: // left
        if (neededSnake.yVector === 0) {
          break; // it means that snake is already moving horizontally
        }
        neededSnake.xVector = -1;
        neededSnake.yVector = 0;
        break;
      case 38: // up 
        if (neededSnake.xVector === 0) {
          break; // it means that snake is already moving vertically
        }
        neededSnake.xVector = 0;
        neededSnake.yVector = -1;
        break;
      case 39: // right
        if (neededSnake.yVector === 0) {
          break; // it means that snake is already moving horizontally
        }
        neededSnake.xVector = 1;
        neededSnake.yVector = 0;
        break;
      case 40: // down
        if (neededSnake.xVector === 0) {
          break; // it means that snake is already moving vertically
        }
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
  let newXBlockPos = this.snake[this.snakeLength-1].x + this.heightBlock*this.xVector;
  let newYBlockPos = this.snake[this.snakeLength-1].y + this.heightBlock*this.yVector;
  if (newXBlockPos >= 500) {
    newXBlockPos %= 500;
  }
  if (newXBlockPos < 0) {
    newXBlockPos += 500;
  }
  if (newYBlockPos < 0) {
    newYBlockPos += 500;
  }
  if (newYBlockPos >= 500) {
    newYBlockPos %= 500;
  }
  this.snake.shift();
  this.snake.push({x: newXBlockPos, y: newYBlockPos});
  ctx.fillStyle = 'red';
  ctx.fillRect(newXBlockPos, newYBlockPos, this.heightBlock, this.heightBlock);
  this.checkForFoodCollision();
  this.checkForBodyCollision();
};
Snake.prototype.createFood = function() {
  ctx.fillStyle = 'green';
  let xPos = Math.round(Math.random()*20)*this.heightBlock;
  let yPos = Math.round(Math.random()*20)*this.heightBlock;
  ctx.fillRect(xPos,yPos,this.heightBlock,this.heightBlock);
  this.food.push({x: xPos, y: yPos, super: false});
  setTimeout(() => {
    if (ctx.fillStyle !== 'red') {
      ctx.fillStyle = 'black';
      ctx.fillRect(xPos,yPos,this.heightBlock, this.heightBlock);
    }
  }, 5000);
};
Snake.prototype.checkForFoodCollision = function() {
  for (let i = 0; i < this.food.length; i++) {
    if (this.food[i].x === this.snake[this.snakeLength-1].x && this.food[i].y === this.snake[this.snakeLength-1].y) { // you can only eat food with your head
      let lastTailPosX = this.snake[0].x - this.xVector*this.heightBlock;
      let lastTailPosY = this.snake[0].y - this.yVector*this.heightBlock;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.snake[0].x, this.snake[0].y, this.heightBlock, this.heightBlock);
      this.snake.unshift({x: lastTailPosX, y: lastTailPosY});
      this.snakeLength += 1;
      ctx.fillRect(lastTailPosX, lastTailPosY, this.heightBlock, this.heightBlock);
      this.food.splice(i,1);
      break;
    }
  }
};
Snake.prototype.checkForBodyCollision = function() {
  const snakeBodyPartsPos = [];
  for (let i = 1; i < this.snakeLength; i++) {
    if (this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y) {
      alert('Game is over, man!');
    } else {
      snakeBodyPartsPos.push(this.snake[i]);
    }
  }
};


let snake = new Snake(4,25, {x: Math.round(Math.random()*20)*25, y: Math.round(Math.random()*20)*25});
snake.init();
