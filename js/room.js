/*
    areas - list of areas that create the room. so it can different than just rectangular
    toggle - list of rooms that are changed by light switch
    state - on or off. true is on, false is off
*/
function Room(obj){
    this.id = obj.id;
    this.areas = obj.areas;
    this.doors = obj.doors;
    this.connectedRooms = obj.toggle;
    this.state = obj.state;
    this.exits = obj.exits;
    this.center = obj.center;
    if(obj.render){
        this.render = obj.render;
    }
    var area = this.areas[0];
    console.log(area);
    var circleX = area.x+area.width/2, circleY = area.y+area.height/2;
    this.gradient =  ctx.createRadialGradient(circleX, circleY, 10, circleX, circleY, 100);
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
    }
}

