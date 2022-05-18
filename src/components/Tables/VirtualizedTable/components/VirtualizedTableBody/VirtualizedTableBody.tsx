import React, { ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RenderVirtualizedTableBody, {
	RenderVirtualizedTableBodyProps,
} from '../RenderVirtualizedTableBody/RenderVirtualizedTableBody';

function VirtualizedTableBody<
	D extends object,
	ExtraItemProps extends object = {}
>({ ...props }: RenderVirtualizedTableBodyProps<D>): ReactElement {
	return (
		<DragDropContext onDragEnd={() => {}}>
			<Droppable droppableId='table-droppable' mode='virtual'>
				{RenderVirtualizedTableBody<D, ExtraItemProps>(props)}
			</Droppable>
		</DragDropContext>
	);
}

export default VirtualizedTableBody;
