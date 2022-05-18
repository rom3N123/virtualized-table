import { TableHighlightInstanceProps } from './useInstance';
import { PluginPrepareRow, TableInstance } from 'react-table';

export type TableHighlightRowProps = Pick<
	TableHighlightInstanceProps,
	'onHighlightRow'
>;

const prepareRow: PluginPrepareRow<TableHighlightRowProps> = (
	row,
	{ instance }
) => {
	const _instance = instance as TableInstance & TableHighlightRowProps;

	row.onHighlightRow = _instance.onHighlightRow;
};

export default prepareRow;
