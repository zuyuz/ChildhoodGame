var canvas, ctx;
var Frame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;
var player;
var gameState = 'menu';
var WIDTH = 900, HEIGHT = 600, OFFSET_X, OFFSET_Y;
/*frame(function name)*/
function init(){
  console.log(Object.keys(sprites));
  canvas = document.getElementsByTagName('canvas')[0];
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  OFFSET_X = canvas.offsetLeft;
  OFFSET_Y = canvas.offsetTop;
  ctx = canvas.getContext('2d');
  console.log('aaaaa fuck you stupid cloud 9, using global name start, motherfuckers');

  LevelInit();
  GameStateStack.pushState(new Level(levels.lvl1)); //add lvl1 here
  GameStateStack.currentState().render(ctx);
  canvas.addEventListener('mouseup', onClick);
 }

initSprites(init);

function loopForFun(){
  if(!loopForFun.dest){
    loopForFun.dest = 100;
    loopForFun.sign = 1;
  }
  animate(GameStateStack.currentState().rooms[0].center,'x',loopForFun.dest,2000,function(){GameStateStack.currentState().render(ctx);},loopForFun);
  loopForFun.dest += 300*loopForFun.sign;
  loopForFun.sign *= -1;
}



function onClick(event){
  var click = new Point(event.clientX-OFFSET_X, event.clientY-OFFSET_Y);
  console.log(click);
  GameStateStack.currentState().onClick(event);
  GameStateStack.currentState().render(ctx);
}