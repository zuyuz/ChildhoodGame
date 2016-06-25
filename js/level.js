/*
    function render;
    function onEvent(event);
    name;
*/
/*global player*/
/*global Point*/
var levels = {};

function Level(obj) {
    this.background = sprites.lvls[obj.background];
    // this.check = obj.check;
    this.name = obj.name;
    this.rooms = [];
    for (let room of obj.rooms){
        this.rooms.push(new Room(room));
    }
    this.activeRoom = obj.startPos; //string referencing active room id
    if(obj.check){
        this.check = obj.check;
    }
    this.interface = [
        new Button(15, 15, 100, 100, sprites.restart, () => {console.log('u welcome');})
    ]
}

Level.prototype.render = function(ctx) {

    this.background.draw(ctx,new Point(0,0));
    player.render(ctx);
    for(let room of this.rooms){
        room.render(ctx);
    }
    for (let uiElem of this.interface) {
        uiElem.render(ctx);
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
                    return result;
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
    for (let uiElem of this.interface) {
        if (uiElem.contains(point)) {
            return uiElem.onClick()
        }
    }
    let roomIndex = this.getClickedRoom(point)
    let room = this.rooms[roomIndex]
    if (room) {
        if (roomIndex == this.activeRoom) {
            var onSwitch = false;
            for(let sw of room.switches){
                if(sw.contains(point)){
                    onSwitch = true;
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
            if(!onSwitch){
                player.scheduleMoveTo(point);
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
    levels['lvl1'] = JSON.stringify({
        background: 'lvl1',
        name: 'lvl1',
        startPos: 0,
        finishPos: 1,
        nextLevel: 'lvl2',
        rooms: [
            {
                id: '0',
                areas: [[293,59,373,364], [339,424,322,45]],
                switches: [[[432,123,45,96],[1]]],
                state: true,
                exits: [1],
                doors: {
                    '1': [239,300]
                },
                center: [360,225]
            },
            {
                id: '1',
                areas: [[61,149,231,275]],
                switches: [[[146,263,60,36],[0]]],
                state: false,
                exits: [0],
                doors: {
                  '0': [293,300]
                },
                center: [120,200]
            }                
        ]
    });

    levels['lvl2'] = JSON.stringify({
           name: 'lvl2',
           background: 'lvl2',
           startPos: 0,
           finishPos: 5,
           nextLevel: 'finish',
           rooms: [
                {
                   id: '0',
                   areas: [[290,182,330,583]],
                   switches: [[[291,533,21,20],[1]]],
                   state: true,
                   exits:[1,2,7,8],
                   doors:{
                       '1': [290,635],
                       '2': [290,327],
                       '7': [623,439],
                       '8': [622,260]
                   },
                   center: [450,430]
               },
               {
                   id: '1',
                   areas: [[0,484,290,286]],
                   switches: [[[190,484,27,13],[5,7]],[[0,711,13,22],[3]]],
                   state: false,
                   exits:[0],
                   doors:{
                       '0': [290,635]
                   },
                   center: [140,620]
               },
               {
                   id: '2',
                   areas: [[0,183,288,301]],
                   switches: [[[58,470,26,13],[8]]],
                   state: false,
                   exits:[0,3],
                   doors:{
                       '0': [290,330],
                       '3': [192,181]
                   },
                   center: [140,322]
               },
               {
                   id: '3',
                   areas: [[0,0,292,179]],
                   switches: [],
                   state: false,
                   exits:[2,4],
                   doors:{
                       '2': [192,181],
                       '4': [292,71]
                   },
                   center: [150,90]
               },
               {
                   id: '4',
                   areas: [[295,0,327,178]],
                   switches: [[[537,167,19,12],[3]],[[605,63,17,20],[5,6]]],
                   state: false,
                   exits:[3],
                   doors:{
                       '3': [292,71]
                   },
                   center: [457,90]
               },
               {
                   id: '5',
                   areas: [[622,0,207,175]],
                   switches: [],
                   state: false,
                   exits:[8],
                   doors:{
                       '8': [740,180]
                   },
                   center: [732,90]
               },
               {
                   id: '6',
                   areas: [[830,0,196,179]],
                   switches: [],
                   state: false,
                   exits:[8],
                   doors:{
                       '8': [925,180]
                   },
                   center: [925,90]
               },
               {
                   id: '7',
                   areas: [[620,350,406,193]],
                   switches: [[[939,532,21,11],[2,4]]],
                   state: false,
                   exits:[8,0],
                   doors:{
                       '8': [840,350],
                       '0': [623,438]
                   },
                   center: [830,450]
               },
               {
                   id: '8',
                   areas: [[620,179,406,173]],
                   switches: [],
                   state: false,
                   exits:[5,0,6,7],
                   doors:{
                       '5': [740,180],
                       '0': [622,260],
                       '6': [925,180],
                       '7': [840,350]
                   },
                   center: [830,260]
               },
           ]
    }); 
}

