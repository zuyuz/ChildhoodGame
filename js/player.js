var player = {
    init: function(pos, roomId){
        this.pos = pos;
        this.movePos = pos;
        this.background = sprites.player;
        this.velocity = 3; //50 px /sec
    },
    render: function(ctx){
        this.background.draw(ctx, this.pos);
    },
    update: function(ctx, lastUpdate){
        var now = new Date().getTime();
        var distance = Math.sqrt(Math.pow(this.pos.x-this.movePos.x,2)+Math.pow(this.pos.y-this.movePos.y,2));
        console.log('distance '+distance);
        if(distance >= 30){
            this.pos.x += this.velocity*(now-lastUpdate)*((this.movePos.x - this.pos.x)/distance);
            this.pos.y += this.velocity*(now-lastUpdate)*((this.movePos.y - this.pos.y)/distance);
        }
    },
    moveTo: function(pos){
        this.movePos = pos;
    }
}