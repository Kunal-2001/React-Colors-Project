import React, { Component } from 'react';
import Palette from './Palette';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import bg from './Confetti-Doodles.svg';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const styles = {
	'@global': {
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 500ms ease-out'
		}
	},
	root: {
		height: '100vh',
		overflow: 'scroll',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		/* background by SVGBackgrounds.com */
		backgroundColor: '#aa3333',
		backgroundImage: `url(${bg})`
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '50%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'@media (max-width : 1400px)': {
			width: '80%'
		},
		'@media (max-width : 575.98px)': {
			width: '60%'
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		color: 'white',
		alignItems: 'center',
		'& a': {
			color: 'white'
		}
	},
	header: {
		'@media (max-width : 575.98px)': {
			marginRight: '80px'
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3 , 30%)',
		gridGap: '2.5rem',
		'@media (max-width : 991.98px)': {
			gridTemplateColumns: 'repeat(2 , 50%)'
		},
		'@media (max-width : 575.98px)': {
			gridTemplateColumns: 'repeat(1 , 100%)',
			gridGap: '1.4rem'
		}
	}
};

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteDialog: false,
			deleteId: ''
		};

		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.goToPalette = this.goToPalette.bind(this);
	}

	openDialog(id) {
		this.setState({ deleteDialog: true, deleteId: id });
	}

	closeDialog() {
		this.setState({ deleteDialog: false, deleteId: '' });
	}

	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	handleDelete() {
		this.props.deletePalette(this.state.deleteId);
		this.closeDialog();
	}

	render() {
		const { palettes, deletePalette } = this.props;
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.header}>React Colors</h1>
						<Link to="/palette/new">Create a new palette</Link>
					</nav>

					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									key={palette.id}
									id={palette.id}
									// deletePalette={this.props.deletePalette}
									openDialog={this.openDialog}
									handleClick={this.goToPalette}
									{...palette}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={this.state.deleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
					<DialogTitle id="delete-dialog-title">Delete Palette</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ background: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ background: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Cancel</ListItemText>
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
