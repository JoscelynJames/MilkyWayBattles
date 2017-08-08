var game = function(spaceBattle) {}

game.prototype = {
  create : function() {
    backDrop = spaceBattle.add.tileSprite(0, 0, 1000, 1200, 'backDrop');
    spaceBattle.paused = true;
    startGame();

    mainShip = spaceBattle.add.sprite(500, 1100, 'mainShip');
    mainShip.width = 80;
    mainShip.height = 80;
    mainShip.anchor.set(0.5, 0.5);
    spaceBattle.physics.enable(mainShip, Phaser.Physics.ARCADE);
    mainShip.body.collideWorldBounds = true;
    bounds = new Phaser.Rectangle(100, 100, 500, 400);
    mainShip.boundsRect = bounds;

    lasers = spaceBattle.add.group();
    lasers.enableBody = true;
    lasers.physicsBodyType = Phaser.Physics.ARCADE;
    lasers.createMultiple(30, 'laser');
    lasers.setAll('anchor.x', 0.5);
    lasers.setAll('anchor.y', 0.5);
    lasers.setAll('sacle', 0.1)
    lasers.setAll('outOfBoundsKill', true);
    lasers.setAll('checkWorldBounds', true);

    enemyLasers = spaceBattle.add.group();
    enemyLasers.enablebody = true;
    enemyLasers.physicsBodyType = Phaser.Physics.ARCADE;
    enemyLasers.createMultiple(40, 'enemyLasers');
    enemyLasers.setAll('alpha', 0.9);
    enemyLasers.setAll('anchor.x', 0.5);
    enemyLasers.setAll('anchor.y', 0.5);
    enemyLasers.setAll('outOfBoundsKill', true);
    enemyLasers.setAll('checkWorldBounds', true);

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = spaceBattle.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    meteor = spaceBattle.add.group()
    meteor.enableBody = true;
    meteor.physicsBodyType = Phaser.Physics.ARCADE;
    meteor.createMultiple(50, 'meteor');
    meteor.setAll('anchor.x', 0.5);
    meteor.setAll('anchor.y', 0.5);
    meteor.setAll('outOfBoundsKill', true);
    meteor.setAll('checkWorldBounds', true);

    meteorShower();

    enemyFighter = spaceBattle.add.group();
    enemyFighter.enableBody = true;
    enemyFighter.physicsBodyStyle = Phaser.Physics.ARCADE;
    enemyFighter.createMultiple(5, 'enemyFighter');
    enemyFighter.setAll('anchor.x', 0.5);
    enemyFighter.setAll('anchor.y', 0.5);
    enemyFighter.setAll('scale.x', 0.5);
    enemyFighter.setAll('scale.y', 0.5);
    enemyFighter.setAll('outOfBoundsKill', true);
    enemyFighter.setAll('checkWorldBounds', true);

    launchEnemy();

    explosions = spaceBattle.add.group();
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE;
    explosions.createMultiple(30, 'explosion');
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);
    explosions.forEach( function(explosion) {
    explosion.animations.add('explosion');
    });

    displayScore = spaceBattle.add.text(spaceBattle.world.width - 120, 10, 'Score: ' + score, fonts);
    displayHealth = spaceBattle.add.text(spaceBattle.world.width - 300, 10, 'Health: ' + health, fonts);

    gameOver = spaceBattle.add.image(spaceBattle.world.centerX, spaceBattle.world.centerY, 'gameOverImg');
    gameOver.anchor.setTo(0.5, 0.5);
    gameOver.scale.x = 3.95;
    gameOver.scale.y = 6;
    gameOver.visible = false;

    restartButton = spaceBattle.add.text(spaceBattle.world.centerX -90, spaceBattle.world.centerY -400, 'CLICK TO RESART', fonts);
    restartButton.visible = false;
    restartButton.events.onInputDown.add(listener, this);

    gameStats = spaceBattle.add.text(spaceBattle.world.centerX - 90, spaceBattle.world.centerY - 300, 'Final ' + displayScore.text, fonts);
    gameStats.visible = false;
  }
}
