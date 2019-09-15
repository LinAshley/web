var canvas = document.querySelector('#canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
  }
  
  function randomColor() {
    return 'rgb(' +
           random(0, 255) + ', ' +
           random(0, 255) + ', ' +
           random(0, 255) + ')';
  }

  //为小球建立模型
  function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  //让小球动起来
  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  //检测碰撞
  Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
    //判断其他小球是否与该小球相撞，并且排除小球与自己相撞的情况
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        //使用两个小球圆点之间的距离是否小于两个小球半径之和来判断
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = randomColor();
        }
      }
    }
  }

  //一帧动画中要完成的事情
  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';//将整个画布的颜色设置成半透明的黑色
    ctx.fillRect(0, 0, width, height);//使用  fillRect()（这四个参数分别是起始的坐标、绘制的矩形的宽和高）画出一个填充满整个画布的矩形。这是在下一个视图画出来时用来遮住之前的视图的
  
    while (balls.length < 25) {
      var ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        randomColor(),
        random(10,20)
      );
      balls.push(ball);
    }
  
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
  }

  window.onload()=function(){
      loop();
  }

