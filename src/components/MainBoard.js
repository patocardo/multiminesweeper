import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import GridBoard from './GridBoard';
import GameOver from './GameOver';
import ActivePlayers from './ActivePlayers';

import './MainBoard.scss';


const MainBoard = props => {
	const currentPlayer = props.players.find(player => player.id === props.playerTurn);
	return (
		<Container className={ props.started ? "main-board" : "d-none"} >
			<Row>
				<Col className="d-flex justify-content-end">
					<Button color="secondary" onClick={props.needsConfirm} className={(props.cancelConfirmer) ? 'd-none' : ''}>
						Cancel & Restart Game
					</Button>
					<Button color="danger" onClick={props.doCancel} className={(props.cancelConfirmer) ? '' : 'd-none' }>
						<span role="button" aria-label="confirm game cancelation">Confirm restarting</span>
					</Button>
				</Col>
			</Row>
			<Row className={ props.players.length > 1 ? "": "d-none"}>
				<Col className="d-flex justify-content-center">
					<h2>Turn of { currentPlayer ? currentPlayer.name : 'None'}</h2>
				</Col>
			</Row>
			<Row>
				<Col xs="11" md="8" className="gameboard position-relative">
					<GridBoard />
					<GameOver />
				</Col>
				<Col xs="11" md="4">
					<ActivePlayers className="pt-2" />
				</Col>
			</Row>
		</Container>
	);

}

const mapStateToProps = state => {
  return  {
  	ended: state.ended,
  	started: state.started,
  	cancelConfirmer: state.cancelConfirmer,
  	players: state.players,
  	playerTurn: state.playerTurn
  }
}
const mapDispachToProps = (dispach) => {
  return  {
    doCancel: () => dispach({type: 'CANCEL_GAME'}),
    needsConfirm: () => dispach({type: 'CONFIRM_CANCEL'})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(MainBoard);