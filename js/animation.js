/*global Frame*/
//experimental, might help with cool stuff
//[ [obj, value, endValue] ]
function animate(data, interval, renderFunction, callback){
    var now = new Date().getTime();
    if(!animate.finish){
        animate.finish = new Date().getTime() + interval;
        animate.delta = [];
        for(var value of data){
            animate.delta.push((value[2] - value[0][value[1]])/interval);
        }
        animate.lastUpdate = now;
    }
    if(now<animate.finish){
        for(var i=0; i<data.length; i++){
            data[i][0][data[i][1]] += animate.delta[i]*(now - animate.lastUpdate);
        }
        renderFunction();
        animate.lastUpdate = now;
        //Frame is a global function that is the same as requestAnimationFrame
        Frame(function(){
            animate(data, interval, renderFunction, callback);
        });
    } else {
        for(var i=0; i<data.length; i++){
            data[i][0][data[i][1]] = data[i][2];
        }
        delete animate.finish;
        delete animate.delta;
        delete animate.lastUpdate;
        if(callback){
            callback();
        }
    }
}