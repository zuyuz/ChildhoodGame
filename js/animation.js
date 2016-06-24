/*global Frame*/
//experimental, might help with cool stuff
function animate(obj, value, endValue, interval, renderFunction, callback){
    if(!animate.finish){
        animate.finish = new Date().getTime() + interval;
        animate.delta = (endValue - obj[value])/interval;
    }
    var now = new Date().getTime();
    if(now<animate.finish){
        obj[value] += animate.delta;
        renderFunction();
        //Frame is a global function that is the same as requestAnimationFrame
        Frame(function(){
            animate(obj, value, endValue, interval, renderFunction, callback);
        });
    } else {
        obj[value] = endValue; //fallback
        delete animate.finish;
        delete animate.delta;
        if(callback){
            callback();
        }
    }
}