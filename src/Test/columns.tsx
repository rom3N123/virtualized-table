import { FC } from 'react';
import { CellRenderer, Column, HeaderRenderer } from 'react-table';
import VirtualizedTableCheckboxCell from '../components/Tables/VirtualizedTable/cells/column/VirtualizedTableCheckboxCell';
import { Data } from './TestPage';

const NameCell: CellRenderer<Data, string> = ({ value }) => {
	return <div style={{ color: 'blue' }}>{value}</div>;
};
const Header: HeaderRenderer<Data, string> = () => {
	return (
		<div style={{ backgroundColor: 'blue', color: '#fff', height: '100%' }}>
			Hello!
		</div>
	);
};

const columns: Column<Data>[] = [
	{
		id: 'dnd',
		Header,
		Cell: VirtualizedTableCheckboxCell,
		accessor: 'age',
		grow: 1,
		minWidth: 1000,
	},
	{
		id: '1',
		Header,
		accessor: 'name',
		Cell: NameCell,
		grow: 1,
		minWidth: 1000,
	},
];

export default columns;
