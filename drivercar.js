class DriverCar {
	constructor(game, x, y) {
		// Constants
		this.ACCELERATION = 2;
		this.FRICTION = 0.5;
		this.MAX_SPEED = 20;
		this.TURN_SPEED = 4;
		this.WIDTH = 70;
		this.HEIGHT = 64;
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = 0; // 0 - 359, with 0 = right facing
		this.currentSpeed = 0;
		this.active = false;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/drivercar.png");
		
		// Animations
		this.driving = new AngleAnimator(this.spritesheet, 426, 0,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);	// Driving
		this.enter = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.HEIGHT, 7, 0.5, 1, this.direction, false, true);	// Enter
		this.enter = new AngleAnimator(this.spritesheet, 426, 0,
			this.WIDTH, this.HEIGHT, 7, 0.5, 1, this.direction, true, true);	// Exit
		this.idle = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);	// idle
	};
	
	update() {
		if (this.game.enterexit){
			this.active = true;
		} else {
			this.active = false;
		}
		if (this.active) {
			// Affirm focus
			this.game.player = this;
			
			// Turning
			if (this.game.left && !this.game.space) {
				 if (this.currentSpeed > 0) {
					this.direction -= this.TURN_SPEED;
				 } else if (this.currentSpeed < 0) {
					this.direction += this.TURN_SPEED / 2;
				 }
			} else if (this.game.right && !this.game.space) {
				 if (this.currentSpeed > 0) {
					this.direction += this.TURN_SPEED;
				 } else if (this.currentSpeed < 0) {
					this.direction -= this.TURN_SPEED / 2;
				 }
			}
			// correct to range 0-359
			if (this.direction > 359) {
				this.direction = this.direction - 360;
			} else if (this.direction < 0) {
				this.direction = this.direction + 360;
			}
			// Acceleration/Deceleration
			if (this.game.space) {
				// animate tail light
				if (this.currentSpeed > 0) {
					this.currentSpeed -= this.ACCELERATION;
				} else if (this.currentSpeed < 0) {
					this.currentSpeed +=  this.ACCELERATION;
				}
			} else if (this.game.forward) {
				if (this.currentSpeed < this.MAX_SPEED) {
					this.currentSpeed += this.ACCELERATION;
				} else {
					this.currentSpeed = this.MAX_SPEED;
				}
			} else if (this.game.backward) {
				if (this.currentSpeed > -this.MAX_SPEED / 2) {
					this.currentSpeed -= this.ACCELERATION / 2;
				} else {
					this.currentSpeed = -this.MAX_SPEED / 2;
				}
			} else {
				if (this.currentSpeed > 0){
					this.currentSpeed -= this.FRICTION;
				} else if (this.currentSpeed < 0){
					this.currentSpeed += this.FRICTION;
				}
			}
			
			// Movement
			this.x += (this.currentSpeed * Math.cos((Math.PI / 180) * this.direction));
			this.y += (this.currentSpeed * Math.sin((Math.PI / 180) * this.direction));
		}
	};
	
	draw(ctx) {
		if (this.game.forward || this.game.backward){
			this.driving.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else {
			this.driving.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
	};
};