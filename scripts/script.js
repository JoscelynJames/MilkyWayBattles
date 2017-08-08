var spaceBattle = new Phaser.Game(1000, 1200, Phaser.AUTO, 'space-battle-div', {
  preload: preload, create: create, update: update
});

var backDrop;
  var mainMusic;
  var score = 0;
  var displayScore;
  var health = 100;
  var displayHealth;
  var mainShip;
  var lasers;
  var laser;
  var laserTime = 0;
  var nextFire = 0;
  var fireButton;
  var mainShipExplosion;
  var mainShipLaserAudio;
  var cursors;
  var meteor;
  var meteorShower;
  var enemyFigher1;
  var enemyFigher2;
  var explosion;
  var gameOver;
  var gameOverImg;
  var restartButton;
  var resetHandler;
  var tapRestart;
  var gameStats;
  var fonts = { font: '40px Bungee Hairline' , fill: '#fff' };
  var tapRestart;
  var spaceRestart;
  var enemyLasers;
  var enemyFireButton;
  var ultimateTracker = 0;
  var displayUltimate;
  var useUltimate;
  var laserUltimate;
  var laserBeam;
  var blackhole;
  var meteorShowerAlert;
  var shield;
  var activateshield;


function preload() {
  spaceBattle.physics.startSystem(Phaser.Physics.ARCADE);
  spaceBattle.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  spaceBattle.scale.pageAlignHorizontally = true;
  spaceBattle.scale.pageAlignVertically = true;
  this.bounds = (0, 0, spaceBattle.world.width, spaceBattle.world.height);

  spaceBattle.load.image('backDrop', 'attr/images/blackStarBG.jpg');
  spaceBattle.load.image('mainShip', 'attr/images/newMainShip.png');
  spaceBattle.load.image('laser', 'attr/images/blueLaser.png');
  spaceBattle.load.image('meteor', 'attr/images/meteor.png');
  spaceBattle.load.image('enemyFighter1', 'attr/images/enemyFighter1.png');
  spaceBattle.load.image('enemyFighter2', 'attr/images/enemyFighter2.png');
  spaceBattle.load.image('explosion', 'attr/images/explosion.png');
  spaceBattle.load.image('gameOverImg', 'attr/images/gameOver1.jpg');
  spaceBattle.load.image('enemyLasers', 'attr/images/enemyLasers.png');
  spaceBattle.load.image('blackhole', 'attr/images/blackhole.png');
  spaceBattle.load.image('shield', 'attr/images/shield.png')

  spaceBattle.load.audio('enemyLaserAudio', 'attr/audio/enemy_laser.wav');
  spaceBattle.load.audio('enemyShipExplosion', 'attr/audio/enemy_ship_explosion.wav');
  spaceBattle.load.audio('mainMusic', 'attr/audio/main_music.wav');
  spaceBattle.load.audio('mainShipExplosion', 'attr/audio/main_ship_explosion.mp3');
  spaceBattle.load.audio('mainShipLaserAudio', 'attr/audio/main_ship_laser.wav');
  spaceBattle.load.audio('menusMusic', 'attr/audio/main_music.wav');
  spaceBattle.load.audio('meteorExplosion', 'attr/audio/meteor_explosion.wav');
  spaceBattle.load.audio('onClickAudio', 'attr/audio/on_click_noise.wav');


} // <----------------- end of Preload------------------------------------


function create() {
  bounds = new Phaser.Rectangle(100, 100, 500, 400);
  backDrop = spaceBattle.add.tileSprite(0, 0, 1000, 1200, 'backDrop');
  spaceBattle.paused = true;
  startGame();
  mainMusic = spaceBattle.add.audio('mainMusic');
  mainMusic.loop = true;
  mainMusic.play()

  mainShip = spaceBattle.add.sprite(500, 1100, 'mainShip');
  mainShip.width = 150;
  mainShip.height = 150;
  mainShip.anchor.set(0.5, 0.5);
  spaceBattle.physics.enable(mainShip, Phaser.Physics.ARCADE);
  mainShip.body.collideWorldBounds = true;

  mainShip.boundsRect = bounds;

  mainShipLaserAudio = spaceBattle.add.audio('mainShipLaserAudio')
  lasers = spaceBattle.add.group();
  lasers.enableBody = true;
  lasers.physicsBodyType = Phaser.Physics.ARCADE;
  lasers.createMultiple(30, 'laser');
  lasers.setAll('anchor.x', 0.5);
  lasers.setAll('anchor.y', 0.5);
  lasers.setAll('checkWorldBounds', true);
  lasers.setAll('outOfBoundsKill', true);

  cursors = this.input.keyboard.createCursorKeys();
  fireButton = spaceBattle.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  meteorExplosion = spaceBattle.add.audio('meteorExplosion')
  meteor = spaceBattle.add.group()
  meteor.enableBody = true;
  meteor.physicsBodyType = Phaser.Physics.ARCADE;
  meteor.createMultiple(10, 'meteor');
  meteor.setAll('anchor.x', 0.5);
  meteor.setAll('anchor.y', 0.5);
  meteor.setAll('checkWorldBounds', true);
  meteor.setAll('outOfBoundsKill', true);
  meteorShowerAlert = spaceBattle.add.text(spaceBattle.world.centerX - 150, spaceBattle.world.centerY, 'Meteor Shower', fonts)
  meteorShowerAlert.visible = false;
  spaceBattle.time.events.loop(Phaser.Timer.SECOND * 15, updateMeteorShower, this);

  enemyFighter1 = spaceBattle.add.group();
  enemyFighter1.enableBody = true;
  enemyFighter1.physicsBodyStyle = Phaser.Physics.ARCADE;
  enemyFighter1.createMultiple(2, 'enemyFighter1');
  enemyFighter1.setAll('anchor.x', 0.5);
  enemyFighter1.setAll('anchor.y', 0.5);
  enemyFighter1.setAll('scale.x', 0.5);
  enemyFighter1.setAll('scale.y', 0.5);
  enemyFighter1.setAll('checkWorldBounds', true);
  enemyFighter1.setAll('outOfBoundsKill', true);
  enemyFighter1.boundsRect = bounds;

  enemyFighter2 = spaceBattle.add.group();
  enemyFighter2.enableBody = true;
  enemyFighter2.physicsBodyStyle = Phaser.Physics.ARCADE;
  enemyFighter2.createMultiple(5, 'enemyFighter2');
  enemyFighter2.setAll('anchor.x', 0.5);
  enemyFighter2.setAll('anchor.y', 0.5);
  enemyFighter2.setAll('scale.x', 0.5);
  enemyFighter2.setAll('scale.y', 0.5);
  enemyFighter2.setAll('checkWorldBounds', true);
  enemyFighter2.setAll('outOfBoundsKill', true);
  enemyFighter2.boundsRect = bounds;
  launchEnemy2()

  enemyLaserAudio = spaceBattle.add.audio('enemyLaserAudio')
  enemyLasers = spaceBattle.add.group();
  enemyLasers.enableBody = true;
  enemyLasers.physicsBodyType = Phaser.Physics.ARCADE;
  enemyLasers.createMultiple(15, 'enemyLasers');
  enemyLasers.setAll('anchor.x', 0.5);
  enemyLasers.setAll('anchor.y', 1);
  enemyLasers.setAll('scale.x', 2);
  enemyLasers.setAll('scale.y', 2);
  enemyLasers.setAll('checkWorldBounds', true);
  enemyLasers.setAll('outOfBoundsKill', true);


  enemyShipExplosion = spaceBattle.add.audio('enemyShipExplosion');
  mainShipExplosion = spaceBattle.add.audio('mainShipExplosion')
  explosions = spaceBattle.add.group();
  explosions.enableBody = true;
  explosions.physicsBodyType = Phaser.Physics.ARCADE;
  explosions.createMultiple(30, 'explosion');
  explosions.setAll('anchor.x', 0.5);
  explosions.setAll('anchor.y', 0.5);
  explosions.forEach( function(explosion) {
  explosion.animations.add('explosion');
  });

  shield = spaceBattle.add.sprite(240, 800, 'shield');
  shield.enableBody = true;
  shield.physicsBodyType = Phaser.Physics.ARCADE;
  shield.boundsRect = bounds;

  displayScore = spaceBattle.add.text(spaceBattle.world.width - 280, 10, 'Score: ' + score, fonts);
  displayHealth = spaceBattle.add.text(spaceBattle.world.width - 600, 10, 'Health: ' + health, fonts);

  gameOver = spaceBattle.add.image(spaceBattle.world.centerX, spaceBattle.world.centerY, 'gameOverImg');
  gameOver.anchor.setTo(0.5, 0.5);
  gameOver.scale.x = .9;
  gameOver.visible = false;

  restartButton = spaceBattle.add.text(spaceBattle.world.centerX -255, spaceBattle.world.centerY -430, 'CLICK TO RESTART', { font: '60px Bungee Hairline' , fill: '#fff' });
  restartButton.visible = false;


}; //<---------------------------end of Create-------------------------------


function update() {
  spaceBattle.physics.arcade.overlap(mainShip, enemyFighter1, shipCollide, null, this);
  spaceBattle.physics.arcade.overlap(enemyFighter1, lasers, hitEnemy, null, this);
  spaceBattle.physics.arcade.overlap(mainShip, enemyFighter2, shipCollide, null, this);
  spaceBattle.physics.arcade.overlap(enemyFighter2, lasers, hitEnemy, null, this);
  spaceBattle.physics.arcade.overlap(meteor, lasers, hitMeteor, null, this);
  spaceBattle.physics.arcade.overlap(meteor, mainShip, meteorHit, null, this);
  spaceBattle.physics.arcade.overlap(mainShip, enemyLasers, enemyLaserHitShip, null, this);
  spaceBattle.physics.arcade.overlap(blackhole, meteor, blackholeKill, null, this);
  spaceBattle.physics.arcade.overlap(shield, meteor, shieldCollision, null, this);
  spaceBattle.physics.arcade.overlap(shield, enemyFighter2, shieldCollision1, null, this);
  spaceBattle.physics.arcade.overlap(shield, enemyFighter1, shieldCollision2, null, this);
  spaceBattle.physics.arcade.overlap(lasers, enemyLasers, laserCollision, null, this);

  if (cursors.left.isDown){
      mainShip.x -= 8;
  }
  else if (cursors.right.isDown) {
      mainShip.x += 8;
  }
  if (fireButton.isDown) {
      fireLaser();
  }
  if (score >= 300) {
    spaceBattle.add.text(200, 300, 'New Enemies', fonts)
    launchEnemy();
  }
  if (shield.visible = true) {

  }
  if (health <= 0) {
    gameOver.visible = true;
    restartButton.visible = true;
    mainShip.kill()
    gameStats = spaceBattle.add.text(spaceBattle.world.centerX - 210, spaceBattle.world.centerY - 250, 'Final ' + displayScore.text, { font: '50px Bungee Hairline' , fill: '#fff' });

    setResetHandlers()
    function setResetHandlers() {
      tapRestart = spaceBattle.input.onTap.addOnce(_restart,this);
      function _restart() {
        location.reload()
      }
    }
  }
} // <-------------------- end of Update----------------------------------
