import React from 'react';
import { connect } from 'react-redux';

import './GridCell.scss';

const GridCell = props => {
	if(props.cellData.activated) { // exposed result
		return (
			<div className="cell" aria-label={props.cellData.msg} title={props.cellData.msg} id={'cell_' + props.y + '_' + props.x }>
		    <svg viewBox={props.cellData.value === -1 ? "10 0 50 50": "0 0 50 50"}
		    		className={props.cellData.value === -1 ? "info info--explosion": "info" }>
		      <text x="15" y="40">{props.cellData.glyph}</text>
		    </svg>
		    <div className="sizer" />
		  </div>
		);
	} else {	// hidden result
		return (
			<button className="cell cell--btn" aria-label="check bomb"
			onClick={() => props.activateCell(props.x, props.y)}>
				<div className="sizer" />
			</button>
		)
	}
}

const mapDispachToProps = (dispach) => {
  return  {
    activateCell: (x, y) => dispach({type: 'ACTIVATE_CELL', x: x, y: y}),
  }
}

export default connect( state => state, mapDispachToProps)(GridCell);