import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, handleDeleteColor }) => {
	return (
		<div style={{ height: '100%' }}>
			{colors.map((color, index) => (
				<DraggableColorBox
					index={index}
					key={color.name}
					handleClick={() => handleDeleteColor(color.name)}
					color={color.color}
					name={color.name}
				/>
			))}
		</div>
	);
});

export default DraggableColorList;
