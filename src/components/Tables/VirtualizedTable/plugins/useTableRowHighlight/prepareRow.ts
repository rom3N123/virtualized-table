import { PluginPrepareRow } from 'react-table';

const prepareRow: PluginPrepareRow = (row, { instance }) => {
	row.onHighlightRow = instance.onHighlightRow;
	row.highlightedRow = instance.highlightedRow;
	row.previousHighlightedRowIndex = instance.previousHighlightedRowIndex;
};

export default prepareRow;
