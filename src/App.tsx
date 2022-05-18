import { useState } from 'react';
import VirtualizedTable from './components/Tables/VirtualizedTable';

function App() {
	return (
		<div>
			<VirtualizedTable<{ id: number }>
				getRowId={row => row.id}
				data={[{ id: 1 }]}
				columns={[]}
			/>
		</div>
	);
}

export default App;
