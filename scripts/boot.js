var boot = function(spaceBattle) {
  console.log('Boot working');
};

boot.prototype = {
  preload: function() {
    this.spaceBattle.load.image('loading', '/attr/images/loading.gif');
  },
  create: function() {
    spaceBattle.physics.startSystem(Phaser.Physics.ARCADE);
    spaceBattle.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    spaceBattle.scale.pageAlignHorizontally = true;
    spaceBattle.scale.pageAlignVertically = true;
    this.spaceBattle.state.start('Preload')
  }
}
