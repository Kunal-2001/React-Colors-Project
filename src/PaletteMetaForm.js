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

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
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
			<div>
				<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
					Open form dialog
				</Button>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To subscribe to this website, please enter your email address here. We will send updates
							occasionally.
						</DialogContentText>
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
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleClose} color="primary">
							Subscribe
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
