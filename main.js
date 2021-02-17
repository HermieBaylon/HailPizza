var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgtile00.png");
ASSET_MANAGER.queueDownload("./assets/bgtile01.png");
ASSET_MANAGER.queueDownload("./assets/bgtile02.png");
ASSET_MANAGER.queueDownload("./assets/streetlight.png");
ASSET_MANAGER.queueDownload("./assets/streetlight02.png");
ASSET_MANAGER.queueDownload("./assets/fence.png");
ASSET_MANAGER.queueDownload("./assets/building.png");

ASSET_MANAGER.queueDownload("./assets/npcs.png");
ASSET_MANAGER.queueDownload("./assets/npccars.png");

ASSET_MANAGER.queueDownload("./assets/driver.png");
ASSET_MANAGER.queueDownload("./assets/drivercar.png");

ASSET_MANAGER.queueDownload("./assets/exhaustflame.png");
ASSET_MANAGER.queueDownload("./assets/health.PNG");

ASSET_MANAGER.queueDownload("./assets/exclamation.png");
ASSET_MANAGER.queueDownload("./assets/goal.png");
ASSET_MANAGER.queueDownload("./assets/arrow01.png");
ASSET_MANAGER.queueDownload("./assets/arrow02.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Background
	var bgTiles = [];
	for (var i = 0; i <= 4; i++) {
		for (var j = 0; j <= 4; j++) {
			if (i == 3 && j == 3) {
				bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH, 2));
			} else {
				bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH, 1));
			}
		}
	}
	
	// Goal Markers
	var goals = [];
	var shop = null;
	
	// Buildings
	var buildings = [];
	for (var k = 0; k < 5; k++) {
		for (var l = 0; l < 5; l++) {
			for (var i = 0; i < 20 ; i++) {
				if ( (i % 8 == 0) || (i % 8 == 2) ) {
					for (var j = 0; j < 20 ; j++) {
						if ( (j % 8 == 1) || (j % 8 == 2) ) {
							buildings.push(new Building (gameEngine, 64 * i + (PARAMS.TILE_WIDTH * k), 64 * j + (PARAMS.TILE_WIDTH * l)));
						}
					}
				}
			}
			if (k != l)goals.push(new GoalPost(gameEngine, 64 * 9 + (PARAMS.TILE_WIDTH * k), 64 * 8 + (PARAMS.TILE_WIDTH * l)));
			if (k == 3 && l == 3) {
				shop = new StartMission(gameEngine, 64 * 9 + (PARAMS.TILE_WIDTH * k), 64 * 8 + (PARAMS.TILE_WIDTH * l));
			}
		}
	}
	

	// NPCs
	var npccars = [];
	// List of possible starting points
	// (StraightHorizontalLeft1) --> y = 415, 925, 1695, 2205, 2975, 3485
	npccars.push(new Car(gameEngine, 200, 415, Math.floor(Math.random() * 5), 0, 1));
	npccars.push(new Car(gameEngine, 500, 925, Math.floor(Math.random() * 5), 0, 1));
	npccars.push(new Car(gameEngine, 1000, 1695, Math.floor(Math.random() * 5), 0, 1));
	npccars.push(new Car(gameEngine, 1500, 2205, Math.floor(Math.random() * 5), 0, 1));
	npccars.push(new Car(gameEngine, 2000, 2975, Math.floor(Math.random() * 5), 0, 1));
	npccars.push(new Car(gameEngine, 2500, 3485, Math.floor(Math.random() * 5), 0, 1));
	// (StraightHorizontalRight1) --> y = 350, 860, 1630, 2104, 2910, 3420
	npccars.push(new Car(gameEngine, 100, 350, Math.floor(Math.random() * 5), 180, 1));
	npccars.push(new Car(gameEngine, 500, 860, Math.floor(Math.random() * 5), 180, 1));
	npccars.push(new Car(gameEngine, 1000, 1630, Math.floor(Math.random() * 5), 180, 1));
	npccars.push(new Car(gameEngine, 1500, 2104, Math.floor(Math.random() * 5), 180, 1));
	npccars.push(new Car(gameEngine, 2000, 2910, Math.floor(Math.random() * 5), 180, 1));
	npccars.push(new Car(gameEngine, 2500, 3420, Math.floor(Math.random() * 5), 180, 1));
	// (StraightVerticalUp2) --> x = 415, 925, 1695, 2205, 2975, 3485
	npccars.push(new Car(gameEngine, 415, 0, Math.floor(Math.random() * 5), 180, 2));
	npccars.push(new Car(gameEngine, 925, 500, Math.floor(Math.random() * 5), 180, 2));
	npccars.push(new Car(gameEngine, 1695, 1000, Math.floor(Math.random() * 5), 180, 2));
	npccars.push(new Car(gameEngine, 2205, 1500, Math.floor(Math.random() * 5), 180, 2));
	npccars.push(new Car(gameEngine, 2975, 2000, Math.floor(Math.random() * 5), 180, 2));
	npccars.push(new Car(gameEngine, 3485, 2500, Math.floor(Math.random() * 5), 180, 2));
	// // (StraightVerticalDown2) --> x = 350, 860, 1630, 2104, 2910, 3420
	npccars.push(new Car(gameEngine, 350, 0, Math.floor(Math.random() * 5), 0, 2));
	npccars.push(new Car(gameEngine, 860, 500, Math.floor(Math.random() * 5), 0, 2));
	npccars.push(new Car(gameEngine, 1630, 1000, Math.floor(Math.random() * 5), 0, 2));
	npccars.push(new Car(gameEngine, 2104, 1500, Math.floor(Math.random() * 5), 0, 2));
	npccars.push(new Car(gameEngine, 2910, 2000, Math.floor(Math.random() * 5), 0, 2));
	npccars.push(new Car(gameEngine, 3420, 2500, Math.floor(Math.random() * 5), 0, 2));
	// // (HorizontalToVerticalforward3) --> y = 480, 990, 1760, 2270, 3040, 3550
	npccars.push(new Car(gameEngine, 0, 480, Math.floor(Math.random() * 5), 0, 3));
	npccars.push(new Car(gameEngine, 0, 990, Math.floor(Math.random() * 5), 0, 3));
	npccars.push(new Car(gameEngine, 0, 1760, Math.floor(Math.random() * 5), 0, 3));
	npccars.push(new Car(gameEngine, 0, 2270, Math.floor(Math.random() * 5), 0, 3));
	npccars.push(new Car(gameEngine, 0, 3040, Math.floor(Math.random() * 5), 0, 3));
	npccars.push(new Car(gameEngine, 0, 3550, Math.floor(Math.random() * 5), 0, 3));
	// // (HorizontalToVerticalbackward3) --> y = 285, 795, 1565, 2075, 2845, 3355
	npccars.push(new Car(gameEngine, 3840, 285, Math.floor(Math.random() * 5), 180, 3));
	npccars.push(new Car(gameEngine, 3840, 795, Math.floor(Math.random() * 5), 180, 3));
	npccars.push(new Car(gameEngine, 3840, 1565, Math.floor(Math.random() * 5), 180, 3));
	npccars.push(new Car(gameEngine, 3840, 2075, Math.floor(Math.random() * 5), 180, 3));
	npccars.push(new Car(gameEngine, 3840, 2845, Math.floor(Math.random() * 5), 180, 3));
	npccars.push(new Car(gameEngine, 3840, 3355, Math.floor(Math.random() * 5), 180, 3));
	// // (VerticalToHorizontalDown4) --> X = 480, 990, 1760, 2270, 3040, 3550
	npccars.push(new Car(gameEngine, 480, 0, Math.floor(Math.random() * 5), 180, 4));
	npccars.push(new Car(gameEngine, 990, 0, Math.floor(Math.random() * 5), 180, 4));
	npccars.push(new Car(gameEngine, 1760, 0, Math.floor(Math.random() * 5), 180, 4));
	npccars.push(new Car(gameEngine, 2270, 0, Math.floor(Math.random() * 5), 180, 4));
	npccars.push(new Car(gameEngine, 3040, 0, Math.floor(Math.random() * 5), 180, 4));
	npccars.push(new Car(gameEngine, 3550, 0, Math.floor(Math.random() * 5), 180, 4));
	// // (VerticalToHorizontalbackward4) --> X = 285, 795, 1565, 2075, 2845, 3355
	npccars.push(new Car(gameEngine, 285, 3840, Math.floor(Math.random() * 5), 0, 4));
	npccars.push(new Car(gameEngine, 795, 3840, Math.floor(Math.random() * 5), 0, 4));
	npccars.push(new Car(gameEngine, 1565, 3840, Math.floor(Math.random() * 5), 0, 4));
	npccars.push(new Car(gameEngine, 2075, 3840, Math.floor(Math.random() * 5), 0, 4));
	npccars.push(new Car(gameEngine, 2845, 3840, Math.floor(Math.random() * 5), 0, 4));
	npccars.push(new Car(gameEngine, 3355, 3840, Math.floor(Math.random() * 5), 0, 4));

	var npcs = [];
	var population = 10;//100 Anything larger than 20 stops the game somehow
	var i = 0;
	for (i = 0; i < population; i++) {
		var randomX = Math.floor(Math.random() * 3000) + 0;
		var randomY = Math.floor(Math.random() * 3000) + 0;
		var randomMovementPattern = Math.floor(Math.random() * 4) + 1;
		npcs.push(new Pedestrian(gameEngine, randomX, randomY, 1, 0, randomMovementPattern));
	}
	
	// Player
	var driver = new Driver(gameEngine, 1856, 2020, 270);
	var drivercar = new DriverCar(gameEngine, 1472, 2020, 0);
	
	var shopArrow = new Arrow(gameEngine, driver.x, driver.y, shop.x, shop.y, 0);
	gameEngine.shopArrow = shopArrow;

	///// Draw all entities 
	gameEngine.init(ctx);
	for (var i = 0; i < bgTiles.length; i++) {
		gameEngine.addEntity(bgTiles[i]);
	}
	for (var i = 0; i < goals.length; i++) {
		gameEngine.addEntity(goals[i]);
	}
	gameEngine.goals = goals;
	gameEngine.addEntity(shop);
	
	
	// NPCs
	for (var i = 0; i < npcs.length; i++)
	{
		gameEngine.addEntity(npcs[i]);
	}
	for (var i = 0; i < npccars.length; i++)
	{
		gameEngine.addEntity(npccars[i]);
	}
	
	// Player
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);
	gameEngine.addEntity(shopArrow);
	
	// Obstacles
	for (var i = 0; i < buildings.length; i++) {
		gameEngine.addEntity(buildings[i]);
	}
	
	new SceneManager(gameEngine);
	new AudioManager(gameEngine);
	
	gameEngine.start();
});
