import React, {
	FC,
	ReactElement,
	memo,
	useImperativeHandle,
	Ref,
	ForwardedRef,
	MutableRefObject,
	RefObject,
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
import Header, { HeaderRowProps } from '../../HeaderRow/HeaderRow';
import VirtualizedTableBody from './components/VirtualizedTableBody';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
	DefaultExtraItemData,
	RenderVirtualizedTableBodyProps,
} from './components/RenderVirtualizedTableBody/RenderVirtualizedTableBody';
import RenderVirtualizedTableRow from './renderComponents/RenderVirtualizedTableRow';
import LoadingItem from '../../LoadingItem';
import { RowRef } from './plugins/useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import useNewSyncHorizontalScroll from '../../../hooks/useNewSyncHorizontalScroll';

export type GetItemSize<D extends object> =
	| number
	| ((row: Row<D>, tableRef: TableRefValue<D>) => number);

export type RowProps<D extends object> = object | ((row: Row<D>) => object);

export type RenderItemProps<
	D extends object = {},
	ExtraItemProps extends object = {}
> = ListChildComponentProps<DefaultExtraItemData<D, ExtraItemProps>>;

export type RenderItemPropsWithRef<
	D extends object = {},
	E extends object = {}
> = RenderItemProps<D, E> & { ref: RowRef };

export type RenderItem<
	D extends object,
	E extends object = {},
	WithRefProp extends boolean = false
> = FC<
	RenderItemProps<D, E> & (WithRefProp extends true ? { ref: RowRef } : {})
>;

export type VirtualizedTableProps<
	D extends object = {},
	ExtraItemProps extends object = {}
> = {
	data: D[];
	columns: Column<D>[];
	getRowId: GetRowId<D>;
	getItemSize: GetItemSize<D>;
	headerHeight: number;

	tableRef: MutableRefObject<TableRefValue<D> | undefined>;
	extraPlugins?: PluginHook<D, {}>[];
	TableBody?: <D extends object, ExtraItemProps extends object = {}>(
		props: RenderVirtualizedTableBodyProps<D, ExtraItemProps>
	) => ReactElement;
	HeaderRow?: FC<HeaderRowProps<D>>;
	TableRow?: FC;
	listRef?: Ref<VariableSizeList>;
	RenderItem?: RenderItem<D, ExtraItemProps, true>;
	ItemLoader?: FC<RenderItemProps<D, ExtraItemProps>>;
	isLoadingNextPage?: boolean;
	onLoadPage?: () => any;
	loadPerPage?: number;
	hasNextPage?: boolean;
	rowProps?: RowProps<D>;
	className?: string;
	itemExtraData?: ExtraItemProps;
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
	getSelectedRows: FinalTableInstance<D>['getSelectedRows'];
};

function VirtualizedTable<
	D extends object = {},
	ExtraItemProps extends object = {}
>({
	tableRef,
	data,
	columns,
	getRowId,
	HeaderRow = Header,
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
}: VirtualizedTableProps<D, ExtraItemProps>): ReactElement {
	const plugins = [...VIRTUALIZED_TABLE_PLUGINS, ...extraPlugins];

	const { getContainerRef, getHeaderRef } = useNewSyncHorizontalScroll();

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

	const imperativeHandle: TableRefValue<D> = {
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
		<AutoSizer>
			{({ width, height }) => (
				<div {...getTableProps({ style: { width, height } })}>
					{HeaderRow && (
						<HeaderRow
							headerRef={getHeaderRef}
							headerGroups={headerGroups}
							height={headerHeight}
							fullWidthHeader
						/>
					)}

					<TableBody<D, ExtraItemProps>
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
	);
}

export default memo(VirtualizedTable) as typeof VirtualizedTable;
