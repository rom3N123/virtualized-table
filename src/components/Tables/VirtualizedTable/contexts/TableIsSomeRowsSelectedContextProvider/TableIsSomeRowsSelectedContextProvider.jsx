import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

export const TableIsSomeRowsSelectedContextContext = createContext();

const TableIsSomeRowsSelectedContextProvider = ({ children }) => {
    const [isSomeRowsSelected, setIsSomeRowsSelected] = useState(false);

    const contextValue = {
        isSomeRowsSelected,
        setIsSomeRowsSelected,
    };

    return (
        <TableIsSomeRowsSelectedContextContext.Provider value={contextValue}>
            {children}
        </TableIsSomeRowsSelectedContextContext.Provider>
    );
};

TableIsSomeRowsSelectedContextProvider.propTypes = {
    children: node,
};

TableIsSomeRowsSelectedContextProvider.defaultProps = {
    children: null,
};

export default TableIsSomeRowsSelectedContextProvider;
