import React, { FC, ReactElement } from 'react';
import { Column, TableCellRenderer } from 'react-table';
import VirtualizedTable from '../components/Tables/VirtualizedTable';
import VirtualizedTableCheckboxCell from '../components/Tables/VirtualizedTable/cells/column/VirtualizedTableCheckboxCell';

type Data = {
	id: number;
	name: string;
	age?: number;
};

const getMockRows = (length: number) =>
	Array.from({ length }, (_, i) => ({ id: i + 1, name: `Roman ${i + 1}` }));

const data: Data[] = getMockRows(10);

const NameCell: TableCellRenderer<Data, string> = ({ value }) => {
	return <div style={{ color: 'blue' }}>{value}</div>;
};

const columns: Column<Data>[] = [
	{ id: 'dnd', Cell: VirtualizedTableCheckboxCell, accessor: 'age' },
	{
		id: '1',
		accessor: 'name',
		Cell: NameCell,
	},
];

const TestPage: FC = (): ReactElement => {
	return (
		<VirtualizedTable<Data>
			headerHeight={50}
			getRowId={row => row.id.toString()}
			getItemSize={50}
			data={data}
			columns={columns}
			ItemLoader={() => <div>...Loader</div>}
		/>
	);
};

export default TestPage;
