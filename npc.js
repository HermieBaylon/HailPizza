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
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.WIDTH);
	};
	
	draw(ctx) {
		//this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x, this.y, 1);
		this.walking.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);	// TODO states
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.WIDTH / 2), this.BB.width, this.BB.height);
        }
	};
};

class Car {
	constructor(game, x, y, version, direction) {	// version is an integer in range 0 - 5
		// Constants
		this.ACCELERATION = 1;
		this.FRICTION = 0.5;
		this.MAX_SPEED = 10;
		this.TURN_SPEED = 2;
		this.WIDTH = 70;
		this.HEIGHT = 64;
		this.PAGE_WIDTH = 210;
		this.BB_WIDTH = 60;
		this.BB_HEIGHT = 36;
		
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.version = version;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npccars.png");
		
		// Initialize bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new AngleBoundingBox(this.x, this.y, this.BB_WIDTH, this.BB_HEIGHT, this.direction);
	}
	
	update() {
		// TODO
		var randomVersion = Math.floor(Math.random() * 5) + 0;
		var speed = 5;
		this.x = this.x + this.direction * speed;
		var rightEdge = 1024;
		var leftEdge = 0;
		if (this.direction == 1 && this.x >= rightEdge) {
			this.version = randomVersion;
			this.x = 0;
		}
		if (this.direction == -1 && this.x + this.WIDTH <= leftEdge) {
			this.version = randomVersion;
			this.x = rightEdge;
		}
		
		// Update bounding box
		this.updateBB();
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,
		(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
		this.WIDTH, this.HEIGHT, this.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.HEIGHT / 2), 70, 64);
		// this.idling.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		
		if (PARAMS.DEBUG) {
			// Draw 4 Bounding Box points to represent corners
			ctx.strokeStyle = 'Red';
			for (var i = 0; i < this.BB.points.length; i++) {
				ctx.beginPath();
				ctx.moveTo(this.BB.points[i].x - this.game.camera.x, this.BB.points[i].y - this.game.camera.y);
				ctx.lineTo(this.BB.points[(i-1 + 4) % 4].x - this.game.camera.x, this.BB.points[(i-1 + 4) % 4].y - this.game.camera.y);
				ctx.stroke();
			}
        }
	};
};
