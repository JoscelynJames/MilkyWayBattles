///Start of functions area
var functions = function(spaceBattle) {};

function fireLaser () {
  if (spaceBattle.time.now > laserTime) {
    var BULLET_SPEED = 500;
    var BULLET_SPACING = 400;
    laser = lasers.getFirstExists(false);
  if (laser) {
    var laserOffset = 20 * Math.sin(spaceBattle.math.degToRad(mainShip.angle));
    laser.reset(mainShip.x, mainShip.y);
    spaceBattle.physics.arcade.velocityFromAngle(laser.angle - 90, BULLET_SPEED, laser.body.velocity);
    laser.body.velocity.x += mainShip.body.velocity.x;
    laserTime = spaceBattle.time.now + BULLET_SPACING;
    mainShipLaserAudio.play()
   }
  }
};

function resetBullet (laser) {
  laser.kill();
};

function removeShield() {
  shield.kill()
  console.log('kill');
}

function ultimate() {
  shield.revive()
  shield.height = 350;
  shield.width = 350;
  shield.anchor.set(0.5, 0.5);
  spaceBattle.physics.arcade.enable(shield);

  spaceBattle.time.events.add(Phaser.Timer.SECOND * 8, removeShield, this);
}

function launchEnemy() {
  var MIN_ENEMY_SPACING = 300;
  var MAX_ENEMY_SPACING = 3000;
  var ENEMY_SPEED = 600;
  var enemy = enemyFighter1.getFirstExists(false);
  if (enemy) {
    enemy.reset(spaceBattle.rnd.between(0, spaceBattle.width), -20);
    enemy.body.velocity.x = spaceBattle.rnd.between(-300, 300);
    enemy.body.velocity.y = ENEMY_SPEED;
    enemy.body.drag.x = 100;
  }
  spaceBattle.time.events.add(spaceBattle.rnd.between(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchEnemy);
};

function launchEnemy2() {
  var MIN_ENEMY_SPACING = 300;
  var MAX_ENEMY_SPACING = 2500;
  var ENEMY_SPEED = 200;
  var enemy = enemyFighter2.getFirstExists(false);
  if (enemy) {
    enemy.reset(spaceBattle.rnd.between(0, spaceBattle.width), -20);
    enemy.body.velocity.x = spaceBattle.rnd.between(-300, 300);
    enemy.body.velocity.y = ENEMY_SPEED;
    enemy.body.drag.x = 100;
  }
  spaceBattle.time.events.add(spaceBattle.rnd.between(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchEnemy2);
};


function meteorShower() {
  var MIN_ENEMY_SPACING = 300;
  var MAX_ENEMY_SPACING = 600;
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

function shipCollide(mainShip, enemyFighter1) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter1.body.x + enemyFighter1.body.halfWidth, enemyFighter1.body.y + enemyFighter1.body.halfHeight);
  explosion.body.velocity.y = enemyFighter1.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter1.kill();
  health -= 20;
  displayHealth.text = 'Health: ' + health;
};

function shipCollide(mainShip, enemyFighter2) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter2.body.x + enemyFighter2.body.halfWidth, enemyFighter2.body.y + enemyFighter2.body.halfHeight);
  explosion.body.velocity.y = enemyFighter2.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter2.kill();
  health -= 20;
  displayHealth.text = 'Health: ' + health;
};

function meteorHit(mainShip, meteor) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  meteor.kill();
  health -= 10;
  displayHealth.text = 'Health: ' + health;
};

function hitEnemy(enemyFighter1, lasers) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(lasers.body.x + lasers.body.halfWidth, lasers.body.y + lasers.body.halfHeight);
    explosion.body.velocity.y = enemyFighter1.body.velocity.y;
    explosion.alpha = 3;
    explosion.play('explosion', 30, false, true);
    enemyFighter1.kill();
    lasers.kill()
    shieldCount += 20;
    score += 20;
    displayScore.text = 'Score: ' + score;
};

function hitEnemy(enemyFighter2, lasers) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(lasers.body.x + lasers.body.halfWidth, lasers.body.y + lasers.body.halfHeight);
    explosion.body.velocity.y = enemyFighter2.body.velocity.y;
    explosion.alpha = 3;
    explosion.play('explosion', 30, false, true);
    enemyShipExplosion.play();
    enemyFighter2.kill();
    lasers.kill()
    shieldCount += 10;
    score += 10
    displayScore.text = 'Score: ' + score;
};

function hitMeteor(meteor, lasers) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(lasers.body.x + lasers.body.halfWidth, lasers.body.y + lasers.body.halfHeight);
  // explosion.body.velocity.y = enemyFighter.body.velocity.y;
  explosion.alpha = 3;
  explosion.play('explosion', 30, false, true);
  meteorExplosion.play()
  lasers.kill();
  meteor.kill();
  shieldCount += 10;
  score += 5;
  displayScore.text = 'Score: ' + score;
};

function shieldCollision(shield, meteor) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  meteor.kill()
}

function shieldCollision1(shield, enemyFighter1) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter1.body.x + enemyFighter1.body.halfWidth, enemyFighter1.body.y + enemyFighter1.body.halfHeight);
  explosion.body.velocity.y = enemyFighter1.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter1.kill()
}

function shieldCollision2(shield, enemyFighter2) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter2.body.x + enemyFighter2.body.halfWidth, enemyFighter2.body.y + enemyFighter2.body.halfHeight);
  explosion.body.velocity.y = enemyFighter2.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter2.kill()
}

function displayGameOver() {
  gameOver.visible = true;
  restartButton.visible = true;
  displayScore = spaceBattle.add.text(spaceBattle.world.centerX - 65, spaceBattle.world.centerY - 200, 'Score: ' + score, { font: '50px Bungee Hairline' , fill: '#fff' });
  mainShip.kill()
};

function startGame() {
  if (spaceBattle.paused = true) {
    var onClick = spaceBattle.input.onTap.addOnce(start ,this);
      function start() {
        startScreen.visible = false;
        clickAudio.play()
        spaceBattle.paused = false;
      }
  }
};

function warning() {
  meteorShowerAlert.visible = false;
}

function updateMeteorShower() {
  console.log('updateMeteorShower');
  meteorShowerAlert.visible = true;
  spaceBattle.time.events.add(Phaser.Timer.SECOND * 4, warning, this);
  meteorShower();
}

function fadePicture() {
  console.log('fade');
  spaceBattle.add.tween(this).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
}
