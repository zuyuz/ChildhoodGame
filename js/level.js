/*
    function render;
    function onEvent(event);
    name;
*/

var levels = {};

function Level(obj) {
    this.map = obj.map;
    this.background = obj.background;
    this.check = obj.check;
    this.name = obj.name;
    this.rooms = obj.rooms;
    this.activeRoom = obj.startPos; //string referencing active room id
}

Level.prototype.render = function(ctx) {
    ctx.save();
    ctx.translate(canvas.width/2-this.rooms[this.activeRoom], canvas.height/2-this.rooms[this.activeRoom]);
    this.background.draw(ctx,new Point(0,0));
    this.player.render(ctx, this.rooms[this.activeRoom].center);
    for(var room in this.rooms){
        if(rooms.hasOwnProperty(room)){
            this.rooms[room].render();
        }
    }
    ctx.restore();
}


Level.prototype.onEvent = function(event) {
    
}
function LevelInit(){
    levels.lvl1 = {
      //object with all levels
      };
}
