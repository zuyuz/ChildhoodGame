var GameStateStack = {
    
    __curState : undefined,
    
    __states: [],
    
    popState: function() {
        if(this.__states.length == 0) {
            console.log("Stack is empty");
        } else {
            this.__states.pop();
            this.__curState = this.__states[this.__states.length - 1];
        }
    },
    
    pushState: function(gameState) {
        this.__states.push(gameState);
        this.__curState = gameState;
    },
    
    currentState: function() {
        return this.__curState;
    }
};