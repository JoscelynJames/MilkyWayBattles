var preloader = function(spaceBattle) {}

preload.prototype = function() {
  preload: {
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
  }
}
