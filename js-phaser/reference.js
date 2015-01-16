
//Load Sprite
game.load.image('bird', 'assets/bird.png');   

//Add it to Game Scene
this.bird = this.game.add.sprite(100, 245, 'bird');

// Physics and Gravity
game.physics.startSystem(Phaser.Physics.ARCADE);
game.physics.arcade.enable(this.bird);
this.bird.body.gravity.y = 500;  

// Set initial velocity
this.bird.body.velocity.x = 100;

// Angle downward over time
this.bird.angle += 1;

// Jump
var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
spaceKey.onDown.add(function() {
    this.bird.body.velocity.y = -350;
    game.add.tween(this.bird).to({angle: -20}, 100).start();  
}, this);   