class Driver {
	constructor(game, x, y, direction) {
		// Constants
		this.RUN_SPEED = 3;
		this.PIVOT_SPEED = 3;
		this.JUMP_SPEED = 5;
		this.WIDTH = 19;	// Square animation box, HEIGHT == WIDTH
		this.DRAG = 0.5;
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.active = true;
		this.jumpFlag = false;
		this.onMission = false;
		this.game.driver = this;
		this.mission = null;
		this.pushSpeed = 0;
		this.pushDirection = this.direction;
		this.score = 0;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/driver.png");
		
		// Initialize bounding box
		this.updateBB();
		
		// Animations
		this.standing = new AngleAnimator(this.spritesheet, 0, 21,
			this.WIDTH, this.WIDTH, 5, 0.3, 1, this.direction, false, true);	// Standing
		this.pizzaStand = new AngleAnimator(this.spritesheet, 0, 60,
			this.WIDTH, this.WIDTH, 5, 0.3, 1, this.direction, false, true);	// Standing w/ Pizza
		this.running = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH, 12, 0.05, 1, this.direction, false, true);	// Running
		this.pizzaRun = new AngleAnimator(this.spritesheet, 0, 40,
			this.WIDTH, this.WIDTH, 12, 0.05, 1, this.direction, false, true);	// Running w/ Pizza
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
		this.BB = new BoundingBox(this.x - this.WIDTH / 2, this.y - this.WIDTH / 2, this.WIDTH, this.WIDTH);
		this.nextBB = new BoundingBox(this.x + (this.WIDTH * Math.cos((Math.PI / 180) * this.direction)) - this.WIDTH / 2,
											this.y + (this.WIDTH * Math.sin((Math.PI / 180) * this.direction)) - this.WIDTH / 2,
											this.WIDTH, this.WIDTH);
	}
	
	update() {

		var isWalking = this.game.forward || this.game.backward || this.game.left || this.game.right;

		if (isWalking && this.active) {
			ASSET_MANAGER.adjustVolumeOnPath(.5, "./music/walking.mp3");
			if (ASSET_MANAGER.getAsset("./music/walking.mp3").paused) {
				ASSET_MANAGER.playAsset("./music/walking.mp3");
			}
		} else {
			ASSET_MANAGER.pauseAsset("./music/walking.mp3");
		}

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
		
			// Handle pushes
			if (this.pushSpeed >= this.DRAG){
				this.pushSpeed -= this.DRAG;
			} else if (this.pushSpeed <= -this.DRAG){
				this.pushSpeed += this.DRAG;
			} else {
				this.pushSpeed = 0;
			}
			this.x += (this.pushSpeed * Math.cos((Math.PI / 180) * this.pushDirection));
			this.y += (this.pushSpeed * Math.sin((Math.PI / 180) * this.pushDirection));
		
			// Update bounding box
			this.updateBB();
		}
		
		// Collision
		var that = this;
		var car = null;

		this.game.entities.forEach(function (entity) {
			if (entity !== that && entity.BB && entity.BB.collide(that.BB)) {
				if (entity instanceof Building || entity instanceof ModularBuilding) {	// hit building
					if (entity.BB.top < that.BB.bottom && entity.BB.top > that.y) that.y = entity.BB.top - that.WIDTH / 2;
					if (entity.BB.bottom > that.BB.top && entity.BB.bottom < that.y) that.y = entity.BB.bottom + that.WIDTH / 2;
					if (entity.BB.left < that.BB.right && entity.BB.left > that.x) that.x = entity.BB.left - that.WIDTH / 2;
					if (entity.BB.right > that.BB.left && entity.BB.right < that.x) that.x = entity.BB.right + that.WIDTH / 2;
				}
				if (entity instanceof Pedestrian) {	// push npc
					// Calculate center to center angle
					let angle = Math.atan( Math.abs(that.y - entity.y) / Math.abs(that.x - entity.x) ) * (180 / Math.PI);
					if (entity.x - that.x >= 0 && entity.y - that.y >= 0) angle = (angle % 90); //Q1
					if (entity.x - that.x <  0 && entity.y - that.y >= 0) angle = (angle % 90) + 90; //Q2
					if (entity.x - that.x <  0 && entity.y - that.y <  0) angle = (angle % 90) + 180; //Q3
					if (entity.x - that.x >= 0 && entity.y - that.y <  0) angle = (angle % 90) + 270; //Q4
					// face npc away
					// move him forward
					console.log("move, foo");
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
				if (entity instanceof StartMission) {	// start mission
					if (!that.onMission) {
						that.startMission();
					}
				}
				if (entity instanceof GoalPost) {	// end mission
					if (that.onMission && entity.isVisible) {
						console.log("complete goal");
						entity.isVisible = false;
						that.goal();
					}
				}
			};
			// nextBB collisions
			if (entity !== that && entity.BB && entity.BB.collide(that.nextBB)) {
				if (entity instanceof DriverCar && that.game.keyE && that.active && !that.game.blockExit) {	// enter car
					that.game.camera.shopArrowFlag = true;
					if (that.game.camera.tutorialFlag1) {
						that.game.camera.displayText = "FOLLOW THE ARROW. GO TO THE SHOP.";
						that.game.shopArrow.isVisible = true;

					}
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
	
	startMission() {
		if (this.game.camera.tutorialFlag1) {
			this.game.camera.tutorialFlag1 = false;
			this.mission = new Mission (this.game);
			this.mission.keyFill("tut1");
		} else if (this.game.camera.tutorialFlag2) {
			this.game.camera.tutorialFlag2 = false;
			this.mission = new Mission (this.game);
			this.mission.keyFill("tut2");
		} else {
			this.mission = new Mission (this.game);
			this.mission.randomFill();
		}
		this.game.shopArrow.isVisible = false;
		this.game.camera.displayText = this.mission.startText;
		this.onMission = true;
		for (var i = 0; i < this.mission.numOrders; i ++) { // TODO make random
			this.randGoalPost();
		}
	}
	
	randGoalPost(){
		var rand = Math.floor(Math.random() * this.game.goals.length);
		console.log(rand);
		if (!this.game.goals[rand].isVisible) {
			this.game.goals[rand].isVisible = true;
		} else {
			this.randGoalPost();
		}
	}
	
	goal(){
		this.game.camera.displayText = this.mission.finishText1;
		var that = this;
		setTimeout(function () {
			that.game.camera.displayText = that.mission.finishText2;
		}, 6000)
		setTimeout(function () {
			that.game.camera.displayText = "";
		}, 12000)
		this.mission.numOrders--;
		// TODO decrement pizza counter
		if (this.mission.numOrders <= 0) this.endMission();
	}
	
	endMission() {
		this.game.shopArrow.isVisible = true;
		this.onMission = false;
		this.score += 1;
	}
	
	draw(ctx) {
		if ((this.game.forward || this.game.backward) && this.active){
			if (this.onMission) {
				this.pizzaRun.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
			} else {
				this.running.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
			}
			} else if (this.jumpFlag) {
			this.jumping.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.2);
		} else if (this.active) {
			if (this.onMission) {
				this.pizzaStand.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
			} else {
				this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
			}
		}
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.nextBB.x - this.game.camera.x, this.nextBB.y - this.game.camera.y, this.nextBB.width, this.nextBB.height);
        }
        this.healthBar.draw(ctx);
        this.game.score += this.score;
        this.game.displayScore.innerHTML = this.game.score;
	};
};
