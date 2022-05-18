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

export type GetItemSize =
	| number
	| ((row: Row, tableRef: ForwardedRef<TableRefValue>) => number);

export type RowProps = object | ((row: Row) => object);

export type VirtualizedTableProps = {
	data: object[];
	columns: Column[];
	getRowId: GetRowId;
	extraPlugins?: PluginHook<{}, {}>[];
	HeaderRow: FC<HeaderRowProps>;
	TableBody: FC;
	TableRow: FC;
	getItemSize: GetItemSize;
	headerHeight: number;

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

export type TableRefValue = {
	instance: FinalTableInstance;
	changeTableSelectionMode: FinalTableInstance['changeTableSelectionMode'];
	enableTableSelectionMode: FinalTableInstance['enableTableSelectionMode'];
	disableTableSelectionMode: FinalTableInstance['disableTableSelectionMode'];
	selectedArray: FinalTableInstance['selectedCacheArrayRef']['current'];
	selectedObject: FinalTableInstance['selectedCacheById'];
	highlightedRow: FinalTableInstance['highlightedRowRef']['current']['value'];
	clearSelectedRows: FinalTableInstance['clearSelectedRows'];
	deleteRowsFromSelected: FinalTableInstance['deleteRowsFromSelected'];
};

const VirtualizedTable = memo(
	forwardRef<TableRefValue, VirtualizedTableProps>(
		(
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
			},
			ref
		): ReactElement => {
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
			) as FinalTableInstance;

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
				instance as FinalTableInstance;

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
	)
);

export default VirtualizedTable;
