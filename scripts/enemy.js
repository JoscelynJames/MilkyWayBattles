var enemy = function(spaceBattle) {}

function preload() {
    spaceBattle.load.image('enemyFighter', 'attr/images/enemyFighter.png');
}

function create() {
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
}
