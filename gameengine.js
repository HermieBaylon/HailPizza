// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
		this.background = [];
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
		/*
		// Mouse Controls
        this.click = null;
        this.mouse = null;
        this.wheel = null;
		*/
		// Keyboard Controls
		this.forward = false;
		this.backward = false;
		this.left = false;
		this.right = false;
		this.space = false;
		this.keyE = false;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
		this.blockExit = false;

        this.theScore = 0;

        // if (this.keyE) {
        //     ASSET_MANAGER.playAsset("./music/driving.mp3");
        // }
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
        this.score = 0;
        this.displayScore = document.getElementById('score');
    };

    getScore() {
        return this.theScore;
    }

    incrementScore() {
        this.theScore++;
    }

    start() {
		var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    // reset() {
    //     this.entities = [];
    //     this.score = 0;
    //     this.displayScore.innerHTML = 0;
    //     this.timer = new Timer();
    // };

    startInput() {
        var that = this;

		/*
		// Mouse Controls
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y };
        }
        this.ctx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            that.click = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("wheel", function (e) {
            //console.log(getXandY(e));
            that.wheel = e;
            //       console.log(e.wheelDelta);
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            //console.log(getXandY(e));
            that.rightclick = getXandY(e);
            e.preventDefault();
        }, false);
		*/
		// Keyboard Controls
		this.ctx.canvas.addEventListener("keydown", function (e) {
			//console.log("KeyDown");
			switch (e.code) {
				case "KeyW":
				case "ArrowUp":
					that.forward = true;
					break;
				case "KeyS":
				case "ArrowDown":
					that.backward = true;
					break;
				case "KeyA":
				case "ArrowLeft":
					that.left = true;
					break;
				case "KeyD":
				case "ArrowRight":
					that.right = true;
					break;
				case "Space":
					event.preventDefault();
					that.space = true;
					break;
				case "KeyE":
					that.keyE = true;
                    // if (that.keyE) {
                    //     ASSET_MANAGER.pauseAsset("./music/driving.mp3");
                    // }
                    //ASSET_MANAGER.playAsset("./music/DoorClose.mp3");
					break;
			}
		}, false);
		
		this.ctx.canvas.addEventListener("keyup", function (e) {
			//console.log("KeyUp");
			switch (e.code) {
				case "KeyW":
				case "ArrowUp":
					that.forward = false;
					break;
				case "KeyS":
				case "ArrowDown":
					that.backward = false;
					break;
				case "KeyA":
				case "ArrowLeft":
					that.left = false;
					break;
				case "KeyD":
				case "ArrowRight":
					that.right = false;
					break;
				case "Space":
					that.space = false;
					break;
				case "KeyE":
					that.keyE = false;
                    //ASSET_MANAGER.pauseAsset("./music/driving.mp3");
                    //ASSET_MANAGER.adjustVolumeOnPath(0, "./music/driving.mp3");
                    ASSET_MANAGER.playAsset("./music/DoorClose.mp3");
					break;
			}
		}, false);
		
		
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    addBackground(entity) {
        this.background.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.background.length; i++) {
			// Draw flag used to only load sprites within the viewport for performance.
			let drawFlag = true;
			if (Math.abs(this.player.x - this.background[i].x) > PARAMS.PAGE_WIDTH) drawFlag = false;
			if (Math.abs(this.player.y - this.background[i].y) > PARAMS.PAGE_HEIGHT) drawFlag = false;
			if (drawFlag) { this.background[i].draw(this.ctx); };
        }
        for (var i = 0; i < this.entities.length; i++) {
			// Draw flag used to only load sprites within the viewport for performance.
			let drawFlag = true;
			if (Math.abs(this.player.x - this.entities[i].x) > PARAMS.PAGE_WIDTH) drawFlag = false;
			if (Math.abs(this.player.y - this.entities[i].y) > PARAMS.PAGE_HEIGHT) drawFlag = false;
			if (this.entities[i] instanceof GoalPost) drawFlag = true;	// Edge case, goalpost controls it's own arrows
			if (this.entities[i] instanceof Driver) drawFlag = true;				// edge case, player
			if (drawFlag) { this.entities[i].draw(this.ctx); };
        }
		this.camera.draw(this.ctx);
    };

    update() {

		if (document.getElementById("myDebug").checked) {
			PARAMS.DEBUG = true;
		} else {
			PARAMS.DEBUG = false;
		}
		
        var entitiesCount = this.entities.length;
		if (!this.camera.title) {
			for (var i = 0; i < entitiesCount; i++) {
				var entity = this.entities[i];

				if (!entity.removeFromWorld) {
					entity.update();
				}
			}

			for (var i = this.entities.length - 1; i >= 0; --i) {
				if (this.entities[i].removeFromWorld) {
					this.entities.splice(i, 1);
				}
			}
		}
		this.camera.update();
		this.audio.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};
