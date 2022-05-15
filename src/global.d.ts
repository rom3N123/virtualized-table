import 'react-table';

declare module 'react-table' {
	export interface TableOptions<D extends object>
		extends UseExpandedOptions<D>,
			UseSortByColumnOptions<D> {}

	export type GetRowId = UseTableOptions['getRowId'];

	export interface UseTableColumnProps<D extends object>
		extends UseResizeColumnsColumnProps<D>,
			UseSortByColumnProps<D>,
			{ cellProps: object } {}
}
