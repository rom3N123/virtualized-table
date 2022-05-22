import { RowWithProps, FinalTableInstance } from 'react-table';
import { TableRowsSelectionInstanceProps } from './useInstance/useInstance';

export type TableRowsSelectionRowProps<D extends object> = Pick<
	TableRowsSelectionInstanceProps<D>,
	| 'getIsSelectedRow'
	| 'clearSelectedRows'
	| 'toggleRowSelected'
	| 'toggleAllRowsSelected'
	| 'getSelectedRows'
>;

const prepareRow = <D extends object>(
	row: RowWithProps<D>,
	{ instance }: { instance: FinalTableInstance<D> }
) => {
	row.getSelectedRows = instance.getSelectedRows;
	row.getIsSelectedRow = instance.getIsSelectedRow;
	row.clearSelectedRows = instance.clearSelectedRows;
	row.toggleRowSelected = instance.toggleRowSelected;
	row.toggleAllRowsSelected = instance.toggleAllRowsSelected;
};

export default prepareRow;
