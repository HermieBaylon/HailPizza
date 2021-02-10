class Pedestrian {
	constructor(game, x, y, version, direction) {	// version is an integer in range 0 - 1
		// Constants
		this.RUN_SPEED = 1;
		this.PIVOT_SPEED = 3;
		this.WIDTH = 19;	// Square animation box, HEIGHT == WIDTH
		this.PAGE_WIDTH = 210;
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.version = version;
		this.dead = false;
		this.left = false;
		this.right = false;
		this.forward = false;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npcs.png");
		
		// Animations
		 this.standing = new AngleAnimator(this.spritesheet,
		 0, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 12, 0.3, 0, this.direction, false, true);	// Standing
		 this.walking = new AngleAnimator(this.spritesheet,
		 228, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 8, 0.3, 0, this.direction, false, true);	// Walking
		
		// TODO AI
		this.forward = true;
		var that = this;
		setTimeout(function () {
			that.right = true;
			console.log("ped start turning");
		}, 5200)
		setTimeout(function () {
			that.right = false;
			console.log("ped stop turning");
		}, 5700)
		setTimeout(function () {
			that.forward = false;
			console.log("ped stop walking");
		}, 8500)
		// END TODO
	};
	
	update() {
		// Turning
		if (this.left) {
			this.direction -= this.PIVOT_SPEED;
		} else if (this.right) {
			this.direction += this.PIVOT_SPEED;
		}
		// Normalize to range integers 0-359
		this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
		
		// Movement
		if (this.forward) {
				this.x += (this.RUN_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.RUN_SPEED * Math.sin((Math.PI / 180) * this.direction));
			}
		
		// Update bounding box
		this.updateBB();
		
		// death
		if (this.dead) {
			this.removeFromWorld = true;
		}
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.WIDTH);
	};
	
	draw(ctx) {
		if (this.forward){
			this.walking.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.WIDTH / 2), this.BB.width, this.BB.height);
        }
	};
};


class Car {
	constructor(game, x, y, version, direction) {	// version is an integer in range 0 - 5
		// Constants
		this.ACCELERATION = 0.1;
		this.FRICTION = 0.5;
		this.MAX_SPEED = 4;
		this.TURN_SPEED = 2;
		this.WIDTH = 70;
		this.HEIGHT = 64;
		this.PAGE_WIDTH = 210;
		this.BB_WIDTH = 60;
		this.BB_HEIGHT = 36;
		this.DRAG = 0.1;
		
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.currentSpeed = 0;
		this.forward = false;
		this.left = false;
		this.right = false;
		
		this.version = version;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npccars.png");
		
		this.driving = new AngleAnimator(this.spritesheet,
			(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);		// Driving
		
		// TODO AI decisions for driving.
		this.forward = true;
		var that = this;
		setTimeout(function () {
			that.right = true;
			console.log("start turning");
		}, 800)
		setTimeout(function () {
			that.right = false;
			console.log("stop turning");
		}, 1700)
		setTimeout(function () {
			that.forward = false;
			console.log("stop driving");
		}, 5500)
		// END TODO
		
		// Initialize bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new AngleBoundingBox(this.x, this.y, this.BB_WIDTH, this.BB_HEIGHT, this.direction);
	}
	
	update() {
		if (this.forward) {
			// Acceleration/Deceleration
			if (this.currentSpeed < this.MAX_SPEED) {	// Normal Acceleration
				this.currentSpeed += this.ACCELERATION;
			} else if (this.currentSpeed > this.MAX_SPEED){ // Overspeeding
				this.currentSpeed -= this.ACCELERATION / 2;
			} else {
				this.currentSpeed = this.MAX_SPEED;
			}
			
			// Turning
			if (this.left) {			// Turning Left
				this.direction -= this.TURN_SPEED * (this.currentSpeed / this.MAX_SPEED);
			} else if (this.right) {	// Turning Right
				this.direction += this.TURN_SPEED * (this.currentSpeed / this.MAX_SPEED);
			}
		} else if (this.currentSpeed >= this.DRAG){		// Drag
			this.currentSpeed -= this.DRAG;
		} else if (this.currentSpeed <= -this.DRAG){
			this.currentSpeed += this.DRAG;
		} else {
			this.currentSpeed = 0;
		}
		
		// Normalize to range integers 0-359
		this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
		
		// Movement
		this.x += (this.currentSpeed * Math.cos((Math.PI / 180) * this.direction));
		this.y += (this.currentSpeed * Math.sin((Math.PI / 180) * this.direction));
		
		// Update bounding box
		this.updateBB();
		
		// Collision
		var that = this;
		this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
				if (entity instanceof Pedestrian) { // squish pedestrians
						entity.dead = true;
						console.log("dead");
					}
			};
		});
	};
	
	draw(ctx) {
		this.driving.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		
		//ctx.drawImage(this.spritesheet,
		//(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
		//this.WIDTH, this.HEIGHT, this.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.HEIGHT / 2), 70, 64);
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
