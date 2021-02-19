class GameOverScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameOverScene' })
	}

	create() {
		this.game.sound.stopAll();
		gameState.sfx.gameOver.play();
		if (gameState.character.mario.active) {
			gameState.scoreText = this.add.bitmapText(25, 14, 'font', `MARIO\n${addDigits(gameState.character.mario.score, 6)}`, 8).setScrollFactor(0);
			gameState.hudCoin = this.add.sprite(95, 25, 'hudCoin').setScrollFactor(0);
			gameState.hudCoin.anims.play('hudCoinAnim', true);
			gameState.coinText = this.add.bitmapText(100, 22, 'font', `x${addDigits(gameState.character.mario.coins, 2)}`, 8).setScrollFactor(0);
			this.add.bitmapText(145, 14, 'font', `WORLD\n ${gameState.character.mario.world}-${gameState.character.mario.level}`, 8).setScrollFactor(0);
		} else {
			gameState.scoreText = this.add.bitmapText(25, 14, 'font', `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`, 8).setScrollFactor(0);
			gameState.hudCoin = this.add.sprite(95, 25, 'hudCoin').setScrollFactor(0);
			gameState.hudCoin.anims.play('hudCoinAnim', true);
			gameState.coinText = this.add.bitmapText(100, 22, 'font', `x${addDigits(gameState.character.luigi.coins, 2)}`, 8).setScrollFactor(0);
			this.add.bitmapText(145, 14, 'font', `WORLD\n ${gameState.character.luigi.world}-${gameState.character.luigi.level}`, 8).setScrollFactor(0);
		};
		this.add.bitmapText(200, 14, 'font', `TIME`, 8);
		if (gameState.character.mario.active) {
			if (gameState.onePlayer) {
				this.add.bitmapText(95, 115, 'font', `GAME OVER`, 8);
			} else if (!gameState.onePlayer && gameState.character.mario.active) {
				this.add.bitmapText(95, 115, 'font', `MARIO\nGAME OVER`, 8).setCenterAlign();
			};

			this.time.addEvent({
				delay: 4000,
				loop: false,
				callback: () => {
					if (gameState.character.mario.score > gameState.topScore) {
						gameState.topScore = gameState.character.mario.score;
					};
					if (!gameState.onePlayer) {
						if (gameState.character.luigi.lives >= 1) {
							gameState.character.mario.active = false;
							gameState.character.luigi.active = true;
							this.scene.start(gameState.currentScene);
						} else {
							this.restart();
							this.scene.start('StartScene');
						};
					} else {
						this.restart();
						this.scene.start('StartScene');
					};
				}
			});
		} else {
			this.add.bitmapText(95, 115, 'font', `LUIGI\nGAME OVER`, 8).setCenterAlign();
			this.time.addEvent({
				delay: 4000,
				loop: false,
				callback: () => {
					if (gameState.character.luigi.score > gameState.topScore) {
						gameState.topScore = gameState.character.luigi.score;
					};
					if (gameState.character.mario.lives >= 1) {
						gameState.character.mario.active = true;
						gameState.character.luigi.active = false;
						this.scene.start(gameState.currentScene);
					} else {
						this.restart();
						this.scene.start('StartScene');
					};
				}
			});
		};
	}

	restart() {
		gameState.keyboard = true;
		gameState.onePlayer = true;
		gameState.super = false;
		gameState.firePower = false;
		gameState.invincible = false;
		gameState.courseCompleted = false;
		gameState.fallDeath = false;
		gameState.portalExit = false;
		gameState.animations = true;
		gameState.enemyMovement = true;
		gameState.character.mario.checkpointPassed = false;
		gameState.character.mario.active = true;
		gameState.character.mario.coins = 0;
		gameState.character.mario.lives = 3;
		gameState.character.mario.score = 0;
		gameState.character.mario.world = 1;
		gameState.character.mario.level = 1;
		gameState.character.luigi.active = false;
		gameState.character.luigi.checkpointPassed = false;
		gameState.character.luigi.coins = 0;
		gameState.character.luigi.lives = 3;
		gameState.character.luigi.score = 0;
		gameState.character.luigi.world = 1;
		gameState.character.luigi.level = 1;
	};
}
