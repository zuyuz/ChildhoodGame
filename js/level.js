/*
    function render;
    function onEvent(event);
    name;
*/

var levels = {};

function Level(obj) {
    this.background = obj.background;
    // this.check = obj.check;
    this.name = obj.name;
    this.rooms = obj.rooms;
    this.activeRoom = obj.startPos; //string referencing active room id
}

Level.prototype.render = function(ctx) {
    ctx.save();
    // ctx.translate(canvas.width/2-this.rooms[this.activeRoom], canvas.height/2-this.rooms[this.activeRoom]);
    this.background.draw(ctx,new Point(0,0));
    sprites.player.draw(ctx, this.rooms[this.activeRoom].center);
    for(var room in this.rooms){
        if(this.rooms.hasOwnProperty(room)){
            console.log('rendering '+room);
            this.rooms[room].render(ctx);
        }
    }
    ctx.restore();
}


Level.prototype.onEvent = function(event) {
    
}

function LevelInit(){
    levels.lvl1 = {
        background: sprites.lvls.lvl1,
        name: 'lvl1',
        startPos: 'room1',
        rooms: {
            'room1': new Room({
                            id: '1',
                            areas: [new Area(293,59,373,364), new Area(339,424,322,45)],
                            toggle: [],
                            state: true,
                            exits: [],
                            center: new Point(360,225)
                            }),
            'room2': new Room({
                            id: '2',
                            areas: [new Area(61,149,231,275)],
                            toggle: [],
                            state: false,
                            exits: [],
                            center: new Point(120,200)
                            }),                
        }
    };
}
