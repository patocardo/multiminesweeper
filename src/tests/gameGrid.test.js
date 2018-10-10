import { generateGrid, cellValue } from '../actions/gameGrid';

describe('Pure functions for game grid', () => {
	it('should show a correct sum of surrounding mines', () => {
		const sideCount = 4;
		const minesPos = [ 1, 7, 14];
		/*
		1,-1, 1, 1
		1, 1, 2,-1
		0, 1, 2, 2
		0, 1,-1, 1
		 */
		expect(cellValue(0, 0, minesPos, sideCount)).toBe(1);
		expect(cellValue(1, 0, minesPos, sideCount)).toBe(-1);
		expect(cellValue(2, 1, minesPos, sideCount)).toBe(2);
		expect(cellValue(0, 3, minesPos, sideCount)).toBe(0);
	});
	it('should create an array of arrays width at minimal amount of mines', () => {
		const grid = generateGrid(1, 1);
		expect(grid.length).toBe(8);
		expect(grid[0].length).toBe(8);
	})
});