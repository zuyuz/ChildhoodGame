var mainMenu;

function initMenu(){
    var ui = [
        new Banner(sprites.mainMenu, new  Point(canvas.width/2-250, canvas.height/2-250)),
        new Button(canvas.width/2-150, canvas.height/2-150, 300, 100, sprites.startGame, () => {
            GameStateStack.next();
        }),
        new Button(canvas.width/2-150, canvas.height/2+50, 300, 100, sprites.endGame, () => {window.close();})
    ];
    mainMenu = new Scene({
        'name': 'menu',
        'interface': ui,
        'background': undefined
    });
}