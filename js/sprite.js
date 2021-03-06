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


var sprites = {lvls:{}, scene:{}};

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
  			img_source: 'resources/level2.png',
  			sprite_layout: function(img){
				sprites.lvls.lvl2 = new Sprite(img, 0, 0, 1024, 768);
  			}
  		},
  		{
  			img_source: 'resources/level3.png',
  			sprite_layout: function(img){
				sprites.lvls.lvl3 = new Sprite(img, 0, 0, 2560, 2560);
  			}
  		},
  		{
  			img_source: 'resources/level4.png',
  			sprite_layout: function(img){
				sprites.lvls.lvl4 = new Sprite(img, 0, 0, 2560, 2560);
  			}
  		},
  		{
  			img_source: 'resources/level5.png',
  			sprite_layout: function(img){
				sprites.lvls.lvl5 = new Sprite(img, 0, 0, 2560, 2560);
  			}
  		},
  		{
  			img_source: 'resources/player.png',
  			sprite_layout: function(img) {
				sprites.player = new Sprite(img, 0,0, 600, 800, 48, 64);
		 	}
  		},
  		{
  			img_source: 'resources/menuBg.png',
  			sprite_layout: function(img) {
				sprites.mainMenu = new Sprite(img, 0,0,500,500);
		 	}
  		},
  		{
  			img_source: 'resources/story1.png',
  			sprite_layout: function(img) {
				sprites.scene['scene1'] = new Sprite(img, 0,0,500,500);
		 	}
  		},
  		{
  			img_source: 'resources/story2.png',
  			sprite_layout: function(img) {
				sprites.scene['scene2'] = new Sprite(img, 0,0,500,500);
		 	}
  		},
  		{
  			img_source: 'resources/story3.png',
  			sprite_layout: function(img) {
				sprites.scene['scene3'] = new Sprite(img, 0,0,500,500);
		 	}
  		},
  		{
  			img_source: 'resources/story4.png',
  			sprite_layout: function(img) {
				sprites.scene['scene4'] = new Sprite(img, 0,0,500,500);
		 	}
  		},
  		{
  			img_source: 'resources/tutorial.png',
  			sprite_layout: function(img) {
				sprites.scene['tutorial'] = new Sprite(img, 0,0,500,500);
		 	}
  		},
  		{
  			img_source: 'resources/finalScene.png',
  			sprite_layout: function(img) {
				sprites.scene['finalScene'] = new Sprite(img, 0,0,600,600);
		 	}
  		},
  		{
  			img_source: 'resources/intro.png',
  			sprite_layout: function(img) {
				sprites.scene['intro'] = new Sprite(img, 0,0,500,500);
		 	}
  		},
		 {
  			img_source: 'resources/start.png',
  			sprite_layout: function(img) {
				sprites.startGame = new Sprite(img, 0,0,300,100);
		 	}
  		},
  		 {
  			img_source: 'resources/quit.png',
  			sprite_layout: function(img) {
				sprites.endGame = new Sprite(img, 0,0,300,100);
		 	}
  		},
  		{
  			img_source: 'resources/resume.png',
  			sprite_layout: function(img) {
				sprites.resume = new Sprite(img, 0,0,150,70);
		 	}
  		},
  		{
  			img_source: 'resources/credits.png',
  			sprite_layout: function(img) {
				sprites.lightbulb = new Sprite(img, 0,0,150,70);
		 	}
  		},
  		{
  			img_source: 'resources/titles.png',
  			sprite_layout: function(img) {
				sprites.scene['titles'] = new Sprite(img, 0,0,500,1300);
		 	}
  		},
  		{
  			img_source: 'resources/bar.png',
  			sprite_layout: function(img) {
				sprites.levelBanner = new Sprite(img, 0,0,900,100);
		 	}
  		},
  		{
  			img_source: 'resources/buttons.png',
  			sprite_layout: function(img) {
				sprites.menu = new Sprite(img, 0,17,85,66);
				sprites.repeat = new Sprite(img, 129,17,72,55);
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
