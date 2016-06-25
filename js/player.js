var player = {
    init: function(pos, roomId){
        this.pos = new Point(pos.x, pos.y); //create a new point, so that the original cetner isnt changed
        this.posBuffer = [];
        this.background = sprites.player;
        this.velocity = 3; //50 px /sec
        this.currentTarget = new Point(pos.x, pos.y);
    },
    render: function(ctx){
        this.background.draw(ctx, this.pos);
    },
    update: function(ctx, lastUpdate){
        console.log('Beginning of an update, currentTarget is '+this.currentTarget.x+' '+this.currentTarget.y);
        var now = new Date().getTime();
        var distance = Math.sqrt(Math.pow(this.pos.x-this.currentTarget.x,2)+Math.pow(this.pos.y-this.currentTarget.y,2));
        console.log('distance is '+ distance);
        if(distance >= 30){
            var multiplier = (now-lastUpdate) || 1;
            this.pos.x += this.velocity*(multiplier)*((this.currentTarget.x - this.pos.x)/distance);
            this.pos.y += this.velocity*(multiplier)*((this.currentTarget.y - this.pos.y)/distance);
            console.log('this current Target is '+this.currentTarget.x+' '+this.currentTarget.y);
        } else {
            if(this.posBuffer.length){
                this.currentTarget = this.posBuffer.shift();
                console.log('new current Target is '+this.currentTarget.x+' '+this.currentTarget.y);
            }
        }
        console.log('Ending of an update, currentTarget is '+this.currentTarget.x+' '+this.currentTarget.y);
    },
    moveTo: function(pos){
        this.currentTarget = pos;
        this.posBuffer.length = 0;
    },
    scheduleMoveTo: function(pos){
        this.posBuffer.push(pos);
        console.log(this.posBuffer);
    }
}