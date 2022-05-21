import { FinalTableInstance } from 'react-table';
import { RowWithProps } from 'react-table';
import { TableHighlightInstanceProps } from './useInstance';

export type TableHighlightRowProps<D extends object> = Pick<
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
