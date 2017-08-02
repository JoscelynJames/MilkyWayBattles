var spaceBattle = new Phaser.Game(450, 300, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});
var mainShip;
var laser;
var fireRate = 100;
var nextFire = 0;


function preload() {
  spaceBattle.physics.startSystem(Phaser.Physics.ARCADE);
  spaceBattle.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  spaceBattle.scale.pageAlignHorizontally = true;
  spaceBattle.scale.pageAlignVertically = true;
  spaceBattle.load.image('nebulaBackDrop', 'images/nebula.png');
  spaceBattle.load.image('mainShip', 'images/mainShip.png');
  spaceBattle.load.image('lasers', 'images/laserBullet.png')
}

function create() {
  // var backDrop = spaceBattle.add.sprite(0, 0, 'nebulaBackDrop')
  mainShip = spaceBattle.add.sprite(spaceBattle.world.width*0.5, spaceBattle.world.height-5, 'mainShip');
  mainShip.width = 20;
  mainShip.height = 20;
  mainShip.anchor.set(0.5, 1);
  spaceBattle.physics.enable(mainShip, Phaser.Physics.ARCADE);
  mainShip.body.allowRotation = false;
  // mainShip.rotation = spaceBattle.physics.arcade.angleToPointer(mainShip);

  lasers = spaceBattle.add.group();
  lasers.width = 1;
  lasers.height = 1;
  lasers.enableBody = true;
  lasers.physicsBodyType = Phaser.Physics.ARCADE;
  lasers.createMultiple(50, 'lasers')
  lasers.setAll('checkWorldbounds', true)
  lasers.setAll('outOfBoundsKill', true);

}

function update() {
  if (spaceBattle.input.activePointer.isDown) {
        fire();
    }

}

function fire() {
  if (spaceBattle.time.now > nextFire && lasers.countDead() > 0)
  {
    nextFire = spaceBattle.time.now + fireRate;
    var laser = lasers.getFirstDead();
    laser.height = 15;
    laser.width = 15;
    laser.reset(mainShip.x - 9, mainShip.y - 9);
    spaceBattle.physics.arcade.moveToPointer(laser, 200);
  }
}
