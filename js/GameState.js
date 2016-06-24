/**
 * GameState 
 * params: [entities], [onEvent], [render] 
 * Basic class for all game states.
 * 
 * methods:
 * 
 *   [onEvent(event)]
 * 
 *     processes event.
 *     by default pushes event to all entities
 * 
 *   [render()]
 * 
 *     by default renders all entities of state
 * 
*/


function GameState(entities, onEvent, render) {
    this.entities = entities || [];
    if (onEvent) {
        this.onEvent = onEvent;
    }
    if (render) {
        this.render = render;
    }
}


GameState.prototype.onEvent = function(event, map, response) {
    this.entities.forEach(function(entity) {
        entity.onEvent(event, map, response);
    });
};


GameState.prototype.render = function(ctx) {
    this.entities.forEach(function(entity) {
        entity.render(ctx);
    });
};