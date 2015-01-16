'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);
    this.anchor.setTo(0.5, 0.5);

  // initialize your prefab here
    this.animations.add('flap');
    this.animations.play('flap', 8, true);
        
    this.game.physics.arcade.enableBody(this);
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
    //angle the bird downward 
    if(this.angle < 40) {
        this.angle += 2;
    }
};

Bird.prototype.flap = function() {
    this.body.velocity.y = -400;
    
    // rotate the bird to -40 degrees
    this.game.add.tween(this).to({angle: -40}, 200  ).start();
}; 

module.exports = Bird;
