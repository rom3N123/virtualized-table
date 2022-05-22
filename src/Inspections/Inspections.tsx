import React, { FC, ReactElement } from 'react';
import TableIsSelectionModeContextProvider from '../components/VirtualizedTable/contexts/TableIsSelectionModeContextProvider';
import TableRowsSelectionContextProvider from '../components/VirtualizedTable/contexts/TableRowsSelectionContextProvider';
import InspectionsHeader from './components/InspectionsHeader';
import InspectionsTable from './components/InspectionsTable';

const Inspections: FC = (): ReactElement => {
    return (
        <TableIsSelectionModeContextProvider>
            <TableRowsSelectionContextProvider>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <InspectionsHeader />

                    <div style={{ flexGrow: 1 }}>
                        <InspectionsTable />
                    </div>
                </div>
            </TableRowsSelectionContextProvider>
        </TableIsSelectionModeContextProvider>
    );
};

export default Inspections;
