import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

class Navabr extends Component {
	constructor(props) {
		super(props);
		this.state = { colorFormat: 'hex', openSnackbar: false };
		this.handleChange = this.handleChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	handleChange(e) {
		this.setState({ colorFormat: e.target.value, openSnackbar: true });
		this.props.handleChange(e.target.value);
	}

	closeSnackbar() {
		this.setState({ openSnackbar: false });
	}
	render() {
		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">React Color Picker</Link>
				</div>
				{this.props.slider && (
					<div className="slider-container">
						<span className="text">Level: {this.props.level}</span>
						<div className="slider">
							<Slider
								defaultValue={this.props.level}
								min={100}
								max={900}
								step={100}
								onAfterChange={this.props.changeLevel}
							/>
						</div>
					</div>
				)}
				<div className="dropdown">
					<Select value={this.state.colorFormat} onChange={this.handleChange}>
						<MenuItem value="hex">Hex - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.openSnackbar}
					autoHideDuration={3000}
					message={<span id="snackbar">Format Change!</span>}
					ContentProps={{ 'aria-describedby': 'snackbar' }}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
							<CloseIcon />
						</IconButton>
					]}
					onClose={this.closeSnackbar}
				/>
			</header>
		);
	}
}

export default Navabr;
