function Switch(area, toggles, final){
    this.area = new Area(area);
    this.connectedRooms = toggles;
    this.final = final || false;
}

Switch.prototype.contains = function(point){
    return this.area.contains(point);
}