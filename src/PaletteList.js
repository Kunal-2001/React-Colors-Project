import React, { Component } from 'react';
import Palette from './Palette';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import bg from './Confetti-Doodles.svg';

const styles = {
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
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { palettes } = this.props;
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.header}>React Colors</h1>
						<Link to="/palette/new">Create a new palette</Link>
					</nav>
					<div className={classes.palettes}>
						{palettes.map((palette) => (
							<MiniPalette
								key={palette.id}
								id={palette.id}
								deletePalette={this.props.deletePalette}
								handleClick={() => this.goToPalette(palette.id)}
								{...palette}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
