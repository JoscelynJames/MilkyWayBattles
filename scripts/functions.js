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

function launchEnemy2() {
  var MIN_ENEMY_SPACING = 300;
  var MAX_ENEMY_SPACING = 3000;
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

function launchEnemy() {
  var startingX = spaceBattle.rnd.integerInRange(100, spaceBattle.width - 100);
  var verticalSpeed = 280;
  var spread = 60;
  var frequency = 160;
  var verticalSpacing = 70;
  var numEnemiesInWave = 5;
  var timeBetweenWaves = 2000;

  for (var i =0; i < numEnemiesInWave; i++) {
    var enemy = enemyFighter1.getFirstExists(false);
    if (enemy) {
      enemy.startingX = startingX;
      enemy.reset(spaceBattle.width / 2, -verticalSpacing * i);
      enemy.body.velocity.y = verticalSpeed;

      var bulletSpeed = 400;
      var firingDelay = 2000;

      enemy.bullets = 1;
      enemy.lastShot = 0;
      enemy.update = function(){
        this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;
        enemyBullet = enemyLasers.getFirstExists(false);
        if (enemyBullet &&
          this.alive &&
          this.bullets &&
          this.y > spaceBattle.width / 8 &&
          spaceBattle.time.now > firingDelay + this.lastShot) {
            this.lastShot = spaceBattle.time.now;
            this.bullets--;
            enemyBullet.reset(this.x, this.y + this.height / 2);
            var angle = spaceBattle.physics.arcade.moveToObject(enemyBullet, mainShip, bulletSpeed);
            enemyBullet.angle = spaceBattle.math.radToDeg(angle);
                  enemyLaserAudio.play()
          }
        if (this.y > spaceBattle.height + 200) {
          this.kill();
          this.y = -20;
        }
      };
    }
  }
  blueEnemyLaunchTimer = spaceBattle.time.events.add(timeBetweenWaves, launchEnemy);
}


function enemyLaserHitShip(mainShip, enemyLasers) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(mainShip.body.x + mainShip.body.halfWidth, mainShip.body.y + mainShip.body.halfHeight);
  explosion.body.velocity.y = mainShip.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  meteorExplosion.play();
  enemyLasers.kill();
  health -= 10;
  displayHealth.text = 'Health: ' + health;
};

function shipCollide(mainShip, enemyFighter1) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter1.body.x + enemyFighter1.body.halfWidth, enemyFighter1.body.y + enemyFighter1.body.halfHeight);
  explosion.body.velocity.y = enemyFighter1.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter1.kill();
  score += 10
  displayScore.text = 'Score: ' + score;
  health -= 20;
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
    score += 10
    displayScore.text = 'Score: ' + score;
};

function shipCollide(mainShip, enemyFighter2) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemyFighter2.body.x + enemyFighter2.body.halfWidth, enemyFighter2.body.y + enemyFighter2.body.halfHeight);
  explosion.body.velocity.y = enemyFighter2.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter2.kill();
  score += 10
  displayScore.text = 'Score: ' + score;
  health -= 20;
  displayHealth.text = 'Health: ' + health;
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
  score += 5;
  displayScore.text = 'Score: ' + score;
};

function meteorHit(meteor, mainShip) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  mainShip.kill();
  health -= 10;
  displayHealth.text = 'Health: ' + health;
};

function shieldCollision(shield, meteor) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  meteor.kill()
  shield.kill()
}

function shieldCollision1(shield, enemyFighter1) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter1.kill()
  shield.kill()
}

function shieldCollision2(shield, enemyFighter2) {
  var explosion = explosions.getFirstExists(false);
  explosion.reset(meteor.body.x + meteor.body.halfWidth, meteor.body.y + meteor.body.halfHeight);
  explosion.body.velocity.y = meteor.body.velocity.y;
  explosion.alpha = 0.7;
  explosion.play('explosion', 30, false, true);
  mainShipExplosion.play();
  enemyFighter2.kill()
  shield.kill()
}

function laserCollision(lasers, enemyLasers) {
  lasers.kill()
  enemyLasers.kill()
}

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
};

function startGame() {
  if (spaceBattle.paused = true) {
    var onClick = spaceBattle.input.onTap.addOnce(start ,this);
      function start() {
        spaceBattle.paused = false;
      }
  }
};


function blackholeUltimate() {
  blackhole.visible = true;

}

function blackholeKill(blackhole, meteor) {
  meteor.kill()
}

function updateMeteorShower() {
  spaceBattle.camera.flash(0xff0000, 500);
  meteorShowerAlert.visible = true;
  meteorShower();

}
