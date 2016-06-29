var scenes = {};

function Scene(obj){
    this.name = obj.name;
    this.interface = obj.interface;
    if(obj.update){
        this.update = obj.update;
    }
}

Scene.prototype.state = 'scene';

Scene.prototype.render = function(ctx){
    this.update();
    for (let uiElem of this.interface) {
        uiElem.render(ctx);
    }
}
Scene.prototype.renderUI = function(ctx){
    //maybe add return button on top
}
Scene.prototype.update = function(){
    
}

Scene.prototype.onClick = function(point){
    for (let uiElem of this.interface) {
        if (uiElem.contains(point)) {
            return uiElem.onClick()
        }
    }
}

function ScenesInit(){
    scenes = {};
    scenes['scene1'] = new Scene({
        'name': 'scene1',
        'interface': [
            new Button((canvas.width - sprites.scene['scene1'].width)/2,
                     (canvas.height - sprites.scene['scene1'].height)/2,
                     sprites.scene['scene1'].width, sprites.scene['scene1'].height,
                    sprites.scene['scene1'], function(){ GameStateStack.next() })
        ]
    });
    
    scenes['scene2'] = new Scene({
        'name': 'scene2',
        'interface': [
            new Button((canvas.width - sprites.scene['scene2'].width)/2,
                     (canvas.height - sprites.scene['scene2'].height)/2,
                     sprites.scene['scene2'].width, sprites.
                     scene['scene2'].height,
                    sprites.scene['scene2'], function(){ GameStateStack.next() })
        ]
    });
    
    scenes['scene3'] = new Scene({
        'name': 'scene3',
        'interface': [
            new Button((canvas.width - sprites.scene['scene3'].width)/2,
                     (canvas.height - sprites.scene['scene3'].height)/2,
                     sprites.scene['scene3'].width, sprites.
                     scene['scene3'].height,
                    sprites.scene['scene3'], function(){ GameStateStack.next() })
        ]
    });
    
    scenes['scene4'] = new Scene({
        'name': 'scene4',
        'interface': [
            new Button((canvas.width - sprites.scene['scene4'].width)/2,
                     (canvas.height - sprites.scene['scene4'].height)/2,
                     sprites.scene['scene4'].width, sprites.
                     scene['scene4'].height,
                    sprites.scene['scene4'], function(){ GameStateStack.next() })
        ]
    });
    
    scenes['intro'] = new Scene({
        'name': 'intro',
        'interface': [
            new Button((canvas.width - sprites.scene['intro'].width)/2,
                     (canvas.height - sprites.scene['intro'].height)/2,
                     sprites.scene['intro'].width, sprites.
                     scene['intro'].height,
                    sprites.scene['intro'], function(){ GameStateStack.next() })
        ]
    });
    scenes['menu'] = new Scene({
        'interface': [
            new Banner(sprites.mainMenu, new  Point(canvas.width/2-250, canvas.height/2-250)),
            new Button(canvas.width/2-150, canvas.height/2-150, 300, 100, sprites.startGame, () => {
                localStorage.removeItem('progress');
                GameStateStack.next();
            }),
            new Button(canvas.width/2-75, canvas.height/2-35, 150, 70, sprites.resume, 
                () => {GameStateStack.popState()}),
            new Button(canvas.width/2-150, canvas.height/2+50, 300, 100, sprites.endGame, () => {window.close();})
        ],
        'name': 'menu'
    });
    scenes['finalScene'] = new Scene({
        'name': 'finalScene',
        'interface': [
            new Button((canvas.width - sprites.scene['finalScene'].width)/2,
                (canvas.height - sprites.scene['finalScene'].height)/2,
                sprites.scene['finalScene'].width, sprites.
                scene['finalScene'].height,
                sprites.scene['finalScene'], function(){ GameStateStack.next() })    
        ]
    });
    scenes['titles'] = new Scene({
        
        'name': 'titles',
        'interface': [
            new Button((canvas.width - sprites.scene['titles'].width)/2,
                canvas.height,
                sprites.scene['titles'].width, sprites.
                scene['titles'].height,
                sprites.scene['titles'], function(){ GameStateStack.popState() })     
        ],
        'update': function(){
            var deltaSec = (new Date().getTime() - lastUpdate)/1000;
            this.interface[0].y -= deltaSec*100;
            if(this.interface[0].y+this.interface[0].height<0){
                this.interface[0].y = canvas.height;
            }
        } 
    });
}