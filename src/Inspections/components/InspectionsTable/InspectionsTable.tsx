import React, { FC, ReactElement } from 'react';
import { CellRenderer, Column, HeaderRenderer } from 'react-table';
import VirtualizedTable from '../../../components/VirtualizedTable';
import useObservable from '../../../hooks/useObservable';
import { InspectionData } from '../../Inspections.types';

const CheckboxHeaderCell: HeaderRenderer<InspectionData, string> = ({
    isSelectionModeObservable,
    changeTableSelectionMode,
}) => {
    const isSelectionMode = useObservable(isSelectionModeObservable);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <button onClick={changeTableSelectionMode}>{isSelectionMode ? 'OFF' : 'ON'}</button>
        </div>
    );
};

const CheckboxCell: CellRenderer<InspectionData, string> = ({ isSelectionModeObservable }) => {
    const isSelectionMode = useObservable(isSelectionModeObservable);

    return <div>{isSelectionMode ? 'IS' : 'IS NOT'}</div>;
};

const columns: Column<InspectionData>[] = [
    {
        id: 'cell',
        Header: CheckboxHeaderCell,
        Cell: CheckboxCell,
        accessor: 'age',
    },
];
const data: InspectionData[] = [
    {
        name: 'Roman',
        age: 19,
    },
    {
        name: 'Roman',
        age: 19,
    },
    {
        name: 'Roman',
        age: 19,
    },
    {
        name: 'Roman',
        age: 19,
    },
    {
        name: 'Roman',
        age: 19,
    },
    {
        name: 'Roman',
        age: 19,
    },
    {
        name: 'Roman',
        age: 19,
    },
].map((row, idx) => ({ ...row, id: idx + 1 }));

const InspectionsTable: FC = (): ReactElement => {
    return (
        <VirtualizedTable<InspectionData>
            data={data}
            columns={columns}
            getRowId={(row) => row.id.toString()}
            getItemSize={50}
            headerHeight={50}
        />
    );
};

export default InspectionsTable;
