import React, {
	MutableRefObject,
	ReactElement,
	RefObject,
	useRef,
} from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import RenderVirtualizedTableRowWithRef from '../../renderComponents/RenderVirtualizedTableRow/RenderVirtualizedTableRowWithRef';
import {
	RenderVirtualizedTableBodyProps,
	DefaultExtraItemData,
} from './RenderVirtualizedTableBody.types';

const RenderVirtualizedTableBody =
	<D extends object, ExtraItemProps extends object = {}>({
		data,
		rows,
		outerRef,
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
		width,
		height,
		imperativeHandle,
		loadPerPage = 10,
	}: RenderVirtualizedTableBodyProps<D, ExtraItemProps>) =>
	(provided: DroppableProvided): ReactElement => {
		const { innerRef, droppableProps } = provided;

		const resultListRef = (listRef ||
			useRef<VariableSizeList>(null)) as RefObject<VariableSizeList>;

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
				? getItemSize(rows[index], imperativeHandle)
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
				return getRowId!(data[index], index);
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
