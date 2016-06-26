function Banner(background, pos){
    this.background = background;
    this.pos = pos;
}

Banner.prototype.render = function(ctx){
    this.background.draw(ctx, this.pos);
}
Banner.prototype.contains = function(){
    return false;
}