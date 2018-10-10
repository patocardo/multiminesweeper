import React from 'react';
import { connect } from 'react-redux';
import GridCell from './GridCell';

const GridBoard = props => {
	if(!props.gameGrid.length) {
		props.createGrid();
	}
	function renderRows() {
		return props.gameGrid.map((row, idy) => {
			return (
				<div className="d-flex" key={'grid_row_' + idy}>
					{ row.map((cell, idx) => {
						return (
							<GridCell key={'grid_cell_' + idy + '_' + idx} x={idx} y={idy} cellData={cell} />
						);
					})}
				</div>
			);
		});
	}
	return (<div>{ renderRows()}</div>);
}

const mapDispachToProps = (dispach) => {
  return  {
    createGrid: () => dispach({type: 'CREATE_GRID'}),
  }
}

export default connect( state => state, mapDispachToProps)(GridBoard);