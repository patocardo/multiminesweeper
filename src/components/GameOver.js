import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import ActivePlayers from './ActivePlayers';

import './GameOver.scss';

const GameOver = props => {
	const stillActive = props.players.filter(player => player.active);
	const congrats = (stillActive.length > 1) ? 'And the winners are' : 'And the winner is';
	return (
		<div className={ props.ended ? "gameover-back" : "d-none" }>
			<Jumbotron>
				<h1 className="display-3">Game Over</h1>
				<hr className="my-2" />
				<div className={ props.playerTurn ? "alert alert-success" : "d-none" } role="alert">
				  <p className="lead">{congrats}</p>
				  <ActivePlayers />
				</div>
				<div className={ props.playerTurn ? "d-none" : "alert alert-danger" } role="alert">
				  Sorry!, try again!
				</div>
				<hr className="my-2" />
					<Button onClick={props.doCancel}>
						<span role="button" aria-label="confirm game restart">New game</span>
					</Button>
			</Jumbotron>
		</div>
	)
}

const mapStateToProps = state => {
  return  {
  	ended: state.ended,
  	players: state.players,
  	playerTurn: state.playerTurn
  }
}
const mapDispachToProps = (dispach) => {
  return  {
    doCancel: () => dispach({type: 'CANCEL_GAME'}),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(GameOver);