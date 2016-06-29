var canvas, ctx;
var Frame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;
var player;
var gameState = 'menu';
var WIDTH, HEIGHT, offsetX, offsetY,OFFSET_X,OFFSET_Y;
var eventBuffer = [], lastUpdate, renderBuffer = [];
var script = {
  'intro': ['menu'],
  'lvl5': ['level','lvl2'],
  'lvl2': ['level','lvl4'],
  'lvl3': ['scene', 'finalScene'],
  'finalScene': ['scene', 'intro'],
  'lvl4': ['level', 'lvl3'],
  'scene1': ['scene','scene2'],
  'scene2': ['scene','scene3'],
  'scene3': ['scene','scene4'],
  'scene4': ['scene', 'tutorial'],
  'tutorial': ['level', 'lvl5'],
  'menu': ['scene', 'scene1']
};
/*frame(function name)*/
function init(){
  console.log(Object.keys(sprites));
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  offsetX = canvas.offsetLeft;
  OFFSET_X = canvas.offsetLeft;
  offsetY = canvas.offsetTop;
  OFFSET_Y = canvas.offsetTop;
  ctx = canvas.getContext('2d');
  initMenu();
  LevelInit();
  ScenesInit();
 
  // GameStateStack.pushState(new Level(JSON.parse(levels.lvl2))); //add lvl1 here
  GameStateStack.pushState(scenes['intro']); //add lvl1 here
  sounds.background.play();
  canvas.addEventListener('mouseup', onClick);
  lastUpdate = new Date().getTime();
  Frame(update);
}
 
initSound();
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
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.rect(0,0,canvas.width,canvas.height);
	ctx.fill();
	if(GameStateStack.currentState().state == 'game'){
  	offsetX = canvas.width/2-player.pos.x;
    offsetY = canvas.height/2-player.pos.y+100;
	} else {
	  offsetX = 0;
	  offsetY = 0;
	}
  if(eventBuffer.length){
    for(var event of eventBuffer){
      GameStateStack.currentState().onClick(event);
    }
    eventBuffer.length = 0;
  }
	ctx.translate(offsetX, offsetY);
	if(GameStateStack.currentState().state == 'game'){
    player.update(ctx, lastUpdate);
	}
  GameStateStack.currentState().render(ctx);
  ctx.restore();
  GameStateStack.currentState().renderUI(ctx);
  //this should be able to stay for a predefined amount of time
  //possibly check for its state, and splice if its over
  if(renderBuffer.length){
    var clearIndices = [];
    for(var i=0; i<renderBuffer.length; i++){
      if(!renderBuffer[i].finished){
        renderBuffer[i].render(ctx);
      } else {
        clearIndices.push(i);
      }
    }
    for(let index in clearIndices){
      renderBuffer.splice(index, 1);
    }
  }
  lastUpdate = now;
  Frame(update);
}

window.addEventListener('resize', function(e){
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = width = window.innerWidth;
	canvas.height = height = window.innerHeight;
	ctx = canvas.getContext('2d');
});