/*global Frame*/
//experimental, might help with cool stuff
function animate(obj, value, endValue, interval, renderFunction, callback){
    var now = new Date().getTime();
    if(!animate.finish){
        animate.finish = new Date().getTime() + interval;
        animate.delta = (endValue - obj[value])/interval;
        animate.lastUpdate = now;
    }
    if(now<animate.finish){
        obj[value] += animate.delta*(now - animate.lastUpdate);
        renderFunction();
        animate.lastUpdate = now;
        //Frame is a global function that is the same as requestAnimationFrame
        Frame(function(){
            animate(obj, value, endValue, interval, renderFunction, callback);
        });
    } else {
        obj[value] = endValue; //fallback
        delete animate.finish;
        delete animate.delta;
        delete animate.lastUpdate;
        if(callback){
            callback();
        }
    }
}