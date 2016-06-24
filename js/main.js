var canvas, ctx;
var Frame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;
var player;
var gameState = 'menu';
/*frame(function name)*/
function init(){
  console.log(Object.keys(sprites));
  canvas = document.getElementByTagName('canvas')[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  console.log('aaaaa fuck you stupid cloud 9, using global name start, motherfuckers');

  LevelInit();
  // GameStateStack.pushState(); //add lvl1 here
  // GameStateStack.currentState().render();
}

initSprites(init);