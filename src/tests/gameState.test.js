import { cleanFreeMine } from '../actions/gameState';

describe('Pure functions for game actions', () => {
	it('should activate all cells different to -1', () => {
		const valueGrid = [
			[-1, 1, 0, 0],
			[1, 1, 0, 0],
			[1, 1, 0, 0],
			[-1, 1, 0, 0]
		];
		const originalGrid = valueGrid.map(row => row.map(num => {
			return {value: num, activated: false}
		}));

		const grid1 = cleanFreeMine(originalGrid, 3, 2);

		expect(grid1[1][1].activated).toBe(true);
		expect(grid1[3][3].activated).toBe(true);
		expect(grid1[3][0].activated).toBe(false);

	});

	it('should keep the grid without changes', () => {
		const valueGrid = [
			[-1, 1, 0, 0],
			[1, 1, 0, 0],
			[1, 1, 0, 0],
			[-1, 1, 0, 0]
		];
		const originalGrid = valueGrid.map(row => row.map(num => {
			return {value: num, activated: false}
		}));

		const grid1 = cleanFreeMine(originalGrid, 1, 1);
		expect(grid1[2][2].activated).toBe(false);
		expect(grid1[3][3].activated).toBe(false);
	})
});