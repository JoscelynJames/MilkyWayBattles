var update = function(spaceBattle) {
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

};
