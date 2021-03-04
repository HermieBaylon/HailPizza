var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgtile00.png");
ASSET_MANAGER.queueDownload("./assets/bgtile01.png");
ASSET_MANAGER.queueDownload("./assets/bgtile02.png");
ASSET_MANAGER.queueDownload("./assets/streetlight.png");
ASSET_MANAGER.queueDownload("./assets/streetlight02.png");
ASSET_MANAGER.queueDownload("./assets/fence.png");
ASSET_MANAGER.queueDownload("./assets/building.png");

ASSET_MANAGER.queueDownload("./assets/ground.png");

ASSET_MANAGER.queueDownload("./assets/road/00-00.png");
ASSET_MANAGER.queueDownload("./assets/road/01-00.png");
ASSET_MANAGER.queueDownload("./assets/road/01-01.png");
ASSET_MANAGER.queueDownload("./assets/road/01-02.png");
ASSET_MANAGER.queueDownload("./assets/road/01-03.png");
ASSET_MANAGER.queueDownload("./assets/road/01-04.png");
ASSET_MANAGER.queueDownload("./assets/road/01-05.png");
ASSET_MANAGER.queueDownload("./assets/road/02-00.png");
ASSET_MANAGER.queueDownload("./assets/road/02-01.png");
ASSET_MANAGER.queueDownload("./assets/road/02-02.png");
ASSET_MANAGER.queueDownload("./assets/road/02-03.png");
ASSET_MANAGER.queueDownload("./assets/road/03-00.png");
ASSET_MANAGER.queueDownload("./assets/road/03-01.png");
ASSET_MANAGER.queueDownload("./assets/road/03-02.png");
ASSET_MANAGER.queueDownload("./assets/road/03-03.png");

ASSET_MANAGER.queueDownload("./assets/roof/00-00.png");
ASSET_MANAGER.queueDownload("./assets/roof/01-00.png");
ASSET_MANAGER.queueDownload("./assets/roof/01-01.png");
ASSET_MANAGER.queueDownload("./assets/roof/01-02.png");
ASSET_MANAGER.queueDownload("./assets/roof/01-03.png");
ASSET_MANAGER.queueDownload("./assets/roof/01-04.png");
ASSET_MANAGER.queueDownload("./assets/roof/01-05.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-00.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-01.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-02.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-03.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-04.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-05.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-06.png");
ASSET_MANAGER.queueDownload("./assets/roof/02-07.png");
ASSET_MANAGER.queueDownload("./assets/roof/03-00.png");
ASSET_MANAGER.queueDownload("./assets/roof/03-01.png");
ASSET_MANAGER.queueDownload("./assets/roof/03-02.png");
ASSET_MANAGER.queueDownload("./assets/roof/03-03.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-00.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-01.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-02.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-03.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-04.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-05.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-06.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-07.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-08.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-09.png");
ASSET_MANAGER.queueDownload("./assets/roof/04-10.png");

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

//sound effects
ASSET_MANAGER.queueDownload("./music/DoorClose.mp3");
ASSET_MANAGER.queueDownload("./music/driving.mp3");
ASSET_MANAGER.queueDownload("./music/CarImpact.mp3");
ASSET_MANAGER.queueDownload("./music/CarImpact2.mp3");
ASSET_MANAGER.queueDownload("./music/dead.mp3");

ASSET_MANAGER.downloadAll(function () {

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Background
	var roads = [];
	var ground = [];
	/*var bgTiles = [];
	for (var i = 0; i <= 4; i++) {
		for (var j = 0; j <= 4; j++) {
			if (i == 3 && j == 3) {
				bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH, 2));
			} else {
				bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH, 1));
			}
		}
	}*/
	// Intersection grid spaces that will determine when cars turn. direction variable is the new goalDirection cars are given.
	var intersections = [];
	intersections.push(new Intersection(gameEngine,PARAMS.TILE_WIDTH * 2 + PARAMS.GRID_WIDTH * 3, PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH, 270));
	intersections.push(new Intersection(gameEngine,PARAMS.TILE_WIDTH * 2 + PARAMS.GRID_WIDTH * 1, PARAMS.TILE_WIDTH + 4 * PARAMS.GRID_WIDTH, 90));
	
	// Goal Markers
	var goals = [];
	var shop = null;
	
	// Buildings
	var buildings = [];
	/*for (var k = 0; k < 5; k++) {
		for (var l = 0; l < 5; l++) {
			if (k != l)goals.push(new GoalPost(gameEngine, PARAMS.GRID_WIDTH * 9 + (PARAMS.TILE_WIDTH * k), PARAMS.GRID_WIDTH * 8 + (PARAMS.TILE_WIDTH * l)));
		}
	}*/
	
	// curvy road across map
	let tileLayout = []
	
	tileLayout.push(     [  [1,1,0,0,3,3,3,3,0,0,1,1,0,0,0,0,0,0,1,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,0,0,0,0,0,0,1,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,0,0,0,0,0,0,1,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,0,0,0,0,1,1,1,1],
							[1,1,0,0,3,3,3,3,0,0,0,0,0,0,0,0,1,1,1,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,0,0,0,0,1,1,1,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,0,0,1,0,0,0,0,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,0,2,0,0,0,0,0,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,1,1,1,1,1,0,0,1],
							[1,1,0,0,3,3,3,3,0,0,1,1,1,1,1,1,1,0,0,1],
							[1,1,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,1,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,1,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,1],
							[1,1,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,1],
							[1,1,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,1],
							[1,1,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,1],
							[1,1,0,2,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,1],
							[1,1,1,1,1,1,1,1,1,1,1,0,3,3,3,3,0,1,1,1],
							[1,1,1,1,1,1,1,1,1,1,1,0,3,3,3,3,0,1,1,1],
							[1,1,1,1,1,1,1,1,1,1,1,0,3,3,3,3,0,1,1,1]  ]);
	// U shape road
	tileLayout.push(     [  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
							[0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
							[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
							[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
							[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
							[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
							[0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,0,0,1,1,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,0,0,1,1,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,0,0,1,1,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,0,0,1,1,0,3,3,0],
							[0,3,3,0,1,1,2,0,0,0,0,0,0,2,1,1,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,0,0,1,1,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,0,0,1,1,0,3,3,0],
							[1,3,3,1,1,1,0,0,0,0,0,0,0,0,1,1,1,3,3,1],
							[1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1]  ]);
	// vertical roads
	tileLayout.push(     [  [1,1,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,1,0,0,1,0,3,3,3,3,0,1,1],
							[1,1,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,1,1,1],
							[1,1,1,3,3,3,3,0,0,0,0,0,1,3,3,3,3,1,1,1]  ]);
	// Horizontal roads across map
	tileLayout.push(     [  [0,3,3,3,3,3,3,0,0,0,0,0,3,3,3,3,3,3,3,0],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0],
							[0,3,3,0,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,0],
							[0,3,3,0,1,1,1,1,1,1,1,1,1,1,1,1,0,3,3,0],
							[0,3,3,0,1,1,0,2,0,0,0,0,0,0,1,1,0,3,3,0],
							[0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0],
							[0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0],
							[0,3,3,0,1,1,0,0,0,0,0,0,2,0,1,1,0,3,3,0],
							[0,3,3,0,1,1,1,1,1,1,1,1,1,1,1,1,0,3,3,0],
							[0,3,3,0,1,1,1,1,1,1,1,1,1,1,1,1,0,3,3,0],
							[0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[0,0,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,0,0]  ]);
	// no roads
	tileLayout.push(     [  [1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1],
							[1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,1,0,0,1],
							[1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,1],
							[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
							[1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,2,0,0,1],
							[1,0,0,0,0,2,0,0,0,0,0,1,0,0,1,1,0,0,0,1],
							[1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1],
							[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,2,0,0,0,1],
							[1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
							[1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1]  ]);
	 // vertical roads in center of map
	tileLayout.push(     [  [1,1,1,1,1,1,1,1,0,3,3,0,1,1,1,1,1,1,1,1],
							[1,0,0,0,0,0,0,1,0,3,3,0,1,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,1,0,3,3,0,1,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
							[1,0,2,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
							[1,0,1,1,1,1,1,1,0,3,3,0,1,1,1,1,1,1,0,1],
							[1,0,1,1,1,1,1,1,0,3,3,0,1,1,1,1,1,1,0,1],
							[0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
							[0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,2,0,0,0,0],
							[1,0,1,1,1,1,1,1,0,3,3,0,1,1,1,1,1,1,0,1],
							[1,0,1,1,1,1,1,1,0,3,3,0,1,1,1,1,1,1,0,1],
							[1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,1,0,3,3,0,1,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,1,0,3,3,0,1,0,0,0,0,0,0,1],
							[1,1,1,1,1,1,1,1,0,3,3,0,1,1,1,1,1,1,1,1]  ]);
	// shop tile, 1 horizontal road to shop
	tileLayout.push(     [  [1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
							[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
							[3,3,3,3,3,3,0,0,1,1,1,1,0,0,3,3,3,3,3,3],
							[3,3,3,3,3,3,0,0,1,1,1,1,0,0,3,3,3,3,3,3],
							[3,3,3,3,3,3,0,0,1,1,1,1,0,0,3,3,3,3,3,3],
							[3,3,3,3,3,3,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
							[0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
							[1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1],
							[1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1],
							[1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1],
							[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
							[1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1]  ]);
	
	let mapTileCoordsA = [];
	let mapTileCoordsB = [];
	// Tile 1
	mapTileCoordsA.push([0,4]);
	mapTileCoordsB.push([0,4]);
	// Tile 2
	mapTileCoordsA.push([1,3]);
	mapTileCoordsB.push([0,4]);
	// Tile 3
	mapTileCoordsA.push([2]);
	mapTileCoordsB.push([0,4]);
	// Tile 4
	mapTileCoordsA.push([0,1,2,3,4]);
	mapTileCoordsB.push([1,3]);
	// Tile 5
	mapTileCoordsA.push([0,4]);
	mapTileCoordsB.push([2]);
	// Tile 6
	mapTileCoordsA.push([1,3]);
	mapTileCoordsB.push([2]);
	// Tile 7 (Shop)
	mapTileCoordsA.push([2]);
	mapTileCoordsB.push([2]);
	
	for (let a = 0; a < 5; a++) {
		for (let b = 0; b < 5; b++) {
			for (let i = 0; i < tileLayout[0].length; i++) {
				for (let j = 0; j < tileLayout[0][i].length; j++) {
					for (let k = 0; k < mapTileCoordsA.length; k++) {
						if (mapTileCoordsA[k].includes(a) && mapTileCoordsB[k].includes(b)) {
							if (tileLayout[k][i][j] == 1) {
								// Building
								let ver = getModVersion(tileLayout[k], i, j);
								buildings.push(new ModularBuilding (gameEngine,
											PARAMS.GRID_WIDTH * j + PARAMS.TILE_WIDTH * a,
											PARAMS.GRID_WIDTH * i + PARAMS.TILE_WIDTH * b,
											ver[0], ver[1]));
							} else if (tileLayout[k][i][j] == 2) {
								ground.push (new Ground (gameEngine,
											PARAMS.GRID_WIDTH * j + PARAMS.TILE_WIDTH * a,
											PARAMS.GRID_WIDTH * i + PARAMS.TILE_WIDTH * b));
								// Goal Tile
								goals.push(new GoalPost(gameEngine, PARAMS.GRID_WIDTH * j + PARAMS.TILE_WIDTH * a,
																	PARAMS.GRID_WIDTH * i + PARAMS.TILE_WIDTH * b,));
							} else if (tileLayout[k][i][j] == 3) {
								// Road
								let ver = getRoadVersion(tileLayout[k], i, j);
								roads.push(new Road (gameEngine,
											PARAMS.GRID_WIDTH * j + PARAMS.TILE_WIDTH * a,
											PARAMS.GRID_WIDTH * i + PARAMS.TILE_WIDTH * b,
											ver[0], ver[1]));
							} else {
								ground.push (new Ground (gameEngine,
											PARAMS.GRID_WIDTH * j + PARAMS.TILE_WIDTH * a,
											PARAMS.GRID_WIDTH * i + PARAMS.TILE_WIDTH * b));
							};
						}
					}
				}
			}
		}
	}
	shop = new StartMission(gameEngine, PARAMS.TILE_WIDTH * 2 + PARAMS.GRID_WIDTH * 9.5, PARAMS.TILE_WIDTH * 2 + PARAMS.GRID_WIDTH * 6);
	
	// NPCs
	var npccars = [];
	
	// Define street entrances as points. TODO input final list of street entrances.
	let streetsLeft = [];
	let streetsRight = [];
	let sidewalk = [];
	
	var i = 0;
	//for (var i = 0; i < 5; i+=2) {
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * i), PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 1.5));
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * (i + 1)), PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 2.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * i, PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 3.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * (i + 1), PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 4.5));
		
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * i), PARAMS.TILE_WIDTH * 2 - PARAMS.GRID_WIDTH * 1.5));
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * (i + 1)), PARAMS.TILE_WIDTH * 2 - PARAMS.GRID_WIDTH * 2.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * i, PARAMS.TILE_WIDTH * 2 - PARAMS.GRID_WIDTH * 3.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * (i + 1), PARAMS.TILE_WIDTH * 2 - PARAMS.GRID_WIDTH * 4.5));
	
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * i), PARAMS.TILE_WIDTH * 3 + PARAMS.GRID_WIDTH * 1.5));
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * (i + 1)), PARAMS.TILE_WIDTH * 3 + PARAMS.GRID_WIDTH * 2.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * i, PARAMS.TILE_WIDTH * 3 + PARAMS.GRID_WIDTH * 3.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * (i + 1), PARAMS.TILE_WIDTH * 3 + PARAMS.GRID_WIDTH * 4.5));
		
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * i), PARAMS.TILE_WIDTH * 4 - PARAMS.GRID_WIDTH * 1.5));
		streetsRight.push(new Point (PARAMS.MAP_WIDTH - (PARAMS.GRID_WIDTH * (i + 1)), PARAMS.TILE_WIDTH * 4 - PARAMS.GRID_WIDTH * 2.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * i, PARAMS.TILE_WIDTH * 4 - PARAMS.GRID_WIDTH * 3.5));
		streetsLeft.push(new Point (PARAMS.GRID_WIDTH * (i + 1), PARAMS.TILE_WIDTH * 4 - PARAMS.GRID_WIDTH * 4.5));
	//}
	var population = 6;
	for (var i = 0; i < population; i++) {
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 0.5));
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 5.5));
		
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH * 2 - PARAMS.GRID_WIDTH * 0.5));
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH * 2 - PARAMS.GRID_WIDTH * 5.5));
		
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH * 3 + PARAMS.GRID_WIDTH * 0.5));
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH * 3 + PARAMS.GRID_WIDTH * 5.5));
		
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH * 4 - PARAMS.GRID_WIDTH * 0.5));
		sidewalk.push(new Point (Math.random() * PARAMS.MAP_WIDTH,PARAMS.TILE_WIDTH * 4 - PARAMS.GRID_WIDTH * 5.5));
	}
	gameEngine.streetsLeft = streetsLeft;
	gameEngine.streetsRight = streetsRight;
	
	for (var i = 0; i < streetsLeft.length; i++) {
		npccars.push(new Car(gameEngine, streetsLeft[i].x, streetsLeft[i].y, Math.floor(Math.random() * 5), 0, 1));
	}
	for (var i = 0; i < streetsRight.length; i++) {
		npccars.push(new Car(gameEngine, streetsRight[i].x, streetsRight[i].y, Math.floor(Math.random() * 5), 180, 1));
	}

	var npcs = [];
	for (var i = 0; i < sidewalk.length; i++) {
		npcs.push(new Pedestrian(gameEngine, sidewalk[i].x, sidewalk[i].y, Math.random() * 2, 0 + (180 * ( Math.round( Math.random() ) ) ), 1));
	}
	//var population = 10;//100 Anything larger than 20 stops the game somehow (MP: I don't see this issue)
	//for (var i = 0; i < population; i++) {
		//var randomX = Math.floor(Math.random() * 3000) + 0;
		//var randomY = Math.floor(Math.random() * 3000) + 0;
		//var randomMovementPattern = Math.floor(Math.random() * 4) + 1;
		//npcs.push(new Pedestrian(gameEngine, 0, PARAMS.TILE_WIDTH + PARAMS.GRID_WIDTH * 0.5, Math.random() * 2, 0, 1));
	//}
	
	// Player
	var driver = new Driver(gameEngine, 628, 353, 180);
	var drivercar = new DriverCar(gameEngine, 243, 98, 90);
	
	var shopArrow = new Arrow(gameEngine, driver.x, driver.y, shop.x, shop.y, 0);
	gameEngine.shopArrow = shopArrow;

	///// Draw all entities 
	gameEngine.init(ctx);
	//for (var i = 0; i < bgTiles.length; i++) {
	//	gameEngine.addEntity(bgTiles[i]);
	//}
	for (var i = 0; i < roads.length; i++) {
		gameEngine.addEntity(roads[i]);
	}
	for (var i = 0; i < ground.length; i++) {
		gameEngine.addEntity(ground[i]);
	}
	for (var i = 0; i < intersections.length; i++) {
		gameEngine.addEntity(intersections[i]);
	}
	for (var i = 0; i < goals.length; i++) {
		gameEngine.addEntity(goals[i]);
	}
	gameEngine.goals = goals;
	gameEngine.addEntity(shop);
	
	
	// NPCs
	for (var i = 0; i < npcs.length; i++) {
		gameEngine.addEntity(npcs[i]);
	}
	for (var i = 0; i < npccars.length; i++) {
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

	var door = new Audio('music/DoorClose.mp3');
	//door.play();
	
	new SceneManager(gameEngine);
	new AudioManager(gameEngine);
	
	gameEngine.start();
	//door.play();
});

function getRoadVersion (tile, x, y) {
	let ver = [0,0];	// default
	
	// Count adjacent building tiles
	let adjCount = 0;
	let adjHits = [];
	if (x != 0) 					{ if (tile[x - 1][y] == 3) {adjCount ++; adjHits.push('T');} };
	if (x != tile.length - 1) 		{ if (tile[x + 1][y] == 3) {adjCount ++; adjHits.push('B');} };
	if (y != 0) 					{ if (tile[x][y - 1] == 3) {adjCount ++; adjHits.push('L');} };
	if (y != tile[0].length - 1) 	{ if (tile[x][y + 1] == 3) {adjCount ++; adjHits.push('R');} };
	// Edge of tile counts towards a hit
	if (x == 0) 					{ adjCount ++; adjHits.push('T'); };
	if (x == tile.length - 1) 		{ adjCount ++; adjHits.push('B'); };
	if (y == 0) 					{ adjCount ++; adjHits.push('L'); };
	if (y == tile[0].length - 1) 	{ adjCount ++; adjHits.push('R'); };
	// Count corner building tiles
	let crnCount = 0;
	let crnHits = [];
	if (x != 0) {
		if (y != 0) 					{ if (tile[x - 1][y - 1] == 3) {crnCount ++; crnHits.push("TL");} };
		if (y != tile[0].length - 1) 	{ if (tile[x - 1][y + 1] == 3) {crnCount ++; crnHits.push("TR");} };
	}
	if (x != tile.length - 1) {
		if (y != 0) 					{ if (tile[x + 1][y - 1] == 3) {crnCount ++; crnHits.push("BL");} };
		if (y != tile[0].length - 1) 	{ if (tile[x + 1][y + 1] == 3) {crnCount ++; crnHits.push("BR");} };
	}
	
	if (adjCount == 2) {
		if (adjHits.includes('L') && adjHits.includes('R')) {
			ver = [1,0];
		} else if (adjHits.includes('T') && adjHits.includes('B')) {
			ver = [1,1];
		} else {
			if (adjHits.includes('T') && adjHits.includes('L')) {
				if (crnHits.includes("TL")) {
					ver = [2,0];
				} else {
					ver = [1,1];
				}
			} else if (adjHits.includes('T') && adjHits.includes('R')) {
				if (crnHits.includes("TR")) {
					ver = [2,1];
				} else {
					ver = [1,3];
				}
			} else if (adjHits.includes('B') && adjHits.includes('R')) {
				if (crnHits.includes("BR")) {
					ver = [2,2];
				} else {
					ver = [1,5];
				}
			} else {
				if (crnHits.includes("BL")) {
					ver = [2,3];
				} else {
					ver = [1,4];
				};
			}
		}
	} else if (adjCount == 3) {
		if (!adjHits.includes('R')) {
			ver = [3,1];
		} else if (!adjHits.includes('B')) {
			ver = [3,2];
		} else if (!adjHits.includes('L')) {
			ver = [3,3];
		} else if (!adjHits.includes('T')) {
			ver = [3,0];
		}
	} else if (adjCount == 4) {
		// TODO
	}
	return ver;
}

function getModVersion (tile, x, y) {
	let ver = [0,0];	// default
	
	// Count adjacent building tiles
	let adjCount = 0;
	let adjHits = [];
	if (x != 0) 					{ if (tile[x - 1][y] == 1) {adjCount ++; adjHits.push('T');} };
	if (x != tile.length - 1) 		{ if (tile[x + 1][y] == 1) {adjCount ++; adjHits.push('B');} };
	if (y != 0) 					{ if (tile[x][y - 1] == 1) {adjCount ++; adjHits.push('L');} };
	if (y != tile[0].length - 1) 	{ if (tile[x][y + 1] == 1) {adjCount ++; adjHits.push('R');} };
	// Count corner building tiles
	let crnCount = 0;
	let crnHits = [];
	if (x != 0) {
		if (y != 0) 					{ if (tile[x - 1][y - 1] == 1) {crnCount ++; crnHits.push("TL");} };
		if (y != tile[0].length - 1) 	{ if (tile[x - 1][y + 1] == 1) {crnCount ++; crnHits.push("TR");} };
	}
	if (x != tile.length - 1) {
		if (y != 0) 					{ if (tile[x + 1][y - 1] == 1) {crnCount ++; crnHits.push("BL");} };
		if (y != tile[0].length - 1) 	{ if (tile[x + 1][y + 1] == 1) {crnCount ++; crnHits.push("BR");} };
	}
	
	if (adjCount == 1) {
		if (adjHits.includes('L')) {
			ver = [1,0];
		} else if (adjHits.includes('T')) {
			ver = [1,1];
		} else if (adjHits.includes('R')) {
			ver = [1,2];
		} else if (adjHits.includes('B')) {
			ver = [1,3];
		};
	} else if (adjCount == 2) {
		if (adjHits.includes('L') && adjHits.includes('R')) {
			ver = [1,4];
		} else if (adjHits.includes('T') && adjHits.includes('B')) {
			ver = [1,5];
		} else {
			if (adjHits.includes('T') && adjHits.includes('L')) {
				if (crnHits.includes("TL")) {
					ver = [2,0];
				} else {
					ver = [2,4];
				}
			} else if (adjHits.includes('T') && adjHits.includes('R')) {
				if (crnHits.includes("TR")) {
					ver = [2,1];
				} else {
					ver = [2,5];
				}
			} else if (adjHits.includes('B') && adjHits.includes('R')) {
				if (crnHits.includes("BR")) {
					ver = [2,2];
				} else {
					ver = [2,6];
				}
			} else {
				if (crnHits.includes("BL")) {
					ver = [2,3];
				} else {
					ver = [2,7];
				};
			}
		}
	} else if (adjCount == 3) {
		if (!adjHits.includes('R')) {
			ver = [3,0];
		} else if (!adjHits.includes('B')) {
			ver = [3,1];
		} else if (!adjHits.includes('L')) {
			ver = [3,2];
		} else if (!adjHits.includes('T')) {
			ver = [3,3];
		}
	} else if (adjCount == 4) {
		// inner corner walls or enclosed wall
		if (crnHits.includes("TL") && crnHits.includes("BL") && crnHits.includes("TR") && crnHits.includes("BR")) {
			// ALL CORNERS
			ver = [4,0];
		} else if (crnHits.includes("BL") && crnHits.includes("TR") && crnHits.includes("BR")) {
			// !TL
			ver = [4,0]; // [4,11]
		} else if (crnHits.includes("TL") && crnHits.includes("TR") && crnHits.includes("BR")) {
			// !BL
			ver = [4,0]; // [4,12]
		} else if (crnHits.includes("TL") && crnHits.includes("BL") && crnHits.includes("BR")) {
			// !TR
			ver = [4,0]; // [4,13]
		} else if (crnHits.includes("TL") && crnHits.includes("BL") && crnHits.includes("TR")) {
			// !BR
			ver = [4,0]; // [4,14]
		} else if (crnHits.includes("BL") && crnHits.includes("BR")) {
			// BL BR
			ver = [4,10];
		} else if (crnHits.includes("TR") && crnHits.includes("BR")) {
			// BR TR
			ver = [4,8];
		} else if (crnHits.includes("TL") && crnHits.includes("TR")) {
			// TR TL
			ver = [4,9];
		} else if (crnHits.includes("TL") && crnHits.includes("BL")) {
			// TL BL
			ver = [4,7];
		} else if (crnHits.includes("TL") && crnHits.includes("BR")) {
			// TL BR
			ver = [4,6];
		} else if (crnHits.includes("BL") && crnHits.includes("TR")) {
			// TR BL
			ver = [4,5];
		} else if (crnHits.includes("TL")) {
			// TL
			ver = [4,1];
		} else if (crnHits.includes("BL")) {
			// BL
			ver = [4,4];
		} else if (crnHits.includes("TR")) {
			// TR
			ver = [4,2];
		} else if (crnHits.includes("BR")) {
			// BR
			ver = [4,3];
		} else {
			ver = [4,0]; // [4,15]
		}
	}
	
	return ver;
}
