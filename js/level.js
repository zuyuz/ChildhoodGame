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
    this.finalRoom = obj.finishPos;
    if(obj.check){
        this.check = obj.check;
    }
    this.interface = [
        new Button(15, 15, 85, 66, sprites.menu, () => {renderBuffer.push(new superText('menu isnt done yet', 300, 300, 2000))})
    ]
    player.init(this.rooms[this.activeRoom].center, this.activeRoom);
}

Level.prototype.state = 'game';
Level.prototype.render = function(ctx) {

    this.background.draw(ctx,new Point(0,0));
    player.render(ctx);
    for(let room of this.rooms){
        room.render(ctx);
    }
    ctx.restore();
}

Level.prototype.renderUI = function(ctx){
    for (let uiElem of this.interface) {
        uiElem.render(ctx);
    }
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
            return true;
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
    var finished = true;
    for(var i=0; i<this.rooms.length; i++){
        if(this.rooms[i].state && i!=this.finalRoom){
            finished = false;
        }
    }
    return finished;
}

Level.prototype.restart = function(){
    var name = GameStateStack.currentState().name;
    GameStateStack.pop();
    GameStateStack.push(new Level(lvls[name]));
    player.init(GameStateStack.currentState().rooms[GameStateStack.currentState().activeRoom].center, GameStateStack.currentState().activeRoom);
}
/**
 * toggles clicked room and rooms connected to it
 */
Level.prototype.onClick = function(point) {
    point.x += offsetX;
    point.y += offsetY;
    for (let uiElem of this.interface) {
        if (uiElem.contains(point)) {
            return uiElem.onClick()
        }
    }
    point.x -= offsetX;
    point.y -= offsetY;
    let roomIndex = this.getClickedRoom(point)
    let room = this.rooms[roomIndex]
    if (room) {
        if (roomIndex == this.activeRoom) {
            var onSwitch = false;
            for(let sw of room.switches){
                if(sw.contains(point)){
                    sounds.clickSwitch.play();
                    onSwitch = true;
                    console.log(sw);
                    for (let connectedRoomIndex of sw.connectedRooms) {
                        this.rooms[connectedRoomIndex].toggle();
                    }
                    if(sw.final){
                        if(this.isFinished()){
                            console.log('final button pressed and finished');
                            renderBuffer.push(new superText('GJ m8, i r8 8/8', 300, 300, 2000));
                        } else {
                            //game over, restart the level
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
                   switches: [[[58,470,26,13],[8]],[[242,468,27,14],[4]]],
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
                   switches: [[[640,162,25,16],[8], true]],
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
                   switches: [[[1004,162,22,19],[4]]],
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
                   switches: [[[939,532,21,11],[2,6]],[[672,523,26,20],[8]]],
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
                   switches: [[[674,332,30,20],[2]],[[618,200,20,18],[0]]],
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
    levels.lvl3 = JSON.stringify({
        background: 'lvl3',
        name: 'lvl3',
        startPos: 0,
        finishPos: 9,
        nextLevel: 'lvl2',
        rooms: [
            {
                id: '0',
                areas: [[1125,350,748,257], [1410,606,124,96]],
                switches: [],
                state: true,
                exits: [1],
                doors: {
                    '1': [1464,662]
                },
                center: [1488, 430]
            },
            {
                id: '1',
                areas: [[318,752,1601,221],[513,972,64,113],[1406,968,68,118],[1760,972,96,117]],
                switches: [],
                state: true,
                exits: [0,2,3,4,5],
                doors: {
                  '0': [1464,662],
                  '2': [1950, 845],
                  '3': [540, 1050],
                  '4': [1430, 1017],
                  '5': [1804, 1024]
                },
                center: [1126,818]
            },
            {
                id: '2',
                areas: [[1984, 705, 385, 278]],
                switches: [],
                state: true,
                exits: [1],
                doors: {
                    '1': [1950, 845]
                },
                center: [2168, 845]
            },
            {
                id: '3',
                areas: [[428, 1088, 188, 382]],
                switches: [],
                state: true,
                exits: [1, 7],
                doors: {
                    '1': [540, 1050],
                    '7': [542, 1544]
                },
                center: [545, 1272]
            },
            {
                id: '4',
                areas: [[1221, 1105, 410, 248]],
                switches: [],
                state: true,
                exits: [1, 8],
                doors: {
                    '1': [1430, 1017],
                    '8': [1436, 1457]
                },
                center: [1436, 1203]
            },
            {
                id: '5',
                areas: [[1717, 1100, 185, 400]],
                switches: [],
                state: true,
                exits: [1, 9],
                doors: {
                    '1': [1804, 1024],
                    '9': [1805, 1577]
                },
                center: [1805, 1298]
            },
            {
                id: '6',
                areas: [[1992, 1165, 374, 578]],
                switches: [],
                state: true,
                exits: [9],
                doors: {
                    '9': [1954, 1657]
                },
                center: [2181, 1436]
            },
            {
                id: '7',
                areas: [[321, 1569, 414, 389],[772,1856,857,314]],
                switches: [],
                state: true,
                exits: [3, 8, 9],
                doors: {
                    '3': [542, 1544],
                    '8': [1216, 1801],
                    '9': [1660, 1966]
                },
                center: [741, 1934]
            },
            {
                id: '8',
                areas: [[809, 1501, 820, 220]],
                switches: [],
                state: true,
                exits: [4, 7],
                doors: {
                    '4': [1436, 1457],
                    '7': [1216, 1801]
                },
                center: [1221, 1604]
            },
            {
                id: '9',
                areas: [[1698, 1609, 221, 432]],
                switches: [],
                state: true,
                exits: [5, 6, 7],
                doors: {
                    '5': [1805, 1577],
                    '6': [1954, 1657],
                    '7': [1660, 1966]
                },
                center: [1806, 1813]
            }
        ]
    });
}

