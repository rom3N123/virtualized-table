import { useContext } from 'react';
import { TableHighlightedRowContext } from './TableHighlightedRowContextProvider';

const useTableHighlightedRowContext = () => {
    return useContext(TableHighlightedRowContext);
};

export default useTableHighlightedRowContext;
