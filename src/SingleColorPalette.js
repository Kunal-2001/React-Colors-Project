import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this.state = { format: 'hex' };
		this._shadesOfColor = this.getColorToDisplay(this.props.palette, this.props.colorId);
		this.changeFormat = this.changeFormat.bind(this);
	}

	getColorToDisplay(palette, colorId) {
		let shades = [];
		let colors = palette.colors;

		for (let index in colors) {
			shades = shades.concat(colors[index].filter((color) => color.id === colorId));
		}

		return shades.slice(1);
	}

	changeFormat(value) {
		this.setState({ format: value });
	}

	render() {
		const colorBoxes = this._shadesOfColor.map((color) => (
			<ColorBox key={color.name} background={color[this.state.format]} name={color.name} showMore={false} />
		));
		const url = `/palette/${this.props.paletteId}`;
		return (
			<div className="SingleColorBox Palette">
				<Navbar handleChange={this.changeFormat} slider={false} />
				<div className="Palette-Colors">
					{colorBoxes}
					<div className="go-back Color-Box">
						<Link to={url} className="back-button">
							Go Back
						</Link>
					</div>
				</div>
				<PaletteFooter paletteName={this.props.palette.paletteName} />
			</div>
		);
	}
}
export default SingleColorPalette;
