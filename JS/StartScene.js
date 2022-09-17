class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	create() {
		this.add.image(0, 0, 'startImage').setOrigin(0, 0);
		this.add.image(40, 30, 'titleLogo').setOrigin(0);
		this.add.bitmapText(25, 14, 'font', `MARIO\n000000`, 8);
		gameState.hudCoin = this.add.sprite(95, 25, 'hudCoin').setScrollFactor(0);
		gameState.hudCoin.anims.play('hudCoinAnim', true);
		this.add.bitmapText(100, 22, 'font', `x00`, 8);
		this.add.bitmapText(145, 14, 'font', `WORLD\n 1-1`, 8);
		this.add.bitmapText(200, 14, 'font', `TIME`, 8);
		this.add.bitmapText(105, 119, 'font', '©1985 NINTENDO', 8).setTint(0xffC7BC);
		this.add.bitmapText(90, 145, 'font', '1 PLAYER GAME', 8);
		this.add.bitmapText(90, 161, 'font', '2 PLAYER GAME', 8);
		this.add.bitmapText(90, 185, 'font', `TOP- ${addDigits(gameState.topScore, 6)}`, 8);

		gameState.cursor = this.add.sprite(77, 148, 'selectCursor');
		gameState.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	}

	update() {
		this.input.keyboard.on('keydown_SHIFT', () => {
			if (gameState.onePlayer){
				gameState.cursor.y = 164;
				gameState.onePlayer = false;
			} else {
				gameState.cursor.y = 148;
				gameState.onePlayer = true;
			}
		});
		if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
			this.scene.start('LoadScene');
		}
	}
}
