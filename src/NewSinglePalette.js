import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NewPaletteNav from './NewPaletteNav';
import ColorPickerForm from './ColorPickerForm';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	container: {
		width: '90%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttons: {
		width: '100%'
	},
	button: {
		width: '50%'
	}
});

class NewSinglePalette extends Component {
	static defaultProps = {
		max: 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			colors: this.props.allPalettes[0].colors,
			newPaletteName: ''
		};

		this.updateNewColor = this.updateNewColor.bind(this);
		this.createNewColor = this.createNewColor.bind(this);
		this.handleFormInputChange = this.handleFormInputChange.bind(this);
		this.handleSavePalette = this.handleSavePalette.bind(this);
		this.handleDeleteColor = this.handleDeleteColor.bind(this);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	updateNewColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	createNewColor(newColor) {
		this.setState({ colors: [ ...this.state.colors, newColor ] });
		this.setState({ newColorText: '' });
	}
	handleFormInputChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleSavePalette(newPaletteName) {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors
		};

		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}

	handleDeleteColor(colorName) {
		this.setState({
			colors: this.state.colors.filter((color) => color.name !== colorName)
		});
	}

	clearPalette = () => {
		this.setState({
			colors: []
		});
	};

	randomColor = () => {
		const allColors = this.props.allPalettes.map((p) => p.colors).flat();
		var randomColorGenerate = Math.floor(Math.random() * allColors.length);
		const random = allColors[randomColorGenerate];
		this.setState({ colors: [ ...this.state.colors, random ] });
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};
	render() {
		const { classes, theme, max } = this.props;
		const { open, colors } = this.state;
		const paletteFull = colors.length >= max;

		return (
			<div className={classes.root}>
				<NewPaletteNav
					allPalettes={this.props.allPalettes}
					open={open}
					classes={classes}
					handleSubmit={this.handleSavePalette}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant="h4" gutterBottom>
							Design your palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								className={classes.button}
								color="secondary"
								onClick={this.clearPalette}
							>
								Clear palette
							</Button>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
								onClick={this.randomColor}
								disabled={paletteFull}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm
							colors={colors}
							paletteFull={paletteFull}
							createNewColor={this.createNewColor}
						/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						axis="xy"
						colors={this.state.colors}
						handleDeleteColor={this.handleDeleteColor}
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewSinglePalette);
