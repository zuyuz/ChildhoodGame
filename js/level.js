/*
    function render;
    function onEvent(event);
    name;
*/
/*global player*/
/*global Point*/
var levels = {};

function Level(obj) {
    this.background = obj.background;
    // this.check = obj.check;
    this.name = obj.name;
    this.rooms = obj.rooms;
    this.activeRoom = obj.startPos; //string referencing active room id
    if(obj.check){
        this.check = obj.check;
    }
}

Level.prototype.render = function(ctx) {
    ctx.save();
    // ctx.translate(canvas.width/2-this.rooms[this.activeRoom], canvas.height/2-this.rooms[this.activeRoom]);
    this.background.draw(ctx,new Point(0,0));
    player.render(ctx);
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
   for (let [i, room] of enumerate(this.rooms)) {
        if (room.contains(point)) {
            return i;
        }
    }
    return -1;
}

Level.prototype.pathToRoom = function(room) {
    let used = new Array(this.rooms.length).fill(false)
    let path = [];
    function dfs(curRoom) {
        if (this.rooms[curRoom] == room) {
            path.push(curRoom);
            return true
        }
        used[curRoom] = true
        let result = false;
        for (let i = 0; i < this.rooms[curRoom].exits.length; i++) {
            let nextRoom = this.rooms[curRoom].exits[i];
            if (!used[nextRoom] && this.rooms[nextRoom].state) {
                result = dfs.call(this, nextRoom)
                if(result){
                    path.push(curRoom);
                }
            }
        }
        return result
    }
    let result = dfs.call(this, this.activeRoom);
    return path;
}

Level.prototype.isFinished= function(){
    var bool = true;
    this.rooms.forEach(function(room){
        if(room.state){
            bool=false;
        }
    });
    return bool;
}

Level.prototype.restart = function(){
    var name = GameStateStack.currentState().name;
    GameStateStack.pop();
    GameStateStack.push(new Level(lvls[name]));
}
/**
 * toggles clicked room and rooms connected to it
 */
Level.prototype.onClick = function(point) {
    let roomIndex = this.getClickedRoom(point)
    let room = this.rooms[roomIndex]
    if (room) {
        if (roomIndex == this.activeRoom) {
            for(let sw of room.switches){
                if(sw.contains(point)){
                    if(sw.final){
                        if(this.isFinished()){
                            //switch to next level
                        } else {
                            //game over, restart the level
                        }
                    } else {
                        for (let connectedRoomIndex of sw.connectedRooms) {
                            this.rooms[connectedRoomIndex].toggle();
                        }      
                    }
                }
            }

        } else {
            let path = this.pathToRoom(room);
            if(path.length){
                this.activeRoom = roomIndex;
                for(var i=path.length-2; i>=0; i--){
                    player.scheduleMoveTo(this.rooms[path[i]].doors[path[i+1]]);//doors between the rooms
                    player.scheduleMoveTo(this.rooms[path[i]].center);//center of the room  
                }
            }
        }
    }
}

function LevelInit(){
    levels['lvl1'] = {
        background: sprites.lvls.lvl1,
        name: 'lvl1',
        startPos: 0,
        finishPos: 1,
        nextLevel: 'lvl2',
        rooms: [
            new Room({
                id: '0',
                areas: [new Area(293,59,373,364), new Area(339,424,322,45)],
                switches: [new Switch(new Area(432,123,45,96),[1])],
                state: true,
                exits: [1],
                doors: {
                    '1': new Point(239,300)
                },
                center: new Point(360,225)
            }),
            new Room({
                id: '1',
                areas: [new Area(61,149,231,275)],
                switches: [new Switch(new Area(146,263,60,36),[0])],
                state: false,
                exits: [0],
                doors: {
                  '0': new Point(293,300)  
                },
                center: new Point(120,200)
            })                
        ]
    };

    levels['lvl2'] = {
           name: 'lvl2',
           background: sprites.lvls.lvl2,
           startPos: 0,
           finishPos: 5,
           nextLevel: 'finish',
           rooms: [
                new Room({
                   id: '0',
                   areas: [new Area(443,116,210,335)],
                   switches: [1,3],
                   state: true,
                   exits:[],
                   center: new Point(545,263)
               }),
               new Room ({
                   id: '1',
                   areas: [new Area(309,460,611,110), new Area(309,274,112,189)],
                   switches: [2,0],
                   state: false,
                   exits: [],
                   center: new Point (530,520)
               }),
               new Room({
                   id: '2',
                   areas: [new Area(670,115,251,217), new Area(741,331,180,55)],
                   switches: [1,0],
                   state: true,
                   exits:[],
                   center: new Point(800,260)
               }),
               new Room({
                   id: '3',

                   areas: [new Area(74,276,21,20), new Area(741,331,180,55)],
                   switches: [0,2],
                   state: true,
                   exits:[],
                   center: new Point(800,260)
               }),
           ]
    }; 
}

