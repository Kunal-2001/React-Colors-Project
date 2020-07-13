import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import PaletteMetaForm from './PaletteMetaForm';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const styles = {
	navBtn: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 'auto'
	},
	button1: {
		width: '100px',
		margin: '0 0.5rem'
	},
	link: {
		textDecoration: 'none'
	}
};

class NewPaletteNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName: '',
			formShowing: false
		};
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
	}

	showForm() {
		this.setState({ formShowing: true });
	}

	hideForm() {
		this.setState({ formShowing: false });
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
							Create New Palette
						</Typography>
						<div className={classes.navBtn}>
							<Link to="/" className={classes.link}>
								<Button className={classes.button1} variant="contained" color="secondary">
									GO Back
								</Button>
							</Link>
							<Button
								variant="contained"
								className={classes.button2}
								color="primary"
								onClick={this.showForm}
							>
								Save
							</Button>
						</div>
					</Toolbar>
				</AppBar>
				{this.state.formShowing && (
					<PaletteMetaForm
						hideForm={this.hideForm}
						handleSubmit={this.props.handleSubmit}
						allPalettes={this.props.allPalettes}
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(NewPaletteNav);
