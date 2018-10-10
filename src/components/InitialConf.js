import React from 'react';
import { Container, Row, Col, Button, ButtonGroup, Card, CardText, CardBody,
  CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import Players from './Players';

import './InitialConf.scss';


const InitialConf = (props) => {
  return (
    <div className={ props.started ? "d-none" : "initial-conf"}>
    	<Container>
	    	<Row>
	    		<Col xs="12" sm={{ size: 8, offset: 2 }}>
		    		<Card>
		    		  <CardBody>
    		  	    <CardTitle>Game configuration</CardTitle>
    		  	    <CardText>Select your options</CardText>
    		  	    <span>Difficulty: &nbsp;</span>
    		  	    <div data-role="level-changer" className="p-2">
    		  		    <ButtonGroup>
    		  		      <Button onClick={() => props.changeLevel(1)}
    		  		      				color={props.level === 1 ? 'primary': 'secondary'}>Begginer</Button>
    		  		      <Button onClick={() => props.changeLevel(2)}
    		  		      				color={props.level === 2 ? 'primary': 'secondary'}>Intermediate</Button>
    		  		      <Button onClick={() => props.changeLevel(3)}
    		  		      				color={props.level === 3 ? 'primary': 'secondary'}>Advanced</Button>
    		  		    </ButtonGroup>
    		  		  </div>
    		  		  <Players />
    		  	    <div className="accept-bar">
    		  	    	<Button onClick={props.doStart} data-role="starter" color="success">Start</Button>
    		  	    </div>
		    		  </CardBody>
		    		</Card>
	    		</Col>
	    	</Row>
    	</Container>
    </div>
  );
}

const mapDispachToProps = (dispach) => {
  return  {
    doStart: () => dispach({type: 'START'}),
    changeLevel: (level) => dispach({type: 'CHANGE_LEVEL', level: level})
  }
}

export default connect(state => state, mapDispachToProps)(InitialConf);
