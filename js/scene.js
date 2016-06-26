function Scene(obj){
    this.name = obj.name;
    this.background = obj.background;
    this.interface = obj.interface;
}

Scene.prototype.render = function(ctx){
    if(this.background){
        this.background.draw(ctx,new Point(0,0));
    }
    for (let uiElem of this.interface) {
        uiElem.render(ctx);
    }
}
Scene.prototype.renderUI = function(ctx){
    //maybe add return button on top
}
Scene.prototype.onClick = function(point){
    for (let uiElem of this.interface) {
        if (uiElem.contains(point)) {
            return uiElem.onClick()
        }
    }
}