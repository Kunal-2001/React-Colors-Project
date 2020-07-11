import React, { Component } from 'react';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider from 'rc-slider';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

// Component for loading a single palette on the app
class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, format: 'hex' };
		this.levelChange = this.levelChange.bind(this);
		this.colorFormat = this.colorFormat.bind(this);
	}

	levelChange(newLevel) {
		this.setState({ level: newLevel });
	}

	colorFormat(val) {
		this.setState({ format: val });
	}

	render() {
		const { format } = this.state;
		const colorBoxes = this.props.palette.colors[this.state.level].map((c) => (
			<ColorBox
				showMore={true}
				paletteId={this.props.palette.id}
				id={c.id}
				background={c[format]}
				name={c.name}
				key={c.id}
			/>
		));

		return (
			<div className="Palette">
				<Navbar
					slider={true}
					handleChange={this.colorFormat}
					level={this.state.level}
					changeLevel={this.levelChange}
				/>
				<div className="Palette-Colors">{colorBoxes}</div>
				<PaletteFooter paletteName={this.props.palette.paletteName} />
			</div>
		);
	}
}

export default Palette;
