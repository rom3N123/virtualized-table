import React, { FC, ReactElement, RefObject, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import VirtualizedTable from '../components/VirtualizedTable';
import { TableImperativeHandle } from '../components/VirtualizedTable';
import columns from './columns';

export type Data = {
	id: number;
	name: string;
	age?: number;
};

const getMockRows = (length: number) =>
	Array.from({ length }, (_, i) => ({ id: i + 1, name: `Roman ${i + 1}` }));

const data: Data[] = getMockRows(10);

const TestPage: FC = (): ReactElement => {
	const listRef = useRef<VariableSizeList<Data>>(null);
	const tableRef = useRef() as RefObject<TableImperativeHandle<Data>>;

	return (
		<VirtualizedTable<Data>
			tableRef={tableRef}
			listRef={listRef}
			headerHeight={50}
			getRowId={row => row.id.toString()}
			getItemSize={(row, ref) => {
				return 100;
			}}
			data={data}
			columns={columns}
		/>
	);
};

export default TestPage;
