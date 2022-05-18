import React, {
	FC,
	ForwardedRef,
	MutableRefObject,
	ReactElement,
	Ref,
	useRef,
} from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import {
	FinalTableInstance,
	GetRowId,
	GetTableBodyProps,
	PrepareRow,
	Row,
	TableState,
	UseTableRows,
} from 'react-table';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { UseRowsRefsReturn } from '../../plugins/useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import { TableHighlightInstanceProps } from '../../plugins/useTableRowHighlight/useInstance';
import RenderVirtualizedTableRowWithRef from '../../renderComponents/RenderVirtualizedTableRow/RenderVirtualizedTableRowWithRef';
import {
	GetItemSize,
	RowProps,
	TableRefValue,
	VirtualizedTableProps,
} from '../../VirtualizedTable';

export type RenderVirtualizedTableBodyProps = Pick<
	VirtualizedTableProps,
	| 'getItemSize'
	| 'getRowId'
	| 'rowProps'
	| 'hasNextPage'
	| 'listRef'
	| 'isLoadingNextPage'
	| 'headerHeight'
	| 'itemExtraData'
	| 'RenderItem'
	| 'ItemLoader'
	| 'loadPerPage'
	| 'onLoadPage'
> & {
	getTableBodyProps: GetTableBodyProps;
	rows: UseTableRows;
	prepareRow: PrepareRow;
	instance: FinalTableInstance;
	tableRef: ForwardedRef<TableRefValue>;
	width: number;
	height: number;
	outerRef?: Ref<HTMLDivElement>;
};

export type DefaultExtraItemData<D extends object = {}> = D & {
	provided: DroppableProvided;
	getRowId: GetRowId;
	selectedCacheById: FinalTableInstance['selectedCacheById'];
	refs: UseRowsRefsReturn['refs'];
	highlightedRowRef: TableHighlightInstanceProps['highlightedRowRef'];
	prepareRow: PrepareRow;
	rows: Row[];
	itemSize: GetItemSize;
	state: TableState;
	initializeRef: UseRowsRefsReturn['initializeRef'];
	deleteRef: UseRowsRefsReturn['deleteRef'];
	isItemLoaded: (index: number) => boolean;
	rowProps?: RowProps;
	RenderItem?: FC;
	ItemLoader?: FC;
};

const RenderVirtualizedTableBody =
	({
		outerRef,
		rows,
		getItemSize,
		getTableBodyProps,
		prepareRow,
		getRowId,
		rowProps,
		hasNextPage,
		listRef,
		isLoadingNextPage,
		headerHeight,
		itemExtraData,
		instance,
		RenderItem,
		ItemLoader,
		onLoadPage,
		tableRef,
		width,
		height,
		loadPerPage = 10,
	}: RenderVirtualizedTableBodyProps) =>
	(provided: DroppableProvided): ReactElement => {
		const { innerRef, droppableProps } = provided;

		const resultListRef = listRef || useRef<VariableSizeList>(null);

		const {
			selectedCacheById,
			refs,
			highlightedRowRef,
			state,
			initializeRef,
			deleteRef,
		} = instance;

		const getInnerRef =
			(innerRef: DroppableProvided['innerRef']) => (node: HTMLDivElement) => {
				innerRef(node);

				if (typeof outerRef === 'function') {
					return outerRef(node);
				}

				(outerRef as MutableRefObject<HTMLDivElement>).current = node;

				return node;
			};

		let itemCount = hasNextPage ? rows.length + 1 : rows.length;

		if (isLoadingNextPage) {
			itemCount = rows.length + loadPerPage;
		}

		const isItemLoaded = (index: number) => {
			return !hasNextPage || index < rows.length;
		};

		const itemSize = (index: number): number => {
			return typeof getItemSize === 'function'
				? getItemSize(rows[index], tableRef)
				: getItemSize;
		};

		const itemData: DefaultExtraItemData = {
			...itemExtraData,
			provided,
			getRowId,
			selectedCacheById,
			refs,
			highlightedRowRef,
			prepareRow,
			rows,
			itemSize: getItemSize,
			state,
			initializeRef,
			deleteRef,
			RenderItem,
			isItemLoaded,
			ItemLoader,
			rowProps,
		};

		const itemKey = (index: number) => {
			if (isItemLoaded(index)) {
				return getRowId(rows[index], tableRef);
			}

			return index;
		};

		return (
			<div
				ref={getInnerRef(innerRef)}
				{...getTableBodyProps()}
				{...droppableProps}
			>
				<InfiniteLoader
					itemCount={itemCount}
					loadMoreItems={() => {
						onLoadPage?.();
					}}
					isItemLoaded={isItemLoaded}
				>
					{({ onItemsRendered }) => (
						<VariableSizeList
							ref={resultListRef}
							itemKey={itemKey}
							outerRef={outerRef}
							width={width}
							height={height - headerHeight}
							innerRef={innerRef}
							itemSize={itemSize}
							itemCount={itemCount}
							itemData={itemData}
							onItemsRendered={onItemsRendered}
							className='variable-size-list'
						>
							{RenderVirtualizedTableRowWithRef}
						</VariableSizeList>
					)}
				</InfiniteLoader>
			</div>
		);
	};

export default RenderVirtualizedTableBody;
