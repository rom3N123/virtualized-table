import React, { FC, ReactElement } from 'react';
import { CellRenderer, Column } from 'react-table';
import VirtualizedTable from '../components/Tables/VirtualizedTable';

type Data = {
	id: number;
	name: string;
	age?: number;
};

const data: Data[] = [
	{
		name: 'Roman',
	},
].map(row => ({ ...row, id: Date.now() }));

const NameCell: CellRenderer<Data, string> = ({ value }) => {
	return <div style={{ color: 'blue' }}>{value}</div>;
};

const columns: Column<Data>[] = [
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
