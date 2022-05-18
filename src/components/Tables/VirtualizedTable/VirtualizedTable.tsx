import React, {
	FC,
	ReactElement,
	forwardRef,
	memo,
	useImperativeHandle,
	Ref,
	ForwardedRef,
} from 'react';
import { VIRTUALIZED_TABLE_PLUGINS } from './VirtualizedTable.constants';
import {
	Column,
	FinalTableInstance,
	GetRowId,
	PluginHook,
	Row,
	useBlockLayout,
	useExpanded,
	useTable,
} from 'react-table';
import { HeaderRowProps } from '../../HeaderRow/HeaderRow';
import VirtualizedTableBody from './components/VirtualizedTableBody';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { RenderVirtualizedTableBodyProps } from './components/RenderVirtualizedTableBody/RenderVirtualizedTableBody';

export type GetItemSize<D extends object> =
	| number
	| ((row: Row, tableRef: ForwardedRef<TableRefValue<D>>) => number);

export type RowProps = object | ((row: Row) => object);

export type VirtualizedTableProps<D extends object> = {
	data: D[];
	columns: Column<D>[];
	getRowId: GetRowId<D>;
	getItemSize: GetItemSize<D>;
	headerHeight: number;

	extraPlugins?: PluginHook<{}, {}>[];
	TableBody?: FC<RenderVirtualizedTableBodyProps>;
	HeaderRow?: FC<HeaderRowProps>;
	TableRow?: FC;
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

export type TableRefValue<D extends object> = {
	instance: FinalTableInstance<D>;
	changeTableSelectionMode: FinalTableInstance<D>['changeTableSelectionMode'];
	enableTableSelectionMode: FinalTableInstance<D>['enableTableSelectionMode'];
	disableTableSelectionMode: FinalTableInstance<D>['disableTableSelectionMode'];
	selectedArray: FinalTableInstance<D>['selectedCacheArrayRef']['current'];
	selectedObject: FinalTableInstance<D>['selectedCacheById'];
	highlightedRow: FinalTableInstance<D>['highlightedRowRef']['current']['value'];
	clearSelectedRows: FinalTableInstance<D>['clearSelectedRows'];
	deleteRowsFromSelected: FinalTableInstance<D>['deleteRowsFromSelected'];
};

function VirtualizedTable<D extends object>(
	{
		data,
		columns,
		getRowId,
		HeaderRow,
		getItemSize,
		headerHeight,
		ItemLoader,
		RenderItem,
		hasNextPage,
		itemExtraData,
		listRef,
		isLoadingNextPage,
		loadPerPage,
		rowProps,
		onLoadPage,
		TableBody = VirtualizedTableBody,
		extraPlugins = [],
		...useTableProps
	}: VirtualizedTableProps<D>,
	ref: ForwardedRef<TableRefValue<D>>
): ReactElement {
	const plugins = [...VIRTUALIZED_TABLE_PLUGINS, ...extraPlugins];

	const instance = useTable(
		{
			data,
			columns,
			getRowId,
			...useTableProps,
		},
		useBlockLayout,
		useExpanded,
		// useSticky,
		...plugins
	) as FinalTableInstance<D>;

	useImperativeHandle(ref, () => {
		return {
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
	});

	const { getTableBodyProps, headerGroups, rows, prepareRow } =
		instance as FinalTableInstance<D>;

	return (
		<AutoSizer>
			{({ width, height }) => (
				<>
					<HeaderRow headerGroups={headerGroups} />

					<TableBody
						tableRef={ref}
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
					/>
				</>
			)}
		</AutoSizer>
	);
}

export default memo(forwardRef(VirtualizedTable));
