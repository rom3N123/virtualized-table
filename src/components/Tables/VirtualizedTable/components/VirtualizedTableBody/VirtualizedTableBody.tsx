import React, { FC, ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const VirtualizedTableBody: FC = (): ReactElement => {
	return (
		<DragDropContext onDragEnd={() => {}}>
			<Droppable droppableId='table-droppable' mode='virtual'>
				{({ innerRef }) => <div></div>}
			</Droppable>
		</DragDropContext>
	);
};

export default VirtualizedTableBody;
