class Driver {
	constructor(game, x, y, direction) {
		// Constants
		this.RUN_SPEED = 3;
		this.PIVOT_SPEED = 3;
		this.JUMP_SPEED = 5;
		this.WIDTH = 19;	// Square animation box, HEIGHT == WIDTH
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.active = true;
		this.jumpFlag = false;
		this.game.driver = this;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/driver.png");
		
		// Initialize bounding box
		this.updateBB();
		
		// Animations
		this.standing = new AngleAnimator(this.spritesheet, 0, 21,
			this.WIDTH, this.WIDTH, 5, 0.3, 1, this.direction, false, true);	// Standing
		this.running = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH, 12, 0.05, 1, this.direction, false, true);	// Running
		this.jumping = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH, 12, 0.7, 1, this.direction, false, true);	// Jumping
			
		// Assign initial focus
		this.game.player = this;

		// HUD avariables
		this.FULL_HEALTH_POINT = 6;
		this.healthPoint = this.FULL_HEALTH_POINT;
		this.healthBar = new HealthBar(this);
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.WIDTH);
		this.nextBB = new BoundingBox(this.x + (this.WIDTH * Math.cos((Math.PI / 180) * this.direction)),
											this.y + (this.WIDTH * Math.sin((Math.PI / 180) * this.direction)),
											this.WIDTH, this.WIDTH);
	}
	
	update() {
		if (this.active) {
			// Affirm focus
			this.game.player = this;
			
			// Jumping
			var that = this;
			if (this.game.space && !this.jumpFlag) {
				this.jumpFlag = true;
				setTimeout(function () {
					that.jumpFlag = false;
					//console.log('Jump End');
				}, 300)
			}
			
			// Turning
			if (this.game.left && !this.jumpFlag) {
				this.direction -= this.PIVOT_SPEED;
			} else if (this.game.right && !this.jumpFlag) {
				this.direction += this.PIVOT_SPEED;
			}
			// Normalize to range integers 0-359
			this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
			// Movement
			if(this.jumpFlag){
				this.x += (this.JUMP_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.JUMP_SPEED * Math.sin((Math.PI / 180) * this.direction));
			} else if (this.game.forward) {
				this.x += (this.RUN_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.RUN_SPEED * Math.sin((Math.PI / 180) * this.direction));
			} else if (this.game.backward) {
				this.x -= ((this.RUN_SPEED / 2) * Math.cos((Math.PI / 180) * this.direction));
				this.y -= ((this.RUN_SPEED / 2) * Math.sin((Math.PI / 180) * this.direction));
			}
		
			// Update bounding box
			this.updateBB();
		}
		
		// Collision
		var that = this;
		var car = null;

		this.game.entities.forEach(function (entity) {
			if (entity !== that && entity.BB && entity.BB.collide(that.BB)) {
				if (entity instanceof Building) {	// hit building
					if(that.jumpFlag){
						that.jumpFlag = false;
						that.x -= (that.JUMP_SPEED * Math.cos((Math.PI / 180) * that.direction));
						that.y -= (that.JUMP_SPEED * Math.sin((Math.PI / 180) * that.direction));
					} else if (that.game.forward) {
						that.x -= (that.RUN_SPEED * Math.cos((Math.PI / 180) * that.direction));
						that.y -= (that.RUN_SPEED * Math.sin((Math.PI / 180) * that.direction));
					} else if (that.game.backward) {
						that.x += (that.RUN_SPEED * Math.cos((Math.PI / 180) * that.direction));
						that.y += (that.RUN_SPEED * Math.sin((Math.PI / 180) * that.direction));
					}
					//console.log("boom");
				}
				if (entity instanceof Pedestrian) {	// push npc
					// face npc away
					// move him forward
					//console.log("move, foo");
				}
				if (entity instanceof Car) {	// damaged by car
					// Calculate center to center angle
					let angle = Math.atan( Math.abs(that.y - entity.y) / Math.abs(that.x - entity.x) ) * (180 / Math.PI);
					if (entity.x - that.x >= 0 && entity.y - that.y >= 0) angle = (angle % 90); //Q1
					if (entity.x - that.x <  0 && entity.y - that.y >= 0) angle = (angle % 90) + 90; //Q2
					if (entity.x - that.x <  0 && entity.y - that.y <  0) angle = (angle % 90) + 180; //Q3
					if (entity.x - that.x >= 0 && entity.y - that.y <  0) angle = (angle % 90) + 270; //Q4
					that.x -= (10 * Math.cos((Math.PI / 180) * angle));
					that.y -= (10 * Math.sin((Math.PI / 180) * angle));
					that.healthPoint -= 1;
					//console.log("damaged (car)" + angle);
				}
			};
			// nextBB collisions
			if (entity !== that && entity.BB && entity.BB.collide(that.nextBB)) {
				if (entity instanceof DriverCar && that.game.keyE && that.active && !that.game.blockExit) {	// enter car
					that.game.camera.tutorialFlag1 = false;
					that.game.camera.shopArrowFlag = true;
					that.game.camera.displayText = "FOLLOW THE ARROW. GO TO THE SHOP." + " (" + that.game.shop.x + "," + that.game.shop.y + ")";
					that.game.camera.controlText = "W/Up: Accelerate. S/Down: Reverse. A,D/Left,Right: Turn. E: Exit Vehicle. Space: Brakes. Power Slide for a boost.";
					that.x = -1000;	// arbitrary offmap location
					that.y = -1000;
					that.updateBB();
					that.game.blockExit = true;
					that.active = false;
					entity.active = true;
					setTimeout(function () {
						that.game.blockExit = false;
					}, 500)
				}
			}
		});
		
		// Keep in bounds
		if (this.BB.left < 0) {	// Left
			this.currentSpeed = 0;
			this.x = this.WIDTH;
		}
		if (this.BB.top < 0) {	// Top
			this.currentSpeed = 0;
			this.y = this.WIDTH;
		}
		if (this.BB.right > PARAMS.MAP_WIDTH) {	// Right
			this.currentSpeed = 0;
			this.x = PARAMS.MAP_WIDTH - this.WIDTH;
		}
		if (this.BB.bottom > PARAMS.MAP_HEIGHT) {	// Bottom
			this.currentSpeed = 0;
			this.y = PARAMS.MAP_HEIGHT - this.WIDTH;
		}
		this.updateBB();
	};
	
	draw(ctx) {
		if ((this.game.forward || this.game.backward) && this.active){
			this.running.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else if (this.jumpFlag) {
			this.jumping.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.2);
		} else if (this.active) {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x - (this.WIDTH / 2), this.BB.y - this.game.camera.y - (this.WIDTH / 2), this.BB.width, this.BB.height);
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.nextBB.x - this.game.camera.x - (this.WIDTH / 2), this.nextBB.y - this.game.camera.y - (this.WIDTH / 2), this.nextBB.width, this.nextBB.height);
			
        }
        this.healthBar.draw(ctx);
	};
};
