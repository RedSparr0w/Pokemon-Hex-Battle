function cube_to_axial(x, z){
    const q = x,
          r = z,
          s = -r-q;
    return {q,r,s};
}

function cube(x, z){
    const y = -x-z;
    return {x,y,z};
}

function getCellFromXZ(board, x, z){
  return board.getTileAtCell(cube_to_axial(x, z));
}

class Base {
  constructor(base, point) {
    this.base = base;
    this.rotation = ((360 / 6) * (6 - point)) * vg.DEG_TO_RAD;
    this.pokemons = [];
  }
}

function getPlayerBases(board, totalPlayers = 3){
  const playerColors = [
      'rgba(52, 152, 219,1.0)', // Blue
      'rgba(231, 76, 60,1.0)',  // Red
      'rgba(46, 204, 113,1.0)', // Green
      'rgba(241, 196, 15,1.0)', // Yellow
      'rgba(155, 89, 182,1.0)', // Purple
      'rgba(243, 156, 18,1.0)', // Orange
    ];
  let players = [];

  totalPlayers = +totalPlayers < 1 || +totalPlayers > 6 ? 3 : +totalPlayers;

  const bases = {
      top: new Base(getCellFromXZ(board, 0, -board.grid.size), 0),
      topRight: new Base(getCellFromXZ(board, board.grid.size, -board.grid.size), 1),
      bottomRight: new Base(getCellFromXZ(board, board.grid.size, 0), 2),
      bottom: new Base(getCellFromXZ(board, 0, board.grid.size), 3),
      bottomLeft: new Base(getCellFromXZ(board, -board.grid.size, board.grid.size), 4),
      topLeft: new Base(getCellFromXZ(board, -board.grid.size, 0), 5),
    }

  if (totalPlayers === 1){
    // center of map
    players = [
        new Base(getCellFromXZ(board, 0, 0), 0),
      ];
  } else if (totalPlayers === 2){
    players = [
        bases.top,
        bases.bottom,
      ];
  } else if (totalPlayers === 3){
    players = [
        bases.top,
        bases.bottomRight,
        bases.bottomLeft,
      ];
  } else if (totalPlayers === 4){
    players = [
        bases.topRight,
        bases.bottomRight,
        bases.bottomLeft,
        bases.topLeft,
      ];
  } else if (totalPlayers === 5){
    players = [
        bases.bottomLeft,
        bases.topLeft,
        bases.top,
        bases.topRight,
        bases.bottomRight,
      ];
  } else if (totalPlayers === 6){
    players =  [
        bases.top,
        bases.topRight,
        bases.bottomRight,
        bases.bottom,
        bases.bottomLeft,
        bases.topLeft,
      ];
  }

  // Apply colors
  players.map((player, index)=>{
    player.color = playerColors[index];
    return player;
  });

  return players;
}

function setupBoard(boardSize, totalPlayers = 3, cellSize = 10){
  // setup the thing
  const scene = new vg.Scene({
    element: document.getElementById('view'),
    cameraPosition: {x:0, y:150, z:150}
  }, true);

  /* Setup the scene */
  // maximum angle the camera can move down
  scene.controls.maxPolarAngle = 1.4

  // this constructs the cells in grid coordinate space
  const grid = new vg.HexGrid({
    cellSize, // size of individual cells
  });

  grid.generate({
    size: boardSize, // size of the board
  });

  const mouse = new vg.MouseCaster(scene.container, scene.camera);
  const selector = new vg.SelectionManager(mouse);
  const board = new vg.Board(grid);

  board.generateTilemap();

  scene.add(board.group);
  scene.focusOn(board.group);

  const players = getPlayerBases(board, totalPlayers);

  return {
    scene,
    grid,
    mouse,
    selector,
    board,
    players
  };
}
