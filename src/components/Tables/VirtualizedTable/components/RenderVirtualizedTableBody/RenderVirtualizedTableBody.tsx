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
	GetTableBodyProps,
	PrepareRow,
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
	RenderItem,
	RenderItemProps,
	TableRefValue,
	VirtualizedTableProps,
} from '../../VirtualizedTable';

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
> & {
	getTableBodyProps: GetTableBodyProps;
	rows: UseTableRows;
	prepareRow: PrepareRow;
	instance: FinalTableInstance<D>;
	tableRef: ForwardedRef<TableRefValue<D>>;
	width: number;
	height: number;
	outerRef?: Ref<HTMLDivElement>;
	RenderItem: Required<VirtualizedTableProps<D, ExtraItemProps>>['RenderItem'];
	ItemLoader: FC<RenderItemProps<D, ExtraItemProps>>;
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
	refs: UseRowsRefsReturn['refs'];
	highlightedRowRef: TableHighlightInstanceProps['highlightedRowRef'];
	itemSize: GetItemSize<D>;
	state: TableState;
	initializeRef: UseRowsRefsReturn['initializeRef'];
	deleteRef: UseRowsRefsReturn['deleteRef'];
	isItemLoaded: (index: number) => boolean;
	RenderItem: RenderVirtualizedTableBodyProps<D, E>['RenderItem'];
	ItemLoader: RenderItem<D, E>;
} & E;

const RenderVirtualizedTableBody =
	<D extends object, ExtraItemProps extends object = {}>({
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
	}: RenderVirtualizedTableBodyProps<D, ExtraItemProps>) =>
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

				if (outerRef) {
					if (typeof outerRef === 'function') {
						return outerRef(node);
					}

					(outerRef as MutableRefObject<HTMLDivElement>).current = node;
				}

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

		const itemData = {
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
			...itemExtraData,
		} as DefaultExtraItemData<D, ExtraItemProps>;

		const itemKey = (index: number) => {
			if (isItemLoaded(index)) {
				return getRowId!(rows[index], index);
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
						<VariableSizeList<typeof itemData>
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
