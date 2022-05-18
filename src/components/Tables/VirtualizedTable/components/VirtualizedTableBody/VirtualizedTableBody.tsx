import React, { FC, ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RenderVirtualizedTableBody, {
	RenderVirtualizedTableBodyProps,
} from '../RenderVirtualizedTableBody/RenderVirtualizedTableBody';

const VirtualizedTableBody: FC<RenderVirtualizedTableBodyProps> = ({
	...props
}): ReactElement => {
	return (
		<DragDropContext onDragEnd={() => {}}>
			<Droppable droppableId='table-droppable' mode='virtual'>
				{RenderVirtualizedTableBody(props)}
			</Droppable>
		</DragDropContext>
	);
};

export default VirtualizedTableBody;
