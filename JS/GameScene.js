class GameScene extends Phaser.Scene {
	constructor(key){
		super(key);
	}

	createMap(music, width, time, checkpoint, map, bgColor, pY, cY) {
		this.createHUD();
		gameState.progress = 0;
		gameState.courseCompleted = false;
		gameState.hitCount = 1;
		gameState.keyboard = true;
		gameState.animations = true;
		gameState.fallDeath = false;
		gameState.playerFacing = 'right';
		music.play({ loop: true });
		gameState.width = width || 256;
		gameState.checkpoint = checkpoint || 48;
		if (gameState.timeReset) {
			gameState.time = time
		}
		this.cameras.main.setBackgroundColor(bgColor);
		const blockTileset = map.addTilesetImage('MarioEnviro-Extruded', 'blocks');
		const nonCollideBG = map.createStaticLayer('Non-Collide BG', blockTileset, 0, 0);
		nonCollideBG.depth = -1;
		const collideBG = map.createStaticLayer('Collide BG', blockTileset, 0, 0);
		collideBG.setCollisionByProperty({ collides: true});
		gameState.background = collideBG;
		this.physics.world.setBounds(0, 0, gameState.width, config.height);
		this.physics.world.checkCollision.up = false;
		this.physics.world.checkCollision.down = false;
		this.cameras.main.setBounds(0, -8, gameState.width, config.height);

		gameState.objectGroup = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});

		const coinLayer = map.getObjectLayer('Coins')['objects'];
		gameState.coins = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		coinLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.coins.create(object.x, object.y, 'sprites', 'Sprites-120');
			} else if (gameState.mapType === 'under') {
				obj = gameState.coins.create(object.x, object.y, 'sprites', 'Sprites-128');
			} else if (gameState.mapType === 'water') {
				obj = gameState.coins.create(object.x, object.y, 'sprites', 'Sprites-141');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.coins.create(object.x, object.y, 'sprites', 'Sprites-134');
			}
			obj.setOrigin(0, 1).setSize(10, 14);
		});
		gameState.objectGroup.addMultiple(gameState.coins.getChildren());

		const brickLayer = map.getObjectLayer('Bricks')['objects'];
		gameState.bricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		brickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.bricks.create(object.x, object.y, 'textures', 'MarioEnviro-2');
			} else if (gameState.mapType === 'under') {
				obj = gameState.bricks.create(object.x, object.y, 'textures', 'MarioEnviro-56');
			} else if (gameState.mapType === 'water') {
				obj = gameState.bricks.create(object.x, object.y, 'textures', 'MarioEnviro-164');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.bricks.create(object.x, object.y, 'textures', 'MarioEnviro-110');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.bricks.getChildren());

		const oneUpBrickLayer = map.getObjectLayer('1up Bricks')['objects'];
		gameState.oneUpBricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		oneUpBrickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.oneUpBricks.create(object.x, object.y, 'textures', 'MarioEnviro-1');
			} else if (gameState.mapType === 'under') {
				obj = gameState.oneUpBricks.create(object.x, object.y, 'textures', 'MarioEnviro-56');
			} else if (gameState.mapType === 'water') {
				obj = gameState.oneUpBricks.create(object.x, object.y, 'textures', 'MarioEnviro-164');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.oneUpBricks.create(object.x, object.y, 'textures', 'MarioEnviro-110');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.oneUpBricks.getChildren());

		const coinBrickLayer = map.getObjectLayer('Coin Bricks')['objects'];
		gameState.coinBricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		coinBrickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.coinBricks.create(object.x, object.y, 'textures', 'MarioEnviro-1');
			} else if (gameState.mapType === 'under') {
				obj = gameState.coinBricks.create(object.x, object.y, 'textures', 'MarioEnviro-56');
			} else if (gameState.mapType === 'water') {
				obj = gameState.coinBricks.create(object.x, object.y, 'textures', 'MarioEnviro-164');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.coinBricks.create(object.x, object.y, 'textures', 'MarioEnviro-110');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.coinBricks.getChildren());

		const oneUpBoxLayer = map.getObjectLayer('1up Box')['objects'];
		gameState.oneUpBoxes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		oneUpBoxLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.oneUpBoxes.create(object.x, object.y, 'sprites', 'Sprites-87');
			} else if (gameState.mapType === 'under') {
				obj = gameState.oneUpBoxes.create(object.x, object.y, 'sprites', 'Sprites-96');
			} else if (gameState.mapType === 'water') {
				obj = gameState.oneUpBoxes.create(object.x, object.y, 'sprites', 'Sprites-112');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.oneUpBoxes.create(object.x, object.y, 'sprites', 'Sprites-104');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.oneUpBoxes.getChildren());

		const starBrickLayer = map.getObjectLayer('Star Bricks')['objects'];
		gameState.starBricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		starBrickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.starBricks.create(object.x, object.y, 'textures', 'MarioEnviro-1');
			} else if (gameState.mapType === 'under') {
				obj = gameState.starBricks.create(object.x, object.y, 'textures', 'MarioEnviro-56');
			} else if (gameState.mapType === 'water') {
				obj = gameState.starBricks.create(object.x, object.y, 'textures', 'MarioEnviro-164');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.starBricks.create(object.x, object.y, 'textures', 'MarioEnviro-110');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.starBricks.getChildren());

		const mushroomBrickLayer = map.getObjectLayer('Mushroom Bricks')['objects'];
		gameState.mushroomBricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		mushroomBrickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.mushroomBricks.create(object.x, object.y, 'textures', 'MarioEnviro-1');
			} else if (gameState.mapType === 'under') {
				obj = gameState.mushroomBricks.create(object.x, object.y, 'textures', 'MarioEnviro-56');
			} else if (gameState.mapType === 'water') {
				obj = gameState.mushroomBricks.create(object.x, object.y, 'textures', 'MarioEnviro-164');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.mushroomBricks.create(object.x, object.y, 'textures', 'MarioEnviro-110');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.mushroomBricks.getChildren());

		const vineBrickLayer = map.getObjectLayer('Vine Bricks')['objects'];
		gameState.vineBricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		vineBrickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.vineBricks.create(object.x, object.y, 'textures', 'MarioEnviro-1');
			} else if (gameState.mapType === 'under') {
				obj = gameState.vineBricks.create(object.x, object.y, 'textures', 'MarioEnviro-56');
			} else if (gameState.mapType === 'water') {
				obj = gameState.vineBricks.create(object.x, object.y, 'textures', 'MarioEnviro-164');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.vineBricks.create(object.x, object.y, 'textures', 'MarioEnviro-110');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.vineBricks.getChildren());

		const floatBrickLayer = map.getObjectLayer('Float Bricks')['objects'];
		gameState.floatBricks = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		floatBrickLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.floatBricks.create(object.x, object.y, 'textures', 'MarioEnviro-1');
			} else if (gameState.mapType === 'under') {
				obj = gameState.floatBricks.create(object.x, object.y, 'textures', 'MarioEnviro-55');
			} else if (gameState.mapType === 'water') {
				obj = gameState.floatBricks.create(object.x, object.y, 'textures', 'MarioEnviro-163');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.floatBricks.create(object.x, object.y, 'textures', 'MarioEnviro-109');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.floatBricks.getChildren());
		gameState.brickQuadrant = this.physics.add.group();
		
		const mysteryBoxLayer = map.getObjectLayer('Mystery Box')['objects'];
		gameState.mysteryBoxes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		mysteryBoxLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.mysteryBoxes.create(object.x, object.y, 'sprites', 'Sprites-87');
			} else if (gameState.mapType === 'under') {
				obj = gameState.mysteryBoxes.create(object.x, object.y, 'sprites', 'Sprites-96');
			} else if (gameState.mapType === 'water') {
				obj = gameState.mysteryBoxes.create(object.x, object.y, 'sprites', 'Sprites-112');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.mysteryBoxes.create(object.x, object.y, 'sprites', 'Sprites-104');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.mysteryBoxes.getChildren());

		const mushroomBoxLayer = map.getObjectLayer('Mushroom Box')['objects'];
		gameState.mushroomBoxes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		mushroomBoxLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.mushroomBoxes.create(object.x, object.y, 'sprites', 'Sprites-87');
			} else if (gameState.mapType === 'under') {
				obj = gameState.mushroomBoxes.create(object.x, object.y, 'sprites', 'Sprites-96');
			} else if (gameState.mapType === 'water') {
				obj = gameState.mushroomBoxes.create(object.x, object.y, 'sprites', 'Sprites-112');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.mushroomBoxes.create(object.x, object.y, 'sprites', 'Sprites-104');
			}
			obj.setOrigin(0, 1);
		});
		gameState.objectGroup.addMultiple(gameState.mushroomBoxes.getChildren());

		const bowserBridgeLayer = map.getObjectLayer('Bowser Bridge')['objects'];
		gameState.bowserBridge = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		bowserBridgeLayer.forEach(object => {
			for (let i = 0; i < bowserBridgeLayer.length - 1; i++) {
				let obj = {};
				obj[i] = gameState.bowserBridge.create(object.x, object.y, 'textures', 'MarioEnviro-338');
				obj[i].setOrigin(0, 1);
			}
		});
		gameState.objectGroup.addMultiple(gameState.bowserBridge.getChildren());

		if (gameState.mapType === 'above') {
			gameState.mysteryBoxes.playAnimation('owMysteryBoxAnim');
			gameState.mushroomBoxes.playAnimation('owMysteryBoxAnim');
			gameState.oneUpBoxes.playAnimation('owMysteryBoxAnim');
			gameState.coins.playAnimation('owCoin');
		} else if (gameState.mapType === 'under') {
			gameState.mysteryBoxes.playAnimation('ugMysteryBoxAnim');
			gameState.mushroomBoxes.playAnimation('ugMysteryBoxAnim');
			gameState.oneUpBoxes.playAnimation('owMysteryBoxAnim');
			gameState.coins.playAnimation('ugCoin');
		} else if (gameState.mapType === 'water') {
			gameState.mysteryBoxes.playAnimation('uwMysteryBoxAnim');
			gameState.mushroomBoxes.playAnimation('uwMysteryBoxAnim');
			gameState.oneUpBoxes.playAnimation('owMysteryBoxAnim');
			gameState.coins.playAnimation('uwCoin');
		} else if (gameState.mapType === 'castle') {
			gameState.mysteryBoxes.playAnimation('castleMysteryBoxAnim');
			gameState.mushroomBoxes.playAnimation('castleMysteryBoxAnim');
			gameState.oneUpBoxes.playAnimation('owMysteryBoxAnim');
			gameState.coins.playAnimation('castleCoin');
		}
		gameState.multiplierTimer = this.time.addEvent({
			delay: 1000,
			repeat: -1,
			callback: () => {
				gameState.multiplier = 0;
			}
		});
		this.addPlayer(pY, cY);
		this.addEnviroColliders();
	}

	addPlayer(y, cY) {
		let x;
		if (gameState.character.mario.active) {
			if (gameState.character.mario.checkpointPassed) {
				x = gameState.checkpoint;
				y = cY || y;
			} else {
				x = gameState.character.mario.progress;
			}
			if (gameState.super && !gameState.firePower) {
				gameState.player = this.physics.add.sprite(x, y, 'playerSprites', 'SuperMarioSprites-0');
			} else if (gameState.firePower) {
				gameState.player = this.physics.add.sprite(x, y, 'playerSprites', 'FirePowerSprites-0');
			} else {
				gameState.player = this.physics.add.sprite(x, y, 'playerSprites', 'MarioSprites-0');
			}
		} else {
			if (gameState.character.luigi.checkpointPassed) {
				x = gameState.checkpoint;
				y = cY || y;
			} else {
				x = gameState.character.luigi.progress;
			}
			if (gameState.super && !gameState.firePower) {
				gameState.player = this.physics.add.sprite(x, y, 'playerSprites', 'SuperLuigiSprites-0');
			} else if (gameState.firePower) {
				gameState.player = this.physics.add.sprite(x, y, 'playerSprites', 'FirePowerSprites-0');
			} else {
				gameState.player = this.physics.add.sprite(x, y, 'playerSprites', 'LuigiSprites-0');
			}
		}
		gameState.player.setDrag(250, 0).setOrigin(0.5, 1);
		gameState.fireball = this.physics.add.group();
		gameState.bubble = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		gameState.player.depth = 0;
	}

	addEnemies(map, flying) {
		gameState.enemyGroup = this.physics.add.group();

// Goombas
		this.goombaLayer = map.getObjectLayer('Goombas')['objects'];
		gameState.goombas = this.physics.add.group();
		this.goombaLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.goombas.create(object.x, object.y, 'enemies', 'Enemies-0');
				obj.play('owGoombaWalk');
			} else if (gameState.mapType === 'under') {
				obj = gameState.goombas.create(object.x, object.y, 'enemies', 'Enemies-25');
				obj.play('ugGoombaWalk');
			} else if (gameState.mapType === 'water') {
				obj = gameState.goombas.create(object.x, object.y, 'enemies', 'Enemies-0');
				obj.play('uwGoombaWalk');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.goombas.create(object.x, object.y, 'enemies', 'Enemies-50');
				obj.play('castleGoombaWalk');
			}
			obj.setOrigin(0, 1);
			obj.body.setBounce(0.1, 0);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
		});
		gameState.enemyGroup.addMultiple(gameState.goombas.getChildren());

// Turtles
		this.turtleLayer = map.getObjectLayer('Turtles')['objects'];
		gameState.turtles = this.physics.add.group();
		this.turtleLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.turtles.create(object.x, object.y, 'enemies', 'Enemies-4');
				obj.play('owTurtleWalk');
			} else if (gameState.mapType === 'under') {
				obj = gameState.turtles.create(object.x, object.y, 'enemies', 'Enemies-29');
				obj.play('ugTurtleWalk');
			} else if (gameState.mapType === 'water') {
				obj = gameState.turtles.create(object.x, object.y, 'enemies', 'Enemies-4');
				obj.play('uwTurtleWalk');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.turtles.create(object.x, object.y, 'enemies', 'Enemies-78');
				obj.play('castleTurtleWalk');
			}
			obj.setOrigin(0, 1);
			obj.body.setBounce(0.1, 0);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
		});
		gameState.enemyGroup.addMultiple(gameState.turtles.getChildren());

// Paraturtles
		this.paraturtleLayer = map.getObjectLayer('Paraturtles')['objects'];
		gameState.paraturtles = this.physics.add.group({
			allowGravity: false
		});
		this.paraturtleLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.paraturtles.create(object.x, object.y, 'enemies', 'Enemies-6');
				obj.play('owParaturtleWalk');
			} else if (gameState.mapType === 'under') {
				obj = gameState.paraturtles.create(object.x, object.y, 'enemies', 'Enemies-31');
				obj.play('ugParaturtleWalk');
			} else if (gameState.mapType === 'water') {
				obj = gameState.paraturtles.create(object.x, object.y, 'enemies', 'Enemies-6');
				obj.play('uwParaturtleWalk');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.paraturtles.create(object.x, object.y, 'enemies', 'Enemies-80');
				obj.play('castleParaturtleWalk');
			}
			obj.setOrigin(0, 1);
			obj.body.setBounce(0.1, 0);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
		});
		let paraturtleTween = {};
		let paraturtle = gameState.paraturtles.getChildren();
		for (let i = 0; i < paraturtle.length; i++) {
			paraturtleTween[i] = this.tweens.add({
				targets: paraturtle[i],
				x: '+=48',
				ease: 'Linear',
				duration: 3000,
				yoyo: true,
				repeat: -1
			});
		}
		gameState.enemyGroup.addMultiple(gameState.paraturtles.getChildren());

// Red Turtles
		this.redTurtleLayer = map.getObjectLayer('Red Turtles')['objects'];
		gameState.redTurtles = this.physics.add.group();
		this.redTurtleLayer.forEach(object => {
			let obj = gameState.redTurtles.create(object.x, object.y, 'enemies', 'Enemies-54');
			obj.play('redTurtleWalk');
			obj.setOrigin(0, 1);
			obj.body.setBounce(0.1, 0);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
		});
		gameState.enemyGroup.addMultiple(gameState.redTurtles.getChildren());

// Red Paraturtles
		this.redParaturtleLayer = map.getObjectLayer('Red Paraturtles')['objects'];
		gameState.redParaturtles = this.physics.add.group({
			allowGravity: false
		});
		this.redParaturtleLayer.forEach(object => {
			let obj = gameState.redParaturtles.create(object.x, object.y, 'enemies', 'Enemies-56');
			obj.play('redParaturtleWalk');
			obj.setOrigin(0, 1);
			obj.body.setBounce(0.1, 0);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
		});
		let redParaturtleTween = {};
		let redParaturtle = gameState.redParaturtles.getChildren();
		for (let i = 0; i < redParaturtle.length; i++) {
			redParaturtleTween[i] = this.tweens.add({
				targets: redParaturtle[i],
				y: '+=48',
				ease: 'Linear',
				duration: 3000,
				yoyo: true,
				repeat: -1
			});
		}
		gameState.enemyGroup.addMultiple(gameState.redParaturtles.getChildren());

// Piranha Plants
		this.piranhaPlantLayer = map.getObjectLayer('Piranha Plants')['objects'];
		gameState.piranhaPlants = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		this.piranhaPlantLayer.forEach(object => {
			let obj = {};
			if (gameState.mapType === 'above') {
				obj = gameState.piranhaPlants.create(object.x, object.y + 24, 'enemies', 'Enemies-10');
				obj.play('piranhaPlantOW');
			} else if (gameState.mapType === 'under') {
				obj = gameState.piranhaPlants.create(object.x, object.y + 24, 'enemies', 'Enemies-35');
				obj.play('piranhaPlantUG');
			} else if (gameState.mapType === 'water') {
				obj = gameState.piranhaPlants.create(object.x, object.y + 24, 'enemies', 'Enemies-84');
				obj.play('piranhaPlantUW');
			} else if (gameState.mapType === 'castle') {
				obj = gameState.piranhaPlants.create(object.x, object.y + 24, 'enemies', 'Enemies-60');
				obj.play('piranhaPlantCASTLE');
			}
			obj.setOrigin(0, 1);
			obj.depth = -1;
			if (gameState.player.x > obj.x - 8 && gameState.player.x < obj.x + 16) {
				obj.destroy();
			}
		});
		let piranhaTween = {};
		let piranha = gameState.piranhaPlants.getChildren();
		for (let i = 0; i < piranha.length - 1; i++) {
			piranhaTween[i] = this.tweens.add({
				targets: piranha,
				y: '-=24',
				ease: 'Linear',
				duration: 2000,
				yoyo: true,
				repeat: -1,
				repeatDelay: 2000,
				onRepeat: () => {
					piranha.forEach(obj => {
						if (gameState.player.x > obj.x - 16 && gameState.player.x < obj.x + 32) {
							obj.body.setEnable(false);
							obj.setVisible(false);
						} else {
							obj.body.setEnable(true);
							obj.setVisible(true);
						}
					});
				}
			});
		}

// Bloober
		this.blooberLayer = map.getObjectLayer('Bloobers')['objects'];
		gameState.bloobers = this.physics.add.group({
			immovable: true,
			enable: false
		});
		this.blooberLayer.forEach(object => {
			let obj = gameState.bloobers.create(object.x, object.y - 8, 'enemies', 'Enemies-96').setOrigin(0, 1);
			obj.body.setGravityY(-100);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
			this.time.addEvent({
				delay: 100,
				repeat: 0,
				callback: () => {
					this.time.addEvent({
						delay: 1000,
						repeat: 2,
						callback: () => {
							obj.anims.play('blooberSwim', true);
							obj.setVelocityY(-60);
							if (obj.x > gameState.player.x) {
								obj.setVelocityX(-20);
							} else {
								obj.setVelocityX(20);
							}
						}
					});
					this.time.addEvent({
						delay: 5000,
						repeat: -1,
						callback: () => {
							this.time.addEvent({
								delay: 1000,
								repeat: 2,
								callback: () => {
									obj.anims.play('blooberSwim', true);
									obj.setVelocityY(-60);
									if (obj.x > gameState.player.x) {
										obj.setVelocityX(-20);
									} else {
										obj.setVelocityX(20);
									}
								}
							});
						}
					});
				}
			});
		});

// Red Cheep-Cheeps
		if (flying === true) {
			let x = {};
			this.time.addEvent({
				delay: 100,
				repeat: -1,
				callback: () => {
					x = Math.floor(Math.random() * 100) + 20;
				}
			});
			gameState.redCheeps = this.physics.add.group();
	
			this.time.addEvent({
				delay: Math.floor(Math.random() * 3500) + 1000,
				repeat: -1,
				callback: () => {
					if (gameState.player.x > 304 && gameState.player.x < 3024) {
						gameState.redCheeps.create(gameState.player.x - 64, config.height + 8, 'enemies', 'Enemies-72').setGravityY(-600).setFlipX(true).setVelocity(x, -400);
						gameState.redCheeps.playAnimation('redCheepAnim');
					}
				}
			});
			this.time.addEvent({
				delay: Math.floor(Math.random() * 3500) + 1000,
				repeat: -1,
				callback: () => {
					if (gameState.player.x > 176 && gameState.player.x < 3024) {
						gameState.redCheeps.create(gameState.player.x + 64, config.height + 8, 'enemies', 'Enemies-72').setGravityY(-600).setFlipX(true).setVelocity(x, -400);
						gameState.redCheeps.playAnimation('redCheepAnim');
					}
				}
			});
		} else {
			this.redCheepLayer = map.getObjectLayer('Red Cheep-Cheep')['objects'];
			gameState.redCheeps = this.physics.add.group({
				immovable: true,
				allowGravity: false
			});
			this.redCheepLayer.forEach(object => {
				let obj = gameState.redCheeps.create(object.x, object.y, 'enemies', 'Enemies-72');
				obj.play('redCheepAnim');
				obj.setOrigin(0, 1);
				if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
					obj.destroy();
				}
			});
			let redCheep = gameState.redCheeps.getChildren();
			for (let i = 1; i < redCheep.length; i += 2) {
				this.tweens.add({
					targets: redCheep[i],
					y: '-=15',
					ease: 'Linear',
					duration: 5000,
					yoyo: true,
					repeat: -1
				});
			}
		}

// Gray Cheep-Cheeps
		this.grayCheepLayer = map.getObjectLayer('Gray Cheep-Cheep')['objects'];
		gameState.grayCheeps = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		this.grayCheepLayer.forEach(object => {
			let obj = gameState.grayCheeps.create(object.x, object.y, 'enemies', 'Enemies-97');
			obj.play('grayCheepAnim');
			obj.setOrigin(0, 1);
			if (obj.x > gameState.player.x - 128 && obj.x < gameState.player.x + 128) {
				obj.destroy();
			}
		});
		let grayCheep = gameState.grayCheeps.getChildren();
		for (let i = 1; i < grayCheep.length; i += 2) {
			this.tweens.add({
				targets: grayCheep[i],
				y: '-=15',
				ease: 'Linear',
				duration: 5000,
				yoyo: true,
				repeat: -1
			});
		}

// Podoboo
		this.podobooLayer = map.getObjectLayer('Podoboos')['objects'];
		gameState.podoboos = this.physics.add.group();
		this.podobooLayer.forEach(object => {
			let obj = gameState.podoboos.create(object.x, object.y, 'enemies', 'Enemies-65');
			obj.setOrigin(0, 1).setMaxVelocity(0, 0);
			obj.depth = -2;
		});
		let podo = gameState.podoboos.getChildren();
		let podoTween = {};
		for (let i = 0; i < podo.length; i++) {
			podoTween[i] = this.tweens.add({
				targets: podo[i],
				y: '-=150',
				ease: 'Linear',
				duration: 1000,
				repeat: -1,
				repeatDelay: 2000,
				onRepeat: () => {
					podo[i].setFlipY(false);
				},
				yoyo: true,
				onYoyo: () => {
					podo[i].setFlipY(true);
				}
			});
		}
		gameState.enemyGroup.addMultiple(gameState.podoboos.getChildren());

		this.addEnemyColliders();
	}

	addEnviroColliders() {
		gameState.player.setCollideWorldBounds(true);
		this.physics.add.collider(gameState.player, gameState.background);
		this.physics.add.collider(gameState.objectGroup);
		this.physics.add.collider(gameState.player, gameState.bowserBridge);
		this.physics.add.collider(gameState.player, gameState.bricks, (player, brick) => {
			if (player.body.touching.up) {
				if (gameState.super) {
					gameState.sfx.block.play();
					this.tweens.add({
						targets: brick,
						y: '-=5',
						duration: 50,
						repeat: 0,
						onComplete: () => {
							if (gameState.character.mario.active) {
								gameState.character.mario.score += 50;
								gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
							} else {
								gameState.character.luigi.score += 50;
								gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
							}
							if (gameState.mapType === 'above') {
								brick.setTexture('sprites', 'Sprites-3');
							} else if (gameState.mapType === 'under') {
								brick.setTexture('sprites', 'Sprites-10');
							} else if (gameState.mapType === 'water') {
								brick.setTexture('sprites', 'Sprites-22');
							} else if (gameState.mapType === 'castle') {
								brick.setTexture('sprites', 'Sprites-16');
							}
							this.time.addEvent({
								delay: 50,
								loop: false,
								callback: () => {
									if (gameState.mapType === 'above') {
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-29').setVelocityX(-100).setVelocityY(-300);
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-62').setVelocityX(-100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-62').setVelocityX(100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-29').setVelocityX(100).setVelocityY(-300);
									} else if (gameState.mapType === 'under') {
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-38').setVelocityX(-100).setVelocityY(-300);
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-70').setVelocityX(-100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-70').setVelocityX(100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-38').setVelocityX(100).setVelocityY(-300);
									} else if (gameState.mapType === 'water') {
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-54').setVelocityX(-100).setVelocityY(-300);
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-84').setVelocityX(-100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-84').setVelocityX(100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-54').setVelocityX(100).setVelocityY(-300);
									} else if (gameState.mapType === 'castle') {
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-46').setVelocityX(-100).setVelocityY(-300);
										gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-77').setVelocityX(-100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-77').setVelocityX(100).setVelocityY(-200);
										gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-46').setVelocityX(100).setVelocityY(-300);
									}
									gameState.brickQuadrant.playAnimation('brickBreakAnim');
									brick.destroy();
								}
							});
						}
					});
				} else if (!gameState.super) {
					gameState.sfx.bump.play();
					this.tweens.add({
						targets: brick,
						y: '-=5',
						duration: 100,
						repeat: 0,
						yoyo: true,
						onComplete: () => {
						}
					});
				}
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.floatBricks, (player, brick) => {
			if (gameState.super && player.body.touching.up) {
				gameState.sfx.block.play();
				if (gameState.character.mario.active) {
					gameState.character.mario.score += 50;
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					gameState.character.luigi.score += 50;
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				if (gameState.mapType === 'above') {
					brick.setTexture('sprites', 'Sprites-3');
				} else if (gameState.mapType === 'under') {
					brick.setTexture('sprites', 'Sprites-10');
				} else if (gameState.mapType === 'water') {
					brick.setTexture('sprites', 'Sprites-22');
				} else if (gameState.mapType === 'castle') {
					brick.setTexture('sprites', 'Sprites-16');
				}
				this.time.addEvent({
					delay: 50,
					loop: false,
					callback: () => {
						if (gameState.mapType === 'above') {
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-29').setVelocityX(-100).setVelocityY(-300);
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-62').setVelocityX(-100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-62').setVelocityX(100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-29').setVelocityX(100).setVelocityY(-300);
						} else if (gameState.mapType === 'under') {
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-38').setVelocityX(-100).setVelocityY(-300);
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-70').setVelocityX(-100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-70').setVelocityX(100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-38').setVelocityX(100).setVelocityY(-300);
						} else if (gameState.mapType === 'water') {
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-54').setVelocityX(-100).setVelocityY(-300);
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-84').setVelocityX(-100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-84').setVelocityX(100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-54').setVelocityX(100).setVelocityY(-300);
						} else if (gameState.mapType === 'castle') {
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 12), 'sprites', 'Sprites-46').setVelocityX(-100).setVelocityY(-300);
							gameState.brickQuadrant.create((brick.x + 4), (brick.y - 4), 'sprites', 'Sprites-77').setVelocityX(-100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 4), 'sprites', 'Sprites-77').setVelocityX(100).setVelocityY(-200);
							gameState.brickQuadrant.create((brick.x + 12), (brick.y - 12), 'sprites', 'Sprites-46').setVelocityX(100).setVelocityY(-300);
						}
						gameState.brickQuadrant.playAnimation('brickBreakAnim');
						brick.destroy();
					}
				});
			} else if (!gameState.super && player.body.touching.up) {
				this.tweens.add({
					targets: brick,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						gameState.sfx.bump.play();
					}
				});
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.coinBricks, (player, brick) => {
			if (player.body.touching.up) {
				this.time.addEvent({
					delay: 4000,
					loop: false,
					callback: () => {
						gameState.hitCount = 15;
					}
				});
				if (gameState.hitCount <= 15) {
					this.tweens.add({
						targets: brick,
						y: '-=5',
						duration: 100,
						repeat: 0,
						yoyo: true,
						onComplete: () => {
							gameState.hitCount++;
							let coinUp = this.add.sprite(brick.x, brick.y - 16, 'sprites', 'Sprites-120').setOrigin(0, 1);
							coinUp.anims.play('boxCoin');
							gameState.sfx.coin.play();
							this.tweens.add({
								targets: coinUp,
								y: '-=40',
								ease: 'Bounce',
								duration: 500,
								repeat: 0,
								onComplete: () => {
									let scoreNotification = this.add.bitmapText(coinUp.x, coinUp.y, 'font6', '200', 6).setOrigin(0, 1);
									this.tweens.add({
										targets: scoreNotification,
										y: '-=20',
										ease: 'Linear',
										duration: 750,
										repeat: 0,
										onComplete: () => {
											scoreNotification.destroy();
										}
									});
									coinUp.destroy();
									if (gameState.character.mario.active) {
										gameState.character.mario.coins++;
										gameState.character.mario.score += 200;
										gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
										gameState.coinText.text = `x${addDigits(gameState.character.mario.coins, 2)}`;
									} else {
										gameState.character.luigi.coins++;
										gameState.character.luigi.score += 200;
										gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
										gameState.coinText.text = `x${addDigits(gameState.character.luigi.coins, 2)}`;
									}
								}
							});
						}
					});
				} else if (gameState.hitCount > 15) {
					gameState.hitCount = 1;
					brick.destroy();
					if (gameState.mapType === 'above') {
						brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-3').setImmovable(true);
					} else if (gameState.mapType === 'under') {
						brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-57').setImmovable(true);
					} else if (gameState.mapType === 'water') {
						brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-165').setImmovable(true);
					} else if (gameState.mapType === 'castle') {
						brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-111').setImmovable(true);
					}
					brick.body.setAllowGravity(false);
					brick.setOrigin(0, 1);
					this.physics.add.collider(player, brick, () => {
						gameState.sfx.bump.play();
					}, null, this);
					this.physics.add.collider(gameState.goombas, brick);
					this.physics.add.collider(gameState.turtles, brick);
					this.physics.add.collider(gameState.paraturtles, brick);
					this.physics.add.collider(gameState.redTurtles, brick);
					this.physics.add.collider(gameState.redParaturtles, brick);
				}
				gameState.sfx.bump.play();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.oneUpBoxes, (player, box) => {
			if (player.body.touching.up) {
				this.tweens.add({
					targets: box,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						box.destroy();
						if (gameState.mapType === 'above') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-57').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-165').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-111').setImmovable(true);
						}
						box.body.setAllowGravity(false);
						box.setOrigin(0, 1);
						this.physics.add.collider(player, box, () => {
							gameState.sfx.bump.play();
						}, null, this);
						this.physics.add.collider(gameState.goombas, box);
						this.physics.add.collider(gameState.turtles, box);
						this.physics.add.collider(gameState.paraturtles, box);
						this.physics.add.collider(gameState.redTurtles, box);
						this.physics.add.collider(gameState.redParaturtles, box);
						if (gameState.mapType === 'above') {
							gameState.oneUpShroom = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-1').setOrigin(0, 1).setSize(10);
						} else if (gameState.mapType === 'under') {
							gameState.oneUpShroom = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-8').setOrigin(0, 1).setSize(10);
						} else if (gameState.mapType === 'water') {
							gameState.oneUpShroom = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-20').setOrigin(0, 1).setSize(10);
						} else if (gameState.mapType === 'castle') {
							gameState.oneUpShroom = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-14').setOrigin(0, 1).setSize(10);
						}
						gameState.sfx.powerUpAppears.play();
						gameState.oneUpShroom.depth = -1;
						gameState.oneUpShroom.body.setAllowGravity(false);
						this.tweens.add({
							targets: gameState.oneUpShroom,
							y: '-=17',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								gameState.oneUpShroom.body.setAllowGravity(true);
								gameState.oneUpShroom.body.setBounce(1, 0);
								movement(gameState.oneUpShroom);
								this.physics.add.collider(gameState.oneUpShroom, gameState.background);
								this.physics.add.collider(gameState.oneUpShroom, gameState.bricks);
								this.physics.add.collider(gameState.oneUpShroom, gameState.floatBricks);
								this.physics.add.collider(gameState.oneUpShroom, gameState.mushroomBoxes);
								this.physics.add.collider(gameState.oneUpShroom, gameState.mysteryBoxes);
								this.physics.add.collider(gameState.oneUpShroom, box);
								this.physics.add.overlap(gameState.player, gameState.oneUpShroom, () => {
									gameState.oneUpShroom.destroy();
									let lifeNotification = this.add.bitmapText(gameState.oneUpShroom.x, gameState.oneUpShroom.y - 20, 'font6', '1UP', 6).setOrigin(0, 1);
									this.tweens.add({
										targets: lifeNotification,
										y: '-=20',
										ease: 'Linear',
										duration: 750,
										repeat: 0,
										onComplete: () => {
											lifeNotification.destroy();
										}
									});
									if (gameState.character.mario.active) {
										gameState.character.mario.lives++;
									} else {
										gameState.character.luigi.lives++;
									}
									gameState.sfx.oneUp.play();
								});
							}
						});
					}
				});
				gameState.sfx.bump.play();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.mysteryBoxes, (player, box) => {
			if (gameState.player.body.touching.up) {
				this.tweens.add({
					targets: box,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						box.destroy();
						if (gameState.mapType === 'above') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-57').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-165').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-111').setImmovable(true);
						}
						box.body.setAllowGravity(false);
						box.setOrigin(0, 1);
						this.physics.add.collider(gameState.goombas, box);
						this.physics.add.collider(gameState.turtles, box);
						this.physics.add.collider(gameState.paraturtles, box);
						this.physics.add.collider(gameState.redTurtles, box);
						this.physics.add.collider(gameState.redParaturtles, box);
						this.physics.add.collider(player, box, () => {
							gameState.sfx.bump.play();
						}, null, this);
						const coinUp = this.add.sprite(box.x, box.y - 5, 'sprites', 'Sprites-120').setOrigin(0, 1);
						coinUp.anims.play('boxCoin');
						gameState.sfx.coin.play();
						coinUp.depth = -1;
						this.tweens.add({
							targets: coinUp,
							y: '-=50',
							ease: 'Bounce',
							duration: 500,
							repeat: 0,
							onComplete: () => {
								let scoreNotification = this.add.bitmapText(coinUp.x, coinUp.y, 'font6', '200', 6).setOrigin(0, 1);
								this.tweens.add({
									targets: scoreNotification,
									y: '-=20',
									ease: 'Linear',
									duration: 750,
									repeat: 0,
									onComplete: () => {
										scoreNotification.destroy();
									}
								});
								coinUp.destroy();
								if (gameState.character.mario.active) {
									gameState.character.mario.coins++;
									gameState.character.mario.score += 200;
									gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
									gameState.coinText.text = `x${addDigits(gameState.character.mario.coins, 2)}`;
								} else {
									gameState.character.luigi.coins++;
									gameState.character.luigi.score += 200;
									gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
									gameState.coinText.text = `x${addDigits(gameState.character.luigi.coins, 2)}`;
								}
							}
						});
					}
				});
				gameState.sfx.bump.play();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.mushroomBoxes, (player, box) => {
			if (gameState.player.body.touching.up) {
				this.tweens.add({
					targets: box,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						box.destroy();
						if (gameState.mapType === 'above') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-57').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-165').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							box = this.physics.add.sprite(box.x, box.y, 'textures', 'MarioEnviro-111').setImmovable(true);
						}
						box.body.setAllowGravity(false);
						box.setOrigin(0, 1);
						this.physics.add.collider(player, box, () => {
							gameState.sfx.bump.play();
						}, null, this);
						this.physics.add.collider(gameState.enemyGroup, box);
						if (gameState.super) {
							let flower = {};
							if (gameState.mapType === 'above') {
								flower = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-25').setOrigin(0, 1);
								flower.anims.play('owFlower', true);
							} else if (gameState.mapType === 'under') {
								flower = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-34').setOrigin(0, 1);
								flower.anims.play('ugFlower', true);
							} else if (gameState.mapType === 'water') {
								flower = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-42').setOrigin(0, 1);
								flower.anims.play('uwFlower', true);
							} else if (gameState.mapType === 'castle') {
								flower = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-50').setOrigin(0, 1);
								flower.anims.play('castleFlower', true);
							}
							gameState.sfx.powerUpAppears.play();
							flower.depth = -1;
							flower.body.setAllowGravity(false);
							this.tweens.add({
								targets: flower,
								y: '-=16',
								ease: 'Linear',
								duration: 750,
								repeat: 0,
								onComplete: () => {
									this.physics.add.overlap(gameState.player, flower, () => {
										gameState.sfx.powerUp.play();
										let scoreNotification = this.add.bitmapText(flower.x, flower.y - 20, 'font6', '1000', 6).setOrigin(0, 1);
										this.tweens.add({
											targets: scoreNotification,
											y: '-=20',
											ease: 'Linear',
											duration: 750,
											repeat: 0,
											onComplete: () => {
												scoreNotification.destroy();
											}
										});
										if (gameState.character.mario.active) {
											gameState.character.mario.score += 1000;
											gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
										} else {
											gameState.character.luigi.score += 1000;
											gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
										}
										flower.destroy();
										if (gameState.super && !gameState.firePower) {
											gameState.firePower = true;
											gameState.player.play('superInvincibleOWIdle', true);
											gameState.keyboard = false;
											gameState.animations = false;
											this.physics.pause();
											this.time.addEvent({
												delay: 1000,
												loop: false,
												callback: () => {
													this.physics.resume();
													gameState.keyboard = true;
													gameState.animations = true;
													gameState.player.setTexture('playerSprites', 'FirePowerSprites-0');
												}
											});
										} else  if (!gameState.super) {
											if (gameState.character.mario.active) {
												gameState.super = true;
												this.tweens.add({
													targets: gameState.player,
													alpha: { start: 0, to: 1 },
													duration: 200,
													repeat: 4,
													onStart: () => {
														this.physics.pause();
														gameState.keyboard = false;
														gameState.animations = false;
														gameState.player.play('marioEnlarge', true);
													},
													onComplete: () => {
														this.physics.resume();
														gameState.player.setTexture('playerSprites', 'SuperMarioSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
														gameState.keyboard = true;
														gameState.animations = true;
													}
												});
											} else if (gameState.character.luigi.active) {
												gameState.super = true;
												this.tweens.add({
													targets: gameState.player,
													alpha: { start: 0, to: 1 },
													duration: 200,
													repeat: 4,
													onStart: () => {
														this.physics.pause();
														gameState.keyboard = false;
														gameState.animations = false;
														gameState.player.play('luigiEnlarge', true);
													},
													onComplete: () => {
														this.physics.resume();
														gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
														gameState.keyboard = true;
														gameState.animations = true;
													}
												});
											}
										}
									});
								}
							});
						} else {
							gameState.mushroom = this.physics.add.sprite(box.x, box.y, 'sprites', 'Sprites-0').setOrigin(0, 1).setSize(10);
							gameState.sfx.powerUpAppears.play();
							gameState.mushroom.depth = -1;
							gameState.mushroom.body.setAllowGravity(false);
							this.tweens.add({
								targets: gameState.mushroom,
								y: '-=17',
								ease: 'Linear',
								duration: 750,
								repeat: 0,
								onComplete: () => {
									gameState.mushroom.body.setAllowGravity(true);
									gameState.mushroom.body.setBounce(1, 0);
									movement(gameState.mushroom);
									this.physics.add.collider(gameState.mushroom, gameState.background);
									this.physics.add.collider(gameState.mushroom, gameState.objectGroup);
									this.physics.add.collider(gameState.mushroom, box);
									this.physics.add.overlap(gameState.player, gameState.mushroom, () => {
										gameState.mushroom.destroy();
										let scoreNotification = this.add.bitmapText(gameState.mushroom.x, gameState.mushroom.y - 20, 'font6', '1000', 6).setOrigin(0, 1);
										this.tweens.add({
											targets: scoreNotification,
											y: '-=20',
											ease: 'Linear',
											duration: 750,
											repeat: 0,
											onComplete: () => {
												scoreNotification.destroy();
											}
										});
										if (gameState.character.mario.active) {
											gameState.character.mario.score += 1000;
											gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
										} else {
											gameState.character.luigi.score += 1000;
											gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
										}
										gameState.sfx.powerUp.play();
										if (gameState.character.mario.active) {
											gameState.super = true;
											this.tweens.add({
												targets: gameState.player,
												alpha: { start: 0, to: 1 },
												duration: 200,
												repeat: 0,
												loop: 4,
												onStart: () => {
													this.physics.pause();
													gameState.keyboard = false;
													gameState.animations = false;
													gameState.player.play('marioEnlarge', true);
												},
												onComplete: () => {
													this.physics.resume();
													gameState.player.setTexture('playerSprites', 'SuperMarioSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
													gameState.keyboard = true;
													gameState.animations = true;
												}
											});
										} else {
											gameState.super = true;
											this.tweens.add({
												targets: gameState.player,
												alpha: { start: 0, to: 1 },
												duration: 200,
												repeat: 4,
												onStart: () => {
													this.physics.pause();
													gameState.keyboard = false;
													gameState.animations = false;
													gameState.player.play('marioEnlarge', true);
												},
												onComplete: () => {
													this.physics.resume();
													gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
													gameState.keyboard = true;
													gameState.animations = true;
												}
											});
										}
									});
								}
							});
						}
					}
				});
				gameState.sfx.bump.play();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.mushroomBricks, (player, brick) => {
			if (gameState.player.body.touching.up) {
				this.tweens.add({
					targets: brick,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						brick.destroy();
						if (gameState.mapType === 'above') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-57').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-165').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-111').setImmovable(true);
						}
						brick.body.setAllowGravity(false);
						brick.setOrigin(0, 1);
						this.physics.add.collider(player, brick, () => {
							gameState.sfx.bump.play();
						}, null, this);
						this.physics.add.collider(gameState.enemyGroup, brick);
						if (gameState.super) {
							let flower = {};
							if (gameState.mapType === 'above') {
								flower = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-25').setOrigin(0, 1);
							} else if (gameState.mapType === 'under') {
								flower = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-34').setOrigin(0, 1);
							} else if (gameState.mapType === 'water') {
								flower = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-50').setOrigin(0, 1);
							} else if (gameState.mapType === 'castle') {
								flower = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-42').setOrigin(0, 1);
							}
							flower.anims.play('owFlower', true);
							gameState.sfx.powerUpAppears.play();
							flower.depth = -1;
							flower.body.setAllowGravity(false);
							this.tweens.add({
								targets: flower,
								y: '-=16',
								ease: 'Linear',
								duration: 750,
								repeat: 0,
								onComplete: () => {
									this.physics.add.overlap(gameState.player, flower, () => {
										gameState.sfx.powerUp.play();
										let scoreNotification = this.add.bitmapText(flower.x, flower.y - 20, 'font6', '1000', 6).setOrigin(0, 1);
										this.tweens.add({
											targets: scoreNotification,
											y: '-=20',
											ease: 'Linear',
											duration: 750,
											repeat: 0,
											onComplete: () => {
												scoreNotification.destroy();
											}
										});
										if (gameState.character.mario.active) {
											gameState.character.mario.score += 1000;
											gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
										} else {
											gameState.character.luigi.score += 1000;
											gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
										}
										flower.destroy();
										if (gameState.super && !gameState.firePower) {
											gameState.firePower = true;
											gameState.player.play('superInvincibleOWIdle', true);
											gameState.keyboard = false;
											gameState.animations = false;
											this.physics.pause();
											this.time.addEvent({
												delay: 1000,
												loop: false,
												callback: () => {
													this.physics.resume();
													gameState.keyboard = true;
													gameState.animations = true;
													gameState.player.setTexture('playerSprites', 'FirePowerSprites-0');
												}
											});
										} else  if (!gameState.super) {
											if (gameState.character.mario.active) {
												gameState.super = true;
												this.tweens.add({
													targets: gameState.player,
													alpha: { start: 0, to: 1 },
													duration: 200,
													repeat: 4,
													onStart: () => {
														this.physics.pause();
														gameState.keyboard = false;
														gameState.animations = false;
														gameState.player.play('marioEnlarge', true);
													},
													onComplete: () => {
														this.physics.resume();
														gameState.player.setTexture('playerSprites', 'SuperMarioSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
														gameState.keyboard = true;
														gameState.animations = true;
													}
												});
											} else if (gameState.character.luigi.active) {
												gameState.super = true;
												this.tweens.add({
													targets: gameState.player,
													alpha: { start: 0, to: 1 },
													duration: 200,
													repeat: 4,
													onStart: () => {
														this.physics.pause();
														gameState.keyboard = false;
														gameState.animations = false;
														gameState.player.play('luigiEnlarge', true);
													},
													onComplete: () => {
														this.physics.resume();
														gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
														gameState.keyboard = true;
														gameState.animations = true;
													}
												});
											}
										}
									});
								}
							});
						} else {
							gameState.mushroom = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-0').setOrigin(0, 1).setSize(10);
							gameState.sfx.powerUpAppears.play();
							gameState.mushroom.depth = -1;
							gameState.mushroom.body.setAllowGravity(false);
							this.tweens.add({
								targets: gameState.mushroom,
								y: '-=17',
								ease: 'Linear',
								duration: 750,
								repeat: 0,
								onComplete: () => {
									gameState.mushroom.body.setAllowGravity(true);
									gameState.mushroom.body.setBounce(1, 0);
									movement(gameState.mushroom);
									this.physics.add.collider(gameState.mushroom, gameState.background);
									this.physics.add.collider(gameState.mushroom, gameState.objectGroup);
									this.physics.add.collider(gameState.mushroom, brick);
									this.physics.add.overlap(gameState.player, gameState.mushroom, () => {
										gameState.mushroom.destroy();
										let scoreNotification = this.add.bitmapText(gameState.mushroom.x, gameState.mushroom.y - 20, 'font6', '1000', 6).setOrigin(0, 1);
										this.tweens.add({
											targets: scoreNotification,
											y: '-=20',
											ease: 'Linear',
											duration: 750,
											repeat: 0,
											onComplete: () => {
												scoreNotification.destroy();
											}
										});
										if (gameState.character.mario.active) {
											gameState.character.mario.score += 1000;
											gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
										} else {
											gameState.character.luigi.score += 1000;
											gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
										}
										gameState.sfx.powerUp.play();
										if (gameState.character.mario.active) {
											gameState.super = true;
											this.tweens.add({
												targets: gameState.player,
												alpha: { start: 0, to: 1 },
												duration: 200,
												repeat: 0,
												loop: 4,
												onStart: () => {
													this.physics.pause();
													gameState.keyboard = false;
													gameState.animations = false;
													gameState.player.play('marioEnlarge', true);
												},
												onComplete: () => {
													this.physics.resume();
													gameState.player.setTexture('playerSprites', 'SuperMarioSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
													gameState.keyboard = true;
													gameState.animations = true;
												}
											});
										} else {
											gameState.super = true;
											this.tweens.add({
												targets: gameState.player,
												alpha: { start: 0, to: 1 },
												duration: 200,
												repeat: 4,
												onStart: () => {
													this.physics.pause();
													gameState.keyboard = false;
													gameState.animations = false;
													gameState.player.play('marioEnlarge', true);
												},
												onComplete: () => {
													this.physics.resume();
													gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-0').setSize(gameState.player.frame.width, gameState.player.frame.height, false);
													gameState.keyboard = true;
													gameState.animations = true;
												}
											});
										}
									});
								}
							});
						}
					}
				});
				gameState.sfx.bump.play();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.oneUpBricks, (player, brick) => {
			if (gameState.player.body.touching.up) {
				this.tweens.add({
					targets: brick,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						brick.destroy();
						if (gameState.mapType === 'above') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-57').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-165').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-111').setImmovable(true);
						}
						brick.body.setAllowGravity(false);
						brick.setOrigin(0, 1);
						this.physics.add.collider(player, brick, () => {
							gameState.sfx.bump.play();
						}, null, this);
						this.physics.add.collider(gameState.goombas, brick);
						this.physics.add.collider(gameState.turtles, brick);
						this.physics.add.collider(gameState.paraturtles, brick);
						this.physics.add.collider(gameState.redTurtles, brick);
						this.physics.add.collider(gameState.redParaturtles, brick);
						if (gameState.mapType === 'above') {
							gameState.oneUpShroom = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-1').setOrigin(0, 1).setSize(10);
						} else if (gameState.mapType === 'under') {
							gameState.oneUpShroom = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-8').setOrigin(0, 1).setSize(10);
						} else if (gameState.mapType === 'water') {
							gameState.oneUpShroom = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-20').setOrigin(0, 1).setSize(10);
						} else if (gameState.mapType === 'castle') {
							gameState.oneUpShroom = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-14').setOrigin(0, 1).setSize(10);
						}
						gameState.sfx.powerUpAppears.play();
						gameState.oneUpShroom.depth = -1;
						gameState.oneUpShroom.body.setAllowGravity(false);
						this.tweens.add({
							targets: gameState.oneUpShroom,
							y: '-=17',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								gameState.oneUpShroom.body.setAllowGravity(true);
								gameState.oneUpShroom.body.setBounce(1, 0);
								movement(gameState.oneUpShroom);
								this.physics.add.collider(gameState.oneUpShroom, gameState.background);
								this.physics.add.collider(gameState.oneUpShroom, gameState.bricks);
								this.physics.add.collider(gameState.oneUpShroom, gameState.floatBricks);
								this.physics.add.collider(gameState.oneUpShroom, gameState.mushroomBoxes);
								this.physics.add.collider(gameState.oneUpShroom, gameState.mysteryBoxes);
								this.physics.add.collider(gameState.oneUpShroom, gameState.mysteryBoxes);
								this.physics.add.collider(gameState.oneUpShroom, gameState.oneUpBricks);
								this.physics.add.collider(gameState.oneUpShroom, brick);
								this.physics.add.overlap(gameState.player, gameState.oneUpShroom, () => {
									gameState.oneUpShroom.destroy();
									let lifeNotification = this.add.bitmapText(gameState.oneUpShroom.x, gameState.oneUpShroom.y - 20, 'font6', '1UP', 6).setOrigin(0, 1);
									this.tweens.add({
										targets: lifeNotification,
										y: '-=20',
										ease: 'Linear',
										duration: 750,
										repeat: 0,
										onComplete: () => {
											lifeNotification.destroy();
										}
									});
									if (gameState.character.mario.active) {
										gameState.character.mario.lives++;
									} else {
										gameState.character.luigi.lives++;
									}
									gameState.sfx.oneUp.play();
								});
							}
						});
					}
				});
				gameState.sfx.bump.play();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.starBricks, (player, brick) => {
			if (gameState.player.body.touching.up) {
				this.tweens.add({
					targets: brick,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						brick.destroy();
						if (gameState.mapType === 'above') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-57').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-165').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-111').setImmovable(true);
						}
						brick.body.setAllowGravity(false);
						brick.setOrigin(0, 1);
						this.physics.add.collider(player, brick, () => {
							gameState.sfx.bump.play();
						}, null, this);
						this.physics.add.collider(gameState.goombas, brick);
						this.physics.add.collider(gameState.turtles, brick);
						this.physics.add.collider(gameState.paraturtles, brick);
						this.physics.add.collider(gameState.redTurtles, brick);
						this.physics.add.collider(gameState.redParaturtles, brick);
						gameState.star = this.physics.add.sprite(brick.x, brick.y, 'sprites', 'Sprites-58').setOrigin(0, 1);
						if (gameState.mapType === 'above') {
							gameState.star.anims.play('owStar', true);
						} else if (gameState.mapType === 'under') {
							gameState.star.anims.play('ugStar', true);
						} else if (gameState.mapType === 'water') {
							gameState.star.anims.play('uwStar', true);
						} else if (gameState.mapType === 'castle') {
							gameState.star.anims.play('castleStar', true);
						}
						gameState.sfx.powerUpAppears.play();
						gameState.sfx.powerUpAppears.play();
						gameState.star.depth = -1;
						gameState.star.body.setAllowGravity(false);
						this.tweens.add({
							targets: gameState.star,
							y: '-=17',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								gameState.star.body.setAllowGravity(true);
								gameState.star.body.setBounce(1, 1);
								gameState.star.setVelocity(50, -100);
								this.physics.add.collider(gameState.star, gameState.background);
								this.physics.add.collider(gameState.star, gameState.bricks);
								this.physics.add.collider(gameState.star, gameState.floatBricks);
								this.physics.add.collider(gameState.star, gameState.mushroomBoxes);
								this.physics.add.collider(gameState.star, gameState.mysteryBoxes);
								this.physics.add.collider(gameState.star, gameState.coinBricks);
								this.physics.add.collider(gameState.star, gameState.starBricks);
								this.physics.add.collider(gameState.star, brick);
								this.physics.add.overlap(gameState.player, gameState.star, () => {
									gameState.star.destroy();
									let scoreNotification = this.add.bitmapText(gameState.star.x, gameState.star.y - 20, 'font6', '1000', 6).setOrigin(0, 1);
									this.tweens.add({
										targets: scoreNotification,
										y: '-=20',
										ease: 'Linear',
										duration: 750,
										repeat: 0,
										onComplete: () => {
											scoreNotification.destroy();
										}
									});
									if (gameState.character.mario.active) {
										gameState.character.mario.score += 1000;
										gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
									} else {
										gameState.character.luigi.score += 1000;
										gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
									}
									gameState.player.anims.stop();
									this.game.sound.stopAll();
									gameState.sfx.powerUp.play();
									gameState.currentMusic.invincibleBGM.play({ loop: true });
									gameState.invincible = true;
									gameState.player.setMass(10);
									this.time.addEvent({
										delay: 10000,
										loop: false,
										callback: () => {
											gameState.invincible = false;
											gameState.player.setMass(1);
											gameState.currentMusic.invincibleBGM.stop();
											gameState.currentMusic.aboveGroundBGM.play({ loop: true });
										}
									});
								});
							}
						});
					}
				});
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.vineBricks, (player, brick) => {
			if (player.body.touching.up) {
				this.tweens.add({
					targets: brick,
					y: '-=5',
					duration: 100,
					repeat: 0,
					yoyo: true,
					onComplete: () => {
						brick.destroy();
						if (gameState.mapType === 'above') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-3').setImmovable(true);
						} else if (gameState.mapType === 'under') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-10').setImmovable(true);
						} else if (gameState.mapType === 'water') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-22').setImmovable(true);
						} else if (gameState.mapType === 'castle') {
							brick = this.physics.add.sprite(brick.x, brick.y, 'textures', 'MarioEnviro-16').setImmovable(true);
						}
						brick.body.setAllowGravity(false);
						brick.setOrigin(0, 1);
						this.physics.add.collider(player, brick, () => {
							gameState.sfx.bump.play();
						}, null, this);
						this.physics.add.collider(gameState.goombas, brick);
						this.physics.add.collider(gameState.turtles, brick);
						this.physics.add.collider(gameState.redTurtles, brick);
						this.physics.add.collider(gameState.redParaturtles, brick);
						
					}
				});

				let vineBase = this.physics.add.group({
					allowGravity: false,
					immovable: true
				});
				this.time.addEvent({
					delay: 300,
					repeat: 0,
					callback: () => {
						let vineTip = this.physics.add.sprite(brick.x + 8, brick.y - 24, 'sprites', 'Sprites-91').setImmovable(true).setSize(3, 16);
						vineTip.body.setAllowGravity(false);
						this.time.addEvent({
							delay: 300,
							repeat: 0,
							callback: () => {
								vineBase.create(brick.x + 8, brick.y - 24, 'sprites', 'Sprites-124').setSize(3, 16);
								vineTip.y = brick.y - 40;
								this.time.addEvent({
									delay: 300,
									repeat: 0,
									callback: () => {
										vineBase.create(brick.x + 8, brick.y - 40, 'sprites', 'Sprites-124').setSize(3, 16);
										vineTip.y = brick.y - 56;
										this.time.addEvent({
											delay: 300,
											repeat: 0,
											callback: () => {
												vineBase.create(brick.x + 8, brick.y - 56, 'sprites', 'Sprites-124').setSize(3, 16);
												vineTip.y = brick.y - 72;
												this.time.addEvent({
													delay: 300,
													repeat: 0,
													callback: () => {
														vineBase.create(brick.x + 8, brick.y - 72, 'sprites', 'Sprites-124').setSize(3, 16);
														vineTip.y = brick.y - 88;
														this.time.addEvent({
															delay: 300,
															repeat: 0,
															callback: () => {
																vineBase.create(brick.x + 8, brick.y - 88, 'sprites', 'Sprites-124').setSize(3, 16);
																vineTip.y = brick.y - 104;
																this.time.addEvent({
																	delay: 300,
																	repeat: 0,
																	callback: () => {
																		vineBase.create(brick.x + 8, brick.y - 104, 'sprites', 'Sprites-124').setSize(3, 16);
																		vineTip.y = brick.y - 120;
																		this.time.addEvent({
																			delay: 300,
																			repeat: 0,
																			callback: () => {
																				vineBase.create(brick.x + 8, brick.y - 120, 'sprites', 'Sprites-124').setSize(3, 16);
																				vineTip.y = brick.y - 136;
																				this.time.addEvent({
																					delay: 300,
																					repeat: 0,
																					callback: () => {
																						vineBase.create(brick.x + 8, brick.y - 136, 'sprites', 'Sprites-124').setSize(3, 16);
																						vineTip.y = brick.y - 152;
																						this.time.addEvent({
																							delay: 300,
																							repeat: 0,
																							callback: () => {
																								vineBase.create(brick.x + 8, brick.y - 152, 'sprites', 'Sprites-124').setSize(3, 16);
																								vineTip.y = brick.y - 168;
																								this.time.addEvent({
																									delay: 300,
																									repeat: 0,
																									callback: () => {
																										vineBase.create(brick.x + 8, brick.y - 168, 'sprites', 'Sprites-124').setSize(3, 16);
																										vineBase.setDepth(-2);
																										vineTip.y = brick.y - 184;
																									}
																								});
																							}
																						});
																					}
																				});
																			}
																		});
																	}
																});
															}
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
				this.physics.add.collider(vineBase, gameState.player, () => {
					this.tweens.add({
						targets: gameState.player,
						y: 208,
						ease: 'Linear',
						repeat: 0,
						onStart: () => {
							gameState.player.body.checkCollision.up = false;
							if (gameState.character.mario.active && !gameState.firePower) {
								if (gameState.super) {
									gameState.player.play('superMarioClimb', true);
								} else {
									gameState.player.play('marioClimb', true);
								}
							} else if (gameState.character.luigi.active && !gameState.firePower) {
								if (gameState.super) {
									gameState.player.play('superLuigiClimb', true);
								} else {
									gameState.player.play('luigiClimb', true);
								}
							} else {
								gameState.player.play('fireClimb', true);
							}
						},
						onComplete: () => {
							gameState.player.body.checkCollision.up = true;
							gameState.cloudLayer = true;
							this.cameras.main.setBounds(0, 0, gameState.width, 240);
							if (gameState.character.mario.active && !gameState.firePower) {
								if (gameState.super) {
									gameState.player.setTexture('playerSprites', 'SuperMarioSprites-8');
								} else {
									gameState.player.setTexture('playerSprites', 'MarioSprites-8');
								}
							} else if (gameState.character.luigi.active && !gameState.firePower) {
								if (gameState.super) {
									gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-8');
								} else {
									gameState.player.setTexture('playerSprites', 'LuigiSprites-8');
								}
							} else {
								gameState.player.setTexture('playerSprites', 'FirePowerSprites-8');
							}
						}
					});
				}, null, this)
			}
		}, null, this);
		this.physics.add.overlap(gameState.player, gameState.coins, (player, coin) => {
			gameState.sfx.coin.play();
			coin.destroy();
			if (gameState.character.mario.active) {
				gameState.character.mario.coins++;
				gameState.character.mario.score += 200;
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				gameState.coinText.text = `x${addDigits(gameState.character.mario.coins, 2)}`;
			} else {
				gameState.character.luigi.coins++;
				gameState.character.luigi.score += 200;
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				gameState.coinText.text = `x${addDigits(gameState.character.luigi.coins, 2)}`;
			}
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.background, (fireball) => {
			if (fireball.body.onWall()) {
				gameState.sfx.bump.play();
				fireball.body.setAllowGravity(false);
				fireball.body.stop();
				fireball.play('fireworkAnim', true);
				this.time.addEvent({
					delay: 200,
					loop: false,
					callback: () => {
						fireball.destroy();
					}
				});
			}
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.objectGroup, (fireball) => {
			if (fireball.body.touching.right || fireball.body.touching.left) {
				gameState.sfx.bump.play();
				fireball.body.setAllowGravity(false);
				fireball.body.stop();
				fireball.play('fireworkAnim', true);
				this.time.addEvent({
					delay: 200,
					loop: false,
					callback: () => {
						fireball.destroy();
					}
				});
			}
		}, null, this);
	}

	addEnemyColliders() {
		this.physics.add.collider(gameState.enemyGroup);
		this.physics.add.collider(gameState.enemyGroup, gameState.background);
		this.physics.add.collider(gameState.enemyGroup, gameState.objectGroup);
		this.physics.add.overlap(gameState.player, gameState.goombas, (player, goomba) => {
			if (player.body.touching.down && !gameState.invincible) {
				player.body.setVelocityY(-100);
				goomba.disableBody();
				goomba.depth = -1;
				gameState.sfx.stomp.play();
				goomba.setMaxVelocity(0, 0);
				goomba.anims.stop();
				if (gameState.mapType === 'above') {
					goomba.setTexture('enemies', 'Enemies-2');
				} else if (gameState.mapType === 'under') {
					goomba.setTexture('enemies', 'Enemies-27');
				} else if (gameState.mapType === 'water') {
					goomba.setTexture('enemies', 'Enemies-52');
				} else if (gameState.mapType === 'castle') {
					goomba.setTexture('enemies', 'Enemies-76');
				}
				this.time.addEvent({
					delay: 1000,
					loop: false,
					callback: () => {
						goomba.destroy();
					}
				});
				if (gameState.multiplier <= 10) {
					gameState.multiplier++;
				}
				gameState.multiplierTimer.reset({
					delay: 1000,
					repeat: -1,
					callback: () => {
					gameState.multiplier = 0;
					}
				});
				let scoreNotification = this.add.bitmapText(goomba.x, goomba.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
			} else if (gameState.invincible) {
				if (player.body.velocity.x > 0) {
					goomba.setFlipY(true);
					goomba.setVelocity(300, -300);
					gameState.multiplier++;
					goomba.body.checkCollision.none = true;
					gameState.sfx.kick.play();
					this.time.addEvent({
						delay: 3000,
						loop: false,
						callback: () => {
							goomba.destroy();
						}
					});
					let scoreNotification = this.add.bitmapText(goomba.x, goomba.y - 20, 'font6', '100', 6).setOrigin(0, 1);
					this.tweens.add({
						targets: scoreNotification,
						y: '-=20',
						ease: 'Linear',
						duration: 750,
						repeat: 0,
						onComplete: () => {
							scoreNotification.destroy();
						}
					});
					if (gameState.character.mario.active) {
						if (gameState.multiplier < 10) {
							gameState.character.mario.score += 100;
						} else {
							gameState.character.mario.lives++;
						}
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						if (gameState.multiplier < 10) {
							gameState.character.luigi.score += 100;
						} else {
							gameState.character.luigi.lives++;
						}
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
				} else if (player.body.velocity.x < 0) {
					goomba.setFlipY(true);
					goomba.setVelocity(-300, -300);
					gameState.multiplier++;
					goomba.body.checkCollision.none = true;
					gameState.sfx.kick.play();
					this.time.addEvent({
						delay: 3000,
						loop: false,
						callback: () => {
							goomba.destroy();
						}
					});
					let scoreNotification = this.add.bitmapText(goomba.x, goomba.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
					this.tweens.add({
						targets: scoreNotification,
						y: '-=20',
						ease: 'Linear',
						duration: 750,
						repeat: 0,
						onComplete: () => {
							scoreNotification.destroy();
						}
					});
					if (gameState.character.mario.active) {
						if (gameState.multiplier < 10) {
							gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
						} else {
							gameState.character.mario.lives++;
						}
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						if (gameState.multiplier < 10) {
							gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
						} else {
							gameState.character.luigi.lives++;
						}
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
				}
			} else if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.turtles, (player, turtle) => {
			if (player.body.touching.down && !gameState.invincible) {
				player.body.setVelocityY(-100);
				gameState.sfx.stomp.play();
				turtle.body.stop();
				if (gameState.multiplier <= 10) {
					gameState.multiplier++;
				}
				gameState.multiplierTimer.reset({
					delay: 1000,
					repeat: -1,
					callback: () => {
					gameState.multiplier = 0;
					}
				});
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.destroy();
				let shell = {};
				if (gameState.mapType === 'above') {
					shell = this.physics.add.sprite(turtle.x, turtle.y, 'enemies', 'Enemies-7').setOrigin(0, 1).setSize(16, 14).setMass(5);
				} else if (gameState.mapType === 'under') {
					shell = this.physics.add.sprite(turtle.x, turtle.y, 'enemies', 'Enemies-32').setOrigin(0, 1).setSize(16, 14).setMass(5);
				} else if (gameState.mapType === 'water') {
					shell = this.physics.add.sprite(turtle.x, turtle.y, 'enemies', 'Enemies-81').setOrigin(0, 1).setSize(16, 14).setMass(5);
				} else if (gameState.mapType === 'castle') {
					shell = this.physics.add.sprite(turtle.x, turtle.y, 'enemies', 'Enemies-81').setOrigin(0, 1).setSize(16, 14).setMass(5);
				}
				this.physics.add.collider(shell, gameState.background, () => {
					if (shell.body.blocked.left || shell.body.touching.left) {
						shell.setVelocityX(200);
					} else if (shell.body.blocked.right || shell.body.touching.right) {
						shell.setVelocityX(-200);
					}
				}, null, this);
				this.physics.add.collider(shell, gameState.objectGroup, () => {
					if (shell.body.blocked.left || shell.body.touching.left) {
						shell.setVelocityX(200);
					} else if (shell.body.blocked.right || shell.body.touching.right) {
						shell.setVelocityX(-200);
					}
				}, null, this);
				this.physics.add.collider(shell, gameState.player, (shell, player) => {
					if (shell.body.velocity.x > -100 && player.body.touching.right && !gameState.invincible) {
						shell.setVelocityX(200);
						gameState.sfx.kick.play();
						gameState.shellTimer.reset();
					} else if (shell.body.velocity.x < 100 && player.body.touching.left && !gameState.invincible) {
						shell.setVelocityX(-200);
						gameState.sfx.kick.play();
						gameState.shellTimer.reset();
					} else if (player.body.touching.down && !gameState.invincible) {
						shell.body.setVelocity(0, 0);
						gameState.sfx.stomp.play();
					} else if (gameState.invincible) {
						shell.body.checkCollision.none = true;
						shell.body.stop();
						shell.setFlipY(true);
						gameState.sfx.kick.play();
						let scoreNotification = this.add.bitmapText(shell.x, shell.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
					} else if (gameState.invulnerable) {
						player.body.checkCollision.left = false;
						player.body.checkCollision.right = false;
						this.time.addEvent({
							delay: 1000,
							callback: () => {
								player.body.checkCollision.left = true;
								player.body.checkCollision.right = true;
							}
						});
					} else {
						this.onHit();
					}
				}, null, this);
				this.physics.add.collider(shell, gameState.goombas, (shell, goomba) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						goomba.setFlipY(true);
						goomba.setVelocity(200, -200);
						gameState.sfx.kick.play();
						goomba.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 3000,
							loop: false,
							callback: () => {
								goomba.destroy();
							}
						});
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(goomba.x, goomba.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
					}
				});
				this.physics.add.collider(shell, gameState.turtles, (shell, turtle) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
						turtle.anims.stop();
						if (gameState.mapType === 'above') {
							turtle.setTexture('enemies', 'Enemies-7');
						} else if (gameState.mapType === 'under') {
							turtle.setTexture('enemies', 'Enemies-32');
						} else if (gameState.mapType === 'water') {
							turtle.setTexture('enemies', 'Enemies-81');
						} else if (gameState.mapType === 'castle') {
							turtle.setTexture('enemies', 'Enemies-81');
						}
						gameState.sfx.kick.play();
						turtle.setFlipY(true);
						if (gameState.playerFacing === 'right') {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(50);
						} else {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(-50);
						}
						turtle.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								turtle.destroy();
							}
						});
					}
				});
				this.physics.add.collider(shell, gameState.redTurtles, (shell, turtle) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
						turtle.anims.stop();
						turtle.setTexture('enemies', 'Enemies-57');
						gameState.sfx.kick.play();
						turtle.setFlipY(true);
						if (gameState.playerFacing === 'right') {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(50);
						} else {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(-50);
						}
						turtle.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								turtle.destroy();
							}
						});
					}
				});
				this.physics.add.collider(shell, gameState.redParaturtles, (shell, turtle) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
						turtle.anims.stop();
						turtle.setTexture('enemies', 'Enemies-57');
						turtle.body.setAllowGravity(true);
						gameState.sfx.kick.play();
						turtle.setFlipY(true);
						turtle.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								turtle.destroy();
							}
						});
					}
				});
				this.physics.add.collider(gameState.fireball, shell, (fireball, shell) => {
					gameState.sfx.bump.play();
					fireball.body.setAllowGravity(false);
					fireball.body.stop();
					fireball.play('fireworkAnim', true);
					this.time.addEvent({
						delay: 300,
						loop: true,
						callback: () => {
							fireball.destroy();
						}
					});
					let scoreNotification = this.add.bitmapText(shell.x, shell.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
					this.tweens.add({
						targets: scoreNotification,
						y: '-=20',
						ease: 'Linear',
						duration: 750,
						repeat: 0,
						onComplete: () => {
							scoreNotification.destroy();
						}
					});
					if (gameState.character.mario.active) {
						if (gameState.multiplier < 10) {
							gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
						} else {
							gameState.character.mario.lives++;
						}
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						if (gameState.multiplier < 10) {
							gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
						} else {
							gameState.character.luigi.lives++;
						}
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					shell.anims.stop();
					if (gameState.mapType === 'above') {
						shell.setTexture('enemies', 'Enemies-7');
					} else if (gameState.mapType === 'under') {
						shell.setTexture('enemies', 'Enemies-32');
					} else if (gameState.mapType === 'water') {
						shell.setTexture('enemies', 'Enemies-81');
					} else if (gameState.mapType === 'castle') {
						shell.setTexture('enemies', 'Enemies-81');
					}
					shell.setFlipY(true);
					if (gameState.playerFacing === 'right') {
						shell.setVelocityY(-200);
						shell.setVelocityX(50);
					} else {
						shell.setVelocityY(-200);
						shell.setVelocityX(-50);
					}
					shell.body.checkCollision.none = true;
					this.time.addEvent({
						delay: 2000,
						loop: false,
						callback: () => {
							gameState.shellTimer.remove();
							shell.destroy();
						}
					});
				}, null, this);
				this.physics.add.collider(shell);
				gameState.shellTimer = this.time.addEvent({
					delay: 4000,
					loop: false,
					callback: () => {
						if (gameState.mapType === 'above') {
							shell.play('turtleEmergeOW');
						} else if (gameState.mapType === 'under') {
							shell.play('turtleEmergeUG');
						} else if (gameState.mapType === 'water') {
							shell.play('turtleEmergeUW');
						} else if (gameState.mapType === 'castle') {
							shell.play('turtleEmergeCASTLE');
						}
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								shell.destroy();
								if (gameState.mapType === 'above') {
									turtle = gameState.turtles.create(shell.x, shell.y, 'enemies', 'Enemies-4').setOrigin(0, 1).setSize(16, 24);
									turtle.play('owTurtleWalk', true);
								} else if (gameState.mapType === 'under') {
									turtle = gameState.turtles.create(shell.x, shell.y, 'enemies', 'Enemies-29').setOrigin(0, 1).setSize(16, 24);
									turtle.play('ugTurtleWalk', true);
								} else if (gameState.mapType === 'water') {
									turtle = gameState.turtles.create(shell.x, shell.y, 'enemies', 'Enemies-78').setOrigin(0, 1).setSize(16, 24);
									turtle.play('uwTurtleWalk', true);
								} else if (gameState.mapType === 'castle') {
									turtle = gameState.turtles.create(shell.x, shell.y, 'enemies', 'Enemies-78').setOrigin(0, 1).setSize(16, 24);
									turtle.play('castleTurtleWalk', true);
								}
								turtle.setVelocityX(-30);
								turtle.setOrigin(0, 1);
								turtle.body.setBounce(1, 1);
							}
						});
					}
				});
			} else if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.anims.stop();
				if (gameState.mapType === 'above') {
					turtle.setTexture('enemies', 'Enemies-7');
				} else if (gameState.mapType === 'under') {
					turtle.setTexture('enemies', 'Enemies-32');
				} else if (gameState.mapType === 'water') {
					turtle.setTexture('enemies', 'Enemies-81');
				} else if (gameState.mapType === 'castle') {
					turtle.setTexture('enemies', 'Enemies-81');
				}
				turtle.setFlipY(true);
				if (gameState.playerFacing === 'right') {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(50);
				} else {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(-50);
				}
				turtle.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						turtle.destroy();
					}
				});
			} else if (gameState.invulnerable) {
				player.body.checkCollision.left = false;
				player.body.checkCollision.right = false;
				this.time.addEvent({
					delay: 1000,
					callback: () => {
						player.body.checkCollision.left = true;
						player.body.checkCollision.right = true;
					}
				});
			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.paraturtles, (player, turtle) => {
			if (player.body.touching.down && !gameState.invincible) {
				player.body.setVelocityY(-100);
				gameState.sfx.stomp.play();
				turtle.body.stop();
				if (gameState.multiplier <= 10) {
					gameState.multiplier++;
				}
				gameState.multiplierTimer.reset({
					delay: 1000,
					repeat: -1,
					callback: () => {
					gameState.multiplier = 0;
					}
				});
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.destroy();
				turtle = gameState.turtles.create(turtle.x, turtle.y, 'enemies', 'Enemies-54');
			} else if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.anims.stop();
				turtle.setTexture('enemies', 'Enemies-57');
				turtle.setFlipY(true);
				if (gameState.playerFacing === 'right') {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(50);
				} else {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(-50);
				}
				turtle.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						turtle.destroy();
					}
				});
			} else if (gameState.invulnerable) {
				
			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.redTurtles, (player, turtle) => {
			if (player.body.touching.down && !gameState.invincible) {
				player.body.setVelocityY(-100);
				gameState.sfx.stomp.play();
				turtle.body.stop();
				if (gameState.multiplier <= 10) {
					gameState.multiplier++;
				}
				gameState.multiplierTimer.reset({
					delay: 1000,
					repeat: -1,
					callback: () => {
					gameState.multiplier = 0;
					}
				});
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.destroy();
				let shell = this.physics.add.sprite(turtle.x, turtle.y, 'enemies', 'Enemies-57').setOrigin(0, 1).setSize(16, 14).setMass(5);
				this.physics.add.collider(shell, gameState.background, () => {
					if (shell.body.blocked.left || shell.body.touching.left) {
						shell.setVelocityX(200);
					} else if (shell.body.blocked.right || shell.body.touching.right) {
						shell.setVelocityX(-200);
					}
				}, null, this);
				this.physics.add.collider(shell, gameState.objectGroup, () => {
					if (shell.body.blocked.left || shell.body.touching.left) {
						shell.setVelocityX(200);
					} else if (shell.body.blocked.right || shell.body.touching.right) {
						shell.setVelocityX(-200);
					}
				}, null, this);
				this.physics.add.collider(shell, gameState.player, (shell, player) => {
					if (shell.body.velocity.x > -100 && player.body.touching.right && !gameState.invincible) {
						shell.setVelocityX(200);
						gameState.sfx.kick.play();
						gameState.shellTimer.reset();
					} else if (shell.body.velocity.x < 100 && player.body.touching.left && !gameState.invincible) {
						shell.setVelocityX(-200);
						gameState.sfx.kick.play();
						gameState.shellTimer.reset();
					} else if (player.body.touching.down && !gameState.invincible) {
						shell.body.setVelocity(0, 0);
						gameState.sfx.stomp.play();
					} else if (gameState.invincible) {
						shell.body.checkCollision.none = true;
						shell.body.stop();
						shell.setFlipY(true);
						gameState.sfx.kick.play();
						let scoreNotification = this.add.bitmapText(shell.x, shell.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
					} else if (gameState.invulnerable) {
						player.body.checkCollision.left = false;
						player.body.checkCollision.right = false;
						this.time.addEvent({
							delay: 1000,
							callback: () => {
								player.body.checkCollision.left = true;
								player.body.checkCollision.right = true;
							}
						});
					} else {
						this.onHit();
					}
				}, null, this);
				this.physics.add.collider(shell, gameState.goombas, (shell, goomba) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						goomba.setFlipY(true);
						goomba.setVelocity(200, -200);
						gameState.sfx.kick.play();
						goomba.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 3000,
							loop: false,
							callback: () => {
								goomba.destroy();
							}
						});
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(goomba.x, goomba.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
					}
				});
				this.physics.add.collider(shell, gameState.turtles, (shell, turtle) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
						turtle.anims.stop();
						if (gameState.mapType === 'above') {
							turtle.setTexture('enemies', 'Enemies-7');
						} else if (gameState.mapType === 'under') {
							turtle.setTexture('enemies', 'Enemies-32');
						} else if (gameState.mapType === 'water') {
							turtle.setTexture('enemies', 'Enemies-81');
						} else if (gameState.mapType === 'castle') {
							turtle.setTexture('enemies', 'Enemies-81');
						}
						gameState.sfx.kick.play();
						turtle.setFlipY(true);
						if (gameState.playerFacing === 'right') {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(50);
						} else {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(-50);
						}
						turtle.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								turtle.destroy();
							}
						});
					}
				});
				this.physics.add.collider(shell, gameState.redTurtles, (shell, turtle) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
						turtle.anims.stop();
						turtle.setTexture('enemies', 'Enemies-57');
						gameState.sfx.kick.play();
						turtle.setFlipY(true);
						if (gameState.playerFacing === 'right') {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(50);
						} else {
							turtle.setVelocityY(-200);
							turtle.setVelocityX(-50);
						}
						turtle.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								turtle.destroy();
							}
						});
					}
				});
				this.physics.add.collider(shell, gameState.redParaturtles, (shell, turtle) => {
					if (shell.body.velocity.x > 50 || shell.body.velocity.x < -50) {
						if (gameState.multiplier <= 10) {
							gameState.multiplier++;
						}
						gameState.multiplierTimer.reset({
							delay: 1000,
							repeat: -1,
							callback: () => {
							gameState.multiplier = 0;
							}
						});
						let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
						this.tweens.add({
							targets: scoreNotification,
							y: '-=20',
							ease: 'Linear',
							duration: 750,
							repeat: 0,
							onComplete: () => {
								scoreNotification.destroy();
							}
						});
						if (gameState.character.mario.active) {
							if (gameState.multiplier < 10) {
								gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.mario.lives++;
							}
							gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
						} else {
							if (gameState.multiplier < 10) {
								gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
							} else {
								gameState.character.luigi.lives++;
							}
							gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
						}
						turtle.anims.stop();
						turtle.setTexture('enemies', 'Enemies-57');
						turtle.body.setAllowGravity(true);
						gameState.sfx.kick.play();
						turtle.setFlipY(true);
						turtle.body.checkCollision.none = true;
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								turtle.destroy();
							}
						});
					}
				});
				this.physics.add.collider(gameState.fireball, shell, (fireball, shell) => {
					gameState.sfx.bump.play();
					fireball.body.setAllowGravity(false);
					fireball.body.stop();
					fireball.play('fireworkAnim', true);
					this.time.addEvent({
						delay: 300,
						loop: true,
						callback: () => {
							fireball.destroy();
						}
					});
					let scoreNotification = this.add.bitmapText(shell.x, shell.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
					this.tweens.add({
						targets: scoreNotification,
						y: '-=20',
						ease: 'Linear',
						duration: 750,
						repeat: 0,
						onComplete: () => {
							scoreNotification.destroy();
						}
					});
					if (gameState.character.mario.active) {
						if (gameState.multiplier < 10) {
							gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
						} else {
							gameState.character.mario.lives++;
						}
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						if (gameState.multiplier < 10) {
							gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
						} else {
							gameState.character.luigi.lives++;
						}
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					shell.anims.stop();
					if (gameState.mapType === 'above') {
						shell.setTexture('enemies', 'Enemies-7');
					} else if (gameState.mapType === 'under') {
						shell.setTexture('enemies', 'Enemies-32');
					} else if (gameState.mapType === 'water') {
						shell.setTexture('enemies', 'Enemies-81');
					} else if (gameState.mapType === 'castle') {
						shell.setTexture('enemies', 'Enemies-81');
					}
					shell.setFlipY(true);
					if (gameState.playerFacing === 'right') {
						shell.setVelocityY(-200);
						shell.setVelocityX(50);
					} else {
						shell.setVelocityY(-200);
						shell.setVelocityX(-50);
					}
					shell.body.checkCollision.none = true;
					this.time.addEvent({
						delay: 2000,
						loop: false,
						callback: () => {
							gameState.shellTimer.remove();
							shell.destroy();
						}
					});
				}, null, this);
				this.physics.add.collider(shell);
				gameState.shellTimer = this.time.addEvent({
					delay: 4000,
					loop: false,
					callback: () => {
						shell.play('redTurtleEmerge');
						this.time.addEvent({
							delay: 2000,
							loop: false,
							callback: () => {
								shell.destroy();
								turtle = gameState.turtles.create(shell.x, shell.y, 'enemies', 'Enemies-54').setOrigin(0, 1).setSize(16, 24);
								turtle.play('redTurtleWalk', true);
								turtle.setVelocityX(-30);
								turtle.setOrigin(0, 1);
								turtle.body.setBounce(1, 1);
							}
						});
					}
				});
			} else if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.anims.stop();
				if (gameState.mapType === 'above') {
					turtle.setTexture('enemies', 'Enemies-7');
				} else if (gameState.mapType === 'under') {
					turtle.setTexture('enemies', 'Enemies-32');
				} else if (gameState.mapType === 'water') {
					turtle.setTexture('enemies', 'Enemies-81');
				} else if (gameState.mapType === 'castle') {
					turtle.setTexture('enemies', 'Enemies-81');
				}
				turtle.setFlipY(true);
				if (gameState.playerFacing === 'right') {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(50);
				} else {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(-50);
				}
				turtle.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						turtle.destroy();
					}
				});
			} else if (gameState.invulnerable) {
				player.body.checkCollision.left = false;
				player.body.checkCollision.right = false;
				this.time.addEvent({
					delay: 1000,
					callback: () => {
						player.body.checkCollision.left = true;
						player.body.checkCollision.right = true;
					}
				});
			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.redParaturtles, (player, turtle) => {
			if (player.body.touching.down && !gameState.invincible) {
				player.body.setVelocityY(-100);
				gameState.sfx.stomp.play();
				turtle.body.stop();
				if (gameState.multiplier <= 10) {
					gameState.multiplier++;
				}
				gameState.multiplierTimer.reset({
					delay: 1000,
					repeat: -1,
					callback: () => {
					gameState.multiplier = 0;
					}
				});
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', gameState.chainPoints[gameState.multiplier - 1], 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += (gameState.chainPoints[gameState.multiplier - 1]);
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.destroy();
				turtle = gameState.redTurtles.create(turtle.x, turtle.y, 'enemies', 'Enemies-54');
			} else if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				turtle.anims.stop();
				turtle.setTexture('enemies', 'Enemies-57');
				turtle.setFlipY(true);
				if (gameState.playerFacing === 'right') {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(50);
				} else {
					turtle.setVelocityY(-200);
					turtle.setVelocityX(-50);
				}
				turtle.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						turtle.destroy();
					}
				});
			} else if (gameState.invulnerable) {
				
			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.piranhaPlants, (player, plant) => {
			if (gameState.invincible) {
				plant.destroy();
				let scoreNotification = this.add.bitmapText(plant.x, plant.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
			} else if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.redCheeps, (player, fish) => {
			if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(fish.x, fish.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				fish.body.stop();
				fish.body.setAllowGravity(true);
				fish.anims.stop();
				fish.setFlipY(true);
				fish.setFlipX(true);
				fish.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						fish.destroy();
					}
				});
			} else if (gameState.mapType !== 'water' && player.body.touching.down) {
				let scoreNotification = this.add.bitmapText(fish.x, fish.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				fish.body.stop();
				fish.anims.stop();
				fish.setFlipY(true);
				fish.setFlipX(true);
				fish.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						fish.destroy();
					}
				});
			} else if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.grayCheeps, (player, fish) => {
			if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(fish.x, fish.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				fish.body.stop();
				fish.body.setAllowGravity(true);
				fish.anims.stop();
				fish.setFlipY(true);
				fish.setFlipX(true);
				fish.body.checkCollision.none = true;
				this.time.addEvent({
					delay: 2000,
					loop: false,
					callback: () => {
						fish.destroy();
					}
				});
			} else if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.bloobers, (player, squid) => {
			if (gameState.invincible) {
				squid.destroy();
				let scoreNotification = this.add.bitmapText(squid.x, squid.y - 20, 'font6', '100', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					if (gameState.multiplier < 10) {
						gameState.character.mario.score += 100;
					} else {
						gameState.character.mario.lives++;
					}
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					if (gameState.multiplier < 10) {
						gameState.character.luigi.score += 100;
					} else {
						gameState.character.luigi.lives++;
					}
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
			} else if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.goombas, (fireball, goomba) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(goomba.x, goomba.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			goomba.setFlipY(true);
			if (gameState.playerFacing === 'right') {
				goomba.setVelocityY(-200);
				goomba.setVelocityX(50);
			} else {
				goomba.setVelocityY(-200);
				goomba.setVelocityX(-50);
			}
			goomba.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					goomba.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.turtles, (fireball, turtle) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			turtle.anims.stop();
			if (gameState.mapType === 'above') {
				turtle.setTexture('enemies', 'Enemies-7');
			} else if (gameState.mapType === 'under') {
				turtle.setTexture('enemies', 'Enemies-32');
			} else if (gameState.mapType === 'water') {
				turtle.setTexture('enemies', 'Enemies-81');
			} else if (gameState.mapType === 'castle') {
				turtle.setTexture('enemies', 'Enemies-81');
			}
			turtle.setFlipY(true);
			if (gameState.playerFacing === 'right') {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(50);
			} else {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(-50);
			}
			turtle.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					turtle.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.paraturtles, (fireball, turtle) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			turtle.anims.stop();
			if (gameState.mapType === 'above') {
				turtle.setTexture('enemies', 'Enemies-7');
			} else if (gameState.mapType === 'under') {
				turtle.setTexture('enemies', 'Enemies-32');
			} else if (gameState.mapType === 'water') {
				turtle.setTexture('enemies', 'Enemies-81');
			} else if (gameState.mapType === 'castle') {
				turtle.setTexture('enemies', 'Enemies-81');
			}
			turtle.setFlipY(true);
			if (gameState.playerFacing === 'right') {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(50);
			} else {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(-50);
			}
			turtle.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					turtle.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.piranhaPlants, (fireball, plant) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(plant.x, plant.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			plant.destroy();
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.redTurtles, (fireball, turtle) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			turtle.anims.stop();
			turtle.setTexture('enemies', 'Enemies-57');
			turtle.setFlipY(true);
			if (gameState.playerFacing === 'right') {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(50);
			} else {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(-50);
			}
			turtle.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					turtle.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.redParaturtles, (fireball, turtle) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(turtle.x, turtle.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			turtle.anims.stop();
			turtle.setTexture('enemies', 'Enemies-57');
			turtle.setFlipY(true);
			if (gameState.playerFacing === 'right') {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(50);
			} else {
				turtle.setVelocityY(-200);
				turtle.setVelocityX(-50);
			}
			turtle.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					turtle.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.redCheeps, (fireball, fish) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(fish.x, fish.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			fish.body.stop();
			fish.body.setAllowGravity(true);
			fish.anims.stop();
			fish.setFlipY(true);
			fish.setFlipX(true);
			fish.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					fish.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.grayCheeps, (fireball, fish) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(fish.x, fish.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			fish.body.stop();
			fish.body.setAllowGravity(true);
			fish.anims.stop();
			fish.setFlipY(true);
			fish.setFlipX(true);
			fish.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					fish.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.bloobers, (fireball, squid) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			let scoreNotification = this.add.bitmapText(squid.x, squid.y - 20, 'font6', '100', 6).setOrigin(0, 1);
			this.tweens.add({
				targets: scoreNotification,
				y: '-=20',
				ease: 'Linear',
				duration: 750,
				repeat: 0,
				onComplete: () => {
					scoreNotification.destroy();
				}
			});
			if (gameState.character.mario.active) {
				if (gameState.multiplier < 10) {
					gameState.character.mario.score += 100;
				} else {
					gameState.character.mario.lives++;
				}
				gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
			} else {
				if (gameState.multiplier < 10) {
					gameState.character.luigi.score += 100;
				} else {
					gameState.character.luigi.lives++;
				}
				gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
			}
			squid.body.stop();
			squid.body.setAllowGravity(true);
			squid.anims.stop();
			squid.setTexture('enemies', 'Enemies-95');
			squid.setFlipY(true);
			squid.body.checkCollision.none = true;
			this.time.addEvent({
				delay: 2000,
				loop: false,
				callback: () => {
					squid.destroy();
				}
			});
		}, null, this);
		this.physics.add.collider(gameState.player, gameState.podoboos, this.onHit, null, this);
	}

	gameVariables(hurryTrack) {
		if (!gameState.sublevel) {
			if (gameState.player.x > gameState.progress && gameState.player.x > 128 && gameState.player.x < (gameState.width - 128)) {
				gameState.progress = gameState.player.x;
			}
			this.physics.world.bounds.x = gameState.progress - 128;
			this.physics.world.bounds.width = gameState.width - (gameState.progress - 128);
			
			if (gameState.player.x < gameState.progress) {
				this.cameras.main.stopFollow();
			} else {
				this.cameras.main.startFollow(gameState.player);
			}
		} else {
			this.cameras.main.stopFollow();
		}
		
		if (gameState.time === 0 && !gameState.courseCompleted) {
			this.onDeath();
		}

		if (!gameState.fallDeath) {
			if (gameState.player.y > config.height) {
				this.onDeath();
				gameState.fallDeath = true;
			}
		}

		if (gameState.time === 100 && !gameState.courseCompleted) {
			this.game.sound.stopAll();
			gameState.sfx.hurryUp.play();
			this.time.addEvent({
				delay: 2500,
				loop: false,
				callback: () => {
					hurryTrack.play({ loop: true });
				}
			});
		}

		if (gameState.character.mario.active) {
			if (gameState.character.mario.coins === 100) {
				gameState.character.mario.coins = 0;
				gameState.character.mario.lives++;
				gameState.coinText.text = `x${addDigits(gameState.character.mario.coins, 2)}`;
				gameState.sfx.oneUp.play();
			}
		} else {
			if (gameState.character.luigi.coins === 100) {
				gameState.character.luigi.coins = 0;
				gameState.character.luigi.lives++;
				gameState.coinText.text = `x${addDigits(gameState.character.luigi.coins, 2)}`;
				gameState.sfx.oneUp.play();
			}
		}
	}

	enemyBehavior() {
// Goombas
		Phaser.Actions.Call(gameState.goombas.getChildren(), function(goomba) {
			if ((goomba.x - gameState.player.x) < 150) {
				movement(goomba);
			}
			if (goomba.x < (gameState.player.x - 150)) {
				goomba.destroy();
			}
		});

// Turtles
		Phaser.Actions.Call(gameState.turtles.getChildren(), function(turtle) {
			if ((turtle.x - gameState.player.x) < 150) {
				movement(turtle);
			}
			if (turtle.x < (gameState.player.x - 150)) {
				turtle.destroy();
			}
		});

// Red Turtles
		Phaser.Actions.Call(gameState.redTurtles.getChildren(), function(turtle) {
			if ((turtle.x - gameState.player.x) < 150) {
				movement(turtle);
			}
			if (turtle.x < (gameState.player.x - 150)) {
				turtle.destroy();
			}
		});

// Fireballs
		Phaser.Actions.Call(gameState.fireball.getChildren(), function(fireball) {
			if (fireball.x > (gameState.player.x + 150)) {
				fireball.destroy();
			} else if (fireball.x < (gameState.player.x - 150)) {
				fireball.destroy();
			}
		});

// Bubbles
		Phaser.Actions.Call(gameState.bubble.getChildren(), function(bubble) {
			if (bubble.y <= 40) {
				bubble.destroy();
			}
		});

// Bloober
		Phaser.Actions.Call(gameState.bloobers.getChildren(), function(bloober) {
			if ((bloober.x - gameState.player.x) < 150) {
				bloober.body.enable = true;
			} else if (bloober.x < (gameState.player.x - 150)) {
				bloober.destroy();
			}
			if (bloober.y <= 45) {
				bloober.setVelocityY(20, 0);
			} else if (bloober.y > config.height - 32) {
				bloober.setVelocityY(-60);
			}
		});

// Red Cheep-Cheep
		if (gameState.mapType === 'water') {
			Phaser.Actions.Call(gameState.redCheeps.getChildren(), function(cheep) {
				if ((cheep.x - gameState.player.x) < 150) {
					movement(cheep);
				}
				if (cheep.x < (gameState.player.x - 150)) {
					cheep.destroy();
				}
			});
		}

// Gray Cheep-Cheep
		Phaser.Actions.Call(gameState.grayCheeps.getChildren(), function(cheep) {
			if ((cheep.x - gameState.player.x) < 150) {
				cheep.setVelocityX(-10);
			}
			if (cheep.x < (gameState.player.x - 150)) {
				cheep.destroy();
			}
		});

// Podoboos
		Phaser.Actions.Call(gameState.podoboos.getChildren(), function(podo) {
			if (podo.x < (gameState.player.x - 150)) {
				podo.destroy();
			}
		});

// Bowser
		if (gameState.bowser) {
			if (gameState.bowser.x < gameState.bowserLimitLeft) {
				gameState.bowser.setVelocityX(30);
			} else if (gameState.bowser.x > gameState.bowserLimitRight) {
				gameState.bowser.setVelocityX(-30);
			}
	
			if (gameState.bowser.x < gameState.player.x) {
				gameState.bowser.setFlipX(true);
			} else if (gameState.bowser.x > gameState.player.x) {
				gameState.bowser.setFlipX(false);
			}

			if (gameState.bowser.y > config.height) {
				if (!this.directionEvent.paused) {
					this.directionEvent.paused = true;
					this.jumpEvent.paused = true;
					this.fireEvent.paused = true;
				}
				gameState.bowser.destroy();
			}
		}
	}

	controls() {
// Keys
		gameState.cursors = this.input.keyboard.addKeys('W, S, A, D');
		gameState.cursors.Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		gameState.cursors.Shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
		gameState.cursors.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

// Pause
		if (Phaser.Input.Keyboard.JustDown(gameState.cursors.Enter)) {
			if (gameState.active) {
				gameState.keyboard = false;
				this.game.sound.pauseAll();
				gameState.sfx.pause.play();
				gameState.timedEvent.paused = true;
				this.anims.pauseAll();
				this.physics.pause();
				gameState.active = false;
			} else if (!gameState.active) {
				gameState.keyboard = true;
				gameState.sfx.pause.play();
				this.game.sound.resumeAll();
				gameState.timedEvent.paused = false;
				this.anims.resumeAll();
				this.physics.resume();
				gameState.active = true;
			}
		}

// Movement
		if (gameState.keyboard) {
			if (gameState.cursors.A.isDown) {
				gameState.playerFacing = 'left';
				if (gameState.cursors.Shift.isDown) {
					gameState.player.setAccelerationX(-175);
					gameState.player.setMaxVelocity(175, 500);
				} else {
					gameState.player.setAccelerationX(-100);
					gameState.player.setMaxVelocity(100, 500);
				}
			} else if (gameState.cursors.D.isDown) {
				gameState.playerFacing = 'right';
				if (gameState.cursors.Shift.isDown) {
					gameState.player.setAccelerationX(175);
					gameState.player.setMaxVelocity(175, 500);
				} else {
					gameState.player.setAccelerationX(100);
					gameState.player.setMaxVelocity(100, 500);
				}
			} else if (gameState.cursors.S.isDown) {
				gameState.player.setAccelerationX(0);
				if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.setTexture('playerSprites', 'SuperMarioSprites-6');
					} else {
						gameState.player.setTexture('playerSprites', 'MarioSprites-0');
					}
				} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-6');
					} else {
						gameState.player.setTexture('playerSprites', 'LuigiSprites-0');
					}
				} else if (gameState.firePower && !gameState.invincible) {
					gameState.player.setTexture('playerSprites', 'FirePowerSprites-6');
				} else if (gameState.invincible) {
					if (gameState.super) {
						if (gameState.mapType === 'above') {
							gameState.player.play('superInvincibleOWCrouch', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('superInvincibleUGCrouch', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('superInvincibleUWCrouch', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('superInvincibleCASTLECrouch', true);
						}
					} else {
						gameState.player.play('invincibleOWIdle', true);
					}
				}
			} else {
				gameState.player.setAccelerationX(0);
			}
			
			if (Phaser.Input.Keyboard.JustDown(gameState.cursors.Shift) && gameState.firePower && (gameState.fireball.getTotalUsed() < 2)) {
				if (gameState.playerFacing === 'right') {
					gameState.fireball.create((gameState.player.x + 10), (gameState.player.y - 19), 'fireball').setVelocityX(200).setBounce(1);
				} else {
					gameState.fireball.create((gameState.player.x - 10), (gameState.player.y - 19), 'fireball').setVelocityX(-200).setBounce(1);
				}
				gameState.animations = false;
				gameState.player.play('fireShoot');
				this.time.addEvent({
					delay: 100,
					loop: false,
					callback: () => {
						gameState.animations = true;
					}
				});
				gameState.fireball.playAnimation('fireballAnim');
				gameState.sfx.fireball.play();
			}

			if (gameState.mapType !== 'water') {
				if (Phaser.Input.Keyboard.JustDown(gameState.cursors.Space) && (gameState.player.body.touching.down || gameState.player.body.onFloor())) {
					if (gameState.player.body.velocity.x <= 100 && gameState.player.body.velocity.x >= -100) {
						gameState.player.setVelocityY(-375);
					} else if (gameState.player.body.velocity.x > 100 || gameState.player.body.velocity.x < -100) {
						gameState.player.setVelocityY(-425);
					}
					if (gameState.super) {
						gameState.sfx.superJump.play();
					} else {
						gameState.sfx.littleJump.play();
					}
				}
			} else {
				if (Phaser.Input.Keyboard.JustDown(gameState.cursors.Space) && gameState.player.y >= 40) {
					gameState.player.setVelocityY(-75);
					gameState.sfx.stomp.play();
					if (gameState.bubble.getTotalUsed() < 2) {
						gameState.bubble.create(gameState.player.x, gameState.player.y - 24, 'sprites', 'Sprites-207').setVelocityY(-75);
					}
				}
			}
		}

		if (gameState.super && gameState.cursors.S.isUp) {
			gameState.player.body.setSize(11, 32, true);
		} else if (gameState.super && gameState.cursors.S.isDown) {
			gameState.player.body.setSize(11, 14, true).setOffset(2, 18);
		} else {
			gameState.player.body.setSize(11, 16, true);
		}

		//Animations
		if (gameState.animations) {
			if (gameState.mapType !== 'water') {
				if (gameState.player.body.velocity.y < 0 && (gameState.cursors.Space.isDown || Phaser.Input.Keyboard.JustDown(gameState.cursors.Space))) {
					if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superMarioJump', true);
						} else {
							gameState.player.play('marioJump', true);
						}
					} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superLuigiJump', true);
						} else {
							gameState.player.play('luigiJump', true);
						}
					} else if (gameState.firePower && !gameState.invincible) {
						gameState.player.play('fireJump', true);
					} else if (gameState.invincible) {
						if (gameState.super) {
							if (gameState.mapType === 'above') {
								gameState.player.play('superInvincibleOWJump', true);
							} else if (gameState.mapType === 'under') {
								gameState.player.play('superInvincibleUGJump', true);
							} else if (gameState.mapType === 'water') {
								gameState.player.play('superInvincibleUWJump', true);
							} else if (gameState.mapType === 'castle') {
								gameState.player.play('superInvincibleCASTLEJump', true);
							}
						} else {
							if (gameState.mapType === 'above') {
								gameState.player.play('invincibleOWJump', true);
							} else if (gameState.mapType === 'under') {
								gameState.player.play('invincibleUGJump', true);
							} else if (gameState.mapType === 'water') {
								gameState.player.play('invincibleUWJump', true);
							} else if (gameState.mapType === 'castle') {
								gameState.player.play('invincibleCASTLEJump', true);
							}
						}
					}
				}
			} else {
				if (gameState.player.body.velocity.y > 0) {
					if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superMarioSwim', true);
						} else {
							gameState.player.play('marioSwim', true);
						}
					} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superLuigiSwim', true);
						} else {
							gameState.player.play('luigiSwim', true);
						}
					} else if (gameState.firePower && !gameState.invincible) {
						gameState.player.play('fireSwim', true);
					} else if (gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superInvincibleUWSwim', true);
						} else {
							gameState.player.play('invincibleUWSwim', true);
						}
					}
				} else if (gameState.player.body.velocity.y < 0) {
					if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superMarioSwimUp', true);
						} else {
							gameState.player.play('marioSwimUp', true);
						}
					} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superLuigiSwimUp', true);
						} else {
							gameState.player.play('luigiSwimUp', true);
						}
					} else if (gameState.firePower && !gameState.invincible) {
						gameState.player.play('fireSwimUp', true);
					} else if (gameState.invincible) {
						if (gameState.super) {
							gameState.player.play('superInvincibleUWSwimUp', true);
						} else {
							gameState.player.play('invincibleUWSwimUp', true);
						}
					}
				}
			}
	
			if (gameState.player.body.velocity.x === 0 && gameState.player.body.velocity.y === 0 && gameState.cursors.S.isUp && (gameState.player.body.touching.down || gameState.player.body.onFloor())) {
				if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.setTexture('playerSprites', 'SuperMarioSprites-0');
					} else {
						gameState.player.setTexture('playerSprites', 'MarioSprites-0');
					}
				} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-0');
					} else {
						gameState.player.setTexture('playerSprites', 'LuigiSprites-0');
					}
				} else if (gameState.firePower && !gameState.invincible) {
					gameState.player.setTexture('playerSprites', 'FirePowerSprites-0');
				} else if (gameState.invincible) {
					if (gameState.super) {
						if (gameState.mapType === 'above') {
							gameState.player.play('superInvincibleOWIdle', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('superInvincibleUGIdle', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('superInvincibleUWIdle', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('superInvincibleCASTLEIdle', true);
						}
					} else {
						if (gameState.mapType === 'above') {
							gameState.player.play('invincibleOWIdle', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('invincibleUGIdle', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('invincibleUWIdle', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('invincibleCASTLEIdle', true);
						}
					}
				}
			} else if ((gameState.player.body.velocity.x > 0 && gameState.player.body.velocity.x <= 100 && (gameState.player.body.touching.down || gameState.player.body.onFloor())) || (gameState.player.body.velocity.x < 0 && gameState.player.body.velocity.x >= -100 && (gameState.player.body.touching.down || gameState.player.body.onFloor()))) {
				if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.play('superMarioWalk', true);
					} else {
						gameState.player.play('marioWalk', true);
					}
				} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.play('superLuigiWalk', true);
					} else {
						gameState.player.play('luigiWalk', true);
					}
				} else if (gameState.firePower && !gameState.invincible) {
					gameState.player.play('fireWalk', true);
				} else if (gameState.invincible) {
					if (gameState.super) {
						if (gameState.mapType === 'above') {
							gameState.player.play('superInvincibleOWWalk', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('superInvincibleUGWalk', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('superInvincibleUWWalk', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('superInvincibleCASTLEWalk', true);
						}
					} else {
						if (gameState.mapType === 'above') {
							gameState.player.play('invincibleOWWalk', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('invincibleUGWalk', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('invincibleUWWalk', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('invincibleCASTLEWalk', true);
						}
					}
				}
			} else if ((gameState.player.body.velocity.x > 100 && (gameState.player.body.touching.down || gameState.player.body.onFloor())) || (gameState.player.body.velocity.x < -100 && (gameState.player.body.touching.down || gameState.player.body.onFloor()))) {
				if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.play('superMarioSprint', true);
					} else {
						gameState.player.play('marioSprint', true);
					}
				} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
					if (gameState.super) {
						gameState.player.play('superLuigiSprint', true);
					} else {
						gameState.player.play('luigiSprint', true);
					}
				} else if (gameState.firePower && !gameState.invincible) {
					gameState.player.play('fireSprint', true);
				} else if (gameState.invincible) {
					if (gameState.super) {
						if (gameState.mapType === 'above') {
							gameState.player.play('superInvincibleOWSprint', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('superInvincibleUGSprint', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('superInvincibleUWSprint', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('superInvincibleCASTLESprint', true);
						}
					} else {
						if (gameState.mapType === 'above') {
							gameState.player.play('invincibleOWSprint', true);
						} else if (gameState.mapType === 'under') {
							gameState.player.play('invincibleUGSprint', true);
						} else if (gameState.mapType === 'water') {
							gameState.player.play('invincibleUWSprint', true);
						} else if (gameState.mapType === 'castle') {
							gameState.player.play('invincibleCASTLESprint', true);
						}
					}
				}
			}
	
			if (gameState.playerFacing === 'right') {
				gameState.player.setFlipX(false);
				if (gameState.player.body.velocity.x < 0 && (gameState.player.body.touching.down|| gameState.player.body.onFloor())) {
					if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.setTexture('playerSprites', 'SuperMarioSprites-4');
						} else {
							gameState.player.setTexture('playerSprites', 'MarioSprites-4');
						}
					} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-4');
						} else {
							gameState.player.setTexture('playerSprites', 'LuigiSprites-4');
						}
					} else if (gameState.firePower && !gameState.invincible) {
						gameState.player.setTexture('playerSprites', 'FirePowerSprites-4');
					} else if (gameState.invincible) {
						if (gameState.super) {
							if (gameState.mapType === 'above') {
								gameState.player.play('superInvincibleOWSkid', true);
							} else if (gameState.mapType === 'under') {
								gameState.player.play('superInvincibleUGSkid', true);
							} else if (gameState.mapType === 'water') {
								gameState.player.play('superInvincibleUWSkid', true);
							} else if (gameState.mapType === 'castle') {
								gameState.player.play('superInvincibleCASTLESkid', true);
							}
						} else {
							if (gameState.mapType === 'above') {
								gameState.player.play('invincibleOWSkid', true);
							} else if (gameState.mapType === 'under') {
								gameState.player.play('invincibleUGSkid', true);
							} else if (gameState.mapType === 'water') {
								gameState.player.play('invincibleUWSkid', true);
							} else if (gameState.mapType === 'castle') {
								gameState.player.play('invincibleCASTLESkid', true);
							}
						}
					}
				}
			} else if (gameState.playerFacing === 'left' ) {
				gameState.player.setFlipX(true);
				if (gameState.player.body.velocity.x > 0 && (gameState.player.body.touching.down || gameState.player.body.onFloor())) {
					if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.setTexture('playerSprites', 'SuperMarioSprites-4');
						} else {
							gameState.player.setTexture('playerSprites', 'MarioSprites-4');
						}
					} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
						if (gameState.super) {
							gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-4');
						} else {
							gameState.player.setTexture('playerSprites', 'LuigiSprites-4');
						}
					} else if (gameState.firePower && !gameState.invincible) {
						gameState.player.setTexture('playerSprites', 'FirePowerSprites-4');
					} else if (gameState.invincible) {
						if (gameState.super) {
							if (gameState.mapType === 'above') {
								gameState.player.play('superInvincibleOWSkid', true);
							} else if (gameState.mapType === 'under') {
								gameState.player.play('superInvincibleUGSkid', true);
							} else if (gameState.mapType === 'water') {
								gameState.player.play('superInvincibleUWSkid', true);
							} else if (gameState.mapType === 'castle') {
								gameState.player.play('superInvincibleCASTLESkid', true);
							}
						} else {
							if (gameState.mapType === 'above') {
								gameState.player.play('invincibleOWSkid', true);
							} else if (gameState.mapType === 'under') {
								gameState.player.play('invincibleUGSkid', true);
							} else if (gameState.mapType === 'water') {
								gameState.player.play('invincibleUWSkid', true);
							} else if (gameState.mapType === 'castle') {
								gameState.player.play('invincibleCASTLESkid', true);
							}
						}
					}
				}
			}
		}
	}

	createHUD() {
// HUD
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
		}

// Timer
		gameState.timer = this.add.bitmapText(200, 14, 'font', `TIME`, 8).setScrollFactor(0);
		gameState.timedEvent = this.time.addEvent({
			delay: 400,
			callback: onEvent,
			callbackScope: this,
			loop: true
		});
	}

	onDeath() {
		gameState.time = 400;
		gameState.fallDeath = true;
		gameState.enemyMovement = false;
		gameState.keyboard = false;
		gameState.animations = false;
		gameState.invincible = false;
		gameState.player.anims.stop();
		gameState.player.depth = 1;
		gameState.player.body.stop();
		this.cameras.main.stopFollow();
		this.game.sound.stopAll();
		gameState.sfx.died.play();
		gameState.player.setVelocityY(-400);
		gameState.player.body.checkCollision.none = true;
		gameState.player.setCollideWorldBounds(false);
		gameState.timedEvent.paused = true;
		if (gameState.character.mario.active) {
			gameState.character.mario.checkpointPassed = gameState.player.x > gameState.checkpoint;
			gameState.player.setTexture('playerSprites', 'MarioSprites-6').setSize(16, 16);
			if (gameState.character.mario.lives > 1) {
				this.time.addEvent({
					delay: 3000,
					loop: false,
					callback: () => {
						if (!gameState.onePlayer && gameState.character.luigi.lives >= 1) {
							gameState.character.mario.active = false;
							gameState.character.luigi.active = true;
						}
						gameState.character.mario.lives -= 1;
						gameState.super = false;
						gameState.firePower = false;
						this.scene.start('LoadScene');
					}
				});
			} else {
				this.time.addEvent({
					delay: 3000,
					loop: false,
					callback: () => {
						gameState.character.mario.lives = 0;
						this.scene.start('GameOverScene');
					}
				});
			}
		} else {
			gameState.character.luigi.checkpointPassed = gameState.player.x > gameState.checkpoint;
			gameState.player.setTexture('playerSprites', 'LuigiSprites-6').setSize(16, 16);
			if (gameState.character.luigi.lives > 1) {
				this.time.addEvent({
					delay: 3000,
					loop: false,
					callback: () => {
						if (gameState.character.mario.lives >= 1) {
							gameState.character.mario.active = true;
							gameState.character.luigi.active = false;
						}
						gameState.character.luigi.lives -= 1;
						gameState.super = false;
						gameState.firePower = false;
						this.scene.start('LoadScene');
					}
				});
			} else {
				this.time.addEvent({
					delay: 3000,
					loop: false,
					callback: () => {
						gameState.character.luigi.lives = 0;
						this.scene.start('GameOverScene');
					}
				});
			}
		}
	}

	onHit() {
		if (gameState.character.mario.active) {
			if (gameState.super || gameState.firePower) {
				gameState.invulnerable = true;
				gameState.sfx.pipe.play();
				gameState.enemyMovement = false;
				gameState.keyboard = false;
				gameState.animations = false;
				this.physics.pause();
				gameState.player.play('marioShrink', true);
				this.time.addEvent({
					delay: 1000,
					loop: false,
					callback: () => {
						gameState.player.setTexture('playerSprites', 'MarioSprites-0').setSize(10, 16);
						gameState.super = false;
						gameState.firePower = false;
						gameState.enemyMovement = true;
						gameState.keyboard = true;
						gameState.animations = true;
						this.physics.resume();
					}
				});
				this.tweens.add({
					targets: gameState.player,
					alpha: { start: 0, to: 1 },
					duration: 200,
					repeat: 0,
					loop: 18,
					onComplete: () => {
						gameState.invulnerable = false;
					}
				});
			} else if (gameState.invulnerable) {
				
			} else {
				this.onDeath();
			}
		} else {
			if (gameState.super || gameState.firePower) {
				gameState.invulnerable = true;
				gameState.sfx.pipe.play();
				gameState.enemyMovement = false;
				gameState.keyboard = false;
				gameState.animations = false;
				this.physics.pause();
				gameState.player.play('luigiShrink', true);
				this.time.addEvent({
					delay: 1000,
					loop: false,
					callback: () => {
						gameState.player.setTexture('playerSprites', 'LuigiSprites-0').setSize(10, 16);
						gameState.super = false;
						gameState.firePower = false;
						gameState.enemyMovement = true;
						gameState.keyboard = true;
						gameState.animations = true;
						this.physics.resume();
					}
				});
				this.tweens.add({
					targets: gameState.player,
					alpha: { start: 0, to: 1 },
					duration: 200,
					repeat: 0,
					loop: 18,
					onComplete: () => {
						gameState.invulnerable = false;
					}
				});
			} else if (gameState.invulnerable) {
				
			} else {
				this.onDeath();
			}
		}
	}
	
	portalEntrance(direction, scene, x) {
		if (gameState.character.mario.active) {
			gameState.character.mario.progress = x || 32;
		} else {
			gameState.character.luigi.progress = x || 32;
		}
		if (direction === 'down' && gameState.cursors.S.isDown) {
			this.tweens.add({
				targets: gameState.player,
				y: '+=32',
				ease: 'Linear',
				duration: 2000,
				repeat: 0,
				onStart: () => {
					gameState.keyboard = false;
					this.game.sound.stopAll();
					gameState.sfx.pipe.play();
					gameState.player.body.setEnable(false);
					gameState.player.depth = -2;
				},
				onComplete: () => {
					gameState.keyboard = true;
					this.scene.start(scene);
				}
			});
		} else if (direction === 'right' && gameState.cursors.D.isDown) {
			this.tweens.add({
				targets: gameState.player,
				x: '+=16',
				ease: 'Linear',
				duration: 2000,
				repeat: 0,
				onStart: () => {
					gameState.keyboard = false;
					this.game.sound.stopAll();
					gameState.sfx.pipe.play();
					gameState.player.body.setEnable(false);
					gameState.player.depth = -2;
				},
				onComplete: () => {
					gameState.keyboard = true;
					this.scene.start(scene);
				}
			});
		}
	}

	portalExit(direction, y) {
		if (gameState.super) {
			gameState.player.y = y + 16;
			if (direction === 'down') {
				this.tweens.add({
					targets: gameState.player,
					y: '-=32',
					ease: 'Linear',
					duration: 2000,
					repeat: 0,
					onStart: () => {
						gameState.keyboard = false;
						gameState.sfx.pipe.play();
						gameState.player.body.setEnable(false);
						gameState.player.depth = -2;
					},
					onComplete: () => {
						gameState.keyboard = true;
						gameState.player.body.setEnable();
						gameState.player.depth = 0;
					}
				});
			} else if (direction === 'up') {
				this.tweens.add({
					targets: gameState.player,
					y: '+=32',
					ease: 'Linear',
					duration: 2000,
					repeat: 0,
					onStart: () => {
						gameState.keyboard = false;
						gameState.sfx.pipe.play();
						gameState.player.body.setEnable(false);
						gameState.player.depth = -2;
					},
					onComplete: () => {
						gameState.keyboard = true;
						gameState.player.body.setEnable();
						gameState.player.depth = 0;
					}
				});
			}
		} else {
			gameState.player.y = y;
			if (direction === 'down') {
				this.tweens.add({
					targets: gameState.player,
					y: '-=16',
					ease: 'Linear',
					duration: 2000,
					repeat: 0,
					onStart: () => {
						gameState.keyboard = false;
						gameState.sfx.pipe.play();
						gameState.player.body.setEnable(false);
						gameState.player.depth = -2;
					},
					onComplete: () => {
						gameState.keyboard = true;
						gameState.player.body.setEnable();
						gameState.player.depth = 0;
					}
				});
			} else if (direction === 'up') {
				this.tweens.add({
					targets: gameState.player,
					y: '+=16',
					ease: 'Linear',
					duration: 2000,
					repeat: 0,
					onStart: () => {
						gameState.keyboard = false;
						gameState.sfx.pipe.play();
						gameState.player.body.setEnable(false);
						gameState.player.depth = -2;
					},
					onComplete: () => {
						gameState.keyboard = true;
						gameState.player.body.setEnable();
						gameState.player.depth = 0;
					}
				});
			}
		}
		if (direction === 'right') {
			this.tweens.add({
				targets: gameState.player,
				x: '-=16',
				ease: 'Linear',
				duration: 2000,
				repeat: 0,
				onStart: () => {
					gameState.keyboard = false;
					this.game.sound.stopAll();
					gameState.sfx.pipe.play();
					gameState.player.body.setEnable(false);
					gameState.player.depth = -2;
				}
			});
		} else if (direction === 'left') {
			this.tweens.add({
				targets: gameState.player,
				x: '+=16',
				ease: 'Linear',
				duration: 2000,
				repeat: 0,
				onStart: () => {
					gameState.keyboard = false;
					this.game.sound.stopAll();
					gameState.sfx.pipe.play();
					gameState.player.body.setEnable(false);
					gameState.player.depth = -2;
				}
			});
		}
	}

	flagpoleScene(x, y) {
		if (gameState.mapType === 'castle') {
			let endAxe = this.physics.add.sprite(x, y, 'sprites', 'Sprites-185');
			endAxe.setSize(4, 14).setOffset(8, 0);
			endAxe.body.setAllowGravity(false).setImmovable(true);
			endAxe.play('axeAnim');
			this.physics.add.collider(gameState.player, endAxe, () => {
				gameState.keyboard = false;
				this.game.sound.stopAll();
				gameState.currentMusic.castleClear.play();
				gameState.timedEvent.paused = true;
				gameState.courseCompleted = true;
				gameState.animations = false;
				gameState.player.body.stop();
				if (gameState.bowserBridge.active) {
					gameState.bowserBridge.destroy(true);
					gameState.player.body.setAllowGravity(false);
					endAxe.destroy();
					if (gameState.bowser.active) {
						this.directionEvent.paused = true;
						this.jumpEvent.paused = true;
						this.fireEvent.paused = true;
						gameState.sfx.bowserFalls.play();
					}
				}
				this.time.addEvent({
					delay: 500,
					repeat: 0,
					callback: () => {
						this.time.addEvent({
							delay: 600,
							loop: false,
							callback: () => {
								gameState.animations = true;
								gameState.player.setAccelerationX(50);
								gameState.player.body.setAllowGravity(true);
								this.time.addEvent({
									delay: 2700,
									loop: false,
									callback: () => {
										gameState.player.setMaxVelocity(0, 0);
										gameState.player.anims.stop();
										if (gameState.character.mario.active && !gameState.firePower && !gameState.invincible) {
											if (gameState.super) {
												gameState.player.setTexture('playerSprites', 'SuperMarioSprites-0');
											} else {
												gameState.player.setTexture('playerSprites', 'MarioSprites-0');
											}
										} else if (gameState.character.luigi.active && !gameState.firePower && !gameState.invincible) {
											if (gameState.super) {
												gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-0');
											} else {
												gameState.player.setTexture('playerSprites', 'LuigiSprites-0');
											}
										} else if (gameState.firePower && !gameState.invincible) {
											gameState.player.setTexture('playerSprites', 'FirePowerSprites-0');
										} else if (gameState.invincible) {
											if (gameState.super) {
												if (gameState.mapType === 'above') {
													gameState.player.play('superInvincibleOWIdle', true);
												} else if (gameState.mapType === 'under') {
													gameState.player.play('superInvincibleUGIdle', true);
												} else if (gameState.mapType === 'water') {
													gameState.player.play('superInvincibleUWIdle', true);
												} else if (gameState.mapType === 'castle') {
													gameState.player.play('superInvincibleCASTLEIdle', true);
												}
											} else {
												if (gameState.mapType === 'above') {
													gameState.player.play('invincibleOWIdle', true);
												} else if (gameState.mapType === 'under') {
													gameState.player.play('invincibleUGIdle', true);
												} else if (gameState.mapType === 'water') {
													gameState.player.play('invincibleUWIdle', true);
												} else if (gameState.mapType === 'castle') {
													gameState.player.play('invincibleCASTLEIdle', true);
												}
											}
										}
										this.add.bitmapText(65, 80, 'font', `THANK YOU MARIO!`, 8).setScrollFactor(0);
										this.time.addEvent({
											delay: 2000,
											repeat: 0,
											callback: () => {
												this.add.bitmapText(40, 100, 'font', `BUT OUR PRINCESS IS IN\nANOTHER CASTLE!`, 8).setScrollFactor(0);
											}
										});
									}
								});
							}
						});
					}
				});
			}, null, this);
		} else if (gameState.mapType === 'above') {
			let flagpole = this.add.rectangle(x, y, 2, 152);
			flagpole.setOrigin(0.5, 1);
			this.physics.add.existing(flagpole, [true]);
			let flag = this.add.sprite(x, (flagpole.y - 127), 'sprites', 'Sprites-33').setOrigin(1, 1);
			this.physics.add.collider(gameState.player, flagpole, () => {
				if (gameState.player.y > flagpole.y - 17 && gameState.player.y < flagpole.y) {
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 100;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 100;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.scoreNotification = this.add.bitmapText(flagpole.x + 3, flagpole.y, 'font6', '100', 6).setOrigin(0, 1);
				} else if (gameState.player.y > flagpole.y - 57 && gameState.player.y < flagpole.y - 18) {
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 400;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 400;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.scoreNotification = this.add.bitmapText(flagpole.x + 3, flagpole.y, 'font6', '400', 6).setOrigin(0, 1);
				} else if (gameState.player.y > flagpole.y - 81 && gameState.player.y < flagpole.y - 58) {
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 800;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 800;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.scoreNotification = this.add.bitmapText(flagpole.x + 3, flagpole.y, 'font6', '800', 6).setOrigin(0, 1);
				} else if (gameState.player.y > flagpole.y - 127 && gameState.player.y < flagpole.y - 82) {
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 2000;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 2000;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.scoreNotification = this.add.bitmapText(flagpole.x + 3, flagpole.y, 'font6', '2000', 6).setOrigin(0, 1);
				} else if (gameState.player.y > flagpole.y - 153 && gameState.player.y < flagpole.y - 128) {
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 5000;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 5000;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.scoreNotification = this.add.bitmapText(flagpole.x + 3, flagpole.y, 'font6', '5000', 6).setOrigin(0, 1);
				}
				this.tweens.add({
					targets: this.scoreNotification,
					y: flagpole.y - 135,
					ease: 'Linear',
					duration: 1000,
					repeat: 0
				});
				this.tweens.add({
					targets: flag,
					y: flagpole.y - 3,
					duration: 1000,
					repeat: 0
				});
				gameState.keyboard = false;
				this.physics.pause();
				this.game.sound.stopAll();
				gameState.currentMusic.courseClear.play();
				gameState.timedEvent.paused = true;
				gameState.courseCompleted = true;
				gameState.animations = false;
				gameState.progress = 48;
				gameState.fireworks = (gameState.time % 10);
				gameState.player.body.stop();
				this.tweens.add({
					targets: gameState.player,
					y: flagpole.y,
					ease: 'Linear',
					duration: 1000,
					repeat: 0,
					onStart: () => {
						if (gameState.character.mario.active && !gameState.firePower) {
							if (gameState.super) {
								gameState.player.play('superMarioClimb', true);
							} else {
								gameState.player.play('marioClimb', true);
							}
						} else if (gameState.character.luigi.active && !gameState.firePower) {
							if (gameState.super) {
								gameState.player.play('superLuigiClimb', true);
							} else {
								gameState.player.play('luigiClimb', true);
							}
						} else {
							gameState.player.play('fireClimb', true);
						}
					},
					onComplete: () => {
						gameState.player.body.checkCollision.right = false;
						gameState.player.anims.stop();
						if (gameState.character.mario.active && !gameState.firePower) {
							if (gameState.super) {
								gameState.player.setTexture('playerSprites', 'SuperMarioSprites-8');
								gameState.player.x = gameState.player.x + 8;
							} else {
								gameState.player.setTexture('playerSprites', 'MarioSprites-8');
								gameState.player.x = gameState.player.x + 3;
							}
						} else if (gameState.character.luigi.active && !gameState.firePower) {
							if (gameState.super) {
								gameState.player.setTexture('playerSprites', 'SuperLuigiSprites-8');
								gameState.player.x = gameState.player.x + 8;
							} else {
								gameState.player.setTexture('playerSprites', 'LuigiSprites-8');
								gameState.player.x = gameState.player.x + 3;
							}
						} else {
							gameState.player.setTexture('playerSprites', 'FirePowerSprites-8');
							gameState.player.x = gameState.player.x + 8;
						}
						gameState.player.setFlipX(true).setOrigin(0, 1);
						this.time.addEvent({
							delay: 600,
							loop: false,
							callback: () => {
								this.physics.resume();
								gameState.animations = true;
								gameState.player.setAccelerationX(50);
								this.time.addEvent({
									delay: 1890,
									loop: false,
									callback: () => {
										this.time.addEvent({
											delay: 10,
											repeat: gameState.time - 1,
											callback: timerPoints,
											callbackScope: this,
										});
										gameState.player.setMaxVelocity(0, 0);
										gameState.player.depth = -2;
									}
								});
							}
						});
					}
				});
			}, null, this);
		}
	}
	
	castleFanfare(size, x, y) {
		let castle = size;
		gameState.fanfare = true;
		if (castle) {
			let victoryFlag = this.add.sprite(x - 8, y - 64, 'sprites', 'Sprites-6');
			victoryFlag.setOrigin(0, 1);
			victoryFlag.depth = -2;
			this.tweens.add({
				targets: victoryFlag,
				y: '-=16',
				ease: 'Linear',
				duration: 500,
				repeat: 0
			});
		}
		if (gameState.fireworks === 1) {
			this.time.addEvent({
				delay: 500,
				loop: false,
				callback: () => {
					let firework = this.add.sprite(x - 20, y - 165, 'firework');
					firework.play('fireworkAnim');
					gameState.sfx.firework.play();
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 500;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 500;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.time.addEvent({
						delay: 750,
						loop: false,
						callback: () => {
							firework.destroy();
							this.scene.start('LoadScene');
						}
					});
				}
			});
		} else if (gameState.fireworks === 3) {
			this.time.addEvent({
				delay: 500,
				loop: false,
				callback: () => {
					let firework = this.add.sprite(x - 20, y - 165, 'firework');
					firework.play('fireworkAnim');
					gameState.sfx.firework.play();
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 500;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 500;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.time.addEvent({
						delay: 750,
						loop: false,
						callback: () => {
							firework.x = x - 50;
							firework.y = y - 100;
							firework.play('fireworkAnim');
							gameState.sfx.firework.play();
							if (gameState.character.mario.active) {
								gameState.character.mario.score += 500;
								gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
							} else {
								gameState.character.luigi.score += 500;
								gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
							}
							this.time.addEvent({
								delay: 750,
								loop: false,
								callback: () => {
									firework.x = x + 20;
									firework.y = y - 155;
									firework.play('fireworkAnim');
									gameState.sfx.firework.play();
									if (gameState.character.mario.active) {
										gameState.character.mario.score += 500;
										gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
									} else {
										gameState.character.luigi.score += 500;
										gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
									}
									this.time.addEvent({
										delay: 750,
										loop: false,
										callback: () => {
											firework.destroy();
											this.scene.start('LoadScene');
										}
									});
								}
							});
						}
					});
				}
			});
		} else if (gameState.fireworks === 6) {
			this.time.addEvent({
				delay: 500,
				loop: false,
				callback: () => {
					let firework = this.add.sprite(x - 20, y - 165, 'firework');
					firework.play('fireworkAnim');
					gameState.sfx.firework.play();
					if (gameState.character.mario.active) {
						gameState.character.mario.score += 500;
						gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
					} else {
						gameState.character.luigi.score += 500;
						gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
					}
					this.time.addEvent({
						delay: 750,
						loop: false,
						callback: () => {
							firework.x = x - 50;
							firework.y = y - 100;
							firework.play('fireworkAnim');
							gameState.sfx.firework.play();
							if (gameState.character.mario.active) {
								gameState.character.mario.score += 500;
								gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
							} else {
								gameState.character.luigi.score += 500;
								gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
							}
							this.time.addEvent({
								delay: 750,
								loop: false,
								callback: () => {
									firework.x = x + 20;
									firework.y = y - 155;
									firework.play('fireworkAnim');
									gameState.sfx.firework.play();
									if (gameState.character.mario.active) {
										gameState.character.mario.score += 500;
										gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
									} else {
										gameState.character.luigi.score += 500;
										gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
									}
									this.time.addEvent({
										delay: 750,
										loop: false,
										callback: () => {
											firework.x = x + 55;
											firework.y = y - 80;
											firework.play('fireworkAnim');
											gameState.sfx.firework.play();
											if (gameState.character.mario.active) {
												gameState.character.mario.score += 500;
												gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
											} else {
												gameState.character.luigi.score += 500;
												gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
											}
											this.time.addEvent({
												delay: 750,
												loop: false,
												callback: () => {
													firework.x = x - 20;
													firework.y = y - 165;
													firework.play('fireworkAnim');
													gameState.sfx.firework.play();
													if (gameState.character.mario.active) {
														gameState.character.mario.score += 500;
														gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
													} else {
														gameState.character.luigi.score += 500;
														gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
													}
													this.time.addEvent({
														delay: 750,
														loop: false,
														callback: () => {
															firework.x = x - 50;
															firework.y = y - 100;
															firework.play('fireworkAnim');
															gameState.sfx.firework.play();
															if (gameState.character.mario.active) {
																gameState.character.mario.score += 500;
																gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
															} else {
																gameState.character.luigi.score += 500;
																gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
															}
															this.time.addEvent({
																delay: 750,
																loop: false,
																callback: () => {
																	firework.destroy();
																	this.scene.start('LoadScene');
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			this.time.addEvent({
				delay: 3000,
				loop: false,
				callback: () => {
					this.scene.start('LoadScene');
				}
			});
		}
	}

	addElevators(x, y, length, delay, direction, loop, loose) {
		const elevator = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});
		for (let i = 0; i < length * 16; i += 16) {
			elevator.create(x + i, y, 'sprites', 'Sprites-152').setFrictionX(1).setSize(16, 8).setOffset(0, 0);
		}
		if (!loose) {
			this.physics.add.collider(gameState.player, elevator);
			if (direction === 'up' && !loop) {
				elevator.setVelocityY(-40);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						Phaser.Actions.SetY(elevator.getChildren(), y);
					},
					loop: true
				});
			} else if (direction === 'up' && loop) {
				elevator.setVelocityY(-40);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						elevator.setVelocityY(40);
					},
					repeat: -1
				});
				this.time.addEvent({
					delay: delay * 2,
					callback: () => {
						elevator.setVelocityY(-40);
					},
					repeat: -1
				});
			} else if (direction === 'down' && !loop) {
				elevator.setVelocityY(40);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						Phaser.Actions.SetY(elevator.getChildren(), y);
					},
					loop: true
				});
			} else if (direction === 'down' && loop) {
				elevator.setVelocityY(40);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						elevator.setVelocityY(-40);
					},
					repeat: -1
				});
				this.time.addEvent({
					delay: delay * 2,
					callback: () => {
						elevator.setVelocityY(40);
					},
					repeat: -1
				});
			} else if (direction === 'right' && !loop) {
				elevator.setVelocityX(30);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						Phaser.Actions.SetX(elevator.getChildren(), x);
					},
					loop: true
				});
			} else if (direction === 'right' && loop) {
				elevator.setVelocityX(30);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						elevator.setVelocityX(-30);
					},
					repeat: -1
				});
				this.time.addEvent({
					delay: delay * 2,
					callback: () => {
						elevator.setVelocityX(30);
					},
					repeat: -1
				});
			} else if (direction === 'left' && !loop) {
				elevator.setVelocityX(-30);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						Phaser.Actions.SetX(elevator.getChildren(), x);
					},
					loop: true
				});
			} else if (direction === 'left' && loop) {
				elevator.setVelocityX(-30);
				this.time.addEvent({
					delay: delay,
					callback: () => {
						elevator.setVelocityX(30);
					},
					repeat: -1
				});
				this.time.addEvent({
					delay: delay * 2,
					callback: () => {
						elevator.setVelocityX(-30);
					},
					repeat: -1
				});
			}
		} else if (loose) {
			this.physics.add.collider(gameState.player, elevator, () => {
				elevator.setVelocityY(30);
				if (gameState.cursors.Space.isDown || Phaser.Input.Keyboard.JustDown(gameState.cursors.Space)) {
					elevator.setVelocityY(0);
				}
			}, null, this);
		}
	}

	turtleBox(x, y, width) {
		const containerLeft = this.add.rectangle(x, y, 2, 24).setOrigin(0, 1);
		this.physics.add.existing(containerLeft, [true]);
		const containerRight = this.add.rectangle(x + width, y, 2, 24).setOrigin(0, 1);
		this.physics.add.existing(containerRight, [true]);
		this.physics.add.collider(containerLeft, gameState.redTurtles);
		this.physics.add.collider(containerRight, gameState.redTurtles);
	}

	fireStick(x, y, length) {
		let fireShaft = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		for (let i = 0; i < length * 8; i += 8) {
			fireShaft.create(x + i, y, 'fireball');
		}
		this.time.addEvent({
			delay: 100,
			callback: () => {
				Phaser.Actions.RotateAround(fireShaft.getChildren(), { x: x, y: y }, 0.1);
			},
			callbackScope: this,
			repeat: -1
		})
		fireShaft.playAnimation('fireballAnim');
		this.physics.add.overlap(gameState.player, fireShaft, () => {
			if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
	}

	bowser(x, y) {
		gameState.bowser = this.physics.add.sprite(x, y, 'bowser').setOrigin(0, 1);
		gameState.bowser.setVelocityX(-30).setGravityY(-500);
		gameState.bowser.play('bowserWalk');
		this.fireHitCount = 0;
		this.physics.add.collider(gameState.objectGroup, gameState.bowser);
		this.physics.add.collider(gameState.background, gameState.bowser);
		this.physics.add.overlap(gameState.player, gameState.bowser, () => {
			if (gameState.invincible) {
				let scoreNotification = this.add.bitmapText(gameState.bowser.x, gameState.bowser.y - 20, 'font6', '5000', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					gameState.character.mario.score += 5000;
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					gameState.character.luigi.score += 5000;
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				gameState.bowser.anims.stop();
				if (gameState.mapType === 'above') {
					gameState.bowser.setTexture('enemies', 'Enemies-0');
				} else if (gameState.mapType === 'under') {
					gameState.bowser.setTexture('enemies', 'Enemies-25');
				} else if (gameState.mapType === 'water') {
					gameState.bowser.setTexture('enemies', 'Enemies-0');
				} else if (gameState.mapType === 'castle') {
					gameState.bowser.setTexture('enemies', 'Enemies-50');
				}
				gameState.bowser.setFlipY(true);
				if (gameState.playerFacing === 'right') {
					gameState.bowser.setVelocityY(-200);
					gameState.bowser.setVelocityX(50);
				} else {
					gameState.bowser.setVelocityY(-200);
					gameState.bowser.setVelocityX(-50);
				}
				gameState.bowser.body.checkCollision.none = true;
				this.directionEvent.paused = true;
				this.jumpEvent.paused = true;
				this.fireEvent.paused = true;
			} else if (gameState.invulnerable) {

			} else {
				this.onHit();
			}
		}, null, this);
		this.physics.add.collider(gameState.fireball, gameState.bowser, (bowser, fireball) => {
			gameState.sfx.bump.play();
			fireball.body.setAllowGravity(false);
			fireball.body.stop();
			fireball.play('fireworkAnim', true);
			this.time.addEvent({
				delay: 300,
				loop: true,
				callback: () => {
					fireball.destroy();
				}
			});
			this.fireHitCount++;
			if (this.fireHitCount >= 6) {
				let scoreNotification = this.add.bitmapText(gameState.bowser.x, gameState.bowser.y - 20, 'font6', '5000', 6).setOrigin(0, 1);
				this.tweens.add({
					targets: scoreNotification,
					y: '-=20',
					ease: 'Linear',
					duration: 750,
					repeat: 0,
					onComplete: () => {
						scoreNotification.destroy();
					}
				});
				if (gameState.character.mario.active) {
					gameState.character.mario.score += 5000;
					gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
				} else {
					gameState.character.luigi.score += 5000;
					gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
				}
				gameState.bowser.anims.stop();
				if (gameState.mapType === 'above') {
					gameState.bowser.setTexture('enemies', 'Enemies-0');
				} else if (gameState.mapType === 'under') {
					gameState.bowser.setTexture('enemies', 'Enemies-25');
				} else if (gameState.mapType === 'water') {
					gameState.bowser.setTexture('enemies', 'Enemies-0');
				} else if (gameState.mapType === 'castle') {
					gameState.bowser.setTexture('enemies', 'Enemies-50');
				}
				gameState.bowser.setFlipY(true);
				if (gameState.playerFacing === 'right') {
					gameState.bowser.setVelocityY(-200);
					gameState.bowser.setVelocityX(50);
				} else {
					gameState.bowser.setVelocityY(-200);
					gameState.bowser.setVelocityX(-50);
				}
				gameState.bowser.body.checkCollision.none = true;
				this.directionEvent.paused = true;
				this.jumpEvent.paused = true;
				this.fireEvent.paused = true;
			}
		}, null, this)
		gameState.bowserLimitLeft = x - 56;
		gameState.bowserLimitRight = x + 23;
		this.directionEvent = this.time.addEvent({
			delay: Math.floor(Math.random() * 3000) + 1000,
			repeat: -1,
			callback: () => {
				let direction = Math.floor(Math.random() * 2) + 1;
				if (direction === 1) {
					gameState.bowser.setVelocityX(-30);
					gameState.bowser.play('bowserWalk');
				} else {
					gameState.bowser.setVelocityX(30);
					gameState.bowser.play('bowserWalk');
				}
			}
		});
		this.jumpEvent = this.time.addEvent({
			delay: Math.floor(Math.random() * 3000) + 1000,
			repeat: -1,
			callback: () => {
				let jump = Math.floor(Math.random() * 2) + 1;
				if (jump === 1) {
					gameState.bowser.setVelocityY(-175);
					gameState.bowser.play('bowserWalk');
				}
			}
		});
		this.fireEvent = this.time.addEvent({
			delay: Math.floor(Math.random() * 4000) + 2000,
			repeat: -1,
			callback: () => {
				let fireTiming = Math.floor(Math.random() * 3) + 1;
				if (fireTiming === 1) {
					if (gameState.bowser.x > gameState.player.x) {
						gameState.fireBlast = this.physics.add.sprite(gameState.bowser.x - 8, gameState.bowser.y - 24, 'fireblast').play('fireBlastAnim').setVelocityX(-50);
						gameState.sfx.bowserFire.play();
						gameState.bowser.play('bowserFireShot');
						gameState.fireBlast.depth = -1;
						gameState.fireBlast.body.setAllowGravity(false).setImmovable(true);
					} else if (gameState.bowser.x < gameState.player.x) {
						gameState.fireBlast = this.physics.add.sprite(gameState.bowser.x + 40, gameState.bowser.y - 24, 'fireblast').play('fireBlastAnim').setVelocityX(50).setFlipX(true);
						gameState.sfx.bowserFire.play();
						gameState.bowser.play('bowserFireShot');
						gameState.fireBlast.depth = -1;
						gameState.fireBlast.body.setAllowGravity(false).setImmovable(true);
					}
					this.physics.add.overlap(gameState.player, gameState.fireBlast, () => {
						if (gameState.invulnerable || gameState.invincible) {

						} else {
							this.onHit();
						}
					}, null, this);
				}
			}
		});
	}
	
	springBoard(x, y) {
		let board = this.physics.add.sprite(x, y, 'springboard', 'Springboard-12').setImmovable(true).setOrigin(0, 1);
		board.body.setAllowGravity(false).setSize(board.frame.width, board.frame.height, false);
		this.physics.world.OVERLAP_BIAS = 8;
		this.physics.add.collider(gameState.player, board, (player, obj) => {
			if (player.body.touching.down) {
				obj.play('springboardAnim', true);
				if(obj.anims.getProgress() === 1 && gameState.cursors.Space.isUp) {
					player.setVelocityY(-450);
				} else if (obj.anims.getProgress() === 1 && gameState.cursors.Space.isDown) {
					player.setVelocityY(-600);
					player.setMaxVelocity(175, 600);
				}
			}
		}, null, this);
	}
}

class World1Level1 extends GameScene {
	constructor() {
		super('World1Level1')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		const mapW1L1 = this.make.tilemap({ key: 'mapW1L1' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 3584, 400, 1328, mapW1L1, 0x6185f8, 208, 208);
		let portalEntrance = this.add.rectangle(928, 144, 3, 1);
		this.physics.add.existing(portalEntrance, [true]);
		this.addEnemies(mapW1L1);
		this.flagpoleScene(3192, 192);
		this.physics.add.overlap(gameState.player, portalEntrance, () => {
			this.portalEntrance('down', 'World1Sublevel1', 32);
		});
		gameState.oneUpBoxes.setVisible(false);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.portalExit) {
			gameState.portalExit = false;
			this.portalExit('down', 192);
		}
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(true, 456, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 1;
				gameState.character.mario.level = 2;
				gameState.currentScene = 'World1Level2Start';
			} else {
				gameState.character.luigi.world = 1;
				gameState.character.luigi.level = 2;
				gameState.currentScene = 'World1Level2Start';
			}
		}
	}
}

class World1Sublevel1 extends GameScene {
	constructor() {
		super('World1Sublevel1')
	}

	create() {
		gameState.sublevel = true;
		gameState.mapType = 'under';
		config.height = 240;
		const mapW1Sl1 = this.make.tilemap({ key: 'mapW1Sl1' });
		this.createMap(gameState.currentMusic.underGroundBGM, 272, 400, undefined, mapW1Sl1, 0x000000, 10);
		this.cameras.main.setBounds(0, -32, gameState.width, config.height);
		let portalExit = this.add.rectangle(208, 162, 1, 3);
		this.physics.add.existing(portalExit, [true]);
		this.physics.add.overlap(gameState.player, portalExit, () => {
			if (gameState.currentScene === 'World1Level1') {
				this.portalEntrance('right', gameState.currentScene, 2623);
			} else if (gameState.currentScene === 'World2Level1') {
				this.portalEntrance('right', gameState.currentScene, 1856);
			}
			gameState.portalExit = true;
		});
	}

	update() {
		this.controls();
		this.gameVariables(gameState.currentMusic.underGroundBGMHurryUp);
	}

}

class World1Level2Start extends GameScene {
	constructor() {
		super('World1Level2Start')
	}
	
	create() {
		gameState.progress = 48;
		if (gameState.character.mario.active) {
			gameState.character.mario.progress = 48;
		} else {
			gameState.character.luigi.progress = 48;
		}
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW1L2Start = this.make.tilemap({ key: 'mapW1L2Start' });
		this.createMap(gameState.sfx.goingUnder, 272, undefined, 45, mapW1L2Start, 0x6185f8, 192);
		this.cameras.main.stopFollow();
		if (gameState.character.mario.active) {
			if (gameState.character.mario.world === 1 && gameState.character.mario.level === 2) {
				gameState.currentScene = 'World1Level2';
			} else if (gameState.character.mario.world === 2 && gameState.character.mario.level === 2) {
				gameState.currentScene = 'World2Level2';
			}
		} else if (gameState.character.luigi.active) {
			if (gameState.character.luigi.world === 1 && gameState.character.luigi.level === 2) {
				gameState.currentScene = 'World1Level2';
			} else if (gameState.character.luigi.world === 2 && gameState.character.luigi.level === 2) {
				gameState.currentScene = 'World2Level2';
			}
		}
		let portalEntrance = this.add.rectangle(160, 196, 1, 3);
		this.physics.add.existing(portalEntrance, [true]);
		this.physics.add.overlap(gameState.player, portalEntrance, () => {
			gameState.player.depth = -1;
			gameState.keyboard = false;
			this.game.sound.stopAll();
			gameState.sfx.pipe.play();
			gameState.player.body.setEnable(false);
			this.tweens.add({
				targets: gameState.player,
				x: '+=16',
				ease: 'Linear',
				duration: 500,
				repeat: 0,
				onComplete: () => {
					gameState.keyboard = true;
					this.time.addEvent({
						delay: 500,
						loop: false,
						callback: () => {
							gameState.progress = 48;
							if (gameState.character.mario.active) {
								gameState.character.mario.progress = 48;
							} else {
								gameState.character.luigi.progress = 48;
							}
							this.scene.start(gameState.currentScene);
						}
					})
				}
			});
		});
	}

	update() {
		gameState.player.setVelocityX(50);
		gameState.keyboard = false;
		this.controls();
	}
}

class World1Level2 extends GameScene {
	constructor() {
		super('World1Level2')
	}

	create() {
		gameState.currentScene = 'World1Level2';
		gameState.mapType = 'under';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW1L2 = this.make.tilemap({ key: 'mapW1L2' });
		this.createMap(gameState.currentMusic.underGroundBGM, 3072, 400, 1595, mapW1L2, 0x000000, 10, 176);
		this.cameras.main.setBounds(0, -32, gameState.width, config.height);
		this.addEnemies(mapW1L2);
		let portalEntrance = this.add.rectangle(1664, 128, 3, 1);
		this.physics.add.existing(portalEntrance, [true]);
		this.physics.add.overlap(gameState.player, portalEntrance, () => {
			this.portalEntrance('down', 'World1Sublevel2', 32);
		});
		let portalEntrance2 = this.add.rectangle(2655, 120, 1, 3).setOrigin(0, 1);
		this.physics.add.existing(portalEntrance2, [true]);
		this.physics.add.overlap(gameState.player, portalEntrance2, () => {
			this.portalEntrance('right', 'World1Level2End', 32);
		});
		this.addElevators(2235, -48, 4, 7000, 'down', false);
		this.time.addEvent({
			delay: 4000,
			callback: () => {
				this.addElevators(2235, -48, 4, 7000, 'down', false);
			},
			loop: false
		});
		this.addElevators(2476, 224, 4, 7000, 'up', false);
		this.time.addEvent({
			delay: 4000,
			callback: () => {
				this.addElevators(2476, 224, 4, 7000, 'up', false);
			},
			loop: false
		});
		this.turtleBox(2318, 176, 130);
		this.add.bitmapText(2845, 64, 'font', 'WELCOME TO WARP ZONE!', 8);
		this.add.bitmapText(2853, 104, 'font', ' 4       3       2', 8);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.underGroundBGMHurryUp);
		if (gameState.portalExit) {
			gameState.portalExit = false;
			this.portalExit('down', 162);
		}
	}
}

class World1Sublevel2 extends GameScene {
	constructor() {
		super('World1Sublevel2')
	}

	create() {
		gameState.sublevel = true;
		gameState.mapType = 'under';
		const mapW1Sl2 = this.make.tilemap({ key: 'mapW1Sl2' });
		this.createMap(gameState.currentMusic.underGroundBGM, 272, 400, undefined, mapW1Sl2, 0x000000, 10);
		this.cameras.main.setBounds(0, -32, gameState.width, config.height);
		let portalExit = this.add.rectangle(208, 162, 1, 3);
		this.physics.add.existing(portalExit, [true]);
		this.physics.add.overlap(gameState.player, portalExit, () => {
			this.portalEntrance('right', gameState.currentScene, 1854);
			gameState.portalExit = true;
		});
	}

	update() {
		this.controls();
		this.gameVariables(gameState.currentMusic.underGroundBGMHurryUp);
	}

}

class World1Level2End extends GameScene {
	constructor() {
		super('World1Level2End')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = false;
		const mapW1L2End = this.make.tilemap({ key: 'mapW1L2End' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 672, 400, undefined, mapW1L2End, 0x6185f8, 192);
		this.addEnemies(mapW1L2End);
		this.flagpoleScene(359, 192, 224, 104);
	}

	update() {
		this.controls();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(true, 456, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 1;
				gameState.character.mario.level = 3;
				gameState.currentScene = 'World1Level3';
			} else {
				gameState.character.luigi.world = 1;
				gameState.character.luigi.level = 3;
				gameState.currentScene = 'World1Level3';
			}
		}
	}
}

class World1Level3 extends GameScene {
	constructor() {
		super('World1Level3')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW1L3 = this.make.tilemap({ key: 'mapW1L3' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 2816, 300, 1260, mapW1L3, 0x6185f8, 208, 107);
		this.addEnemies(mapW1L3);
		this.flagpoleScene(2439, 192);
		this.addElevators(880, 240, 4, 4000, 'up', true);
		this.addElevators(1328, 128, 4, 1500, 'right', true);
		this.addElevators(1504, 144, 4, 1500, 'left', true);
		this.addElevators(2048, 96, 4, 3000, 'right', true);
		this.turtleBox(414, 80, 82);
		this.turtleBox(1662, 112, 130);
		this.turtleBox(2062, 208, 146);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(false, 2552, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 1;
				gameState.character.mario.level = 4;
				gameState.currentScene = 'World1Level4';
			} else {
				gameState.character.luigi.world = 1;
				gameState.character.luigi.level = 4;
				gameState.currentScene = 'World1Level4';
			}
		}
	}
}

class World1Level4 extends GameScene {
	constructor() {
		super('World1Level4')
	}

	create() {
		gameState.mapType = 'castle';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW1L4 = this.make.tilemap({ key: 'mapW1L4' });
		this.createMap(gameState.currentMusic.koopaBGM, 2560, 400, 1160, mapW1L4, 0x000000, 80, 127);
		gameState.mysteryBoxes.setVisible(false);
		this.cameras.main.setBounds(0, -32, gameState.width, config.height);
		this.addEnemies(mapW1L4);
		this.fireStick(488, 136, 6);
		this.fireStick(792, 72, 6);
		this.fireStick(968, 72, 6);
		this.fireStick(1080, 72, 6);
		this.fireStick(1224, 120, 6);
		this.fireStick(1352, 120, 6);
		this.fireStick(1416, 40, 6);
		this.addElevators(2224, 72, 2, 4500, 'left', true);
		this.flagpoleScene(2264, 104);
		//let toadstool = this.add.sprite(2448, 176, 'npcs').setOrigin(0, 1);
		this.bowser(2200, 128);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.koopaBGMHurryUp);
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 2;
				gameState.character.mario.level = 1;
				gameState.currentScene = 'World2Level1';
			} else {
				gameState.character.luigi.world = 2;
				gameState.character.luigi.level = 1;
				gameState.currentScene = 'World2Level1';
			}
		}
	}
}

class World2Level1 extends GameScene {
	constructor() {
		super('World2Level1')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		config.height = 480;
		const mapW2L1 = this.make.tilemap({ key: 'mapW2L1' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 3584, 400, 1600, mapW2L1, 0x6185f8, 448, 448);
		this.cameras.main.setBounds(0, 232, gameState.width, 240);
		this.addEnemies(mapW2L1);
		this.flagpoleScene(3208, 432);
		let portalEntrance = this.add.rectangle(1664, 383, 3, 1, 0x000000);
		this.physics.add.existing(portalEntrance, [true]);
		this.physics.add.overlap(gameState.player, portalEntrance, () => {
			this.portalEntrance('down', 'World1Sublevel1');
		});
		let cloudPlatform = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		for (let i = 0; i < 48; i += 16) {
			cloudPlatform.create(1528 + i, 161, 'sprites', 'Sprites-182').setFrictionX(1).setSize(16, 8).setOffset(0, 0);
		}
		this.physics.add.collider(gameState.player, cloudPlatform, () => {
			cloudPlatform.setVelocityX(30);
		}, null, this);
		gameState.oneUpBoxes.setVisible(false);
		gameState.mysteryBoxes.getFirstAlive().setVisible(false);
		this.springBoard(3008, 448);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.portalExit) {
			gameState.portalExit = false;
			this.portalExit('down', 432);
		}
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(true, 456, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 2;
				gameState.character.mario.level = 2;
				gameState.currentScene = 'World1Level2Start';
			} else {
				gameState.character.luigi.world = 2;
				gameState.character.luigi.level = 2;
				gameState.currentScene = 'World1Level2Start';
			}
		}
		if (gameState.cloudLayer && gameState.player.y > config.height / 2) {
			gameState.cloudLayer = false;
			gameState.player.x = 2600;
			gameState.keyboard = false;
			gameState.player.setVelocityX(0);
			this.cameras.main.setBounds(0, 232, gameState.width, 240);
			this.time.addEvent({
				delay: 500,
				repeat: 0,
				callback: () => {
					gameState.keyboard = true;
				}
			});
		}
	}
}

class World2Level2 extends GameScene {
	constructor() {
		super('World2Level2')
	}

	create() {
		gameState.currentScene = 'World2Level2';
		gameState.mapType = 'water';
		gameState.sublevel = false;
		gameState.timeReset = true;
		config.height = 240;
		const mapW2L2 = this.make.tilemap({ key: 'mapW2L2' });
		this.createMap(gameState.currentMusic.underWaterBGM, 3072, 400, 1536, mapW2L2, 0x6185f8, 10, 10);
		this.cameras.main.setBounds(0, -8, gameState.width, config.height);
		this.physics.world.gravity.y = 150;
		this.addEnemies(mapW2L2);
		let portalEntrance = this.add.rectangle(3024, 130, 1, 3);
		this.physics.add.existing(portalEntrance, [true]);
		this.physics.add.overlap(gameState.player, portalEntrance, () => {
			this.portalEntrance('right', 'World1Level2End', 32);
		});
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.underWaterBGMHurryUp);
	}
}

class World2Level3 extends GameScene {
	constructor() {
		super('World2Level3')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW2L3 = this.make.tilemap({ key: 'mapW2L3' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 3840, 300, 1260, mapW2L3, 0x6185f8, 208, 160);
		this.addEnemies(mapW2L3, true);
		this.flagpoleScene(3608, 192);
	}

	update() {
		this.controls();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		this.enemyBehavior();
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(false, 3736, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 2;
				gameState.character.mario.level = 4;
				gameState.currentScene = 'World2Level4';
			} else {
				gameState.character.luigi.world = 2;
				gameState.character.luigi.level = 4;
				gameState.currentScene = 'World2Level4';
			}
		}
	}
}

class World2Level4 extends GameScene {
	constructor() {
		super('World2Level4')
	}

	create() {
		gameState.mapType = 'castle';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW2L4 = this.make.tilemap({ key: 'mapW2L4' });
		this.createMap(gameState.currentMusic.koopaBGM, 2560, 400, 1260, mapW2L4, 0x000000, 80, 176);
		this.cameras.main.setBounds(0, -32, gameState.width, config.height);
		this.addEnemies(mapW2L4);
		this.fireStick(792, 120, 6);
		this.fireStick(888, 56, 6);
		this.fireStick(984, 120, 6);
		this.fireStick(1176, 120, 6);
		this.fireStick(1320, 72, 6);
		this.fireStick(1480, 136, 6);
		this.addElevators(1376, -48, 2, 7000, 'down', false);
		this.time.addEvent({
			delay: 4000,
			callback: () => {
				this.addElevators(1376, -48, 2, 7000, 'down', false);
			},
			loop: false
		});
		this.addElevators(1424, 224, 2, 7000, 'up', false);
		this.time.addEvent({
			delay: 4000,
			callback: () => {
				this.addElevators(1424, 224, 2, 7000, 'up', false);
			},
			loop: false
		});
		this.addElevators(2224, 72, 2, 2250, 'left', true);
		this.flagpoleScene(2264, 104);
		//let toadstool = this.add.sprite(2448, 176, 'npcs').setOrigin(0, 1);
		this.bowser(2200, 128);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.koopaBGMHurryUp);
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 3;
				gameState.character.mario.level = 1;
				gameState.currentScene = 'World3Level1';
			} else {
				gameState.character.luigi.world = 3;
				gameState.character.luigi.level = 1;
				gameState.currentScene = 'World3Level1';
			}
		}
	}
}

class World3Level1 extends GameScene {
	constructor() {
		super('World3Level1')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		config.height = 480;
		const mapW3L1 = this.make.tilemap({ key: 'mapW3L1' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 3584, 400, 2078, mapW3L1, undefined, 448, 368);  //1696, 448
		this.cameras.main.setBounds(0, 232, gameState.width, 240);
		this.addEnemies(mapW3L1);
		this.flagpoleScene(3208, 432);
		let portalEntrance = this.add.rectangle(623, 383, 3, 1, 0xFFFFFF);
		this.physics.add.existing(portalEntrance, [true]);
		this.physics.add.overlap(gameState.player, portalEntrance, () => {
			this.portalEntrance('down', 'World3Sublevel1');
		});
		let cloudPlatform = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		for (let i = 0; i < 48; i += 16) {
			cloudPlatform.create(2288 + i, 161, 'sprites', 'Sprites-182').setFrictionX(1).setSize(16, 8).setOffset(0, 0);
		}
		this.physics.add.collider(gameState.player, cloudPlatform, () => {
			cloudPlatform.setVelocityX(30);
		}, null, this);
		gameState.oneUpBoxes.setVisible(false);
		this.springBoard(2016, 448);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.portalExit) {
			gameState.portalExit = false;
			this.portalExit('down', 432);
		}
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(true, 456, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 3;
				gameState.character.mario.level = 2;
				gameState.currentScene = 'World3Level2';
			} else {
				gameState.character.luigi.world = 3;
				gameState.character.luigi.level = 2;
				gameState.currentScene = 'World3Level2';
			}
		}
		if (gameState.cloudLayer && gameState.player.y > config.height / 2) {
			gameState.cloudLayer = false;
			this.physics.world.bounds.x = 0
			this.physics.world.bounds.width = 3584
			gameState.player.x = 2608;
			gameState.progress = gameState.player.x;
			gameState.keyboard = false;
			gameState.player.setVelocityX(0);
			this.cameras.main.setBounds(0, 232, gameState.width, 240);
			this.time.addEvent({
				delay: 500,
				repeat: 0,
				callback: () => {
					gameState.keyboard = true;
				}
			});
		}
	}
}

class World3Sublevel1 extends GameScene {
	constructor() {
		super('World3Sublevel1')
	}

	create() {
		gameState.sublevel = true;
		gameState.mapType = 'under';
		config.height = 240;
		const mapW3Sl1 = this.make.tilemap({ key: 'mapW3Sl1' });
		this.createMap(gameState.currentMusic.underGroundBGM, 272, 400, undefined, mapW3Sl1, 0x000000, 10);
		this.cameras.main.setBounds(0, -32, gameState.width, config.height);
		let portalExit = this.add.rectangle(208, 162, 1, 3);
		this.physics.add.existing(portalExit, [true]);
		this.physics.add.overlap(gameState.player, portalExit, () => {
			this.portalEntrance('right', gameState.currentScene, 1088);
			gameState.portalExit = true;
		});
	}

	update() {
		this.controls();
		this.gameVariables(gameState.currentMusic.underGroundBGMHurryUp);
	}

}

class World3Level2 extends GameScene {
	constructor() {
		super('World3Level2')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		config.height = 240;
		const mapW3L2 = this.make.tilemap({ key: 'mapW3L2' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 3584, 400, 1600, mapW3L2, undefined, 208, 208);
		this.addEnemies(mapW3L2);
		this.flagpoleScene(3352, 192);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(true, 456, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 3;
				gameState.character.mario.level = 3;
				gameState.currentScene = 'World3Level3';
			} else {
				gameState.character.luigi.world = 3;
				gameState.character.luigi.level = 3;
				gameState.currentScene = 'World3Level3';
			}
		}
	}
}

// Fix Elevators
class World3Level3 extends GameScene {
	constructor() {
		super('World3Level3')
	}

	create() {
		gameState.mapType = 'above';
		gameState.sublevel = false;
		gameState.timeReset = true;
		const mapW3L3 = this.make.tilemap({ key: 'mapW3L3' });
		this.createMap(gameState.currentMusic.aboveGroundBGM, 2816, 300, 1260, mapW3L3, undefined, 208, 107);
		this.addEnemies(mapW3L3);
		this.flagpoleScene(2424, 192);
		this.addElevators(440, 65, 3, 1500, 'right', true);
		this.addElevators(536, 129, 3, 1500, 'left', true);
		this.addElevators(968, 97, 3, undefined, undefined, undefined, true);
		this.addElevators(1544, 145, 3, 1500, 'left', true);
		this.addElevators(1544, 81, 3, 3000, 'left', true);
		this.turtleBox(414, 80, 82);
		this.turtleBox(1662, 112, 130);
		this.turtleBox(2062, 208, 146);
	}

	update() {
		this.controls();
		this.enemyBehavior();
		this.gameVariables(gameState.currentMusic.aboveGroundBGMHurryUp);
		if (gameState.time === 0 && gameState.courseCompleted && !gameState.fanfare) {
			this.castleFanfare(false, 2536, 208);
		}
		if (gameState.courseCompleted) {
			if (gameState.character.mario.active) {
				gameState.character.mario.world = 3;
				gameState.character.mario.level = 4;
				gameState.currentScene = 'World3Level4';
			} else {
				gameState.character.luigi.world = 3;
				gameState.character.luigi.level = 4;
				gameState.currentScene = 'World3Level4';
			}
		}
	}
}
