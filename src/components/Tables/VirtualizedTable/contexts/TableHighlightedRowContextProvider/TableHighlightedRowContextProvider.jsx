import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

export const TableHighlightedRowContext = createContext();

const TableHighlightedRowContextProvider = ({ children }) => {
    const [highlightedRow, setHighlightedRow] = useState(null);

    const contextValue = {
        highlightedRow,
        setHighlightedRow,
    };

    return (
        <TableHighlightedRowContext.Provider value={contextValue}>
            {children}
        </TableHighlightedRowContext.Provider>
    );
};

TableHighlightedRowContextProvider.propTypes = {
    children: node,
};

TableHighlightedRowContextProvider.defaultProps = {
    children: null,
};

export default TableHighlightedRowContextProvider;
