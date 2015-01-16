// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 

    },

    create: function() { 

    },

    update: function() {

    },
    
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');  