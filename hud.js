class HealthBar{
	constructor( agent ) {
		Object.assign(this, { agent });
		// TODO
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/health.PNG");
	};

	update(){
	};

    draw(ctx){

        ctx.drawImage(this.spritesheet, 6 * this.agent.healthPoint, 544, 78.5, 43, 10, 10, 150, 20);
    }
};