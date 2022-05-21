import { CellRenderer, Column, HeaderRenderer } from 'react-table';
import HeaderCell from './cells/HeaderCell';
import { Data } from './TestPage';

const NameCell: CellRenderer<Data, string> = ({ value }) => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(0,0,0, .2)',
				width: '100%',
				height: '100%',
			}}
		>
			{value}
		</div>
	);
};

const H: HeaderRenderer<Data, string> = () => {
	return <div>Hello</div>;
};

const columns: Column<Data>[] = [
	{
		id: 'dnd',
		Header: H,
		Cell: NameCell,
		accessor: 'age',
		grow: 1,
		minWidth: 1000,
	},
	{
		id: '1',
		Header: () => <HeaderCell value='Header 1' />,
		accessor: 'name',
		Cell: NameCell,
		grow: 1,
		minWidth: 1000,
	},
];

export default columns;
