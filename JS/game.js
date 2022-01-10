const gameState = {
	currentScene: 'World1Level1',
	onePlayer: true,
	character: {
		mario: {
			active: true,
			checkpointPassed: false,
			progress: 0,
			score: 0,
			coins: 0,
			world: 1,
			level: 1,
			lives: 3
		},
		luigi: {
			active: false,
			checkpointPassed: false,
			progress: 0,
			score: 0,
			coins: 0,
			world: 1,
			level: 1,
			lives: 3
		}
	},
	cloudLayer: false,
	checkpoint: 40,
	progress: 0,
	keyboard: true,
	super: false,
	firePower: false,
	invincible: false,
	invulnerable: false,
	topScore: 0,
	multiplier: 0,
	chainPoints: [100, 200, 400, 500, 800, 1000, 2000, 4000, 5000, 8000, '1UP'],
	timeReset: false,
	time: 400,
	courseCompleted: false,
	fanfare: false,
	sublevel: false,
	fireworks: 0,
	portalExit: false,
	animations: true,
	currentMusic: {},
	sfx: {},
	keys: {},
	hitCount: 0,
	scoreText: {},
	fallDeath: false,
	playerFacing: 'right',
	enemyMovement: true,
	mapType: 'above' // above, under, water, castle
};

const config = {
	type: Phaser.webGL,
	width: 256,
	height: 240,
	pixelArt: true,
	antialiasGL: false,
	backgroundColor: '000000',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 1000 },
		}
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [ PreloadScene, StartScene, LoadScene, World1Level1, World1Sublevel1, World1Level2Start, World1Level2, World1Sublevel2, World1Level2End, World1Level3, World1Level4, 
		World2Level1, World2Level2, World2Level3, World2Level4, World3Level1, World3Sublevel1, World3Level2, World3Level3, GameOverScene ]
};

const game = new Phaser.Game(config);

// Helper Functions
function addDigits(num, targetLength) {
    return num.toString().padStart(targetLength, 0);
};

function formatTime(seconds){
    var partInSeconds = seconds;
    partInSeconds = partInSeconds.toString().padStart(3,'0');
    return `${partInSeconds}`;
};

function onEvent() {
    gameState.time -= 1;
    gameState.timer.setText('TIME\n ' + formatTime(gameState.time));
};

function movement(enemy) {
	if (gameState.enemyMovement) {
		if (enemy.body.velocity.x === 0 && !enemy.body.touching.left && !enemy.body.blocked.left && !enemy.body.touching.right & !enemy.body.blocked.right) {
			if (enemy === gameState.mushroom || enemy === gameState.oneUpShroom) {
				enemy.setVelocityX(50);
			} else {
				enemy.setVelocityX(-30);
			};
		} else if (enemy.body.velocity.x === 0 && (enemy.body.touching.left || enemy.body.blocked.left)) {
			if (enemy === gameState.mushroom || enemy === gameState.oneUpShroom) {
				enemy.setVelocityX(-50);
			} else {
				enemy.setVelocityX(30);
			};
		} else if (enemy.body.velocity.x === 0 && (enemy.body.touching.right || enemy.body.blocked.right)) {
			if (enemy === gameState.mushroom || enemy === gameState.oneUpShroom) {
				enemy.setVelocityX(50);
			} else {
				enemy.setVelocityX(-30);
			};
		};

		if (enemy.body.velocity.x < 0 && enemy != gameState.mushroom && enemy != gameState.oneUpShroom) {
			enemy.setFlipX(false);
		} else if (enemy.body.velocity.x > 0 && enemy !== gameState.mushroom && enemy !== gameState.oneUpShroom) {
			enemy.setFlipX(true);
		};
	};
};

function timerPoints() {
	gameState.time--;
	gameState.timer.setText('TIME\n ' + formatTime(gameState.time));
	if (gameState.character.mario.active) {
		gameState.character.mario.score += 50;
		gameState.scoreText.text = `MARIO\n${addDigits(gameState.character.mario.score, 6)}`;
	} else {
		gameState.character.luigi.score += 50;
		gameState.scoreText.text = `LUIGI\n${addDigits(gameState.character.luigi.score, 6)}`;
	};
}
