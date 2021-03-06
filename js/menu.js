var mainMenu;

function initMenu(){
    var ui = [
        new Banner(sprites.mainMenu, new  Point(canvas.width/2-250, canvas.height/2-250)),
        new Button(canvas.width/2-150, canvas.height/2-150, 300, 100, sprites.startGame, () => {
            localStorage.removeItem('progress');
            GameStateStack.next();
        }),
        new Button(canvas.width/2-150, canvas.height/2+50, 300, 100, sprites.endGame, () => {window.close();}),
        new Button(canvas.width/2, canvas.height/2-35, 150, 70, sprites.lightbulb, () => {GameStateStack.pushState(scenes['titles'])})
    ];
    if(localStorage.getItem('progress')){
        ui.push(new Button(canvas.width/2-150, canvas.height/2-35, 150, 70, sprites.resume, () => {
            sounds.background.pause();
            
            GameStateStack.pushState(new Level(JSON.parse(levels[localStorage.getItem('progress')])));
            var text = GameStateStack.currentState().startingText;
            renderBuffer.push(new superText(text, canvas.width/2-text.length*25/2, player.pos.y - 100, 5000));
        }));
    }
    mainMenu = new Scene({
        'name': 'menu',
        'interface': ui,
        'background': undefined
    });
}