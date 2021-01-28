class Pedestrian {
	constructor(game, x, y, version, dir) {	// version is an integer in range 0 - 1
		// Constants
		this.dir = dir;
		this.RUN_SPEED = 3;
		this.PIVOT_SPEED = 3;
		this.WIDTH = 19;	// Square animation box, HEIGHT == WIDTH
		this.PAGE_WIDTH = 210;
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = 0; // 0 - 359, with 0 = right 
		this.version = version;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npcs.png");
		
		// Animations
		// this.standing = new AngleAnimator(this.spritesheet,
		// 0, this.version * this.WIDTH,
		// 	this.WIDTH, this.WIDTH, 12, 0.3, 0, this.direction, false, true);	// Standing
		// this.walking = new AngleAnimator(this.spritesheet,
		// 228, this.version * this.WIDTH,
		// 	this.WIDTH, this.WIDTH, 8, 0.3, 0, this.direction, false, true);	// Walking
		this.standing = new AngleAnimator(this.spritesheet, 0, this.version * this.WIDTH,
			this.WIDTH / 15, this.WIDTH / 15, 12, 0.3, 0, this.direction, false, true);	// Standing
		this.walking = new AngleAnimator(this.spritesheet,
		228, this.version * this.WIDTH,
			this.WIDTH, this.WIDTH, 8, 0.3, 0, this.direction, false, true);	// Walking
	};
	
	update() {
		this.x = this.x + this.dir;
		var rightEdge = 1024;
		var leftEdge = 0;
		if (this.dir == 1 && this.x >= rightEdge) {
			this.x = 0;
		}
		if (this.dir == -1 && this.x <= leftEdge) {
			this.x = rightEdge;
		}
	};
	
	draw(ctx) {
		//this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x, this.y, 1);
		this.walking.drawFrame(this.game.clockTick, this.direction, ctx, this.x, this.y, 1);	// TODO states
	};
};

class Car {
	constructor(game, x, y, version, dir) {	// version is an integer in range 0 - 5
		// Constants
		this.dir = dir;
		this.ACCELERATION = 1;
		this.FRICTION = 0.5;
		this.MAX_SPEED = 10;
		this.TURN_SPEED = 2;
		this.WIDTH = 70;
		this.HEIGHT = 64;
		this.PAGE_WIDTH = 210;
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = 0; // 0 - 359, with 0 = right 
		this.version = version;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npccars.png");
	};
	
	update() {
		// TODO
		var randomVersion = Math.floor(Math.random() * 5) + 0;
		var speed = 5;
		this.x = this.x + this.dir * speed;
		var rightEdge = 1024;
		var leftEdge = 0;
		if (this.dir == 1 && this.x >= rightEdge) {
			this.version = randomVersion;
			this.x = 0;
		}
		if (this.dir == -1 && this.x + this.WIDTH <= leftEdge) {
			this.version = randomVersion;
			this.x = rightEdge;
		}
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,
		(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
		this.WIDTH, this.HEIGHT, this.x, this.y, 70, 64);
	};
};