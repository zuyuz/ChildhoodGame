var canvas, ctx;
var Frame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;
var player;
var gameState = 'menu';
var WIDTH = 900, HEIGHT = 600, offsetX, offsetY,OFFSET_X,OFFSET_Y;
var eventBuffer = [], lastUpdate, renderBuffer = [];
/*frame(function name)*/
function init(){
  console.log(Object.keys(sprites));
  canvas = document.getElementsByTagName('canvas')[0];
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  offsetX = canvas.offsetLeft;
  OFFSET_X = canvas.offsetLeft;
  offsetY = canvas.offsetTop;
  OFFSET_Y = canvas.offsetTop;
  ctx = canvas.getContext('2d');
  console.log('aaaaa fuck you stupid cloud 9, using global name start, motherfuckers');

  LevelInit();
  GameStateStack.pushState(new Level(JSON.parse(levels.lvl2))); //add lvl1 here
  player.init(GameStateStack.currentState().rooms[GameStateStack.currentState().activeRoom].center, GameStateStack.currentState().activeRoom);
  
  canvas.addEventListener('mouseup', onClick);
  lastUpdate = new Date().getTime();
  Frame(update);
 }

initSprites(init);

function onClick(event){
  var click = new Point(event.clientX-offsetX-OFFSET_X, event.clientY-offsetY-OFFSET_Y);
  console.log(click);
  eventBuffer.push(click);
}

function update(){
  //@TODO - render buffer, for some splash screens, or texts, maybe
  var now = new Date().getTime();
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
	offsetX = canvas.width/2-player.pos.x;
  offsetY = canvas.height/2-player.pos.y;
	ctx.translate(offsetX, offsetY);
  if(eventBuffer.length){
    for(var event of eventBuffer){
      GameStateStack.currentState().onClick(event);
    }
    eventBuffer.length = 0;
  }
  
  player.update(ctx, lastUpdate);
  GameStateStack.currentState().render(ctx);
  ctx.restore();
  //this should be able to stay for a predefined amount of time
  //possibly check for its state, and splice if its over
  if(renderBuffer.length){
    for(var i=0; i<renderBuffer.length; i++){
      if(!renderBuffer[i].finished){
        renderBuffer[i].render(ctx);
      } else {
        renderBuffer.splice(i,1);
      }
    }
    renderBuffer.length = 0;
  }
  lastUpdate = now;
  Frame(update);
}