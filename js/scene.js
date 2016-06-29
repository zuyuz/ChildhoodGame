var scenes = {};

function Scene(obj){
    this.name = obj.name;
    this.interface = obj.interface;
}

Scene.prototype.state = 'scene';

Scene.prototype.render = function(ctx){
    for (let uiElem of this.interface) {
        uiElem.render(ctx);
    }
}
Scene.prototype.renderUI = function(ctx){
    //maybe add return button on top
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
}