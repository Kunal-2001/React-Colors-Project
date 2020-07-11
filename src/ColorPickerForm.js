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

const styles = {
	picker: {
		width: '100% !important',
		marginTop: '2rem'
	},
	addColor: {
		width: '100%',
		padding: '1rem',
		marginTop: '1rem',
		fontSize: '1rem'
	},
	colorInput: {
		width: '100%',
		height: '70px'
	}
};

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newColorText: '',
			currentColor: 'teal'
		};
		this.updateNewColor = this.updateNewColor.bind(this);
		this.handleFormInputChange = this.handleFormInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	handleFormInputChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	updateNewColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	handleSubmit() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorText
		};
		this.props.createNewColor(newColor);
		this.setState({ newColorText: '' });
	}
	render() {
		const { classes, paletteFull } = this.props;
		return (
			<div>
				<ChromePicker
					className={classes.picker}
					color={this.state.currentColor}
					onChangeComplete={this.updateNewColor}
				/>
				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						variant="filled"
						margin="normal"
						placeholder="Color Name"
						className={classes.colorInput}
						name="newColorText"
						value={this.state.newColorText}
						onChange={this.handleFormInputChange}
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[
							'this field is required',
							'this name already exists',
							'This color already exist'
						]}
					/>
					<Button
						className={classes.addColor}
						type="submit"
						variant="contained"
						color="primary"
						style={{ backgroundColor: paletteFull ? 'grey' : this.state.currentColor }}
						disabled={paletteFull}
					>
						{paletteFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
