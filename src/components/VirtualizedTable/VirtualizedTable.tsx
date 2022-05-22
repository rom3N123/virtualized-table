import React, { ReactElement, memo, useImperativeHandle } from 'react';
import { VIRTUALIZED_TABLE_PLUGINS } from './VirtualizedTable.constants';
import {
	FinalTableInstance,
	useBlockLayout,
	useExpanded,
	useTable,
} from 'react-table';
import { HeaderRow } from '../HeaderRow';
import { VirtualizedTableBody } from './components/VirtualizedTableBody';
import AutoSizer from 'react-virtualized-auto-sizer';
import { RenderVirtualizedTableRow } from './renderComponents';
import { LoadingItem } from '../LoadingItem';
import { useNewSyncHorizontalScroll } from '../../hooks';
import {
	VirtualizedTableProps,
	TableImperativeHandle,
} from './VirtualizedTable.types';
import { useSticky } from 'react-table-sticky';

const VirtualizedTable = <
	D extends object = {},
	ExtraItemProps extends object = {}
>({
	tableRef,
	data,
	columns,
	getRowId,
	Header = HeaderRow,
	getItemSize,
	headerHeight,
	hasNextPage,
	itemExtraData,
	listRef,
	isLoadingNextPage,
	loadPerPage,
	rowProps,
	onLoadPage,
	ItemLoader = LoadingItem,
	RenderItem = RenderVirtualizedTableRow,
	TableBody = VirtualizedTableBody,
	extraPlugins = [],
	...useTableProps
}: VirtualizedTableProps<D, ExtraItemProps>): ReactElement => {
	const plugins = [...VIRTUALIZED_TABLE_PLUGINS, ...extraPlugins];

	const { getContainerRef, getHeaderRef } = useNewSyncHorizontalScroll();

	const instance = useTable<D>(
		{
			data,
			columns,
			getRowId,
			autoResetExpanded: false,
			...useTableProps,
		},
		useBlockLayout,
		useExpanded,
		useSticky,
		...plugins
	) as FinalTableInstance<D>;

	const imperativeHandle: TableImperativeHandle<D> = {
		instance,
		changeTableSelectionMode: instance.changeTableSelectionMode,
		enableTableSelectionMode: instance.enableTableSelectionMode,
		disableTableSelectionMode: instance.disableTableSelectionMode,
		selectedArray: instance.selectedCacheArrayRef.current,
		selectedObject: instance.selectedCacheById,
		highlightedRow: instance.highlightedRowRef.current.value,
		clearSelectedRows: instance.clearSelectedRows,
		getSelectedRows: instance.getSelectedRows,
		deleteRowsFromSelected: instance.deleteRowsFromSelected,
	};

	useImperativeHandle(tableRef, () => imperativeHandle);

	const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
		instance;

	return (
		<div style={{ height: '100%' }}>
			<AutoSizer>
				{({ width, height }) => (
					<div {...getTableProps({ style: { width, height } })}>
						{Header && (
							<Header
								headerRef={getHeaderRef}
								headerGroups={headerGroups}
								height={headerHeight}
							/>
						)}

						<TableBody<D, ExtraItemProps>
							data={data}
							imperativeHandle={imperativeHandle}
							getItemSize={getItemSize}
							getRowId={getRowId}
							instance={instance}
							width={width}
							height={height}
							getTableBodyProps={getTableBodyProps}
							headerHeight={headerHeight}
							prepareRow={prepareRow}
							ItemLoader={ItemLoader}
							rows={rows}
							RenderItem={RenderItem}
							hasNextPage={hasNextPage}
							itemExtraData={itemExtraData}
							listRef={listRef}
							isLoadingNextPage={isLoadingNextPage}
							loadPerPage={loadPerPage}
							rowProps={rowProps}
							onLoadPage={onLoadPage}
							outerRef={getContainerRef}
						/>
					</div>
				)}
			</AutoSizer>
		</div>
	);
};

export default memo(VirtualizedTable) as typeof VirtualizedTable;
