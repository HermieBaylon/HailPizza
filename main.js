var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgtile00.png");
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

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');


	// Mission Start
	document.getElementByID("message").addEventListener("click", function (e) {
		if (currentChat.message.state) driver.state = currentChat.message.state;
	
	}};
	// Background
	var bgTiles = [];
	for (var i = 0; i <= 2; i++) {
		for (var j = 0; j <= 2; j++) {
			bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH));		
		}
	}
	
	var buildings = [];
	buildings.push(new Building(gameEngine, 32, 32));
	buildings.push(new Building(gameEngine, 544, 32));
	buildings.push(new Building(gameEngine, 1056, 32));

	// NPCs
	var npccars = [];
	npccars.push(new Car(gameEngine, 160, 288, 0, 0));
	npccars.push(new Car(gameEngine, 96, 322, 1, 0));

	var npcs = [];
	npcs.push(new Pedestrian(gameEngine, 224, 576, 1, 0));
	npcs.push(new Pedestrian(gameEngine, 544, 696, 0, 180));
	npcs.push(new Pedestrian(gameEngine, 224, 224, 1, 0));
	
	// Goal Markers
	var goals = [];
	goals.push(new StartMission(gameEngine, 192, 192));
	goals.push(new GoalPost(gameEngine, 128, 192));
	
	// Player
	var driver = new Driver(gameEngine, 224, 544);
	var drivercar = new DriverCar(gameEngine, 32, 288);

	///// Draw all entities 
	gameEngine.init(ctx);
	for (var i = 0; i < bgTiles.length; i++) {
		gameEngine.addEntity(bgTiles[i]);
	}
	for (var i = 0; i < goals.length; i++) {
		gameEngine.addEntity(goals[i]);
	}
	
	// NPCs
	for (var i = 0; i < npccars.length; i++)
	{
		gameEngine.addEntity(npccars[i]);
	}
	for (var i = 0; i < npcs.length; i++)
	{
		gameEngine.addEntity(npcs[i]);
	}
	
	// Player
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);
	
	// Obstacles
	for (var i = 0; i < buildings.length; i++) {
		gameEngine.addEntity(buildings[i]);
	}
	
	new SceneManager(gameEngine);
	new AudioManager(gameEngine);
	
	gameEngine.start();
});
