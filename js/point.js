function Point(x,y) {
    this.x = x;
    this.y = y;
}


function Cell(x,y){
    this.x = x;
    this.y = y;
}


Point.prototype.equal = function(point) {
    if (this.x === point.x && this.y === point.y) {
        return true;
    }
    return false;
};
Cell.prototype.equal = function(point) {
    if (this.x === point.x && this.y === point.y) {
        return true;
    }
    return false;
};