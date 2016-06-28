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
    },
    
    __loadSavedLvl: function(name) {  // fuck architecture
        let savedLvl = localStorage.getItem('progress') || name;
        this.pushState(new Level(JSON.parse(levels[script[savedLvl][1]])));
    },
    
    next: function(){
        var name = this.currentState().name;
        if(name){
            if(script.hasOwnProperty(name)){
                this.popState();
                if(script[name][0] == 'level'){
                    if (name.startsWith('lvl')) {  // dirty hack
                        localStorage.setItem('progress', name);
                    }
                    this.__loadSavedLvl(name);
                } else if (script[name][0] == 'scene'){
                    if (localStorage.getItem('progress')) {
                        this.__loadSavedLvl(name);
                    } else {
                        this.pushState(scenes[script[name][1]]);
                    }
                }
            }
        }
    }
};