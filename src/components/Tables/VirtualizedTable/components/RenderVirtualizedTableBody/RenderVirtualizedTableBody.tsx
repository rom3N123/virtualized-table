import React, { FC, MutableRefObject, ReactElement, Ref, useRef } from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import {
	GetRowId,
	GetTableBodyProps,
	PrepareRow,
	Row,
	UseTableInstanceProps,
	UseTableRows,
} from 'react-table';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import RenderVirtualizedTableRowWithRef from '../../renderComponents/RenderVirtualizedTableRow/RenderVirtualizedTableRowWithRef';

export type RowProps = object | ((row: Row) => object);
export type GetItemSize = number | ((row: Row) => number);

type RenderVirtualizedTableBodyProps = {
	getTableBodyProps: GetTableBodyProps;
	rows: UseTableRows;
	prepareRow: PrepareRow;
	getRowId: GetRowId;
	TableRow: FC;
	outerRef: Ref<HTMLDivElement>;
	getItemSize: GetItemSize;
	headerHeight: number;
	width: number;
	height: number;
	instance: UseTableInstanceProps<object>;
	tableRef: MutableRefObject<{}>;

	listRef?: Ref<VariableSizeList>;
	RenderItem?: FC;
	ItemLoader?: FC;
	isLoadingNextPage?: boolean;
	onLoadPage?: () => any;
	loadPerPage?: number;
	hasNextPage?: boolean;
	rowProps?: RowProps;
	className?: string;
	itemExtraData?: object;
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
		width,
		height,
		headerHeight,
		itemExtraData,
		instance,
		RenderItem,
		ItemLoader,
		loadPerPage = 10,
		onLoadPage,
	}: RenderVirtualizedTableBodyProps) =>
	(provided: DroppableProvided): ReactElement => {
		const { innerRef, droppableProps } = provided;

		const resultListRef = listRef || useRef<VariableSizeList>(null);

		const {
			selectedCacheRef,
			rowsRefs,
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
				? getItemSize(tableRef.current.instance.rows[index], tableRef)
				: getItemSize;
		};

		const itemData = {
			...itemExtraData,
			provided,
			getRowId,
			selectedCacheRef,
			rowsRefs,
			highlightedRowRef,
			prepareRow,
			rows,
			itemSize,
			state,
			initializeRef,
			deleteRef,
			RenderItem,
			isItemLoaded,
			ItemLoader,
		};

		const itemKey = (index: number) => {
			if (isItemLoaded(index)) {
				return getRowId(rows[index]);

				// return getRowId(rows[index], tableRef);
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
