import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

export const TableRowsSelectionContext = createContext();

const TableRowsSelectionContextProvider = ({ children }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const contextValue = {
        selectedRows,
        setSelectedRows,
    };

    return (
        <TableRowsSelectionContext.Provider value={contextValue}>
            {children}
        </TableRowsSelectionContext.Provider>
    );
};

TableRowsSelectionContextProvider.propTypes = {
    children: node,
};

TableRowsSelectionContextProvider.defaultProps = {
    children: null,
};

export default TableRowsSelectionContextProvider;
