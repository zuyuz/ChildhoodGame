function superText(text,x,y,duration, followOffset){
    this.text=text;
    var now = new Date().getTime();
    this.endTime = now+duration;
    this.x=x;
    this.y=y;
    this.finished = false;
    this.followOffset = followOffset || false;
}



superText.prototype.render=function(ctx){
    ctx.font = '40pt Calibri';
    ctx.fillStyle = '#0091c9';
    var point = new Point(this.x, this.y);
    if(this.followOffset){
        point.x += offsetX;
        point.y += offsetY;
    }
    ctx.fillText(this.text,point.x,point.y);
    var now = new Date().getTime();
    console.log('time left ');
    console.log(this.endTime - now);
    if(now>this.endTime){
        this.finished = true;
    }
}