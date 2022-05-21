import { RowWithProps, FinalTableInstance } from 'react-table';
import { TableHighlightInstanceProps } from './../useTableRowHighlight/useInstance';

export type TableLinkHighlightRowWithSelectionRowProps<D extends object> = Pick<
	TableHighlightInstanceProps<D>,
	'onHighlightRow'
>;

const prepareRow = <D extends object>(
	row: RowWithProps<D>,
	{ instance }: { instance: FinalTableInstance<D> }
) => {
	row.onHighlightRow = instance.onHighlightRow;
};

export default prepareRow;
