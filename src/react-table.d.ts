import { TableRowsSelectionInstanceProps } from './components/Tables/VirtualizedTable/plugins/useTableRowsSelection/useInstance/useInstance';
import { TableCoreInstanceProps } from './components/Tables/VirtualizedTable/plugins/useTableCore/useInstance/useInstance';
import { TableLinkHighlightRowWithSelectionInstanceProps } from './components/Tables/VirtualizedTable/plugins/useLinkHighlightRowWithSelection/useInstance';
import { TableSelectionModeRowProps } from './components/Tables/VirtualizedTable/plugins/useTableSelectionMode/defaultGetTableSelectionModeProps';
import { UseTableSelectionModeRowProps } from './components/Tables/VirtualizedTable/plugins/useTableSelectionMode/prepareRow';
import 'react-table';
import { TableHighlightInstanceProps } from './components/Tables/VirtualizedTable/plugins/useTableRowHighlight/useInstance';
import { TableSelectionModeInstanceProps } from './components/Tables/VirtualizedTable/plugins/useTableSelectionMode/useInstance';

declare module 'react-table' {
	export interface TableOptions<D extends object>
		extends UseExpandedOptions<D>,
			UseSortByColumnOptions<D> {}

	export type GetRowId = UseTableOptions['getRowId'];
	export type GetTableBodyProps = UseTableInstanceProps['getTableBodyProps'];
	export type UseTableRows = UseTableInstanceProps['rows'];
	export type PrepareRow = UseTableInstanceProps['prepareRow'];

	export type PluginPrepareRow<P extends object = {}, D extends object = {}> = (
		row: Row<D> & P,
		meta: Meta<D>
	) => void;

	export type TableInstanceWithProps<P extends object> = TableInstance & P;

	export type FinalTableInstance<ExtraProps extends object = {}> =
		TableInstanceWithProps<
			TableCoreInstanceProps &
				TableLinkHighlightRowWithSelectionInstanceProps &
				TableHighlightInstanceProps &
				TableRowsSelectionInstanceProps &
				TableSelectionModeInstanceProps &
				ExtraProps
		>;

	export interface Hooks<D extends object = {}, P extends object>
		extends UseTableHooks<D> {
		prepareRow: Array<PluginPrepareRow<P, D>>;
	}

	export interface TableRowProps
		extends TableCommonProps,
			TableSelectionModeRowProps {}

	export interface PluginHook<D extends object = {}, P extends object> {
		(hooks: Hooks<D, P>): void;
	}

	export interface UseTableColumnProps<D extends object>
		extends UseResizeColumnsColumnProps<D>,
			UseSortByColumnProps<D>,
			{ cellProps: object } {}
}
