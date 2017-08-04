var container = document.getElementById('#space-battle-div')
var spaceBattle = new Phaser.Game(1000, 1200, Phaser.AUTO, 'space-battle-div', {
  preload: preload, create: create, update: update
});

var score = 0;
var displayScore;
var health = 100;
var displayHealth;
var backDrop;
var mainShip;
var lasers;
var laser;
var laserTime = 0;
var nextFire = 0;
var fireButton;
var cursors;
var meteor;
var meteorShower;
var enemyFigher;
var explosion;
var gameOver;
var gameOverImg;
var restartButton;
var resetHandler;
var tapRestart;
var gameStats;
var ultimateTracker = 0;
var fonts = { font: '20px Arial', fill: '#fff' };
var tapRestart;
var spaceRestart;
var enemyLasers;
var enemyFireButton;
var enemyLaserTime = 0;
var livingEnemies = [];

function preload() {
  spaceBattle.physics.startSystem(Phaser.Physics.ARCADE);
  spaceBattle.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  spaceBattle.scale.pageAlignHorizontally = true;
  spaceBattle.scale.pageAlignVertically = true;
  this.bounds = (0, 0, spaceBattle.world.width, spaceBattle.world.height);

  spaceBattle.load.image('backDrop', 'attr/images/space1.png');
  spaceBattle.load.image('mainShip', 'attr/images/mainShip.png');
  spaceBattle.load.image('laser', 'attr/images/greenFlame.png');
  spaceBattle.load.image('meteor', 'attr/images/meteor.png');
  spaceBattle.load.image('enemyFighter', 'attr/images/enemyFighter.png');
  spaceBattle.load.image('explosion', 'attr/images/explosion.png');
  spaceBattle.load.image('gameOverImg', 'attr/images/gameOver.jpeg');
  spaceBattle.load.image('enemyLasers', 'attr/images/enemyLasers.png');
} // <--- end of Preload

function create() {
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
}; //<--- end of Create

function update() {
  console.log(Phaser.Timer.SECOND * 4);
  spaceBattle.physics.arcade.overlap(mainShip, enemyFighter, shipCollide, null, this);
  spaceBattle.physics.arcade.overlap(enemyFighter, lasers, hitEnemy, null, this);
  spaceBattle.physics.arcade.overlap(meteor, lasers, hitMeteor, null, this);
  spaceBattle.physics.arcade.overlap(meteor, mainShip, meteorHit, null, this);
  // spaceBattle.physics.arcade.overlap(mainShip, enemyLasers, enemyLaserHitShip, null, this);

  if (cursors.left.isDown){
      mainShip.x -= 8;
  }
  else if (cursors.right.isDown) {
      mainShip.x += 8;
  }
  if (fireButton.isDown) {
      fireLaser();
  }
  if (displayHealth.text.length <= 9) {
    spaceBattle.paused = true;
    gameOver.visible = true;
    restartButton.visible = true;
    gameStats.visible = true;

    setResetHandlers()
    function setResetHandlers() {
      tapRestart = spaceBattle.input.onTap.addOnce(_restart,this);
      spaceRestart = fireButton.onDown.addOnce(_restart,this);
      function _restart() {
        location.reload()
      }
    }
  }

} // <--- end of Update


///Start of functions area

function fireLaser () {
  if (spaceBattle.time.now > laserTime) {
    var BULLET_SPEED = 500;
    var BULLET_SPACING = 200;
    laser = lasers.getFirstExists(false);

  if (laser) {

    var laserOffset = 20 * Math.sin(spaceBattle.math.degToRad(mainShip.angle));
    laser.reset(mainShip.x, mainShip.y);
    spaceBattle.physics.arcade.velocityFromAngle(laser.angle - 90, BULLET_SPEED, laser.body.velocity);
    laser.body.velocity.x += mainShip.body.velocity.x;

    laserTime = spaceBattle.time.now + BULLET_SPACING;
   }
  }
};

function resetBullet (laser) {
  laser.kill();
};

function launchEnemy() {
  var MIN_ENEMY_SPACING = 300;
  var MAX_ENEMY_SPACING = 3000;
  var ENEMY_SPEED = 200;

  var enemy = enemyFighter.getFirstExists(false);
  if (enemy) {
    enemy.reset(spaceBattle.rnd.between(0, spaceBattle.width), -20);
    enemy.body.velocity.x = spaceBattle.rnd.between(-300, 300);
    enemy.body.velocity.y = ENEMY_SPEED;
    enemy.body.drag.x = 100;
  }
  spaceBattle.time.events.add(spaceBattle.rnd.between(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchEnemy);
};

function enemyLaserHitShip() {
  enemyLasers.kill();
  health -= 10;
  displayHealth.text = 'Health: ' + health;
};

function shipCollide(mainShip, enemyFighter) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter.body.x + enemyFighter.body.halfWidth, enemyFighter.body.y + enemyFighter.body.halfHeight);
  explosion.body.velocity.y = enemyFighter.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  enemyFighter.kill();
  health -= 20;
  displayHealth.text = 'Health: ' + health;
};

function hitEnemy(enemyFighter, lasers) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(lasers.body.x + lasers.body.halfWidth, lasers.body.y + lasers.body.halfHeight);
    explosion.body.velocity.y = enemyFighter.body.velocity.y;
    explosion.alpha = 3;
    explosion.play('explosion', 30, false, true);
    enemyFighter.kill();
    lasers.kill()
    score += 10
    displayScore.text = 'Score: ' + score;
};

function hitMeteor(meteor, lasers) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(lasers.body.x + lasers.body.halfWidth, lasers.body.y + lasers.body.halfHeight);
  // explosion.body.velocity.y = enemyFighter.body.velocity.y;
  explosion.alpha = 3;
  explosion.play('explosion', 30, false, true);
  lasers.kill();
  meteor.kill();
  score += 5;
  displayScore.text = 'Score: ' + score;
};

function meteorHit(meteor, mainShip) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShip.kill();
  health -= 10;
  displayHealth.text = 'Health: ' + health;
};

function meteorShower() {
  var MIN_ENEMY_SPACING = 300;
  var MAX_ENEMY_SPACING = 350;
  var ENEMY_SPEED = 200;

  var meteors = meteor.getFirstExists(false);
  if (meteors) {
    meteors.reset(spaceBattle.rnd.between(0, spaceBattle.width), -20);
    meteors.scale.x = Math.random() - .4;
    meteors.scale.y = meteors.scale.x;
    meteors.body.velocity.x = spaceBattle.rnd.between(-300, 300);
    meteors.body.velocity.y = spaceBattle.rnd.between(-300, 300);
    meteors.body.drag.x = 100;
  }
  spaceBattle.time.events.add(spaceBattle.rnd.between(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), meteorShower);
};
function displayGameOver() {
  spaceBattle.world.removeAll();
  gameOver = spaceBattle.add.tileSprite(0, 0, 1000, 1200, 'gameOverImg');
}

function listener() {
  spaceBattle.state.start(spaceBattle.state.current);
};

function startGame() {
  if (spaceBattle.paused = true) {
    var onClick = spaceBattle.input.onTap.addOnce(start ,this);
      function start() {
        spaceBattle.paused = false;
      }
  }
}
