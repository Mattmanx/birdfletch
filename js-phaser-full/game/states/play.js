
  'use strict';

  var Bird = require('../prefabs/bird');  
  var Ground = require('../prefabs/ground');  
  var PipeGroup = require('../prefabs/pipeGroup');  

  function Play() {}
  Play.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        this.background = this.game.add.sprite(0,0,'background');
        
        //the ground
        this.ground = new Ground(this.game, 0, 545, 400, 155); 
        this.game.add.existing(this.ground);
        
        //skyline 
        this.skyline = this.game.add.tileSprite(0, 310, 425, 176, 'skyline');
        this.skyline.autoScroll(-25, 0);
      
        this.hills = this.game.add.sprite(0, 470, 'hills');
        
        // Create a new bird object
        this.bird = new Bird(this.game, 100, this.game.height/2);
        // and add it to the game
        this.game.add.existing(this.bird);
        
        // create and add a group to hold our pipeGroup prefabs
        this.pipes = this.game.add.group();
        
        // keep the spacebar from propogating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        // add keyboard controls
        var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        flapKey.onDown.add(this.bird.flap, this.bird);
        
        // add mouse/touch controls
        this.input.onDown.add(this.bird.flap, this.bird);
        
        // add a timer
        this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
        this.pipeGenerator.timer.start();
        
        this.score = 0;
        
        this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);
    },
    update: function() {
        this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
        
        this.pipes.forEach(function(pipeGroup) {
            this.checkScore(pipeGroup);
            this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
        }, this);
    },
    clickListener: function() {

    },
    shutdown: function() {  
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
    },
    generatePipes: function() {  
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);
        
      if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes);  
      }
        
      pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
    },
    deathHandler: function() {  
        this.game.state.start('gameover');
    },
    checkScore: function(pipeGroup) {  
        if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
            pipeGroup.hasScored = true;
            this.score++;
            this.scoreText.setText(this.score.toString());
        }
    }
  };
  
  module.exports = Play;