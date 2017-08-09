var spaceBattle = new Phaser.Game(1200, 1400, Phaser.AUTO, 'space-battle-div', {
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
  var fireButton;
  var mainShipExplosion;
  var mainShipLaserAudio;
  var cursors;
  var a, d, q;
  var meteor;
  var enemyFighter1;
  var enemyFighter2;
  var explosions;
  var gameOver;
  var restartButton;
  var tapRestart;
  var gameStats;
  var fonts = { font: '40px Bungee Hairline' , fill: '#fff' };
  var enemyLasers;
  var meteorShowerAlert;
  var shield;
  var shieldCount = 0;
  var chargeShield, chargeShield1, chargeShield2;
  var clickAudio;
  var startScreen;


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
  spaceBattle.load.image('shield', 'attr/images/shield.png');
  spaceBattle.load.image('shieldLogo', 'attr/images/glowingSheild.png');
  spaceBattle.load.image('logo', 'attr/images/MilkyWay.png');

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
  backDrop = spaceBattle.add.tileSprite(0, 0, 1200, 1400, 'backDrop');
  spaceBattle.paused = true;

  startScreen = spaceBattle.add.image(340 , 300 , 'logo');

  startGame();
  mainMusic = spaceBattle.add.audio('mainMusic');
  clickAudio = spaceBattle.add.audio('onClickAudio');
  mainMusic.loop = true;
  mainMusic.play();

  mainShip = spaceBattle.add.sprite(620, 1300, 'mainShip');
  mainShip.width = 150;
  mainShip.height = 150;
  mainShip.anchor.set(0.5, 0.5);
  spaceBattle.physics.enable(mainShip, Phaser.Physics.ARCADE);
  mainShip.body.collideWorldBounds = true;

  mainShip.boundsRect = bounds;

  shield = spaceBattle.add.sprite(620, 1300, 'shield');
  shield.height = 350;
  shield.width = 350;
  shield.anchor.set(-0.5, -0.5);
  spaceBattle.physics.arcade.enable(shield);


  chargeShield = spaceBattle.add.image(10, 10, 'shieldLogo')
  chargeShield.height = 60;
  chargeShield.width = 60;
  // chargeShield.visible = false;
  chargeShield1 = spaceBattle.add.image(75, 10, 'shieldLogo')
  chargeShield1.height = 60;
  chargeShield1.width = 60;
  // chargeShield1.visible = false;
  chargeShield2 = spaceBattle.add.image(140, 10, 'shieldLogo')
  chargeShield2.height = 60;
  chargeShield2.width = 60;
  // chargeShield2.visible = false;

  mainShipLaserAudio = spaceBattle.add.audio('mainShipLaserAudio')
  lasers = spaceBattle.add.group();
  lasers.enableBody = true;
  lasers.physicsBodyType = Phaser.Physics.ARCADE;
  lasers.createMultiple(30, 'laser');
  lasers.setAll('anchor.x', 0.5);
  lasers.setAll('anchor.y', 0.5);
  lasers.setAll('collideWorldBounds', true);
  lasers.setAll('checkWorldBounds', true);
  lasers.setAll('outOfBoundsKill', true);

  cursors = this.input.keyboard.createCursorKeys();
  a = spaceBattle.input.keyboard.addKey(Phaser.Keyboard.A);
  d = spaceBattle.input.keyboard.addKey(Phaser.Keyboard.D);
  q = spaceBattle.input.keyboard.addKey(Phaser.Keyboard.Q);
  ultimateButton = spaceBattle.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
  fireButton = spaceBattle.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  meteorExplosion = spaceBattle.add.audio('meteorExplosion');
  meteor = spaceBattle.add.group();
  meteor.enableBody = true;
  meteor.physicsBodyType = Phaser.Physics.ARCADE;
  meteor.createMultiple(10, 'meteor');
  meteor.setAll('anchor.x', 0.5);
  meteor.setAll('anchor.y', 0.5);
  meteor.setAll('checkWorldBounds', true);
  meteor.setAll('outOfBoundsKill', true);
  meteorShowerAlert = spaceBattle.add.text(
    spaceBattle.world.centerX -550,
    spaceBattle.world.centerY,
    'Warning! Asteroid belt ahead!',
    { font: '60px Bungee Hairline' , fill: '#fff' });
  meteorShowerAlert.visible = false;
  spaceBattle.time.events.add(Phaser.Timer.SECOND * 15,
    updateMeteorShower,
    this,
    meteor);


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
  spaceBattle.time.events.add(
    Phaser.Timer.SECOND * 5,
    launchEnemy2,
    this,
    enemyFighter2);

  enemyFighter1 = spaceBattle.add.group();
  enemyFighter1.enableBody = true;
  enemyFighter1.physicsBodyStyle = Phaser.Physics.ARCADE;
  enemyFighter1.createMultiple(5, 'enemyFighter1');
  enemyFighter1.setAll('anchor.x', 0.5);
  enemyFighter1.setAll('anchor.y', 0.5);
  enemyFighter1.setAll('scale.x', 0.5);
  enemyFighter1.setAll('scale.y', 0.5);
  enemyFighter1.setAll('checkWorldBounds', true);
  enemyFighter1.setAll('outOfBoundsKill', true);
  spaceBattle.time.events.add(
    Phaser.Timer.SECOND * 30,
    launchEnemy,
    this,
    enemyFighter1);


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
  mainShipExplosion = spaceBattle.add.audio('mainShipExplosion');
  explosions = spaceBattle.add.group();
  explosions.enableBody = true;
  explosions.physicsBodyType = Phaser.Physics.ARCADE;
  explosions.createMultiple(30, 'explosion');
  explosions.setAll('anchor.x', 0.5);
  explosions.setAll('anchor.y', 0.5);
  explosions.forEach(function(explosion) {
    explosion.animations.add('explosion');
  });

  displayScore = spaceBattle.add.text(
    spaceBattle.world.width - 450,
    10,
    'Score: ' + score,
    fonts);
  displayHealth = spaceBattle.add.text(
    spaceBattle.world.width - 900,
    10,
    'Health: ' + health,
    fonts);

  gameOver = spaceBattle.add.image(
    spaceBattle.world.centerX,
    spaceBattle.world.centerY,
    'gameOverImg');
  gameOver.anchor.setTo(0.5, 0.5);
  gameOver.scale.x = .9;
  gameOver.visible = false;

  restartButton = spaceBattle.add.text(
    spaceBattle.world.centerX -255,
    spaceBattle.world.centerY -430,
    'CLICK TO RESTART',
    { font: '60px Bungee Hairline', fill: '#fff' });
  restartButton.visible = false;


}; //<---------------------------end of Create-------------------------------


function update() {
  console.log(shieldCount);
  spaceBattle.physics.arcade.overlap(mainShip, enemyFighter1, shipCollide, null, this);
  spaceBattle.physics.arcade.overlap(mainShip, enemyFighter2, shipCollide, null, this);
  spaceBattle.physics.arcade.overlap(mainShip, meteor, meteorHit, null, this);

  spaceBattle.physics.arcade.overlap(shield, meteor, shieldCollision, null, this);
  spaceBattle.physics.arcade.overlap(shield, enemyFighter2, shieldCollision1, null, this);
  spaceBattle.physics.arcade.overlap(shield, enemyFighter1, shieldCollision2, null, this);

  spaceBattle.physics.arcade.overlap(enemyFighter1, lasers, hitEnemy, null, this);

  spaceBattle.physics.arcade.overlap(enemyFighter2, lasers, hitEnemy, null, this);

  spaceBattle.physics.arcade.overlap(meteor, lasers, hitMeteor, null, this);

  if (a.isDown || cursors.left.isDown){
      mainShip.x -= 12;
  } else if (d.isDown || cursors.right.isDown) {
      mainShip.x += 12;
  }

  if (fireButton.isDown) {
      fireLaser();
  }

  if (ultimateButton.isDown && shieldCount > 200) {
    ultimate();
  }

  if (shieldCount === 200) {
    chargeShield.visible = true;
  } else if(shieldCount < 200) {
    chargeShield.visible = false
  }

  if (shieldCount === 300) {
    chargeShield1.visible = true;
  } else if (shieldCount < 300) {
    chargeShield1.visible = false
  }

  if (shieldCount === 400) {
    chargeShield2.visible = true;
  } else if (shieldCount < 400) {
    chargeShield2.visible = false
  }

  if (health <= 0) {
    spaceBattle.paused = true;
    displayGameOver();
    setResetHandlers();
    function setResetHandlers() {
      tapRestart = spaceBattle.input.onTap.addOnce(restart,this);
      function restart() {
        location.reload()
      }
    }
  }
}; // <-------------------- end of Update----------------------------------
