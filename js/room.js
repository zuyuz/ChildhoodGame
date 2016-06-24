/*
    areas - list of areas that create the room. so it can different than just rectangular
    toggle - list of rooms that are changed by light switch
    state - on or off. true is on, false is off
*/
function Room(obj){
    this.id = obj.id;
    this.areas = obj.areas;
    this.toggle = obj.toggle;
    this.state = obj.state;
    this.exits = obj.exits;
    this.center = obj.center;
    if(obj.render){
        this.render = obj.render;
    }
}
/*
    Given point checks if it's in the room
*/
Room.prototype.isInside = function(point){
    for(var area in this.areas){
        if(this.areas.hasOwnProperty(area)){
            if(area.contains(point)){
                return true;
            }
        }
    }
    return false;
}

Room.prototype.toggle = function(){
    this.state = !this.state;
}

Room.prototype.render = function(ctx){
    if(!this.state){
        for(var area in this.areas){
            if(this.areas.hasOwnProperty(area)){
                area.dim();
            }
        }
    }
}

