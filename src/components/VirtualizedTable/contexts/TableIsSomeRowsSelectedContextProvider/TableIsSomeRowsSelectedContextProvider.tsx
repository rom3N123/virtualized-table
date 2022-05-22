import React, { useState, createContext, ReactNode, SetStateAction, Dispatch } from 'react';

export type TableIsSomeRowsSelectedContextValue = {
    isSomeRowsSelected: boolean;
    setIsSomeRowsSelected: Dispatch<SetStateAction<boolean>>;
};

export const TableIsSomeRowsSelectedContextContext =
    createContext<TableIsSomeRowsSelectedContextValue>({
        isSomeRowsSelected: false,
        setIsSomeRowsSelected: () => {},
    });

const TableIsSomeRowsSelectedContextProvider = ({ children }: { children: ReactNode }) => {
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

export default TableIsSomeRowsSelectedContextProvider;
