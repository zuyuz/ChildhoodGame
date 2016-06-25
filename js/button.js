class Button {
    
    constructor(x, y, width, height, sprite, onClick) {
        Object.assign(this, {
            x, y, width, height, sprite, onClick
        })
    }
    
    render(ctx) {
        this.sprite.draw(ctx, {x: this.x, y: this.y})
    }
    
    contains(point) {
        return point.x > this.x && point.x < this.x + this.width &&
               point.y > this.y && point.y < this.y + this.height
    }

}