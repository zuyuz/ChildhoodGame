function Area(x,y, width, height){
    if(y){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;    
    } else {
        this.x = x[0];
        this.y = x[1];
        this.width = x[2];
        this.height = x[3];
    }
}

Area.prototype.contains = function(point){
    if((point.x > this.x) && (point.x < (this.x + this.width))
        && (point.y > this.y) && (point.y < (this.y + this.height))){
        
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