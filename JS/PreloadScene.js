class PreloadScene extends Phaser.Scene {
	constructor() {
		super({ key: 'PreloadScene' })
	}

	preload() {
		this.load.bitmapFont('font', 'font/press-start-2p.png', 'font/press-start-2p.xml');
		this.load.bitmapFont('font6', 'font/press-start-2p-6pix.png', 'font/press-start-2p-6pix.xml');
		this.load.image('startImage', 'images/StartImage.png');
		this.load.image('titleLogo', 'images/TitleLogo.png');
		this.load.image('selectCursor', 'images/SelectCursor.png');
		this.load.image('blocks', 'images/MarioEnviro-extruded.png');
		this.load.spritesheet('hudCoin', 'images/ItemSprites/HUDCoin-extruded.png', { frameWidth: 5, frameHeight: 8, margin: 1, spacing: 2 });
		this.load.spritesheet('fireball', 'images/ItemSprites/Fireball.png', { frameWidth: 8, frameHeight: 8, margin: 1, spacing: 2 });
		this.load.spritesheet('firework', 'images/ItemSprites/Firework.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('fireblast', 'images/ItemSprites/FireBlast.png', { frameWidth: 24, frameHeight: 8 });
		this.load.spritesheet('npcs', 'images/PlayerSprites/NPCs.png', { frameWidth: 16, frameHeight: 24 });
		this.load.spritesheet('bowser', 'images/EnemySprites/Bowser.png', { frameWidth: 32, frameHeight: 32, margin: 1, spacing: 2 });
		this.load.audio('aboveGroundBGM', ['audio/Above_Ground_BGM.mp3', 'audio/Above_Ground_BGM.ogg']);
		this.load.audio('aboveGroundBGMHurryUp', ['audio/Above_Ground_BGM_(Hurry_Up!).mp3', 'audio/Above_Ground_BGM_(Hurry_Up!).ogg']);
		this.load.audio('underGroundBGM', ['audio/Underground_BGM.mp3', 'audio/Underground_BGM.ogg']);
		this.load.audio('underGroundBGMHurryUp', ['audio/Underground_BGM_(Hurry_Up!).mp3', 'audio/Underground_BGM_(Hurry_Up!).ogg']);
		this.load.audio('underWaterBGM', ['audio/Underwater_BGM.mp3', 'audio/Underwater_BGM.ogg']);
		this.load.audio('underWaterBGMHurryUp', ['audio/Underwater_BGM_(Hurry_Up!).mp3', 'audio/Underwater_BGM_(Hurry_Up!).ogg']);
		this.load.audio('koopaBGM', ['audio/Koopa_Stage_BGM.mp3', 'audio/Koopa_Stage_BGM.ogg']);
		this.load.audio('koopaBGMHurryUp', ['audio/Koopa_Stage_BGM_(Hurry_Up!).mp3', 'audio/Koopa_Stage_BGM_(Hurry_Up!).ogg']);
		this.load.audio('invincibleBGM', ['audio/Invincible_BGM.mp3', 'audio/Invincible_BGM.ogg']);
		this.load.audio('invincibleBGMHurryUp', ['audio/Invincible_BGM_(Hurry_Up!).mp3', 'audio/Invincible_BGM_(Hurry_Up!).ogg']);
		this.load.audio('ending', ['audio/Ending_BGM.ogg', 'audio/Ending_BGM.mp3']);
		this.load.audio('courseClear', ['audio/Course_Clear_Fanfare.ogg', 'audio/Course_Clear_Fanfare.mp3']);
		this.load.audio('koopaBeat', ['audio/Koopa_Defeated_Fanfare.ogg', 'audio/Koopa_Defeated_Fanfare.mp3']);
		this.load.audio('castleClear', ['audio/castle-clear.ogg', 'audio/castle-clear.mp3']);
		this.load.audio('gameOverSFX', ['audio/game-over.ogg', 'audio/game-over.mp3']);
		this.load.audio('hurryUpSFX', ['audio/hurry-up.ogg', 'audio/hurry-up.mp3']);
		this.load.audio('bumpSFX', ['audio/bump.ogg', 'audio/bump.mp3']);
		this.load.audio('littleJumpSFX', ['audio/small-jump.ogg', 'audio/small-jump.mp3']);
		this.load.audio('superJumpSFX', ['audio/super-jump.ogg', 'audio/super-jump.mp3']);
		this.load.audio('diedSFX', ['audio/life-lost.ogg', 'audio/life-lost.mp3']);
		this.load.audio('stompSFX', ['audio/stomp.ogg', 'audio/stomp.mp3']);
		this.load.audio('blockSFX', ['audio/block.ogg', 'audio/block.mp3']);
		this.load.audio('pauseSFX', ['audio/pause.ogg', 'audio/pause.mp3']);
		this.load.audio('powerUpAppearsSFX', ['audio/power-up-appears.ogg', 'audio/power-up-appears.mp3']);
		this.load.audio('powerUpSFX', ['audio/power-up.ogg', 'audio/power-up.mp3']);
		this.load.audio('coinSFX', ['audio/coin.ogg', 'audio/coin.mp3']);
		this.load.audio('1upSFX', ['audio/1-up.ogg', 'audio/1-up.mp3']);
		this.load.audio('fireballSFX', ['audio/fireball.ogg', 'audio/fireball.mp3']);
		this.load.audio('bowserFallsSFX', ['audio/bowser-falls.ogg', 'audio/bowser-falls.mp3']);
		this.load.audio('bowserFireSFX', ['audio/bowser-fire.ogg', 'audio/bowser-fire.mp3']);
		this.load.audio('fireworkSFX', ['audio/fireworks.ogg', 'audio/fireworks.mp3']);
		this.load.audio('flagpoleSFX', ['audio/flagpole.ogg', 'audio/flagpole.mp3']);
		this.load.audio('levelClearSFX', ['audio/level-clear.ogg', 'audio/level-clear.mp3']);
		this.load.audio('pipeSFX', ['audio/pipe.ogg', 'audio/pipe.mp3']);
		this.load.audio('vineSFX', ['audio/vine.ogg', 'audio/vine.mp3']);
		this.load.audio('kickSFX', ['audio/kick.ogg', 'audio/kick.mp3']);
		this.load.audio('goingUnderSFX', ['audio/going-under.ogg', 'audio/going-under.mp3']);
		this.load.tilemapTiledJSON('mapW1L1', 'images/TileMaps/World1Level1.json');
		this.load.tilemapTiledJSON('mapW1Sl1', 'images/TileMaps/World1Sublevel1.json');
		this.load.tilemapTiledJSON('mapW1L2Start', 'images/TileMaps/World1Level2Start.json');
		this.load.tilemapTiledJSON('mapW1L2', 'images/TileMaps/World1Level2.json');
		this.load.tilemapTiledJSON('mapW1Sl2', 'images/TileMaps/World1Sublevel2.json');
		this.load.tilemapTiledJSON('mapW1L2End', 'images/TileMaps/World1Level2End.json');
		this.load.tilemapTiledJSON('mapW1L3', 'images/TileMaps/World1Level3.json');
		this.load.tilemapTiledJSON('mapW1L4', 'images/TileMaps/World1Level4.json');
		this.load.tilemapTiledJSON('mapW2L1', 'images/TileMaps/World2Level1.json');
		this.load.tilemapTiledJSON('mapW2L2', 'images/TileMaps/World2Level2.json');
		this.load.tilemapTiledJSON('mapW2L3', 'images/TileMaps/World2Level3.json');
		this.load.tilemapTiledJSON('mapW2L4', 'images/TileMaps/World2Level4.json');
		this.load.tilemapTiledJSON('mapW3L1', 'images/TileMaps/World3Level1.json');
		this.load.tilemapTiledJSON('mapW3Sl1', 'images/TileMaps/World3Sublevel1.json');
		this.load.tilemapTiledJSON('mapW3L2', 'images/TileMaps/World3Level2.json');
		this.load.tilemapTiledJSON('mapW3L3', 'images/TileMaps/World3Level3.json');
		this.load.path = 'images/ItemSprites/';
		this.load.multiatlas('sprites', 'Sprites.json');
		this.load.multiatlas('textures', 'MarioEnviro.json');
		this.load.multiatlas('springboard', 'Springboard.json');
		this.load.path = 'images/PlayerSprites/';
		this.load.multiatlas('playerSprites', 'PlayerSprites.json');
		this.load.path = 'images/EnemySprites/';
		this.load.multiatlas('enemies', 'EnemySprites.json');
	}

	create() {
		gameState.currentMusic.aboveGroundBGM = this.sound.add('aboveGroundBGM');
		gameState.currentMusic.aboveGroundBGMHurryUp = this.sound.add('aboveGroundBGMHurryUp');
		gameState.currentMusic.underGroundBGM = this.sound.add('underGroundBGM');
		gameState.currentMusic.underGroundBGMHurryUp = this.sound.add('underGroundBGMHurryUp');
		gameState.currentMusic.underWaterBGM = this.sound.add('underWaterBGM');
		gameState.currentMusic.underWaterBGMHurryUp = this.sound.add('underWaterBGMHurryUp');
		gameState.currentMusic.koopaBGM = this.sound.add('koopaBGM');
		gameState.currentMusic.koopaBGMHurryUp = this.sound.add('koopaBGMHurryUp');
		gameState.currentMusic.invincibleBGM = this.sound.add('invincibleBGM');
		gameState.currentMusic.invincibleBGMHurryUp = this.sound.add('invincibleBGMHurryUp');
		gameState.currentMusic.castleClear = this.sound.add('castleClear');
		gameState.currentMusic.courseClear = this.sound.add('courseClear');
		gameState.currentMusic.koopaBeat = this.sound.add('koopaBeat');
		gameState.currentMusic.ending = this.sound.add('ending');
		gameState.sfx.gameOver = this.sound.add('gameOverSFX');
		gameState.sfx.littleJump = this.sound.add('littleJumpSFX');
		gameState.sfx.superJump = this.sound.add('superJumpSFX');
		gameState.sfx.died = this.sound.add('diedSFX');
		gameState.sfx.hurryUp = this.sound.add('hurryUpSFX');
		gameState.sfx.stomp = this.sound.add('stompSFX');
		gameState.sfx.block = this.sound.add('blockSFX');
		gameState.sfx.bump = this.sound.add('bumpSFX');
		gameState.sfx.pause = this.sound.add('pauseSFX');
		gameState.sfx.powerUpAppears = this.sound.add('powerUpAppearsSFX');
		gameState.sfx.powerUp = this.sound.add('powerUpSFX');
		gameState.sfx.coin = this.sound.add('coinSFX');
		gameState.sfx.pipe = this.sound.add('pipeSFX');
		gameState.sfx.vine = this.sound.add('vineSFX');
		gameState.sfx.kick = this.sound.add('kickSFX');
		gameState.sfx.levelClear = this.sound.add('levelClearSFX');
		gameState.sfx.flagpole = this.sound.add('flagpoleSFX');
		gameState.sfx.firework = this.sound.add('fireworkSFX');
		gameState.sfx.fireball = this.sound.add('fireballSFX');
		gameState.sfx.bowserFire = this.sound.add('bowserFireSFX');
		gameState.sfx.bowserFalls = this.sound.add('bowserFallsSFX');
		gameState.sfx.oneUp = this.sound.add('1upSFX');
		gameState.sfx.goingUnder = this.sound.add('goingUnderSFX');
		this.anims.create({
			key: 'hudCoinAnim',
			frames: this.anims.generateFrameNumbers('hudCoin', { start: 0, end: 2 }),
			frameRate: 8,
			repeat: -1,
			repeatDelay: 100,
			yoyo: true
		});
		this.anims.create({
			key: 'springboardAnim',
			frames: this.anims.generateFrameNames('springboard', { start: 12, end: 14, prefix: 'Springboard-' }),
			frameRate: 10,
			repeat: 0,
			yoyo: true
		});
		this.anims.create({
			key: 'owMysteryBoxAnim',
			frames: this.anims.generateFrameNames('sprites', { start: 87, end: 89, prefix: 'Sprites-' }),
			framerate: 8,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'ugMysteryBoxAnim',
			frames: this.anims.generateFrameNames('sprites', { start: 96, end: 98, prefix: 'Sprites-' }),
			framerate: 8,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'uwMysteryBoxAnim',
			frames: this.anims.generateFrameNames('sprites', { start: 112, end: 115, prefix: 'Sprites-' }),
			framerate: 8,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'castleMysteryBoxAnim',
			frames: this.anims.generateFrameNames('sprites', { start: 104, end: 106, prefix: 'Sprites-' }),
			framerate: 8,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'owStar',
			frames: this.anims.generateFrameNames('sprites', { start: 58, end: 61, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'ugStar',
			frames: this.anims.generateFrameNames('sprites', { start: 66, end: 69, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'uwStar',
			frames: this.anims.generateFrameNames('sprites', { start: 66, end: 69, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'castleStar',
			frames: this.anims.generateFrameNames('sprites', { start: 80, end: 83, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'owFlower',
			frames: this.anims.generateFrameNames('sprites', { start: 25, end: 28, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'ugFlower',
			frames: this.anims.generateFrameNames('sprites', { start: 34, end: 37, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'uwFlower',
			frames: this.anims.generateFrameNames('sprites', { start: 42, end: 45, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'castleFlower',
			frames: this.anims.generateFrameNames('sprites', { start: 50, end: 53, prefix: 'Sprites-' }),
			framerate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'owCoin',
			frames: this.anims.generateFrameNames('sprites', { start: 120, end: 123, prefix: 'Sprites-' }),
			framerate: 20,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'ugCoin',
			frames: this.anims.generateFrameNames('sprites', { start: 127, end: 130, prefix: 'Sprites-' }),
			framerate: 20,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'uwCoin',
			frames: this.anims.generateFrameNames('sprites', { start: 141, end: 144, prefix: 'Sprites-' }),
			framerate: 20,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'castleCoin',
			frames: this.anims.generateFrameNames('sprites', { start: 134, end: 137, prefix: 'Sprites-' }),
			framerate: 20,
			repeat: -1,
			repeatDelay: 200,
			yoyo: true
		});
		this.anims.create({
			key: 'boxCoin',
			frames: this.anims.generateFrameNames('sprites', { start: 148, end: 151, prefix: 'Sprites-' }),
			framerate: 8,
			repeat: -1,
			yoyo: true
		});
		this.anims.create({
			key: 'owBrickBreakAnim',
			frames: this.anims.generateFrameNames('sprites', { frames: [29, 62], prefix: 'Sprites-' }),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'ugBrickBreakAnim',
			frames: this.anims.generateFrameNames('sprites', { frames: [38, 70], prefix: 'Sprites-' }),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'uwBrickBreakAnim',
			frames: this.anims.generateFrameNames('sprites', { frames: [54, 84], prefix: 'Sprites-' }),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'castleBrickBreakAnim',
			frames: this.anims.generateFrameNames('sprites', { frames: [46, 77], prefix: 'Sprites-' }),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'fireworkAnim',
			frames: this.anims.generateFrameNumbers('firework', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: 0,
			showOnStart: true,
			hideOnComplete: true
		});
		this.anims.create({
			key: 'fireballAnim',
			frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3 }),
			frameRate: 16,
			repeat: -1
		});
		this.anims.create({
			key: 'marioEnlarge',
			frames: this.anims.generateFrameNames('playerSprites', { frames: ['SuperMarioSprites-15', 'MarioSprites-0', 'SuperMarioSprites-15', 'MarioSprites-0', 'SuperMarioSprites-15', 'SuperMarioSprites-0'] }),
			frameRate: 10,
			repeat: 0
		});
		this.anims.create({
			key: 'marioShrink',
			frames: this.anims.generateFrameNames('playerSprites', { frames: ['SuperMarioSprites-15', 'SuperMarioSprites-0', 'SuperMarioSprites-15', 'SuperMarioSprites-0', 'SuperMarioSprites-15', 'MarioSprites-0'] }),
			frameRate: 10,
			repeat: 0
		});
		this.anims.create({
			key: 'luigiEnlarge',
			frames: this.anims.generateFrameNames('playerSprites', { frames: ['SuperLuigiSprites-15', 'LuigiSprites-0', 'SuperLuigiSprites-15', 'LuigiSprites-0', 'SuperLuigiSprites-15', 'SuperLuigiSprites-0'] }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'luigiShrink',
			frames: this.anims.generateFrameNames('playerSprites', { frames: ['SuperLuigiSprites-15', 'SuperLuigiSprites-0', 'SuperLuigiSprites-15', 'SuperLuigiSprites-0', 'SuperLuigiSprites-15', 'LuigiSprites-0'] }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleOWIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SmallInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SmallInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUGIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SmallInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleCASTLEIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SmallInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleOWIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SuperInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUGIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SuperInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleCASTLEIdle',
			frames: this.anims.generateFrameNames('playerSprites', { start: 0, end: 2, prefix: 'SuperInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleOWCrouch',
			frames: this.anims.generateFrameNames('playerSprites', { start: 18, end: 20, prefix: 'SuperInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUGCrouch',
			frames: this.anims.generateFrameNames('playerSprites', { start: 18, end: 20, prefix: 'SuperInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWCrouch',
			frames: this.anims.generateFrameNames('playerSprites', { start: 18, end: 20, prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleCASTLECrouch',
			frames: this.anims.generateFrameNames('playerSprites', { start: 18, end: 20, prefix: 'SuperInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'marioWalk',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'MarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'luigiWalk',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'LuigiSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleOWWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUGWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleCASTLEWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superMarioWalk',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'SuperMarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superLuigiWalk',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'SuperLuigiSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'fireWalk',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'FirePowerSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleOWWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUGWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleCASTLEWalk',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'marioSprint',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'MarioSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleOWSprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityOWSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWSprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityUWSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUGSprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityUGSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleCASTLESprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SmallInvincibilityCASTLESprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'luigiSprint',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'LuigiSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'superMarioSprint',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'SuperMarioSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'superLuigiSprint',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'SuperLuigiSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'fireSprint',
			frames: this.anims.generateFrameNames('playerSprites', { start: 1, end: 3, prefix: 'FirePowerSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'fireShoot',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [16], prefix: 'FirePowerSprites-' }),
			duration: 3000,
			repeat: 0
		});
		this.anims.create({
			key: 'superInvincibleOWSprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityOWSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWSprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityUWSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUGSprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityUGSprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleCASTLESprint',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [3, 7, 11, 4, 8, 9, 5, 6, 10], prefix: 'SuperInvincibilityCASTLESprites-' }),
			repeat: -1
		});
		this.anims.create({
			key: 'marioJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 5, end: 5, prefix: 'MarioSprites-' }),
			frameRate: 0
		});
		this.anims.create({
			key: 'luigiJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 5, end: 5, prefix: 'LuigiSprites-' }),
			frameRate: 0
		});
		this.anims.create({
			key: 'invincibleOWJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SmallInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUGJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SmallInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SmallInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleCASTLEJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SmallInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleOWJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SuperInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUGJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SuperInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleCASTLEJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SuperInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superMarioJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 5, end: 5, prefix: 'SuperMarioSprites-' }),
			frameRate: 0
		});
		this.anims.create({
			key: 'superLuigiJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 5, end: 5, prefix: 'SuperLuigiSprites-' }),
			frameRate: 0
		});
		this.anims.create({
			key: 'fireJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 5, end: 5, prefix: 'FirePowerSprites-' }),
			frameRate: 0
		});
		this.anims.create({
			key: 'superInvincibleOWJump',
			frames: this.anims.generateFrameNames('playerSprites', { start: 15, end: 17, prefix: 'SuperInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleOWSkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SmallInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUGSkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SmallInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWSkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SmallInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleCASTLESkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SmallInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleOWSkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SuperInvincibilityOWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUGSkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SuperInvincibilityUGSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWSkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleCASTLESkid',
			frames: this.anims.generateFrameNames('playerSprites', { start: 12, end: 14, prefix: 'SuperInvincibilityCASTLESprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'fireShoot',
			frames: this.anims.generateFrameNames('playerSprites', { start: 16, end: 16, prefix: 'FirePowerSprites-' }),
			frameRate: 0
		});
		this.anims.create({
			key: 'marioClimb',
			frames: this.anims.generateFrameNames('playerSprites', { start: 7, end: 8, prefix: 'MarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'luigiClimb',
			frames: this.anims.generateFrameNames('playerSprites', { start: 7, end: 8, prefix: 'MarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superMarioClimb',
			frames: this.anims.generateFrameNames('playerSprites', { start: 7, end: 8, prefix: 'SuperMarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superLuigiClimb',
			frames: this.anims.generateFrameNames('playerSprites', { start: 7, end: 8, prefix: 'SuperLuigiSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'fireClimb',
			frames: this.anims.generateFrameNames('playerSprites', { start: 7, end: 8, prefix: 'FirePowerSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'marioSwim',
			frames: this.anims.generateFrameNames('playerSprites', { start: 9, end: 10, prefix: 'MarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'marioSwimUp',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [9, 12, 10, 11], prefix: 'MarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'luigiSwim',
			frames: this.anims.generateFrameNames('playerSprites', { start: 9, end: 10, prefix: 'LuigiSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'luigiSwimUp',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [9, 12, 10, 11], prefix: 'LuigiSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superMarioSwim',
			frames: this.anims.generateFrameNames('playerSprites', { start: 9, end: 10, prefix: 'SuperMarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superMarioSwimUp',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [9, 12, 13, 10, 11, 14], prefix: 'SuperMarioSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'fireSwim',
			frames: this.anims.generateFrameNames('playerSprites', { start: 9, end: 10, prefix: 'FirePowerSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'fireSwimUp',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [9, 12, 13, 10, 11, 14], prefix: 'FirePowerSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWSwim',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [27, 31, 29, 30, 28, 32], prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'superInvincibleUWSwimUp',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [27, 31, 35, 36, 40, 44, 28, 32, 33, 37, 41, 42, 29, 30, 34, 38, 39, 43], prefix: 'SuperInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWSwim',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [27, 31, 29, 30, 28, 32], prefix: 'SmallInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'invincibleUWSwimUp',
			frames: this.anims.generateFrameNames('playerSprites', { frames: [27, 31, 35, 36, 40, 28, 32, 33, 37, 41, 29, 30, 34, 38, 39], prefix: 'SmallInvincibilityUWSprites-' }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'owGoombaWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 0, end: 1, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'ugGoombaWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 25, end: 26, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'uwGoombaWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 50, end: 51, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'castleGoombaWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 74, end: 75, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'redTurtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 53, end: 54, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'redParaturtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 55, end: 56, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'owTurtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 3, end: 4, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'ugTurtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 28, end: 29, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'uwTurtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 77, end: 78, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'castleTurtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 77, end: 78, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'owParaturtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 5, end: 6, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'ugParaturtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 30, end: 31, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'uwParaturtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 5, end: 6, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'castleParaturtleWalk',
			frames: this.anims.generateFrameNames('enemies', { start: 79, end: 80, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'redTurtleEmerge',
			frames: this.anims.generateFrameNames('enemies', { start: 57, end: 58, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'turtleEmergeOW',
			frames: this.anims.generateFrameNames('enemies', { start: 7, end: 8, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'turtleEmergeUG',
			frames: this.anims.generateFrameNames('enemies', { start: 32, end: 33, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'turtleEmergeUW',
			frames: this.anims.generateFrameNames('enemies', { start: 81, end: 82, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'turtleEmergeCASTLE',
			frames: this.anims.generateFrameNames('enemies', { start: 57, end: 58, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'piranhaPlantOW',
			frames: this.anims.generateFrameNames('enemies', { start: 9, end: 10, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'piranhaPlantUG',
			frames: this.anims.generateFrameNames('enemies', { start: 34, end: 35, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'piranhaPlantUW',
			frames: this.anims.generateFrameNames('enemies', { start: 83, end: 84, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'piranhaPlantCASTLE',
			frames: this.anims.generateFrameNames('enemies', { start: 59, end: 60, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'bowserWalk',
			frames: this.anims.generateFrameNumbers('bowser', { start: 2, end: 3 }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'bowserFireShot',
			frames: this.anims.generateFrameNumbers('bowser', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: 0
		});
		this.anims.create({
			key: 'blooberSwim',
			frames: this.anims.generateFrameNames('enemies', { start: 95, end: 96, prefix: 'Enemies-' }),
			frameRate: 5,
			repeat: 0
		});
		this.anims.create({
			key: 'axeAnim',
			frames: this.anims.generateFrameNames('textures', { start: 284, end: 286, prefix: 'MarioEnviro-' }),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'fireBlastAnim',
			frames: this.anims.generateFrameNumbers('fireblast', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'redCheepAnim',
			frames: this.anims.generateFrameNames('enemies', { start: 72, end: 73, prefix: 'Enemies-' }),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'grayCheepAnim',
			frames: this.anims.generateFrameNames('enemies', { start: 97, end: 98, prefix: 'Enemies-' }),
			frameRate: 8,
			repeat: -1
		});
	}

	update() {
		this.scene.start('StartScene');
	}
}
