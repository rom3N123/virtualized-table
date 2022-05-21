import { RowRef } from './plugins/useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import { ReactElement, FC, Ref, RefObject } from 'react';
import {
	Column,
	GetRowId,
	PluginHook,
	Row,
	FinalTableInstance,
} from 'react-table';
import {
	RenderVirtualizedTableBodyProps,
	DefaultExtraItemData,
} from './components/RenderVirtualizedTableBody/RenderVirtualizedTableBody.types';
import { HeaderRowProps } from '../HeaderRow/HeaderRow';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

export type GetItemSize<D extends object> =
	| number
	| ((row: Row<D>, tableRef: TableImperativeHandle<D>) => number);

export type VirtualizedTableProps<
	D extends object = {},
	ExtraItemProps extends object = {}
> = {
	data: D[];
	columns: Column<D>[];
	getRowId: GetRowId<D>;
	getItemSize: GetItemSize<D>;
	headerHeight: number;
	tableRef: RefObject<TableImperativeHandle<D>>;
	extraPlugins?: PluginHook<D, any>[];
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

export type RowProps<D extends object> = object | ((row: Row<D>) => object);

export type RenderItemProps<
	D extends object = {},
	ExtraItemProps extends object = {}
> = ListChildComponentProps<DefaultExtraItemData<D, ExtraItemProps>>;

type RowRefProp<D extends object> = {
	ref: RowRef<D>;
};

export type RenderItemPropsWithRef<
	D extends object = {},
	E extends object = {}
> = RenderItemProps<D, E> & RowRefProp<D>;

export type RenderItem<
	D extends object,
	E extends object = {},
	WithRefProp extends boolean = false
> = FC<RenderItemProps<D, E> & (WithRefProp extends true ? RowRefProp<D> : {})>;

export type TableImperativeHandle<D extends object> = {
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
