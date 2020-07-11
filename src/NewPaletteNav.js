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

class NewPaletteNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName: ''
		};
		this.handleFormInputChange = this.handleFormInputChange.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('PaletteNameValidator', (value) =>
			this.props.allPalettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}

	handleFormInputChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	render() {
		const { classes, open } = this.props;
		return (
			<div>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.props.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={() => this.props.handleSubmit(this.state.newPaletteName)}>
							<TextValidator
								name="newPaletteName"
								label="Palette Name"
								value={this.state.newPaletteName}
								onChange={this.handleFormInputChange}
								validators={[ 'required', 'PaletteNameValidator' ]}
								errorMessages={[ 'This field is required', 'Name already taken' ]}
							/>
							<Link to="/">
								<Button variant="contained" color="secondary">
									GO Back
								</Button>
							</Link>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default NewPaletteNav;
