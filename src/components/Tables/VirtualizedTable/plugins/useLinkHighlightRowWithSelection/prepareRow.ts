import { TableHighlightInstanceProps } from './../useTableRowHighlight/useInstance';
import { PluginPrepareRow, TableInstance } from 'react-table';

export type TableLinkHighlightRowWithSelectionRowProps = Pick<
	TableHighlightInstanceProps,
	'onHighlightRow'
>;

const prepareRow: PluginPrepareRow<
	Pick<TableHighlightInstanceProps, 'onHighlightRow'>
> = (row, { instance }) => {
	const _instance = instance as TableInstance &
		TableLinkHighlightRowWithSelectionRowProps;

	row.onHighlightRow = _instance.onHighlightRow;
};

export default prepareRow;
