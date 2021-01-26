var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgproto.png");
ASSET_MANAGER.queueDownload("./assets/driver.png");
ASSET_MANAGER.queueDownload("./assets/drivercar.png");
ASSET_MANAGER.queueDownload("./assets/streetlight.png");
ASSET_MANAGER.queueDownload("./assets/streetlight02.png");
ASSET_MANAGER.queueDownload("./assets/fence.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house1.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house2.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house3.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house4.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house5.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house6.png");
ASSET_MANAGER.queueDownload("./assets/buildings/house7.png");
ASSET_MANAGER.queueDownload("./assets/buildings/pool.png");
ASSET_MANAGER.queueDownload("./assets/buildings/court.jpg");
ASSET_MANAGER.queueDownload("./assets/buildings/building.png");
ASSET_MANAGER.queueDownload("./assets/buildings/parasol.png");
ASSET_MANAGER.queueDownload("./assets/buildings/bench.png");
ASSET_MANAGER.queueDownload("./assets/buildings/bench2.png");
ASSET_MANAGER.queueDownload("./assets/buildings/roof.png");
//ASSET_MANAGER.queueDownload("./assets/pedestrian01.png");
//ASSET_MANAGER.queueDownload("./assets/pedestrian02.png");
//ASSET_MANAGER.queueDownload("./assets/pedestrian03.png");
//ASSET_MANAGER.queueDownload("./assets/car01.png");
//ASSET_MANAGER.queueDownload("./assets/car02.png");
//ASSET_MANAGER.queueDownload("./assets/car03.png");
//ASSET_MANAGER.queueDownload("./assets/building01.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Environment
	var bg = new Background(gameEngine, 0, 0);	
	var fence = new Fence(gameEngine, 128, 600);
	var fence2 = new Fence(gameEngine, 128-65, 600);	
	var fence3 = new Fence(gameEngine, 128+65, 600);
	var fence4 = new Fence(gameEngine, 128-2*65, 600);			
	var streetlight = new Streetlight(gameEngine, 116, 104);
	var house1a = new House1(gameEngine, 0, 0);
	var house1b = new House1(gameEngine, 530, 0);
	var house2a = new House2(gameEngine, 180, 580);
	var house3a = new House3(gameEngine, 180, 10);
	var house3b = new House3(gameEngine, 180, 400);
	var house4a = new House4(gameEngine, 330, 0);
	var house4b = new House4(gameEngine, 370, 600);
	var house4c = new House4(gameEngine, 540, 600);
	var house4d = new House4(gameEngine, 320, 260);
	var house5a = new House5(gameEngine, 700, 0);
	var house6a = new House6(gameEngine, 880, 20);
	var house7a = new House7(gameEngine, 800, 430);
	var pool = new Pool(gameEngine, 100, 380);
	var court = new Court(gameEngine, 800, 325);
	var building = new Building(gameEngine, 10, 275);
	var parasol = new Parasol(gameEngine, 680, 370);
	var parasol2 = new Parasol(gameEngine, 145, 280);
	var bench = new Bench(gameEngine, 200, 280);
	var benchb = new Bench(gameEngine, 100, 380);
	var benchc = new Bench(gameEngine, 100, 280);
	var bench2 = new Bench2(gameEngine, 200, 330);
	var bench2b = new Bench2(gameEngine, 100, 430);
	var bench2c = new Bench2(gameEngine, 100, 330);
	var roof = new Roof(gameEngine, 215, 295);
	var roofb = new Roof(gameEngine, 115, 395);
	var roofc = new Roof(gameEngine, 115, 295);

	// NPCs
	
	// Player
	var driver = new Driver(gameEngine, 462, 384);
	var drivercar = new DriverCar(gameEngine, 562, 384);

	gameEngine.init(ctx);
	
	// Envoronment
	gameEngine.addEntity(bg);
	gameEngine.addEntity(fence);
	gameEngine.addEntity(fence2);
	gameEngine.addEntity(fence3);
	gameEngine.addEntity(fence4);
	// gameEngine.addEntity(streetlight);
	gameEngine.addEntity(house1a);
	gameEngine.addEntity(house1b);
	gameEngine.addEntity(house2a);
	gameEngine.addEntity(house3a);
	//gameEngine.addEntity(house3b);
	gameEngine.addEntity(house4a);
	gameEngine.addEntity(house4b);
	gameEngine.addEntity(house4c);
	gameEngine.addEntity(house4d);
	gameEngine.addEntity(house5a);
	gameEngine.addEntity(house6a);
	gameEngine.addEntity(house7a);
	gameEngine.addEntity(pool);
	gameEngine.addEntity(court);
	gameEngine.addEntity(building);
	gameEngine.addEntity(parasol);
	gameEngine.addEntity(bench);
	gameEngine.addEntity(bench2);
	gameEngine.addEntity(roof);
	// gameEngine.addEntity(benchb);
	// gameEngine.addEntity(bench2b);
	// gameEngine.addEntity(roofb);
	gameEngine.addEntity(benchc);
	gameEngine.addEntity(bench2c);
	gameEngine.addEntity(roofc);
	gameEngine.addEntity(parasol2);
	
	// NPCs
	
	// Player
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);

	gameEngine.start();
});
