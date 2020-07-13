import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import './App.css';
import seedColors from './seedColors';
import generatePalette from './colorHelper';
import SingleColorPalette from './SingleColorPalette';
import NewSinglePalette from './NewSinglePalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class App extends Component {
	constructor(props) {
		super(props);

		const savedPalettes = JSON.parse(window.localStorage.getItem('allPalettes'));

		this.state = { palettes: savedPalettes || seedColors };
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}
	findPalette(id) {
		return this.state.palettes.find(function(palette) {
			return palette.id === id;
		});
	}

	deletePalette(id) {
		this.setState(
			(st) => ({ palettes: st.palettes.filter((palette) => palette.id !== id) }),
			this.syncLocalStorage
		);
	}

	savePalette(newPalette) {
		this.setState({ palettes: [ ...this.state.palettes, newPalette ] }, this.syncLocalStorage);
	}

	syncLocalStorage() {
		window.localStorage.setItem('allPalettes', JSON.stringify(this.state.palettes));
	}

	render() {
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="fade" timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path="/palette/new"
									render={(routeProps) => (
										<div className="page">
											<NewSinglePalette
												allPalettes={this.state.palettes}
												savePalette={this.savePalette}
												{...routeProps}
											/>
										</div>
									)}
								/>
								<Route
									exact
									path="/"
									render={(routeProps) => (
										<div className="page">
											<PaletteList
												deletePalette={this.deletePalette}
												palettes={this.state.palettes}
												{...routeProps}
											/>
										</div>
									)}
								/>
								<Route
									exact
									path="/palette/:id"
									render={(routeProps) => (
										<div className="page">
											<Palette
												palette={generatePalette(this.findPalette(routeProps.match.params.id))}
											/>
										</div>
									)}
								/>
								<Route
									exact
									path="/palette/:paletteId/:colorId"
									render={(routeProps) => (
										<div className="page">
											<SingleColorPalette
												paletteId={routeProps.match.params.paletteId}
												colorId={routeProps.match.params.colorId}
												palette={generatePalette(
													this.findPalette(routeProps.match.params.paletteId)
												)}
											/>
										</div>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>

			// <div>
			// 	<Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}

export default App;
