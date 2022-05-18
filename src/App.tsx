import { useState } from 'react';
import { Column } from 'react-table';
import VirtualizedTable from './components/Tables/VirtualizedTable';

type Data = { id: string; name: string };
const data: Data[] = [
	{
		id: '1',
		name: 'Roman',
	},
];
const columns: Column<Data>[] = [
	{
		id: '1',
		Cell: 'Hello!',
	},
];

function App() {
	return (
		<div>
			<VirtualizedTable<Data>
				getRowId={row => row.id}
				data={data}
				columns={columns}
				getItemSize={100}
				headerHeight={50}
			/>
		</div>
	);
}

export default App;
