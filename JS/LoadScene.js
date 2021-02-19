class LoadScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoadScene' })
	}

	create() {
		this.game.sound.stopAll();
		gameState.enemyMovement = true;
		this.anims.resumeAll();
		gameState.fanfare = false;
		if (gameState.character.mario.active) {
			this.add.bitmapText(25, 14, 'font', `MARIO\n${addDigits(gameState.character.mario.score, 6)}`, 8);
			gameState.hudCoin = this.add.sprite(95, 25, 'hudCoin');
			gameState.hudCoin.anims.play('hudCoinAnim', true);
			this.add.bitmapText(100, 22, 'font', `x${addDigits(gameState.character.mario.coins, 2)}`, 8);
			this.add.bitmapText(145, 14, 'font', `WORLD\n ${gameState.character.mario.world}-${gameState.character.mario.level}`, 8);
			this.add.bitmapText(200, 14, 'font', `TIME`, 8);
			this.add.bitmapText(95, 85, 'font', `WORLD ${gameState.character.mario.world}-${gameState.character.mario.level}`, 8);
			if (gameState.super && !gameState.firePower) {
				gameState.player = this.add.sprite(110, 115, 'playerSprites', 'SuperMarioSprites-0');
			} else if (gameState.firePower) {
				gameState.player = this.add.sprite(110, 115, 'playerSprites', 'FirePowerSprites-0');
			} else {
				gameState.player = this.add.sprite(110, 115, 'playerSprites', 'MarioSprites-0');
			};
			this.add.bitmapText(128, 115, 'font', `x ${gameState.character.mario.lives}`, 8);
		} else {
			this.add.bitmapText(25, 14, 'font', `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`, 8);
			gameState.hudCoin = this.add.sprite(95, 25, 'hudCoin');
			gameState.hudCoin.anims.play('hudCoinAnim', true);
			this.add.bitmapText(100, 22, 'font', `x${addDigits(gameState.character.luigi.coins, 2)}`, 8);
			this.add.bitmapText(145, 14, 'font', `WORLD\n ${gameState.character.luigi.world}-${gameState.character.luigi.level}`, 8);
			this.add.bitmapText(200, 14, 'font', `TIME`, 8);
			this.add.bitmapText(95, 85, 'font', `WORLD ${gameState.character.luigi.world}-${gameState.character.luigi.level}`, 8);
			if (gameState.super && !gameState.firePower) {
				gameState.player = this.add.sprite(110, 115, 'playerSprites', 'SuperMarioSprites-0');
			} else if (gameState.firePower) {
				gameState.player = this.add.sprite(110, 115, 'playerSprites', 'FirePowerSprites-0');
			} else {
				gameState.player = this.add.sprite(110, 115, 'playerSprites', 'MarioSprites-0');
			};
			this.add.bitmapText(128, 115, 'font', `x ${gameState.character.luigi.lives}`, 8);
		};

		this.time.addEvent({
			delay: 3000,
			loop: false,
			callback: () => {
				this.scene.start(gameState.currentScene);
			}
		});
	}
}
