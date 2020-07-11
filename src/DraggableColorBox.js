import React from 'react';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		display: 'inline-block',
		cursor: 'pointer',
		margin: '0 auto',
		position: 'relative',
		marginBottom: '-3.5px',
		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.5)'
		}
	},
	boxContent: {
		position: 'absolute',
		left: '0',
		bottom: '0',
		width: '100%',
		padding: '10px',
		letterSpacing: '1px',
		color: 'rgba(0 , 0 ,0 ,0.7)',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	deleteIcon: {
		transition: 'all 0.3s ease-in-out '
	}
};

const DraggableColorBox = SortableElement((props) => {
	return (
		<div className={props.classes.root} style={{ backgroundColor: props.color }}>
			<div className={props.classes.boxContent}>
				<span>{props.name}</span>
				<DeleteIcon onClick={props.handleClick} className={props.classes.deleteIcon} />
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);
