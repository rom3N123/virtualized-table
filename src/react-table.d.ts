import 'react-table';

declare module 'react-table' {
	export interface TableOptions<D extends object>
		extends UseExpandedOptions<D>,
			UseSortByColumnOptions<D> {}

	export type GetRowId = UseTableOptions['getRowId'];
	export type GetTableBodyProps = UseTableInstanceProps['getTableBodyProps'];
	export type UseTableRows = UseTableInstanceProps['rows'];
	export type PrepareRow = UseTableInstanceProps['prepareRow'];

	export interface UseTableColumnProps<D extends object>
		extends UseResizeColumnsColumnProps<D>,
			UseSortByColumnProps<D>,
			{ cellProps: object } {}
}
