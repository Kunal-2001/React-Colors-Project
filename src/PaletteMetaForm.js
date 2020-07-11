import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
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
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="form-dialog-title"
				onClose={this.props.hideForm}
			>
				<DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
				<ValidatorForm onSubmit={() => this.props.handleSubmit(this.state.newPaletteName)}>
					<DialogContent>
						<DialogContentText>
							Please enter name for your new color palette (Make sure it's unique)
						</DialogContentText>
						<Picker />
						<TextValidator
							name="newPaletteName"
							label="Palette Name"
							value={this.state.newPaletteName}
							fullWidth
							margin="normal"
							onChange={this.handleFormInputChange}
							validators={[ 'required', 'PaletteNameValidator' ]}
							errorMessages={[ 'This field is required', 'Name already taken' ]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.hideForm} color="primary">
							Cancel
						</Button>
						<Button variant="contained" color="primary" type="submit">
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		);
	}
}

export default PaletteMetaForm;
