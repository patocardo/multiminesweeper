/*
* check for the next player enabled to playe
* @param {Object} state   the current state of application
* @return {Integer} the Id of the player
*/
function nextTurn(state) {
  const stillActive = state.players.filter(player => player.active);
  if(!stillActive.length) {
    return 0;
  }
  const idx = stillActive.findIndex(player => player.id === state.playerTurn);
  const pos = (idx === stillActive.length - 1) ? 0 : idx + 1;
  return stillActive[pos].id;
}

/*
* recursively cleans the adyacents mines-free area
* @param {Array} gameGrid arrays with cell object
* @param {Integer} x      0-based horizontal position
* @param {Integer} y      0-based vertical position
* @return {Array} with new values of grid
 */
function cleanFreeMine(gameGrid, x, y) {
  const newGrid = [...gameGrid];
  const inspected = [];
  // check if cell is capable to be activated
  function validTarget(x, y) {
    return (
      y >= 0 && y < newGrid.length &&
      x >= 0 && x < newGrid[0].length &&
      newGrid[y][x].value > -1 &&
      inspected.indexOf(x + ',' + y) === -1 //&&
    )
  }
  // activate the cell and recurse
  function flood(x, y) {
    newGrid[y][x].activated = true;
    inspected.push(x + ',' + y);
    if(newGrid[y][x].value > 0) {
      return;
    }
    [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].forEach(pair => {
      if(validTarget(pair[0], pair[1])) {
        flood(pair[0], pair[1]);
      }
    })
    return;
  }
  if(validTarget(x, y)) {
    flood(x, y);
  }
  return newGrid;
}

/*
* triggers all the actions on the grid and players after a cell is clicked
* @param {Object} state   complete game state
* @param {Integer} x      based-1 horizontal position
* @param {Integer} y      based-1 vertical position
* @return {Object}  with new values of grid, players and loser
 */
function activateCell(state, x, y) {
  let gameGrid = [...state.gameGrid];
  const players = [...state.players];
  let loser = null;
  let ended = false;
  let flatten = gameGrid.flat();
  gameGrid[y][x].activated = true;
  gameGrid[y][x].playerId = state.playerTurn;

  const idx = players.findIndex(player => player.id === state.playerTurn);
  const cellVal = gameGrid[y][x].value;
  switch(cellVal) {
    case -1:
      players[idx].active = false;
      loser = {...players[idx]};
      break;
    case 0:
      gameGrid = cleanFreeMine(gameGrid, x, y);
      players[idx].points++;
      break;
    default:
      players[idx].points+= cellVal;
  }


  const notYetActivated = flatten.reduce((accum, cell) => { return (cell.value > -1 && !cell.activated) ? accum + 1 : accum;}, 0);

  ended = (!notYetActivated || !state.players.filter(player => player.active).length);

  return {
    grid: gameGrid,
    gamers: players,
    loser: loser,
    ended: ended
  }
}


export { nextTurn, activateCell, cleanFreeMine};
