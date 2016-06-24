function Area(x,y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Area.prototype.contains = function(point){
    if((point.x > this.x) && (point.x < this.x + this.width)
        && (point.y > this.y) && (point.y < this.y + this.height)){
        
        return true;
    } else {
        return false;
    }
}

Area.prototype.dim = function(ctx){
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.x+this.width, this.y+this.height);
    // create radial gradient
    var circleX = (this.x+this.width)/2, circleY = (this.y+this.height)/2;
    var grd = ctx.createRadialGradient(circleX, circleY, 10, circleX, circleY, 300);
    grd.addColorStop(0, 'rgba(0,0,0,0.6)');
    grd.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = grd;
    ctx.fill();
}