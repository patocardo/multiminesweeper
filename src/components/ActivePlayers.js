import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

// import './GridCell.scss';

const ActivePlayers = props => {
	const stillActive = props.players.filter(player => player.active).sort((a, b) => (b.points - a.points));
	return (
	  <Container className="pt-2">
	  {
	  	stillActive.map((elm, idx) => {
	  		return (
	  			<Row key={"gamer_" + idx}>
	  				<Col xs="8">{ elm.name }</Col>
	  				<Col xs="4">{ elm.points } pts</Col>
	  				<hr className="my-2" />
	  			</Row>
	  		);
	  	})
	  }
	  </Container>
	)
}

const mapStateToProps = state => {
  return  {
  	players: state.players
  }
}
const mapDispachToProps = (dispach) => {
  return  {
    doCancel: () => dispach({type: 'CANCEL_GAME'}),
  }
}
export default connect(mapStateToProps, mapDispachToProps)(ActivePlayers);