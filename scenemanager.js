class SceneManager {
	constructor(game) {
		Object.assign(this, { game });
		
		this.game = game;
		this.game.camera = this;
		this.x = 0;
		this.y = 0;
		
		// HUD variables
		//
		
		// HUD animations
		//
		
		// Effects
	}
	
	update() { // TODO replace with constants
		let xMidpoint = 1024 / 2 - 19 / 2;
		let yMidpoint = 768 / 2 - 19 / 2;
		
		this.x = this.game.player.x - xMidpoint;
		this.y = this.game.player.y - yMidpoint;
	}
	
	draw(ctx) {
		let coordText = "(" + Math.floor(this.game.player.x) + ","
			+ Math.floor(this.game.player.y) + "); Facing " + this.game.player.direction;
		
        if (PARAMS.DEBUG){
			ctx.strokeStyle = 'White';
			ctx.font = "30px Arial";
			ctx.strokeText(coordText, 50, 50);
		}
	}
}