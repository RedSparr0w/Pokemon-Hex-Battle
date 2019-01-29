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
  const playerColors = ['#27ae60', '#2980b9', '#8e44ad', '#c0392b', '#f1c40f', '#e67e22'];
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
