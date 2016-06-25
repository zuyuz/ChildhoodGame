/*
    areas - list of areas that create the room. so it can different than just rectangular
    toggle - list of rooms that are changed by light switch
    state - on or off. true is on, false is off
*/
function Room(obj){
    this.id = obj.id;
    this.areas = [];
    for(let area of obj.areas){
        this.areas.push(new Area(area));
    }
    this.doors = {};
    for(let door in obj.doors){
        if(obj.doors.hasOwnProperty(door)){
            this.doors[door] = new Point(obj.doors[door][0],obj.doors[door][1]);
        }
    }
    this.switches = [];
    for(let sw of obj.switches){
        this.switches.push(new Switch(sw[0],sw[1],sw[2]));
    }
    console.log('switches');
    console.log(this.switches);
    this.state = obj.state;
    this.exits = obj.exits;
    this.center = new Point(obj.center[0],obj.center[1]);
    if(obj.render){
        this.render = obj.render;
    }
    var area = this.areas[0];

    var circleX = area.x+area.width/2, circleY = area.y+area.height/2;
    this.circleX = circleX;
    this.circleY = circleY;
    this.gradient =  ctx.createRadialGradient(this.circleX, this.circleY, 100, this.circleX, this.circleY, 300);
        // create radial gradient
    this.gradient.addColorStop(0, 'rgba(100,100,100,0.1)');
    this.gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
}
/*
    Given point checks if it's in the room
*/
Room.prototype.contains = function(point){
    for(var area of this.areas){
        if(area.contains(point)){
            console.log(this.id+' contains');
            return true;
        }
    }
    return false;
}

Room.prototype.toggle = function(){
    this.state = !this.state;
}

Room.prototype.render = function(ctx){
    if(!this.state){
        for(var areaN=0; areaN<this.areas.length; areaN++){
            this.areas[areaN].dim(ctx, this.gradient); //
        }
        if(Math.random()>0.9){
            this.circleX += Math.round(Math.random()*2-1);
            this.circleY += Math.round(Math.random()*2-1);
            this.gradient =  ctx.createRadialGradient(this.circleX, this.circleY, 10, this.circleX, this.circleY, 100);
            // create radial gradient
            this.gradient.addColorStop(0, 'rgba(100,100,100,0.1)');
            this.gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
        }
    }
}

