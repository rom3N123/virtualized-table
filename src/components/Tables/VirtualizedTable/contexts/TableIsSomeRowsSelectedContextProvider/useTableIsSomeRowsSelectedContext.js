/* eslint-disable max-len */
import { useContext } from 'react';
import { TableIsSomeRowsSelectedContextContext } from '_components/Tables/VirtualizedTable/contexts/TableIsSomeRowsSelectedContextProvider/TableIsSomeRowsSelectedContextProvider.jsx';

const useTableIsSomeRowsSelectedContext = () => {
    return useContext(TableIsSomeRowsSelectedContextContext);
};

export default useTableIsSomeRowsSelectedContext;
