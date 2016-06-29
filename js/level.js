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
    this.startingText = obj.startingText;
    if(obj.check){
        this.check = obj.check;
    }
        // this.
    this.interface = [
        new Button(15, 15, 85, 66, sprites.menu, () => {GameStateStack.pushState(scenes['menu']);}),
        new Button(105, 25, 40, 40, sprites.repeat, () => {GameStateStack.currentState().restart()})
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
    GameStateStack.popState();
    GameStateStack.pushState(new Level(JSON.parse(levels[name])));
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
                    var hint = '';
                    for(var i=0; i<sw.connectedRooms.length; i++){
                        hint += (sw.connectedRooms[i]+1)+' ';    
                    }
                    if(this.name !== 'lvl2'){
                        renderBuffer.push(new superText(hint, player.pos.x, player.pos.y-40, 3000, true));
                    }
                    for (let connectedRoomIndex of sw.connectedRooms) {
                        this.rooms[connectedRoomIndex].toggle();
                    }
                    if(sw.final){
                        if(this.isFinished()){
                            GameStateStack.next();
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
            player.clearPath();
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
    levels['lvl2'] = JSON.stringify({
           name: 'lvl2',
           startingText: 'Final room - 6',
           background: 'lvl2',
           startPos: 0,
           finishPos: 5,
           nextLevel: 'finish',
           rooms: [
                {
                   id: '0',
                   areas: [[304,182,312,570]],
                   switches: [[[300,538,33,34],[1]]],
                   state: true,
                   exits:[1,2,7,8],
                   doors:{
                       '1': [295,606],
                       '2': [296,302],
                       '7': [623,443],
                       '8': [621,267]
                   },
                   center: [460,460]
               },
               {
                   id: '1',
                   areas: [[0,491,288,279]],
                   switches: [[[266,520,31,36],[5,7]],[[267,654,30,34],[3]]],
                   state: false,
                   exits:[0],
                   doors:{
                       '0': [295,606]
                   },
                   center: [170,573]
               },
               {
                   id: '2',
                   areas: [[0,184,288,291]],
                   switches: [[[133,444,28,35],[8]],[[266,385,31,32],[4]]],
                   state: false,
                   exits:[0,3],
                   doors:{
                       '0': [296,302],
                       '3': [168,175]
                   },
                   center: [231,305]
               },
               {
                   id: '3',
                   areas: [[0,0,285,169]],
                   switches: [],
                   state: false,
                   exits:[2,4],
                   doors:{
                       '2': [168,175],
                       '4': [289,83]
                   },
                   center: [174,100]
               },
               {
                   id: '4',
                   areas: [[295,0,322,171]],
                   switches: [[[555,141,30,30],[3]],[[598,79,36,22],[5,6]]],
                   state: false,
                   exits:[3],
                   doors:{
                       '3': [289,83]
                   },
                   center: [455,80]
               },
               {
                   id: '5',
                   areas: [[629,0,198,170]],
                   switches: [[[640,142,28,32],[8], true]],
                   state: false,
                   exits:[8],
                   doors:{
                       '8': [717,175]
                   },
                   center: [675,65]
               },
               {
                   id: '6',
                   areas: [[830,0,196,167]],
                   switches: [[[994,139,28,32],[4]]],
                   state: false,
                   exits:[8],
                   doors:{
                       '8': [921,175]
                   },
                   center: [984,76]
               },
               {
                   id: '7',
                   areas: [[628,366,398,175]],
                   switches: [[[917,508,30,30],[2,6]],[[704,511,36,29],[8]]],
                   state: false,
                   exits:[8,0],
                   doors:{
                       '8': [812,355],
                       '0': [623,443]
                   },
                   center: [744,454]
               },
               {
                   id: '8',
                   areas: [[627,179,399,170]],
                   switches: [[[674,332,30,20],[2]],[[621,200,30,36],[0]]],
                   state: false,
                   exits:[5,0,6,7],
                   doors:{
                       '5': [717,175],
                       '0': [621,267],
                       '6': [921,175],
                       '7': [812,355]
                   },
                   center: [733,263]
               },
           ]
    }); 
    levels.lvl3 = JSON.stringify({
        background: 'lvl3',
        name: 'lvl3',
        startPos: 0,
        finishPos: 9,
        startingText: 'Final level, final room - 10',
        nextLevel: 'lvl2',
        rooms: [
            {
                id: '0',
                areas: [[1125,350,748,257], [1410,606,124,96]],
                dimAreas: [ [1086, 254, 835, 355] , [1405, 608, 132, 39]],
                switches: [ [[1378, 541, 31, 66], [1, 2]] ],
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
                dimAreas: [[317, 701, 1605, 292],[512, 992, 64, 98], [1409, 990, 66, 98], [1762, 990, 94, 94]],
                switches: [],
                state: false,
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
                dimAreas: [[1984, 702, 386, 289], [1921, 799, 62, 99]],
                switches: [ [[2078, 738, 39, 63], [3, 8, 4]] ],
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
                dimAreas: [ [318, 1086, 416, 386], [510, 1469, 68, 97] ],
                switches: [ [[446, 1185, 36, 67], [1, 6, 5]] ],
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
                dimAreas: [ [1217, 1088, 416, 290], [1408, 1376, 64, 97]],
                switches: [ [[1346, 1185, 30, 66], [ 2, 5]] ],
                state: false,
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
                dimAreas: [ [1696, 1086, 224, 418], [1760, 1500, 96, 102] ],
                switches: [ [[1730, 1217, 30, 670], [0, 1, 4]] ],
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
                dimAreas: [ [1984, 1088, 388, 674], [1921, 1628, 63, 68] ],
                switches: [ [[2210, 1310, 30, 70], [0, 8]] ],
                state: false,
                exits: [9],
                doors: {
                    '9': [1954, 1657]
                },
                center: [2181, 1436]
            },
            {
                id: '7',
                areas: [[321, 1569, 414, 389],[772,1856,857,314]],
                dimAreas: [ [320, 1589, 414, 608], [736, 1793, 897, 384] ],
                switches: [ [[1284, 1921, 30, 68], [3,8,9]], [[1506, 1921, 32, 64], [2, 8]] ],
                state: false,
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
                dimAreas: [ [798, 1470, 839, 257], [1182, 1728, 66, 100] ],
                switches: [ [[1348, 1504, 30, 67],[6, 9]] ],
                state: false,
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
                dimAreas: [ [1694, 1596, 226, 452], [1629, 1920, 66, 69] ],
                switches: [ [[1860, 1602, 30, 67], [1, 5, 7], true] ],
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
    levels['lvl4'] = JSON.stringify({
           name: 'lvl4',
           startingText: 'Finish in room 5',
           background: 'lvl4',
           startPos: 4,
           finishPos: 4,
           nextLevel: 'finish',
           rooms: [
               {
                   id: '0', //yo , ya postavuv ii v gry, mogesh testutu
                   areas: [[62,124,744,710]],
                   switches: [[[225,157,34,34],[5]]],
                   state: true,
                   exits:[1,3],
                   doors:{
                       '1': [834,465],
                       '3':[436,862]
                   },
                   center: [454,448]
               },
               {
                   id: '1',
                   areas: [[861,126,996,705]],
                   switches: [[[1344,157,37,33],[0,2,3]]],
                   state: false,
                   exits:[0,2,4],
                   doors:{
                       '0': [834,465],
                       '2': [1893,456],
                       '4': [1398,865]
                   },
                   center: [1352,476]
               },
               {
                   id: '2',
                   areas: [[1916,125,581,709]],
                   switches: [],
                   state: false,
                   exits:[1,5],
                   doors:{
                       '1': [1893,456],
                       '5': [2270,865]
                   },
                   center: [2256,512]
               },
               {
                   id: '3',
                   areas: [[62,893,740,678]],
                   switches: [[[737,1402,34,41],[6]]],
                   state: false,
                   exits:[0,6],
                   doors:{
                       '0': [436,862],
                       '6': [404,1601]
                   },
                   center: [410,1244]
               },
               {
                   id: '4',
                   areas: [[861,896,997,673]],
                   switches: [[[1282,1505,32,32],[1], true]],
                   state: true,
                   exits:[1],
                   doors:{
                       '1': [1398,865]
                   },
                   center: [1376,1212]
               },
               {
                   id: '5',
                   areas: [[1917,892,580,676]],
                   switches: [[[2464,1245,34,36],[0]]],
                   state: false,
                   exits:[2,8],
                   doors:{
                       '8': [2286,1600],
                       '2': [2270,865]
                   },
                   center: [2238,1238]
               },
               {
                   id: '6',
                   areas: [[62,1629,742,869]],
                   switches: [[[352,2429,38,37],[3]],[[65,2172,33,40],[7]]],
                   state: true,
                   exits:[7,3],
                   doors:{
                       '7': [836,2142],
                       '3': [404,1601]
                   },
                   center: [450,2080]
               },
               {
                   id: '7',
                   areas: [[860,1628,996,870]],
                   switches: [[[1634,2426,34,34],[8]]],
                   state: false,
                   exits:[8,6],
                   doors:{
                       '8': [1893,2118],
                       '6': [836,2142]
                   },
                   center: [1377,2048]
               },
               {
                   id: '8',
                   areas: [[1918,1628,582,870]],
                   switches: [[[2470,2303,27,31],[7]]],
                   state: true,
                   exits:[7,5],
                   doors:{
                       '5': [2286,1600],
                       '7': [1893,2118]
                   },
                   center: [2245,2048]
               }
           ]
    });
    levels['lvl5'] = JSON.stringify({
           name: 'lvl5',
           startingText: 'Finish in room 1',
           background: 'lvl5',
           startPos: 0,
           finishPos: 0,
           nextLevel: 'finish',
           rooms: [
                {
                   id: '0',
                   areas: [[832,322,897,416]],
                   switches: [ [[1602,350,32,32],[3],true] ],
                   state: true,
                   exits:[1,2,3,4],
                   doors:{
                       '1': [1264,800],
                       '2': [1264,350],
                       '3': [816,576],
                       '4': [1745,574]
                   },
                   center: [1276,574]
               },
               {
                   id: '1',
                   areas: [[1022,769,484,194]],
                   switches: [ [[1022,798,36,36],[2]] ],
                   state: false,
                   exits:[0],
                   doors:{
                       '0': [1264,800]
                   },
                   center: [1264,894]
               },
               {
                   id: '2',
                   areas: [[1020,124,453,164]],
                   switches: [],
                   state: true,
                   exits:[0],
                   doors:{
                       '0': [1264,350]
                   },
                   center: [1262,256]
               },
               {
                   id: '3',
                   areas: [[477,320,324,418]],
                   switches: [ [[738,675,30,60],[4]] ],
                   state: false,
                   exits:[0,5],
                   doors:{
                       '0': [816,576],
                       '5': [462,574]
                   },
                   center: [637,576]
               },
               {
                   id: '4',
                   areas: [[1758,321,578,418]],
                   switches: [ [[2274,346,30,30],[5]] ],
                   state: false,
                   exits:[0],
                   doors:{
                       '0': [1745,574]
                   },
                   center: [2096,555]
               },
               {
                   id: '5',
                   areas: [[125,318,324,418]],
                   switches: [ [[385,670,34,34],[2,1]] ],
                   state: false,
                   exits:[3],
                   doors:{
                       '3': [462,574]
                   },
                   center: [286,576]
               },
           ]
    }); 
}

