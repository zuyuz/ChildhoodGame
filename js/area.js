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

Area.prototype.dim = function(ctx, fillStyle){
    var grd = fillStyle || 'rgba(0,0,0,0.5)';
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);

    ctx.fillStyle =  grd;
    ctx.fill();
}