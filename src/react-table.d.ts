import { TableSelectionModeRowProps } from './components/Tables/VirtualizedTable/plugins/useTableSelectionMode/defaultGetTableSelectionModeProps';
import { UseTableSelectionModeRowProps } from './components/Tables/VirtualizedTable/plugins/useTableSelectionMode/prepareRow';
import 'react-table';

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
