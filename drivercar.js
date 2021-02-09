class DriverCar {
	constructor(game, x, y) {
		// Constants
		this.WIDTH = 70;
		this.HEIGHT = 64;
		this.BB_WIDTH = 60;
		this.BB_HEIGHT = 36;
		
		this.ACCELERATION = 0.5;
		this.REVERSE = this.ACCELERATION / 2;
		this.MAX_SPEED = 20;
		this.MAX_REVERSE = this.MAX_SPEED / 2;
		this.TURN_SPEED = 4;
		this.DRIFT_TURN_SPEED = this.TURN_SPEED * (1);
		this.DRAG = 0.5;
		this.TURN_DRAG = this.ACCELERATION + 0.1;
		this.BRAKE_DRAG = this.DRAG / 2;
		this.LOG_LENGTH = 10;

		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = 30; // 0 - 359, with 0 = right facing
		this.directionLog = [];
		this.currentSpeed = 0;
		this.driftFlag = false;
		this.driftSpeed = this.currentSpeed;
		this.driftDirection = this.direction;
		this.burnoutFlag = false;
		this.active = false;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/drivercar.png");
		
		// Initialize bounding box
		this.updateBB();
		
		// Animations
		this.driving = new AngleAnimator(this.spritesheet, 426, 0,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);		// Driving
		this.entering = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.HEIGHT, 7, 0.5, 1, this.direction, false, true);	// Enter
		this.exiting = new AngleAnimator(this.spritesheet, 426, 0,
			this.WIDTH, this.HEIGHT, 7, 0.5, 1, this.direction, true, true);	// Exit
		this.idling = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);		// idle
		this.braking = new AngleAnimator(this.spritesheet, 0, this.HEIGHT,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);		// brakes
			
		this.flame = new AngleAnimator(ASSET_MANAGER.getAsset("./assets/exhaustflame.png"), 0, 0,
			210, 210, 5, 0.1, 0, (this.direction + 180) % 360, false, true);	// Exhaust Flame
	};
	
	updateBB(){
		this.BB = new AngleBoundingBox(this.x, this.y, this.WIDTH, this.HEIGHT, this.direction);
	}
	
	update() {
		if (this.game.enterexit){
			this.active = true;
		} else {
			this.active = false;
		}
		if (this.active) {
			// Affirm focus
			this.game.player = this;
			
			// Drifting
			if (!this.driftFlag && this.game.space) {			// Initiate Drift
				this.driftFlag = true;
				this.driftSpeed = this.currentSpeed;
				this.driftDirection = this.direction;
			} else if (this.driftFlag && !this.game.space) {	// End Drift TODO continue drift if over 45 degrees until stopped.
				if (this.game.forward && (Math.abs(this.driftDirection - this.direction) > 45)) {
					this.currentSpeed += this.driftSpeed;
				}
				this.driftDirection = this.direction;
				this.driftFlag = false;
			}
			
			// Turning
			let difference = 0;	// Log direction for reference in direction correction
			if (this.directionLog.length > this.LOG_LENGTH) difference = (this.directionLog.shift() - this.direction);
			if (difference > 180) difference -= 360;
			if (difference < -180) difference += 360;
			this.directionLog.push(this.direction);
			
			if (this.game.left && !this.game.right) {									// Turning Left
				if (this.driftFlag) {
					this.direction -= this.DRIFT_TURN_SPEED * (this.driftSpeed / this.MAX_SPEED);
				} else {
					this.direction -= this.TURN_SPEED * (this.currentSpeed / this.MAX_SPEED);
					if (this.currentSpeed > (this.MAX_SPEED * (3 / 4))) this.currentSpeed -= this.DRAG;
				}
			} else if (!this.game.left && this.game.right) {							// Turning Right
				if (this.driftFlag) {
					this.direction += this.DRIFT_TURN_SPEED * (this.driftSpeed / this.MAX_SPEED);
				} else {
					this.direction += this.TURN_SPEED * (this.currentSpeed / this.MAX_SPEED);
					if (this.currentSpeed > (this.MAX_SPEED * (3 / 4))) this.currentSpeed -= this.DRAG;
				}
			} else {																	// Direction correction to roads TODO only when on road
				if ((this.direction % 90) <= this.TURN_SPEED)  this.direction -= (this.direction % 90);
				if (90 - (this.direction % 90) <= this.TURN_SPEED)  this.direction += 90 - (this.direction % 90);
				if ((difference > 0) && (this.direction % 90) < 30) {
					this.direction -= this.TURN_SPEED * (this.currentSpeed / this.MAX_SPEED);
				}
				if ((difference < 0) && 90 - (this.direction % 90) < 30) {
					this.direction += this.TURN_SPEED * (this.currentSpeed / this.MAX_SPEED);
				}
			}
			
			// Normalize to range integers 0-359
			this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
			
			// Acceleration/Deceleration
			if (this.game.space) {									// Brakes
				if (this.currentSpeed > 0) {
					this.currentSpeed -= this.ACCELERATION;
				} else if (this.currentSpeed < 0) {
					this.currentSpeed +=  this.ACCELERATION;
				}
				if (this.driftSpeed >= this.DRAG){					// Drifting
					this.driftSpeed -= this.DRAG;
				} else if (this.driftSpeed <= -this.DRAG){
					this.driftSpeed += this.DRAG;
				} else {
					this.driftSpeed = 0;
				}
			} else if (this.game.forward && !this.game.backward) {	// Accelerate
				if (this.currentSpeed < this.MAX_SPEED) {	// Normal Acceleration
					this.currentSpeed += this.ACCELERATION;
				} else if (this.currentSpeed > this.MAX_SPEED){ // Overspeeding
					this.currentSpeed -= this.ACCELERATION / 2;
				} else {
					this.currentSpeed = this.MAX_SPEED;
				}
			} else if (!this.game.forward && this.game.backward) {	// Decelerate
				if (this.currentSpeed > -this.MAX_SPEED / 2) {
					this.currentSpeed -= this.ACCELERATION / 2;
				} else {
					this.currentSpeed = -this.MAX_SPEED / 2;
				}
			} else {												// Drag
				if (this.currentSpeed >= this.DRAG){
					this.currentSpeed -= this.DRAG;
				} else if (this.currentSpeed <= -this.DRAG){
					this.currentSpeed += this.DRAG;
				} else {
					this.currentSpeed = 0;
				}
			} 
		} else {
			if (this.currentSpeed >= this.DRAG){		// Uncontrolled, Drag
				this.currentSpeed -= this.DRAG;
			} else if (this.currentSpeed <= -this.DRAG){
				this.currentSpeed += this.DRAG;
			} else {
				this.currentSpeed = 0;
			}
		}
		
		// Movement
		if (this.driftFlag) {
			this.x += (this.driftSpeed * Math.cos((Math.PI / 180) * this.driftDirection));
			this.y += (this.driftSpeed * Math.sin((Math.PI / 180) * this.driftDirection));
		} else {
			this.x += (this.currentSpeed * Math.cos((Math.PI / 180) * this.direction));
			this.y += (this.currentSpeed * Math.sin((Math.PI / 180) * this.direction));
		}
		
		// Update bounding box
		this.updateBB();
	};
	
	draw(ctx) {
		// Car animation
		if (!this.active) {
			this.idling.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else if (this.game.space){
			this.braking.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else {
			this.driving.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		// Burnout animation
		if ((this.currentSpeed > this.MAX_SPEED + 2) && !this.burnoutFlag) {
			this.burnoutFlag = true;
			console.log("BURNOUT, Speed: " + this.currentSpeed);
		} else if (!(this.currentSpeed > this.MAX_SPEED) && this.burnoutFlag) {
			this.burnoutFlag = false;
			console.log("end burnout.");
		}
		
		if (this.burnoutFlag) {
			this.flame.drawFrame(this.game.clockTick, (this.direction + 270) % 360, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		
		if (PARAMS.DEBUG) {
			/* TODO
			let radians = this.direction * (Math.PI / 180);

			ctx.save();

			ctx.beginPath();
			ctx.translate( (this.WIDTH / 2), (this.HEIGHT / 2) );
			ctx.rotate(radians);

			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x - this.game.camera.x - (this.WIDTH / 1),
							this.BB.y - this.game.camera.y - (this.HEIGHT / 1),
								this.BB.width, this.BB.height);
			
			ctx.restore();
			
			// HUD
			ctx.strokeStyle = 'White';
			ctx.font = "30px Arial";
			let BBCoordText = "(" + Math.floor(this.BB.x) + ","
				+ Math.floor(this.BB.y) + "); Facing " + this.BB.direction;
				ctx.strokeText(BBCoordText, 50, 90);
		} */
	};
};