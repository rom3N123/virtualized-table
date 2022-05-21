import { useContext } from 'react';
import { TableRowsSelectionContext } from './TableRowsSelectionContextProvider';

const useTableRowsSelectionContext = () => {
    return useContext(TableRowsSelectionContext);
};

export default useTableRowsSelectionContext;
