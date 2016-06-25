var player = {
    init: function(pos, roomId){
        this.pos = new Point(pos.x, pos.y); //create a new point, so that the original cetner isnt changed
        this.posBuffer = [];
        this.background = sprites.player;
        this.velocity = 0.5;//px per millisecond
        this.currentTarget = new Point(pos.x, pos.y);
        this.eta = undefined; //estimated time of arrival
    },
    render: function(ctx){
        var point = new Point(this.pos.x, this.pos.y);
        point.x -= this.background.img_width/2;
        point.y -= this.background.img_height/2;
        this.background.draw(ctx, point);
    },
    update: function(ctx, lastUpdate){ //not sure wtff is happening here
        var now = new Date().getTime();
        let distance = Math.sqrt(Math.pow(this.pos.x-this.currentTarget.x,2)+Math.pow(this.pos.y-this.currentTarget.y,2));
        if(distance > 30 && !this.eta){
            this.eta = now + distance/this.velocity;
        } else if(!this.eta){
            this.eta = now;
        }
        if(now<this.eta){
            var multiplier = (now-lastUpdate);
            if(distance != 0){
                this.pos.x = this.currentTarget.x - this.velocity*(this.eta-now)*((this.currentTarget.x - this.pos.x)/distance);
                this.pos.y = this.currentTarget.y - this.velocity*(this.eta-now)*((this.currentTarget.y - this.pos.y)/distance);
                // this.pos.y += this.velocity*(multiplier)*((this.currentTarget.y - this.pos.y)/distance);
            }
        } else {
            this.eta = undefined;
            this.pos = new Point(this.currentTarget.x, this.currentTarget.y);
            if(this.posBuffer.length){
                this.currentTarget = this.posBuffer.shift();
            }
        }
    },
    moveTo: function(pos){
        this.eta = undefined;
        this.currentTarget = pos;
        this.posBuffer.length = 0;
    },
    scheduleMoveTo: function(pos){
        this.posBuffer.push(pos);
        console.log(this.posBuffer);
    }
}