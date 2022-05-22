import { useContext } from 'react';
import { TableRowsSelectionContext } from './TableRowsSelectionContextProvider';

export const useTableRowsSelectionContext = () => {
	return useContext(TableRowsSelectionContext);
};
