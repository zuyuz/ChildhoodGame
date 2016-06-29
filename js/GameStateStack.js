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
        this.pushState(new Level(JSON.parse(levels[savedLvl])));
        var text = GameStateStack.currentState().startingText;
        renderBuffer.push(new superText(text, canvas.width/2-text.length*30/2, 200, 5000));
    },
    
    next: function(){
        var name = this.currentState().name;
        if(name){
            if(script.hasOwnProperty(name)){
                this.popState();
                if(script[name][0] == 'level'){
                    sounds.background.pause();
                    localStorage.setItem('progress', script[name][1]);
                    this.__loadSavedLvl(name);
                } else if (script[name][0] == 'scene'){
                    if(sounds.background.paused){
                        sounds.background.play();
                    }
                    this.pushState(scenes[script[name][1]]);
                } else if (script[name][0] == 'menu'){
                    if(sounds.background.paused){
                        sounds.background.play();
                    }
                    GameStateStack.pushState(mainMenu);    
                }
            }
        }
    }
};