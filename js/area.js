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
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    // create radial gradient
    var circleX = this.x+this.width/2, circleY = this.y+this.height/2;
    var grd = ctx.createRadialGradient(circleX, circleY, 10, circleX, circleY, 100);
    grd.addColorStop(0, 'rgba(100,100,100,0.1)');
    grd.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle =  grd;
    ctx.fill();
}