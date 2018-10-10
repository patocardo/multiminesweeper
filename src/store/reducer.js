import { generateGrid } from '../actions/gameGrid';
import { activateCell, nextTurn } from '../actions/gameState';


const initialState = {
	level: 1,
	started: false,
	players: [
		{id: 1, name: 'NatalyNataly', points: 0, active: true}
	],
	playerTurn: 1,
	gameGrid: [],
	cancelConfirmer: false,
	ended: false
};

const currentState = (localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')) : initialState;

const reducer = (state = currentState, action) => {
	const newState = {...state};
	const players = [...state.players];
	let idx, player, attrs;
	switch(action.type) {
		case 'START':
			newState.started = true;
			newState.gameGrid = [];
			break;
		case 'ADD_PLAYER':
			players.push({id: action.id, name: '', points: 0, active: true});
			newState.players = players;
			break;
		case 'REMOVE_PLAYER':
			idx = players.findIndex(player => player.id === action.id);
			players.splice(idx, 1);
			newState.players = players;
			break;
		case 'UPDATE_PLAYER':
			idx = newState.players.findIndex(player => player.id === action.id);
			attrs = {...action};
			delete attrs.type;
			player = {...state.players[idx], ...attrs};
			players[idx] = player;
			newState.players = players;
			break;
		case 'CHANGE_LEVEL':
			newState.level = action.level;
			break;
		case 'CONFIRM_CANCEL':
			Object.assign(newState, {
				cancelConfirmer: true
			});
			break;
		case 'CANCEL_GAME':
			Object.assign(newState, {
				started: false,
				playerTurn: 1,
				gameGrid: [],
				cancelConfirmer: false,
				players: players.map(player => {
					player.active = true;
					player.points = 0;
					return player;
				}),
				loser: null,
				ended: false
			});
			break;
		case 'CREATE_GRID':
			newState.gameGrid = generateGrid(newState.players.length, newState.level).map(row => {
				return row.map(num => {
					const content = (num === -1)
						? {msg: 'exploded bomb', glyph: '💥'}
						: (num)
							? {msg: num + ' mines surrounding', glyph: num}
							: {msg: 'no surrounding mines', glyph: ' '}
					return {value: num, activated: false, msg: content.msg, glyph: content.glyph, playerId:null };
				});
			});
			break;
		case 'ACTIVATE_CELL':
			const {grid, gamers, loser, ended } = activateCell(state, action.x, action.y);
			newState.gameGrid = grid;
			newState.players = gamers;
			newState.loser = loser;
			newState.ended = ended;
			newState.playerTurn = nextTurn(newState);
			break;
		default:
			newState.level = 1;
	}
	localStorage.setItem('state', JSON.stringify(newState));
	return newState;
}

export default reducer;