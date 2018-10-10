/*
* It computes the number to be put on certain cell
* @param {Integer} x					horizontal position starting at 1
* @param {Integer} y					vertical position starting at 1
* @param {Array}	minesPos		position of mines
* @param {Integer} sidesCount	number of cell in each side of the grid
 */
function cellValue(x, y, minesPos, sidesCount) {
 	const	cellPos = x + y * sidesCount;
 	if(minesPos.indexOf( cellPos ) > -1) {
 		return -1;
 	}
 	let cellVal = 0;
  const atLeft = idx => !!(((idx + 1) % sidesCount) - 1);
  const atRight = idx => !!((idx + 1) % sidesCount);
  const atTop = idx => !!(idx >= sidesCount);
  const atBottom = idx => !!(idx <= sidesCount * (sidesCount - 1));

 	minesPos.forEach(idx => {
		let surround = [];
		if(atTop(idx) && atLeft(idx)) { surround.push(idx - sidesCount - 1);}
		if(atTop(idx)) { surround.push(idx - sidesCount); }
		if(atTop(idx) && atRight(idx)) { surround.push(idx + 1 - sidesCount);}
		if(atLeft(idx)) { surround.push(idx - 1); }
		if(atRight(idx)) { surround.push(idx + 1); }
		if(atBottom(idx) && atLeft(idx)) { surround.push(idx + sidesCount - 1);}
		if(atBottom(idx)) { surround.push(idx + sidesCount); }
		if(atBottom(idx) && atRight(idx)) { surround.push(idx + 1 + sidesCount);}
		cellVal += (surround.indexOf(cellPos) > -1) ? 1 : 0;
 	});
 	return cellVal;
 }

/*
* It generates a grid of cells with numeric values of mines and surrounding indicators
* @param {Integer} nPlayers		number of players
* @param {Ineger} level				level number
* @result {Array} of array of numbers;
*/
function generateGrid(nPlayers, level) {
	const sidesCount = 8 * level;
	const minesCount = Math.round(Math.pow( level * 3, 2) * sidesCount / 8);
	const minesPos = [];
	const matriz = [];
	let currPos;
	for(let i = 0; i < minesCount; i++) {
		do{
			currPos = Math.round(Math.random() * (sidesCount * sidesCount));
		} while(minesPos.indexOf(currPos) > -1);
		minesPos.push(currPos);
	}
	minesPos.sort();
	for(let j = 0; j < sidesCount; j++) {
		matriz.push([]);
		for(let i = 0; i < sidesCount; i++) {
			matriz[j].push(cellValue(i, j, minesPos, sidesCount));
		}
	}

	return matriz;
}

export { generateGrid, cellValue };