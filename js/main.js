var canvas, ctx;
var Frame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;
var player;
var gameState = 'menu';
var WIDTH = 900, HEIGHT = 600;
/*frame(function name)*/
function init(){
  console.log(Object.keys(sprites));
  canvas = document.getElementsByTagName('canvas')[0];
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');
  console.log('aaaaa fuck you stupid cloud 9, using global name start, motherfuckers');

  LevelInit();
  GameStateStack.pushState(new Level(levels.lvl1)); //add lvl1 here
  GameStateStack.currentState().render(ctx);
  animate(GameStateStack.currentState().rooms['room1'].center,'x',200,2000,function(){GameStateStack.currentState().render(ctx);},loopForFun);
}

initSprites(init);

function loopForFun(){
  if(!loopForFun.dest){
    loopForFun.dest = 100;
    loopForFun.sign = 1;
  }
  animate(GameStateStack.currentState().rooms['room1'].center,'x',loopForFun.dest,2000,function(){GameStateStack.currentState().render(ctx);},loopForFun);
  loopForFun.dest += 300*loopForFun.sign;
  loopForFun.sign *= -1;
}