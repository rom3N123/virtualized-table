import React, { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import useRenderRowHighlight from './useRenderRowHighlight';
import TableRow from '../../components/TableRow';
import { RenderItemProps } from '../../VirtualizedTable';
import { RowRefMethods } from '../../plugins/useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import { RowCellRenderProps } from '../../components/RenderVirtualizedTableBody/RenderVirtualizedTableBody';

function RenderTableRow<D extends object = {}, E extends object = {}>(
	{ index, style, data }: RenderItemProps<D, E>,
	ref: ForwardedRef<RowRefMethods>
) {
	const {
		rows,
		prepareRow,
		highlightedRowRef,
		isItemLoaded,
		getRowId,
		ItemLoader,
	} = data;
	const row = rows[index];

	const isLoaded = isItemLoaded(index);

	if (!isLoaded) {
		return <ItemLoader index={index} style={style} data={data} />;
	}

	const { original } = row;

	prepareRow(row);

	const { isSelected, setIsSelected, isHighlighted, setIsHighlighted } =
		useRenderRowHighlight({
			highlightedRowRef,
			row,
		});

	const isHighlightedOrSelected = isHighlighted || isSelected;

	useImperativeHandle(ref, () => ({
		row,
		isSelected,
		setIsSelected,
		setIsHighlighted,
	}));

	const onHighlightRowHandler = (event: MouseEvent) => {
		row.onHighlightRow(index, event);
	};

	const draggableId = getRowId!(original, index);

	return (
		<Draggable draggableId={draggableId} index={index}>
			{({ innerRef, draggableProps, dragHandleProps }) => {
				const { style: draggableStyles, ...otherDraggableProps } =
					draggableProps;

				const renderProps: RowCellRenderProps = {
					isSelected,
					isHighlighted: isHighlightedOrSelected,
					draggableProps,
					dragHandleProps,
				};

				return (
					<TableRow
						innerRef={innerRef}
						isHighlighted={isHighlightedOrSelected}
						onClick={onHighlightRowHandler}
						row={row}
						renderProps={{
							...renderProps,
							...data,
						}}
						{...otherDraggableProps}
						{...row.getRowProps({
							style: {
								...style,
								...draggableStyles,
							},
						})}
					/>
				);
			}}
		</Draggable>
	);
}

export default forwardRef(RenderTableRow) as typeof RenderTableRow;
