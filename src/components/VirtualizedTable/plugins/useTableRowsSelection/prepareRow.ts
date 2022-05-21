import { TableRowsSelectionInstanceProps } from './useInstance/useInstance';
import { PluginPrepareRow, TableInstance } from 'react-table';

export type TableRowsSelectionRowProps = Pick<
	TableRowsSelectionInstanceProps,
	| 'getIsSelectedRow'
	| 'clearSelectedRows'
	| 'toggleRowSelected'
	| 'toggleAllRowsSelected'
>;

const prepareRow: PluginPrepareRow<TableRowsSelectionRowProps> = (
	row,
	{ instance }
) => {
	const _instance = instance as TableInstance & TableRowsSelectionRowProps;

	/** TODO: ADD */
	// row.getSelectedRows = instance.getSelectedRows;
	row.getIsSelectedRow = _instance.getIsSelectedRow;
	row.clearSelectedRows = _instance.clearSelectedRows;
	row.toggleRowSelected = _instance.toggleRowSelected;
	row.toggleAllRowsSelected = _instance.toggleAllRowsSelected;
};

export default prepareRow;
