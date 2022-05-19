import { useState } from 'react';
import { Column } from 'react-table';
import VirtualizedTable from './components/Tables/VirtualizedTable';
import './style.scss';

type Data = { id: string; name: string };
const data: Data[] = [
	{
		id: '1',
		name: 'Roman',
	},

	{
		id: '2',
		name: 'Roman',
	},
	{
		id: '3',
		name: 'Roman',
	},

	{
		id: '4',
		name: 'Roman',
	},
	{
		id: '5',
		name: 'Roman',
	},
];
const columns: Column<Data>[] = [
	{
		id: '1',
		Cell: 'Hello!',
	},
	{
		id: '2',
		Cell: 'Hello!',
	},
	{
		id: '3',
		Cell: 'Hello!',
	},
	{
		id: '4',
		Cell: 'Hello!',
	},
];

function App() {
	return (
		<div className='container'>
			<VirtualizedTable<Data>
				getRowId={row => row.id}
				data={data}
				columns={columns}
				getItemSize={100}
				headerHeight={50}
				ItemLoader={() => <div>Loader...</div>}
			/>
		</div>
	);
}

export default App;
