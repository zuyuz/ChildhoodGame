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
    for(let room of this.rooms){
        room.render(ctx);
    }
    ctx.restore();
}

/**
 * returns index of room which is clicked
 * if there is no such room returns -1
 */
Level.prototype.getClickedRoom = function(point) {
    for (let [index, room] of enumerate(this.rooms)) {
        if (room.contains(point)) {
            return index;
        }
    }
    return -1;
}

/**
 * toggles clicked room and rooms connected to it
 */
Level.prototype.onClick = function(point) {
    console.log(`on click w/ params ${point}`)
    let room = this.rooms[this.getClickedRoom(point)]
    if (room) {
        for (let connectedRoomIndex of room.connectedRooms) {
            this.rooms[connectedRoomIndex].toggle();
        }
    }
}

function LevelInit(){
    levels['lvl1'] = {
        background: sprites.lvls.lvl1,
        name: 'lvl1',
        startPos: 0,
        rooms: [
            new Room({
                id: '0',
                areas: [new Area(293,59,373,364), new Area(339,424,322,45)],
                toggle: [1],
                state: true,
                exits: [],
                center: new Point(360,225)
            }),
            new Room({
                id: '1',
                areas: [new Area(61,149,231,275)],
                toggle: [0],
                state: false,
                exits: [],
                center: new Point(120,200)
            })                
        ]
    };

    levels['lvl2'] = {
           name: 'lvl2',
           background: sprites.lvls.lvl2,
           startPos: 0,
           rooms: [
                new Room({
                   id: '0',
                   areas: [new Area(443,116,210,335)],
                   toggle: [],
                   state: true,
                   exits:[],
                   center: new Point(545,263)
               }),
               new Room ({
                   id: '1',
                   areas: [new Area(309,460,611,110), new Area(309,274,112,189)],
                   toggle: [],
                   state: false,
                   exits: [],
                   center: new Point (530,520)
               }),
               new Room({
                   id: '2',
                   areas: [new Area(670,115,251,217), new Area(741,331,180,55)],
                   toggle: [],
                   state: true,
                   exits:[],
                   center: new Point(800,260)
               }),
               new Room({
                   id: '3',
                   areas: [new Area(74,276,21), new Area(741,331,180,55)],
                   toggle: [],
                   state: true,
                   exits:[],
                   center: new Point(800,260)
               }),
           ]
    }; 
}

