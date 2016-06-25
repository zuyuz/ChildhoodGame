function superText(text,x,y,duration){
    this.text=text;
    var now = new Date().getTime();
    this.duration=duration;
    this.x=x;
    this.y=y;
    this.finished = false;
}

superText.prototype.render=function(ctx){
    
    ctx.font = '40pt Calibri';
    ctx.fillStyle = '#0091c9';
    ctx.fillText(this.text,this.x,this.y);
    var now = new Date().getTime();
    var endTime=now+this.duration;
    if(now>this.endTime){
        this.finished = true;
    }
}