import React/*, { Component }*/ from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';

/*class Players extends Component {
	updateOnePlayer(evt) {
		const inpt = evt.target;
		this.props.updatePlayer(parseInt(inpt.dataset.id), inpt.value);
	}

	addOnePlayer() {
		const nextId = this.props.players.length + 1;
		this.props.addPlayer(nextId);
		this.forceUpdate((response) => {
			console.log('forced:', response);
		});
	}
	btnRemove(id) {
		return (id === 1) ? '' : (<Button onClick={() => this.props.removePlayer(id)} color="danger">
			<span role="img" aria-label="Remove player">❌</span>
		</Button>);
	}

	playersDivs(players) {

		return players.map((player) => {
			return (
				<Row className="pt-1" key={'ply_' + player.id.toString()}>
					<Col xs="4">
					<label htmlFor={'player_' + player.id}>Player {player.id} :</label>
					</Col>
					<Col xs="6">
						<Input 	key={'player_' + player.id.toString() + '_name'} defaultValue={player.name}
							onChange={this.updateOnePlayer.bind(this)} super={this} data-id={player.id} data-role="player-name" />
					</Col>
					<Col xs="2">
						{this.btnRemove(player.id)}
					</Col>
				</Row>
			);
		});
	};
	render() {

		return (
			<div className="pt-1">
				<Row className="pt-1">
					<Col className="d-flex justify-content-end">
						<Button onClick={this.addOnePlayer.bind(this)} aria-label="add player" color="info">Add Player</Button>
					</Col>
				</Row>
				{	this.playersDivs(this.props.players) }
			</div>
		);
	}
	//				<Button onClick={() => props.addPlayer(props.players.length + 1)} aria-label="add player" color="info">Add Player</Button>

}*/

const Players = props => {
	function updateOnePlayer(evt) {
		const inpt = evt.target;
		props.updatePlayer(parseInt(inpt.dataset.id), inpt.value);
	}

	function addOnePlayer() {
		const nextId = props.players.length + 1;
		props.addPlayer(nextId);
	}

	function btnRemove(id) {
		return (id === 1) ? '' : (<Button onClick={() => props.removePlayer(id)} color="danger">
			<span role="img" aria-label="Remove player">❌</span>
		</Button>);
	}

	function playersDivs(players) {

		return players.map((player) => {
			return (
				<Row className="pt-1" key={'ply_' + player.id.toString()}>
					<Col xs="4">
					<label htmlFor={'player_' + player.id}>Player {player.id} :</label>
					</Col>
					<Col xs="6">
						<Input 	key={'player_' + player.id.toString() + '_name'} defaultValue={player.name}
							onChange={updateOnePlayer} data-id={player.id} data-role="player-name" />
					</Col>
					<Col xs="2">
						{btnRemove(player.id)}
					</Col>
				</Row>
			);
		});
	};

	return (
		<div className="pt-1">
			<Row className="pt-1">
				<Col className="d-flex justify-content-end">
					<Button onClick={addOnePlayer} aria-label="add player" color="info">Add Player</Button>
				</Col>
			</Row>
			{	playersDivs(props.players) }
		</div>
	);

	//				<Button onClick={() => props.addPlayer(props.players.length + 1)} aria-label="add player" color="info">Add Player</Button>

}
const mapStateToProps = state => {
	return {...state,
		players: state.players
	}
}
const mapDispachToProps = (dispach) => {
  return  {
    removePlayer: (playerId) => dispach({type: 'REMOVE_PLAYER', id: playerId}),
    updatePlayer: (playerId, playerName) => dispach({type: 'UPDATE_PLAYER', id: playerId, name: playerName}),
    addPlayer: (playerId) => dispach({type: 'ADD_PLAYER', id: playerId})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Players);