import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'name',
			newPaletteName: ''
		};

		this.handleFormInputChange = this.handleFormInputChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
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

	savePalette(emoji) {
		const newPalette = { paletteName: this.state.newPaletteName, emoji: emoji.native };

		this.props.handleSubmit(newPalette);
		this.setState({ stage: '' });
	}

	showEmojiPicker() {
		this.setState({ stage: 'emoji' });
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<div>
				<Dialog open={this.state.stage === 'emoji'} onClose={this.props.hideForm}>
					<DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>

					<Picker onSelect={this.savePalette} />
				</Dialog>
				<Dialog
					open={this.state.stage === 'name'}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					onClose={this.props.hideForm}
				>
					<DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter name for your new color palette (Make sure it's unique)
							</DialogContentText>
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
			</div>
		);
	}
}

export default PaletteMetaForm;
