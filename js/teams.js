const teamColors = ['#27ae60', '#2980b9', '#8e44ad', '#c0392b', '#f1c40f', '#e67e22'];

function cube_to_axial(x, z){
    var q = x
    var r = z
    return `${q}.${r}.${(~r + 1)-q}`;
}
//test
function getCellFromXZ(x,z){
	return board.grid.cells[cube_to_axial(x,z)].tile
}

function getPlayerBases(){
  corners = [
      getCellFromXZ(0, -board.grid.size),
      getCellFromXZ(board.grid.size, -board.grid.size),
      getCellFromXZ(board.grid.size, 0),
      getCellFromXZ(0, board.grid.size),
      getCellFromXZ(-board.grid.size, board.grid.size),
      getCellFromXZ(-board.grid.size, 0),
    ]
  if (players === 1){
    // center of map
    return [
        {base:getCellFromXZ(0, 0)},
      ];
  } else if (players === 2){
    return [
        {base:corners[0], rotation: 0},
        {base:corners[3], rotation: ((360 / 6) * 3) * vg.DEG_TO_RAD},
      ];
  } else if (players === 3){
    return [
        {base:corners[0], rotation: 0},
        {base:corners[2], rotation: ((360 / 6) * 2) * vg.DEG_TO_RAD},
        {base:corners[4], rotation: ((360 / 6) * 4) * vg.DEG_TO_RAD},
      ];
  } else if (players === 4){
    return [
        {base:corners[1]},
        {base:corners[2]},
        {base:corners[4]},
        {base:corners[5]},
      ];
  } else if (players === 5){
    return [
        {base:corners[4]},
        {base:corners[5]},
        {base:corners[1]},
        {base:corners[2]},
        {base:corners[0]},
      ];
  } else if (players === 6){
    return [
        {base:corners[0]},
        {base:corners[1]},
        {base:corners[2]},
        {base:corners[3]},
        {base:corners[4]},
        {base:corners[5]},
      ];
  }
}
