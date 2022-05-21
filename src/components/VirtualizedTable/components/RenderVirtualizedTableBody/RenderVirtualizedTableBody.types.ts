import { TableHighlightInstanceProps } from './../../plugins/useTableRowHighlight/useInstance';
import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import {
	GetTableBodyProps,
	FinalTableInstance,
	PrepareRow,
	UseTableRows,
	TableState,
} from 'react-table';
import {
	GetItemSize,
	RenderItem,
	RenderItemProps,
	TableImperativeHandle,
	VirtualizedTableProps,
} from '../../VirtualizedTable.types';
import { FC, Ref } from 'react';
import { UseRowsRefsReturn } from '../../plugins/useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';

export type RenderVirtualizedTableBodyProps<
	D extends object,
	ExtraItemProps extends object = {}
> = Pick<
	VirtualizedTableProps<D, ExtraItemProps>,
	| 'getItemSize'
	| 'getRowId'
	| 'rowProps'
	| 'hasNextPage'
	| 'listRef'
	| 'isLoadingNextPage'
	| 'headerHeight'
	| 'itemExtraData'
	| 'loadPerPage'
	| 'onLoadPage'
	| 'data'
> & {
	getTableBodyProps: GetTableBodyProps;
	rows: UseTableRows<D>;
	prepareRow: PrepareRow;
	instance: FinalTableInstance<D>;
	width: number;
	height: number;
	outerRef?: Ref<HTMLDivElement>;
	RenderItem: Required<VirtualizedTableProps<D, ExtraItemProps>>['RenderItem'];
	ItemLoader: FC<RenderItemProps<D, ExtraItemProps>>;
	imperativeHandle: TableImperativeHandle<D>;
};

export type RowCellRenderProps = {
	isSelected: boolean;
	isHighlighted: boolean;
	draggableProps: DraggableProvided['draggableProps'];
	dragHandleProps: DraggableProvided['dragHandleProps'];
};

export type DefaultExtraItemData<
	D extends object,
	E extends object = {}
> = Pick<
	RenderVirtualizedTableBodyProps<D, E>,
	'getRowId' | 'rows' | 'prepareRow' | 'rowProps'
> & {
	provided: DroppableProvided;
	selectedCacheById: FinalTableInstance<D>['selectedCacheById'];
	refs: UseRowsRefsReturn<D>['refs'];
	highlightedRowRef: TableHighlightInstanceProps<D>['highlightedRowRef'];
	itemSize: GetItemSize<D>;
	state: TableState;
	initializeRef: UseRowsRefsReturn<D>['initializeRef'];
	deleteRef: UseRowsRefsReturn<D>['deleteRef'];
	isItemLoaded: (index: number) => boolean;
	RenderItem: RenderVirtualizedTableBodyProps<D, E>['RenderItem'];
	ItemLoader: RenderItem<D, E>;
} & E;
