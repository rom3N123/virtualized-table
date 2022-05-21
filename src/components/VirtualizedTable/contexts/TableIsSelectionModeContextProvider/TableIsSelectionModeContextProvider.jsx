import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

export const TableIsSelectionModeContext = createContext();

const TableIsSelectionModeContextProvider = ({ children }) => {
    const [isSelectionMode, setIsSelectionMode] = useState(false);

    const contextValue = {
        isSelectionMode,
        setIsSelectionMode,
    };

    return (
        <TableIsSelectionModeContext.Provider value={contextValue}>
            {children}
        </TableIsSelectionModeContext.Provider>
    );
};

TableIsSelectionModeContextProvider.propTypes = {
    children: node,
};

TableIsSelectionModeContextProvider.defaultProps = {
    children: null,
};

export default TableIsSelectionModeContextProvider;
