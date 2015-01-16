
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);
      
    this.load.image('background', 'assets/background.png');
    this.load.image('skyline', 'assets/skyline.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('hills', 'assets/hills.png');
    this.load.image('title', 'assets/logo.png');
    this.load.image('startButton', 'assets/start-button.png');

      //load the bird
    this.load.spritesheet('bird', 'assets/bird.png', 75, 87, 3);
      
      //load the pipes
      this.load.spritesheet('pipe', 'assets/pipes.png', 100,500,2);  
      
      //font for scoring
      this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
        //this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
