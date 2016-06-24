/**
 * Very basic content pipeline.
 * 
 * Sprite:
 * params: img, x, y, width, height, img_width, img_height
 * 
 * cuts a sprite out of spritesheet
 * 
 *   methods:
 *   
 *     draw(ctx, pos)
 * 
 *       draws a sprite on canvas at pos given canvas context
 * 
 * initSprites(callback)
 * 
 *   loads sprites and when loaded calls callback.
 *   config is hardcoded into initSprites
 */


var sprites = {lvls:{}};

function Sprite(img, x, y, width, height, img_width, img_height) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width; 
	this.height = height;
	this.img_height = img_height || height;
	this.img_width = img_width || width;
}

Sprite.prototype.draw = function(ctx, pos) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, 
		pos.x, pos.y, this.img_width, this.img_height);
};


/**
 * to add new sprite to sprite resources:
 * Add object with fields img_source(path to resource) and sprite_layout - 
 * function which takes img as parameter and modifies global sprites variable
 * by adding cutted sprites out of img.
 */
function initSprites(callback) {
  var sources = [
  		{
  			img_source: 'resources/room.jpg',
  			sprite_layout: function(img) {
				sprites.lvls.lvl1 = new Sprite(img, 0,0,720,550);
		 	}
  		},
  		{
  			img_source: 'resources/R0279 Boutique Chateau - Free House Plan F2.jpg',
  			sprite_layout: function(img){
				sprites.lvls.lvl2 = new Sprite(img, 0, 0, 1000, 989);
  			}
  		},
  		{
  			img_source: 'resources/star.png',
  			sprite_layout: function(img) {
				sprites.player = new Sprite(img, 906,150,72,122,36,61);
		 	}
  		}
	];
	// do not modify below this line
  var not_loaded_imgs = sources.length;
  sources.forEach(function(source) {
  	var image = new Image();
  	image.src = source.img_source;
  	image.onload = function() {
  		source.sprite_layout(this);
  		not_loaded_imgs--;
  		if (not_loaded_imgs == 0) {
  			callback();
  		}
  	};
  });
  
}
